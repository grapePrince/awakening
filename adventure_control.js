var config = require("./config");
var app = require("./app");
var db_module = require("./db_modules");
var cards = require("./cards");

var PROB_FLOOR_NOTHING = 30;
var PROB_FLOOR_MATERIAL_CARD = 45;
var PROB_FLOOR_BATTLE = 85;
var PROB_FLOOR_GOLD = 100;

var ATTACK = 2;
var HEAL = 3;
var MORE = 4;
var CRITICAL = 5;
var DEFENSE = 6;
var EVOLVE = 1;

var FIELD_EXPLORE_LIST = [];

function find_field_item(session_id){
	for(var i = 0 ; i < FIELD_EXPLORE_LIST.length ; i++){
		if(FIELD_EXPLORE_LIST[i].session_id == session_id){
			return FIELD_EXPLORE_LIST[i];
		}
	}
	
	return null;
}

function popDisconnectedExploreInf(session_id){

	for(var i = 0 ; i <FIELD_EXPLORE_LIST.length ; i++){ 
		
	  if(session_id == FIELD_EXPLORE_LIST[i].session_id)
		  FIELD_EXPLORE_LIST.splice(i,1);
	}
	
}

exports.popDisconnectedExploreInf = function(session_id){

	for(var i = 0 ; i <FIELD_EXPLORE_LIST.length ; i++){ 
		
	  if(session_id == FIELD_EXPLORE_LIST[i].session_id)
		  FIELD_EXPLORE_LIST.splice(i,1);
	}
	
};

exports.call = function(io,socket,db_conn,received){
	
	var result = config.newResponse();
	  
	switch( parseInt(received.MessageNum,10) ){
	
		case config.CLIENT_REQUEST_GO_TO_FIELD :
			
			var item = config.newFieldExploreInf();
			item.session_id = socket.id;
			
			db_module.get_field_inf(received.field_num ,db_conn, function(field_inf){ 				
				//set fieldExploreInf
				//	set fieldInf
				//	set current floor num
				item.field_inf = field_inf;
				item.current_floor = 0;
				
				//get detail field information from db
				//	- set material
				db_module.get_material_list(received.field_num ,db_conn, function(material_list){
					item.material_list = material_list;
					
					//	- set monster
					db_module.get_monster_list(received.field_num ,db_conn, function(monster_list){
						
						item.monster_list = monster_list;
						item.floor_list = [];
						
						//	make floor list
						for(var i = 0 ; i < item.field_inf.floor ; i++){
							var rand =  parseInt( Math.random() * 100 );
							
							var floor_inf = config.newFloorInf();
							
							if(rand < PROB_FLOOR_NOTHING){//-> none 
								floor_inf.type = 1;
								floor_inf.value = null;
							}
							else if(rand >= PROB_FLOOR_NOTHING && rand < PROB_FLOOR_MATERIAL_CARD){// -> get card (20%)
								floor_inf.type = 2;
								
								var material_rand = parseInt( Math.random() * 100 );
								
								for(var j = 0 , prob = 0 ; j < item.material_list.length ; j++){
									prob = prob + item.material_list[j].prob;
									
									if(rand < prob){
										//j th material
										floor_inf.value = item.material_list[j];
										break;
									}
								}
							}
							else if(rand >= PROB_FLOOR_MATERIAL_CARD && rand < PROB_FLOOR_BATTLE ){// -> monster battle (30%)
								floor_inf.type = 3;

								// determine monster
								var monster_rand = parseInt( Math.random() * (item.monster_list.length ));
								console.log(monster_rand);
								var battle_inf = config.newMonsterBattleInf();
								battle_inf.monster_inf = item.monster_list[monster_rand];
								floor_inf.value = battle_inf;
								
							}
							else{//	-> get gold (10%)	
								floor_inf.type = 4;
								floor_inf.value =  (parseInt( Math.random() * 3 ) + 1 ) * 150;
							}
							
							item.floor_list.push(floor_inf);
						}
						
						//get user inf from LOGIN USER LIST
						item.user_inf = app.findUserBySessionId(socket.id);
						
						FIELD_EXPLORE_LIST.push(item);
						
						result.MessageNum = config.SERVER_RESULT_GO_TO_FIELD;
						result.field_inf = item.field_inf;
						result.current_floor = item.current_floor;
						
						io.sockets.emit('data',result);
						
						//console.log(item);
												
					});
				});
			});
			break;

		case config.CLIENT_REQUEST_EXPLORE_FLOOR :
			
			// find by session_id
			var explore_inf = find_field_item(socket.id);
			
			// set current_floor_num + 1
			explore_inf.current_floor = explore_inf.current_floor + 1;
			
			//print
			console.log(explore_inf.floor_list[explore_inf.current_floor]);
			
			// check :  if explore end? - give reward
			if(explore_inf.current_floor == explore_inf.field_inf.floor){
				result.MessageNum = config.SERVER_REQUEST_FIELD_ADVENTURE_END;
				
				//reward
				var exp = explore_inf.field_inf.floor * explore_inf.field_inf.lv * 50;
				var gold = explore_inf.field_inf.floor * 120;
				
				db_module.update_explore_res( explore_inf.user_inf.id,gold,exp ,db_conn, function(){ 		
					result.reward_exp = exp;
					result.reward_gold = gold;
					
					io.sockets.emit('data',result);
					
					//pop list
					popDisconnectedExploreInf(socket.id);
				});
					
				return;
			}
			
			// send to client
			result.MessageNum = config.SERVER_RESULT_EXPLORE_FLOOR;
			result.current_floor = explore_inf.current_floor;
			result.floor_inf = explore_inf.floor_list[explore_inf.current_floor];
			
			// db insertion
			if(explore_inf.floor_list[explore_inf.current_floor].type == 2){//	- gain material card?
				var material_num = explore_inf.floor_list[explore_inf.current_floor].value.num;
				var user_num = explore_inf.user_inf.num ;

				db_module.insert_deck_item(material_num ,user_num ,db_conn, function(){ 		
					io.sockets.emit('data',result);
				});
			}
			else if(explore_inf.floor_list[explore_inf.current_floor].type == 4){//	- gain gold?
			
				var user_num = explore_inf.user_inf.num;
				var gold = explore_inf.floor_list[explore_inf.current_floor].value;

				db_module.update_user_gold(user_num ,gold ,db_conn, function(){ 		
					io.sockets.emit('data',result);
				});
			
			}
			else{
				io.sockets.emit('data',result);
			}
	
			break;
		
		case config.CLIENT_REQUEST_FIELD_BATTLE_START :
			// get session id -> get inf from FIELD_EXPLORE_LIST
			var explore_inf = find_field_item(socket.id);
			// get floor by current floor num
			var floor_inf = explore_inf.floor_list[explore_inf.current_floor];
			
			// get client's deck inf
			db_module.all_deck(explore_inf.user_inf.id, db_conn ,function (main_deck_inf, sub_deck_inf){
				//set battle inf
				
				var power = 0; 	//	cost sum - power
				var r_heal = 0;		//	user's roulette
				var r_attack = 0;	
				var r_defense = 0;
				var r_critical = 0;
				var r_more = 0;
				var r_evolve = 0;
				
				deck_list = main_deck_inf.deck_list;
				for(var i= 0 ; i < deck_list.length ; i++){
					power = power + deck_list[i].cost;
					
					switch (deck_list[i].type) {
					case EVOLVE: // evolve card
						r_evolve ++;
						break;
					case ATTACK: // weapon card
						r_attack ++;
						break;
					case HEAL: // item card
						r_heal ++;
						break;
					case MORE: // special card
						r_more ++;
						break;
					case CRITICAL: // skill card
						r_critical ++;
						break;
					case DEFENSE: // equip card
						r_defense ++
						break;
					}
				}
				
				// set to floor item
				floor_inf.value.power = power;
				floor_inf.value.player_r_heal = r_heal;
				floor_inf.value.player_r_attack = r_attack;
				floor_inf.value.player_r_defense = r_defense;
				floor_inf.value.player_r_critical = r_critical;
				floor_inf.value.player_r_more = r_more;
				floor_inf.value.player_r_evolve = r_evolve;
				floor_inf.value.player_char_name =  main_deck_inf.main_character.name;
				floor_inf.value.player_char_src = main_deck_inf.main_character.src;
				floor_inf.value.player_max_hp = main_deck_inf.main_character.base_max_hp;
				floor_inf.value.player_atk =  main_deck_inf.main_character.base_atk;
				floor_inf.value.player_def =  main_deck_inf.main_character.base_def;
				floor_inf.value.player_damaged_hp = 0;
				floor_inf.value.monster_inf.defense = 0;
				
				//send result to client
				console.log(explore_inf.floor_list[explore_inf.current_floor]);
				result.MessageNum = config.CLIENT_RESPONSE_FIELD_BATTLE_START;
				result.battle_inf = floor_inf;
				
				io.sockets.emit('data',result);
			});
			break;
			
		case config.CLIENT_REQUEST_FIELD_BATTLE_TURN_END :
			// get session id -> get inf from FIELD_EXPLORE_LIST
			var explore_inf = find_field_item(socket.id);
			// get floor by current floor num
			var floor_inf = explore_inf.floor_list[explore_inf.current_floor];
				
			// get client's action
			//var action = received.action;	
			var defense = 0;
			var my_result = config.newResponse();
			
			my_result.MessageNum = config.SERVER_RESPONSE_MY_TURN_RESULT ;	
			
			var action =  getAction(floor_inf.value.player_r_attack
					,floor_inf.value.player_r_critical
					,floor_inf.value.player_r_heal
					,floor_inf.value.player_r_more
					,floor_inf.value.player_r_evolve
					,floor_inf.value.player_r_defense);
			//var action =  parseInt( Math.random() * 5) + 1;
			//var action =  2;
			console.log("action is : " + action);
			
			// attack
			switch(action){
			case EVOLVE://	else if evolve - hp,atk,def 10% up
				var plus = parseInt(floor_inf.value.power * 0.1);
				
				floor_inf.value.player_max_hp = floor_inf.value.player_max_hp + plus;
				floor_inf.value.player_atk = floor_inf.value.player_atk + plus;
				floor_inf.value.player_def = floor_inf.value.player_def + plus;
				
				my_result.type = EVOLVE;
				my_result.player_max_hp = floor_inf.value.player_max_hp;
				my_result.player_atk = floor_inf.value.player_atk;
				my_result.player_def = floor_inf.value.player_def;
				
				break;
			case ATTACK://	if attack - 50% + atk
				var damage = parseInt(floor_inf.value.power * 0.5) + floor_inf.value.player_atk - floor_inf.value.monster_inf.defense;
				
				floor_inf.value.monster_inf.damaged_hp = floor_inf.value.monster_inf.damaged_hp + damage;
				
				my_result.type = ATTACK;
				my_result.monster_damaged_hp = floor_inf.value.monster_inf.damaged_hp;
				break;
			case HEAL://	else if heal - 20%
				var heal = parseInt(floor_inf.value.power * 0.2);
				
				if(floor_inf.value.player_damaged_hp - heal > 0)
					floor_inf.value.player_damaged_hp = floor_inf.value.player_damaged_hp - heal;
				else
					floor_inf.value.player_damaged_hp = 0;
				
				my_result.type = HEAL;
				my_result.player_damaged_hp = floor_inf.value.player_damaged_hp;
				break;
			case MORE://	else one more
				
				my_result.type = MORE;
				
				break;
			case CRITICAL://	else if skill - 100% + atk
				var damage = parseInt(floor_inf.value.power + floor_inf.value.player_atk) - floor_inf.value.monster_inf.defense;
				
				floor_inf.value.monster_inf.damaged_hp = floor_inf.value.monster_inf.damaged_hp + damage;
				
				my_result.type = CRITICAL;
				my_result.monster_damaged_hp = floor_inf.value.monster_inf.damaged_hp;
				break;
			case DEFENSE://	else if defense - 50% + def
				defense = parseInt(floor_inf.value.power * 0.5) + floor_inf.value.player_def;
				
				my_result.type = DEFENSE;
				my_result.player_defense = defense;
				break;
			}
			
			floor_inf.value.monster_inf.defense = 0;
			
			console.log("************======================my turn battle floor inf");
			console.log(floor_inf.value);
			
			// send to client
			io.sockets.emit('data',my_result);
			
			// if win?
			if(floor_inf.value.monster_inf.damaged_hp >= floor_inf.value.monster_inf.hp){
				console.log("you win");
				
				var reward_material = parseInt( Math.random() * (floor_inf.value.monster_inf.material_list.length-1) );
				
				//save to db
				//get reward : material card
				//update user exp and gold

				//send msg
				
			}
			
			var opp_result =  config.newResponse();
			opp_result.MessageNum = config.SERVER_RESPONSE_OPP_TURN_RESULT;
			
			// monster random value
			var opponent = getAction(floor_inf.value.monster_inf.r_attack
					,floor_inf.value.monster_inf.r_critical
					,floor_inf.value.monster_inf.r_heal
					,floor_inf.value.monster_inf.r_more
					,floor_inf.value.monster_inf.r_evolve
					,floor_inf.value.monster_inf.r_defense);
			//var opponent = parseInt( Math.random() * 5) + 1;
			console.log("opponent's action : " + opponent);
			
			// damaged
			switch(opponent){
			case EVOLVE://	else if evolve - 10% up
				var plus = parseInt(floor_inf.value.monster_inf.power * 0.1);
				
				floor_inf.value.monster_inf.hp = floor_inf.value.monster_inf.max_hp + plus;
				floor_inf.value.monster_inf.atk = floor_inf.value.monster_inf.atk + plus;
				floor_inf.value.monster_inf.def = floor_inf.value.monster_inf.def + plus;
				
				opp_result.type = EVOLVE;
				opp_result.monster_max_hp = floor_inf.value.monster_inf.hp;
				opp_result.monster_atk = floor_inf.value.monster_inf.atk;
				opp_result.monster_def = floor_inf.value.monster_inf.def;
				
				break;
			case ATTACK://	if attack - 50% + atk
				var damage = parseInt(floor_inf.value.monster_inf.power * 0.5) + floor_inf.value.monster_inf.atk - defense;
				
				floor_inf.value.player_damaged_hp = floor_inf.value.player_damaged_hp + damage;
				
				opp_result.type = ATTACK;
				opp_result.player_damaged_hp = floor_inf.value.player_damaged_hp;
				break;
			case HEAL://	else if heal - 20%
				var heal = parseInt(floor_inf.value.monster_inf.power * 0.2);
				
				if(floor_inf.value.monster_inf.damaged_hp - heal > 0)
					floor_inf.value.monster_inf.damaged_hp = floor_inf.value.monster_inf.damaged_hp - heal;
				else
					floor_inf.value.monster_inf.damaged_hp = 0;
				
				opp_result.type = HEAL;
				opp_result.monster_damaged_hp = floor_inf.value.monster_inf.damaged_hp;
				break;
			case MORE://	else one more
				
				opp_result.type = MORE;
				
				break;
			case CRITICAL://	else if skill - 100%
				var damage = parseInt(floor_inf.value.monster_inf.power + floor_inf.value.monster_inf.atk) - defense;
				
				floor_inf.value.player_damaged_hp = floor_inf.value.player_damaged_hp + damage;
				
				opp_result.type = CRITICAL;
				opp_result.player_damaged_hp = floor_inf.value.player_damaged_hp;		
				
				
				break;
			case DEFENSE://	else if defense - 50% + def
				defense = parseInt(floor_inf.value.monster_inf.power * 0.5) + floor_inf.value.monster_inf.def;
				floor_inf.value.monster_inf.defense = defense;
				
				opp_result.type = DEFENSE;
				opp_result.monster_defense = defense;
				break;
			}			
			console.log("************======================monster turn battle floor inf");
			console.log(floor_inf.value);
			
			// send to client
			io.sockets.emit('data',opp_result);
			
			// if lose?
			if(floor_inf.value.player_damaged_hp >= floor_inf.value.player_max_hp){
				console.log("you lose");
				
				//send msg
				
			}
				
			// send CLIENT_RESULT_FIELD_BATTLE_TURN_END 	
			result.MessageNum = config.SERVER_RESPONSE_FIELD_BATTLE_TURN_END ;
			io.sockets.emit('data', result);
			
			break;
			
	}

};

function getAction(attack,critical,heal,more,evolve,defense){
	var rand = parseInt( Math.random() * 29);
	var r_attack = attack;
	var r_critical = r_attack + critical;
	var r_heal = r_critical + heal;
	var r_more = r_heal + more;
	var r_evolve = r_more + evolve;
	var r_defense = r_evolve + defense;
	
	if(rand < r_attack){
		return ATTACK;
	}
	else if(rand < r_critical){
		return CRITICAL;
	}
	else if(rand < r_heal){
		return HEAL;
	}
	else if(rand < r_more){
		return MORE;
	}
	else if(rand < r_evolve){
		return EVOLVE;
	}
	else{
		return DEFENSE;
	}
	
}