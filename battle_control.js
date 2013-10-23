var config = require("./config");
var app = require("./app");
var db_module = require("./db_modules");
var cards = require("./cards");

//**************
// battle variables
//**************

var BATTLE_LIST = []; //status list of battle

function findBattleInfById(id){
  var res = -1;
  for(var i = 0 ; i < BATTLE_LIST.length ; i++){
    if(BATTLE_LIST[i].id == id)
      res = BATTLE_LIST[i];
  }
  return res;
}

//unknown card
var unknown_card = config.newCardInf();
unknown_card.num = -1;
unknown_card.name = "unknown";
unknown_card.img_src = "back";
unknown_card.cost = -1;
unknown_card.type = -1;
unknown_card.content = "unknown card.";

//index list of used card from hand
//var used_list = [];

//**************
// main function
//**************

exports.call = function(io,socket,db_conn,received){
  
  var result = config.newResponse();
  
  switch( parseInt(received.MessageNum,10) ){
  
    //////////////////////////////
    //  INITIALIZE BATTLE FIELD //
    //////////////////////////////
    case config.CLIENT_REQUEST_STARTBATTLE :
      //get user's information
      var room_inf = app.getRoomInf(received.room_name);
      
      //console.log(room_inf);
      
      var host = room_inf.host_inf;
      var client = room_inf.client_inf;
      
      var first; //first user
      var second; //second user
      
      var first_deck ;//first user's deck
      var second_deck;//second user's deck
      
      db_module.getHostClientDeck(host.id,client.id,db_conn,function(host_deck,client_deck){ //load deck information from db
        //get user's deck information from db
        console.log("host deck name is : " + host_deck.deck_name + "character : " + host_deck.main_character.name);
        console.log("client deck name is : " + client_deck.deck_name+ "character : " + client_deck.main_character.name);
        
        //decide the first attacker
        if( parseInt( Math.random() * 10 ) % 2 == 0 ){
          first = host;
          first_deck = host_deck;
          second = client;
          second_deck = client_deck;
        }
        else{
          first = client;
          first_deck = client_deck;
          second = host;
          second_deck = host_deck;
        }
        
        console.log("first user is : " + first.name);
        console.log("second user is : " + second.name);
        
        //***
        //emit - decided first/second user
    
        //set battle fields
        var battle_inf = config.newBattleInf();
        
        battle_inf.room_name = room_inf.name;
        
        battle_inf.first = first;
        battle_inf.second = second;
        
        battle_inf.first_character = first_deck.main_character; //set first user's fields
        battle_inf.first_max_hp = 0;
        battle_inf.first_atk = 0;
        battle_inf.first_def = 0;
        battle_inf.first_damaged_hp =  0;
        battle_inf.first_equiped_list = [];
        battle_inf.first_tomb_list = [];
        battle_inf.first_skill = null;
        battle_inf.first_skill_cooltime = 0;
        battle_inf.first_weapon = null;
        battle_inf.first_weapon_mark = 0;
        battle_inf.first_burn = 0;
        battle_inf.first_frozen = 0;
        battle_inf.first_poison = 0;
        battle_inf.first_paralysis = 0;
        battle_inf.first_dark = 0;
        battle_inf.first_block_send_damage_turn = 0;
        battle_inf.first_skill_blocked_turn = 0;
        battle_inf.first_immune_burn = 0;
        battle_inf.first_immune_frozen = 0;
        battle_inf.first_immune_poison = 0;
        battle_inf.first_immune_paralysis = 0;
        battle_inf.first_immune_dark = 0;
        battle_inf.first_reflect_damage_turn = 0;
        battle_inf.first_reflect_damage_percent = 0;
        battle_inf.second_character = second_deck.main_character; //set second user's fields
        battle_inf.second_max_hp = 0;
        battle_inf.second_atk = 0;
        battle_inf.second_def = 0;
        battle_inf.second_damaged_hp = 0;
        battle_inf.second_equiped_list = [];
        battle_inf.second_tomb_list = [];
        battle_inf.second_skill = null;
        battle_inf.second_skill_cooltime = 0;
        battle_inf.second_weapon = null;
        battle_inf.second_weapon_mark = 0;
        battle_inf.second_burn = 0;
        battle_inf.second_frozen = 0;
        battle_inf.second_poison = 0;
        battle_inf.second_paralysis = 0;
        battle_inf.second_dark = 0;
        battle_inf.second_block_send_damage_turn = 0;
        battle_inf.second_skill_blocked_turn = 0;
        battle_inf.second_immune_burn = 0;
        battle_inf.second_immune_frozen = 0;
        battle_inf.second_immune_poison = 0;
        battle_inf.second_immune_paralysis = 0;
        battle_inf.second_immune_dark = 0;
        battle_inf.second_reflect_damage_turn = 0;
        battle_inf.second_reflect_damage_percent = 0;
        battle_inf.turn_num = 1;
        battle_inf.is_specialcard_used = false;
        battle_inf.is_evolutioncard_used = false;
        battle_inf.first_special_card_effect = config.newSpecialInf();
        battle_inf.first_special_card_effect.first_atk = 0;
        battle_inf.first_special_card_effect.first_def = 0;
        battle_inf.first_special_card_effect.first_immune_burn = 0;
        battle_inf.first_special_card_effect.first_immune_paralisys = 0;
        battle_inf.first_special_card_effect.first_immune_poison = 0;
        battle_inf.first_special_card_effect.first_immune_dark = 0;
        battle_inf.first_special_card_effect.first_immune_frozen = 0;
        battle_inf.first_special_card_effect.first_reflect_damage_percent = 0;
        battle_inf.first_special_card_effect.second_atk = 0;
        battle_inf.first_special_card_effect.second_def = 0;
        battle_inf.first_special_card_effect.second_immune_burn = 0;
        battle_inf.first_special_card_effect.second_immune_paralisys = 0;
        battle_inf.first_special_card_effect.second_immune_poison = 0;
        battle_inf.first_special_card_effect.second_immune_dark = 0;
        battle_inf.first_special_card_effect.second_immune_frozen = 0;
        battle_inf.first_special_card_effect.second_reflect_damage_percent = 0;        
        battle_inf.second_special_card_effect = config.newSpecialInf();
        battle_inf.second_special_card_effect.first_atk = 0;
        battle_inf.second_special_card_effect.first_def = 0;
        battle_inf.second_special_card_effect.first_immune_burn = 0;
        battle_inf.second_special_card_effect.first_immune_paralisys = 0;
        battle_inf.second_special_card_effect.first_immune_poison = 0;
        battle_inf.second_special_card_effect.first_immune_dark = 0;
        battle_inf.second_special_card_effect.first_immune_frozen = 0;
        battle_inf.second_special_card_effect.first_reflect_damage_percent = 0;
        battle_inf.second_special_card_effect.second_atk = 0;
        battle_inf.second_special_card_effect.second_def = 0;
        battle_inf.second_special_card_effect.second_immune_burn = 0;
        battle_inf.second_special_card_effect.second_immune_paralisys = 0;
        battle_inf.second_special_card_effect.second_immune_poison = 0;
        battle_inf.second_special_card_effect.second_immune_dark = 0;
        battle_inf.second_special_card_effect.second_immune_frozen = 0;
        battle_inf.second_special_card_effect.second_reflect_damage_percent = 0;      
        battle_inf.used_list = [];
        //set hand cards
        battle_inf.first_hand_list = [];
        battle_inf.second_hand_list = [];
        for(var i = 0 ; i < 10 ; i++){
          
          var index = parseInt( Math.random() * (29 - parseInt(i/2)) );
          
          if(i%2 == 0){ //set first user's hand card
            //get card from deck and push card to hand list
            battle_inf.first_hand_list[parseInt(i/2)] = first_deck.deck_list[index];
            //pop card from deck
            first_deck.deck_list.splice(index,1);
            
            //console.log("fisrt user's " + parseInt(i/2)+ "th hand card : " + battle_inf.first_hand_list[parseInt(i/2)].name);
          }
          else{ //set second user's hand card
            //get card from deck and push card to hand list
            battle_inf.second_hand_list[parseInt(i/2)] = second_deck.deck_list[index];
            //pop card from deck          
            second_deck.deck_list.splice(index,1);
            
            //console.log("second user's " + parseInt(i/2)+ "th hand card : " + battle_inf.second_hand_list[parseInt(i/2)].name);
          }
        }
        //add deck inf to battle_inf
        battle_inf.first_deck_list = first_deck.deck_list;
        battle_inf.second_deck_list = second_deck.deck_list;
        
        //console.log("================print battle inf=================");
        //console.log(battle_inf);
        
        //add battle fields information into BATTLE_LIST
        battle_inf.id = config.randomString();
        BATTLE_LIST.push(battle_inf);
        
        var battle_inf_result = config.newBattleInf() ; //for send to client
        battle_inf_result.room_name = room_inf.name;
        battle_inf_result.id = battle_inf.id;
        battle_inf_result.first = first;
        battle_inf_result.second = second;
        battle_inf_result.first_character = first_deck.main_character; //set first user's fields
        battle_inf_result.first_max_hp = 0;
        battle_inf_result.first_atk = 0;
        battle_inf_result.first_def = 0;
        battle_inf_result.first_damaged_hp = 0;
        battle_inf_result.first_equiped_list = [];
        battle_inf_result.first_tomb_list = [];
        battle_inf_result.first_skill = null;
        battle_inf_result.first_skill_cooltime = 0;
        battle_inf_result.first_weapon = null;
        battle_inf_result.first_weapon_mark = 0;
        battle_inf_result.first_burn = 0;
        battle_inf_result.first_frozen = 0;
        battle_inf_result.first_poison = 0;
        battle_inf_result.first_paralysis = 0;
        battle_inf_result.first_dark = 0;
        battle_inf_result.first_block_send_damage_turn = 0;
        battle_inf_result.first_skill_blocked_turn = 0;
        battle_inf_result.first_immune_burn = 0;
        battle_inf_result.first_immune_frozen = 0;
        battle_inf_result.first_immune_poison = 0;
        battle_inf_result.first_immune_paralysis = 0;
        battle_inf_result.first_immune_dark = 0;
        battle_inf_result.first_reflect_damage_turn = 0;
        battle_inf_result.first_reflect_damage_percent = 0;
        battle_inf_result.second_character = second_deck.main_character; //set second user's fields
        battle_inf_result.second_max_hp = 0;
        battle_inf_result.second_atk = 0;
        battle_inf_result.second_def = 0;
        battle_inf_result.second_damaged_hp = 0;
        battle_inf_result.second_equiped_list = [];
        battle_inf_result.second_tomb_list = [];
        battle_inf_result.second_skill = null;
        battle_inf_result.second_skill_cooltime = 0;
        battle_inf_result.second_weapon = null;
        battle_inf_result.second_weapon_mark = 0;
        battle_inf_result.second_burn = 0;
        battle_inf_result.second_frozen = 0;
        battle_inf_result.second_poison = 0;
        battle_inf_result.second_paralysis = 0;
        battle_inf_result.second_dark = 0;
        battle_inf_result.second_block_send_damage_turn = 0;
        battle_inf_result.second_skill_blocked_turn = 0;
        battle_inf_result.second_immune_burn = 0;
        battle_inf_result.second_immune_frozen = 0;
        battle_inf_result.second_immune_paralysis = 0;
        battle_inf_result.second_immune_dark = 0;
        battle_inf_result.second_immune_poison = 0;
        battle_inf_result.first_deck_list = battle_inf.first_deck_list.length;
        battle_inf_result.second_deck_list = battle_inf.second_deck_list.length;
        battle_inf_result.turn_num = 1;
        battle_inf_result.is_specialcard_used = false;
        battle_inf_result.is_evolutioncard_used = false;
        battle_inf_result.second_special_card_effect = config.newSpecialInf();
        battle_inf_result.second_special_card_effect.first_atk = 0;
        battle_inf_result.second_special_card_effect.first_def = 0;
        battle_inf_result.second_special_card_effect.first_immune_burn = 0;
        battle_inf_result.second_special_card_effect.first_immune_paralisys = 0;
        battle_inf_result.second_special_card_effect.first_immune_poison = 0;
        battle_inf_result.second_special_card_effect.first_immune_dark = 0;
        battle_inf_result.second_special_card_effect.first_immune_frozen = 0;
        battle_inf_result.second_special_card_effect.first_reflect_damage_percent = 0;
        battle_inf_result.second_special_card_effect.second_atk = 0;
        battle_inf_result.second_special_card_effect.second_def = 0;
        battle_inf_result.second_special_card_effect.second_immune_burn = 0;
        battle_inf_result.second_special_card_effect.second_immune_paralisys = 0;
        battle_inf_result.second_special_card_effect.second_immune_poison = 0;
        battle_inf_result.second_special_card_effect.second_immune_dark = 0;
        battle_inf_result.second_special_card_effect.second_immune_frozen = 0;
        battle_inf_result.second_special_card_effect.second_reflect_damage_percent = 0;   
        battle_inf_result.first_special_card_effect = config.newSpecialInf();
        battle_inf_result.first_special_card_effect.first_atk = 0;
        battle_inf_result.first_special_card_effect.first_def = 0;
        battle_inf_result.first_special_card_effect.first_immune_burn = 0;
        battle_inf_result.first_special_card_effect.first_immune_paralisys = 0;
        battle_inf_result.first_special_card_effect.first_immune_poison = 0;
        battle_inf_result.first_special_card_effect.first_immune_dark = 0;
        battle_inf_result.first_special_card_effect.first_immune_frozen = 0;
        battle_inf_result.first_special_card_effect.first_reflect_damage_percent = 0;
        battle_inf_result.first_special_card_effect.second_atk = 0;
        battle_inf_result.first_special_card_effect.second_def = 0;
        battle_inf_result.first_special_card_effect.second_immune_burn = 0;
        battle_inf_result.first_special_card_effect.second_immune_paralisys = 0;
        battle_inf_result.first_special_card_effect.second_immune_poison = 0;
        battle_inf_result.first_special_card_effect.second_immune_dark = 0;
        battle_inf_result.first_special_card_effect.second_immune_frozen = 0;
        battle_inf_result.first_special_card_effect.second_reflect_damage_percent = 0;   
        
        //if first user - set second's hand invisible
        battle_inf_result.second_hand_list = [];
        for(var i = 0 ; i < battle_inf.second_hand_list.length ; i++){
            battle_inf_result.second_hand_list[i] = unknown_card;
        }
        battle_inf_result.first_hand_list = battle_inf.first_hand_list;
        var first_res = config.newResponse();
        first_res.MessageNum = config.SERVER_RESPONSE_STARTBATTLE;
        first_res.isSuccess = 1;
        first_res.battle_inf = battle_inf_result;
        first_res.is_first = true;  
        io.sockets.socket(first.session_id).emit('data',first_res); //send to first
        
        //if second user - set first's hand invisible
        battle_inf_result.first_hand_list = [];
        for(var i = 0 ; i < battle_inf.first_hand_list.length ; i++){
            battle_inf_result.first_hand_list[i] = unknown_card;
        }
        battle_inf_result.second_hand_list = battle_inf.second_hand_list;
        var second_res = config.newResponse();
        second_res.MessageNum = config.SERVER_RESPONSE_STARTBATTLE;
        second_res.isSuccess = 1;
        second_res.battle_inf = battle_inf_result;
        second_res.is_first = false;  
        io.sockets.socket(second.session_id).emit('data',second_res); //send to second

        
      console.log("battle inf is ===============================");
      console.log(battle_inf);
       
      });
      
      break;
      
    //////////////////////////////
    //         CARD USED        //
    //////////////////////////////
    case config.CLIENT_REQUEST_CARD_USE :
      
      //get battle inf from BATTLE_LIST
        //find function using received battleInf id
      var battle_inf = findBattleInfById(received.battle_inf_id);
      
      //check correct user's turn : if turnNum%2 is 1     -> first user's turn
      //                            else turnNum%2 is 0   -> second user's turn    
      first = battle_inf.first;
      second = battle_inf.second;
      //console.log("battle inf is ===============================");
      //console.log(battle_inf);

      //get clicked card's hand index
      var clicked = received.hand_index;
      /*var clicked = -1;
      var hand_length ;
      if(battle_inf.turn_num%2 == 1)//first user's turn
       	hand_length = battle_inf.first_hand_list.length;
      else //second user's turn
      	hand_length = battle_inf.second_hand_list.length;	
      for(var i = 0 ; i < hand_length ; i++){ 
      	if(battle_inf.first_hand_list[i].deck_id_num == received.deck_id_num){
      		clicked = i;
      		break;
      	}
      }      
      if(clicked == -1){
      	 console.log("invalid deck_id_num from client.");
      	return;
      }
      */
      ////////////////////
      //first user's turn
      ////////////////////
      console.log("turn num is " + battle_inf.turn_num + " , session_id is : " + socket.id + ", and first is : " + battle_inf.first.session_id);
     
      if(battle_inf.turn_num%2 == 1){ //first user's turn
        //invalid user input
        if(socket.id == second.session_id){
            console.log("invalid input - this is first user's turn");
            return;
        }
        else{
            console.log(battle_inf.first_hand_list[clicked]);
            //if card is special card ? set flag to used
            if( battle_inf.first_hand_list[clicked].type == 4){
              if(battle_inf.is_specialcard_used == false){
                battle_inf.is_specialcard_used = true;
              }
              else{
                //send err to client : can't use special card more than once in a turn
                console.log("can't use special card more than once in a turn");
                return;
              }
            }
            //if card is evolution card ? set flag to used
            if(battle_inf.first_hand_list[clicked].type == 1){
              if(battle_inf.is_evolutioncard_used == false)
                battle_inf.is_evolutioncard_used = true;
              else{
                //send err to client : can't use evolution card more than once in a turn
                console.log("can't use evolution card more than once in a turn");
                return;
              }
            }

            //if card is equip card
            if(battle_inf.first_hand_list[clicked].type == 2 			//weapon
            		|| battle_inf.first_hand_list[clicked].type == 5	//skill
            		|| battle_inf.first_hand_list[clicked].type == 6 ){	//equip item
	            //	check condition
            	var equipable = cards.checkCondition(io,socket,battle_inf, true ,battle_inf.first_hand_list[clicked].num);
	            //	if equip disable? return
            	if(equipable != true){
            		//emit disable message to client
            		var cant_res = config.newResponse();
            		cant_res.MessageNum = config.SERVER_RESPONSE_CARD_USE_FAILED;
            		cant_res.reason = "equip condition dissatisfied";
            		
            		io.sockets.socket(first.session_id).emit('data',cant_res); 
            		console.log("can't equip card : condition ");
            		return;
            	}
            	else{//else equip is able? move card to equip list or weapon or skill
            		if(battle_inf.first_hand_list[clicked].type == 2){
            			//if weapon is already equipped ?
            			if(battle_inf.first_weapon != null){ //weapon already equipped
            				//detach
            				cards.detachEffect(io,socket,battle_inf, true ,battle_inf.first_weapon.num);
            				battle_inf.first_tomb_list.push(battle_inf.first_weapon);
            				battle_inf.first_weapon = null;
            				battle_inf.first_weapon_mark = 0;
            				
            				var detach_msg = config.newResponse(); //send detach msg
            				detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
            				detach_msg.where = 1; //weapon
            				detach_msg.index = 0;
            				detach_msg.is_first = true;
            				
            				io.sockets.in(battle_inf.room_name).emit('data', detach_msg);
            			}
            			
            			battle_inf.first_weapon = battle_inf.first_hand_list[clicked];
            			
            			//send weapon equipped msg
            			var weapon_equipped_msg = config.newResponse(); 
            			weapon_equipped_msg.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
            			weapon_equipped_msg.list = [];
            			
            			var weapon_item = config.newEffectInf();
            			weapon_item.field_num = 15;
            			weapon_item.value = battle_inf.first_weapon;
            			
            			weapon_equipped_msg.list.push(weapon_item);
            			
            			io.sockets.in(battle_inf.room_name).emit('data', weapon_equipped_msg);
            		}
            		else if(battle_inf.first_hand_list[clicked].type == 5){ 
            			//if skill is already equipped ?
            			if(battle_inf.first_skill != null){//skill already equipped
            				//detach
            				battle_inf.first_tomb_list.push(battle_inf.first_skill);
            				battle_inf.first_skill = null;
            				
            				var detach_msg = config.newResponse(); //send detach msg
            				detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
            				detach_msg.where = 2; //skill
            				detach_msg.index = 0;
            				detach_msg.is_first = true;
            				
            				io.sockets.in(battle_inf.room_name).emit('data', detach_msg);
            			}
            			
            			battle_inf.first_skill = battle_inf.first_hand_list[clicked];
            			//send skill equipped msg
            			var skill_equipped_msg = config.newResponse(); 
            			skill_equipped_msg.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
            			skill_equipped_msg.list = [];
            			
            			var skill_item = config.newEffectInf();
            			skill_item.field_num = 13;
            			skill_item.value = battle_inf.first_skill;
            			
            			skill_equipped_msg.list.push(skill_item);
            			
            			io.sockets.in(battle_inf.room_name).emit('data', skill_equipped_msg);
            		}
            		else if(battle_inf.first_hand_list[clicked].type == 6 ){
            			battle_inf.first_equiped_list.push(battle_inf.first_hand_list[clicked]);
            			
            			//send item equipped msg
            			var item_equipped_msg = config.newResponse(); 
            			item_equipped_msg.MessageNum = config.SERVER_REQUEST_ATTACHED;
            			item_equipped_msg.list = battle_inf.first_equiped_list;
            			item_equipped_msg.where = 3;
            			item_equipped_msg.is_first = true;
            			item_equipped_msg.index = battle_inf.first_equiped_list.length - 1;
            			
            			io.sockets.in(battle_inf.room_name).emit('data', item_equipped_msg);
            		}
            	
            	}
            }
            
            //adjust card effect
            var is_first = true;
            console.log("adjust card effect num : " + battle_inf.first_hand_list[clicked].num);
            cards.cardUsedFromHand(io,socket,battle_inf, is_first ,battle_inf.first_hand_list[clicked].num,clicked);
            
            //send splice msg
    		var splice_msg = config.newResponse();
    		splice_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
    		splice_msg.where = 4; //hand
    		splice_msg.index = clicked;
    		splice_msg.is_first = true;
    			
    		io.sockets.in(battle_inf.room_name).emit('data', splice_msg);  	
            
            //splice from hand.
    		battle_inf.used_list.push(clicked);
            
        }
      }
      ////////////////////
      //second user's turn
      ////////////////////
      else{ // second user's turn
        //invalid user input
        if(socket.id == first.session_id){
            console.log("invalid input - this is second user's turn");
            return;
        }
        else{
            console.log(battle_inf.second_hand_list[clicked]);
            //if card is special card ? set flag to used
            //if card is evolution card ? set flag to used
            if( battle_inf.second_hand_list[clicked].type == 4){
              if(battle_inf.is_specialcard_used == false){
                battle_inf.is_specialcard_used = true;
              }
              else{
                //send err to client : can't use special card more than once in a turn
                console.log("can't use special card more than once in a turn");
                return;
              }
            }
            if(battle_inf.second_hand_list[clicked].type == 1){
              if(battle_inf.is_evolutioncard_used == false)
                battle_inf.is_evolutioncard_used = true;
              else{
                //send err to client : can't use evolution card more than once in a turn
                console.log("can't use evolution card more than once in a turn");
                return;
              }
            }
            //if card is equip card - move position
            if(battle_inf.second_hand_list[clicked].type == 2 				//weapon
            		|| battle_inf.second_hand_list[clicked].type == 5		//skill
            		|| battle_inf.second_hand_list[clicked].type == 6 ){	//equip item
	            //	check condition
            	var equipable = cards.checkCondition(io,socket,battle_inf, false ,battle_inf.second_hand_list[clicked].num);
	            //	if equip disable? return
            	if(equipable != true){
            		//emit disable message to client
            		var cant_res = config.newResponse();
            		cant_res.MessageNum = config.SERVER_RESPONSE_CARD_USE_FAILED;
            		cant_res.reason = "equip condition dissatisfied";
            		
            		io.sockets.socket(first.session_id).emit('data',cant_res); 
            		console.log("can't equip card : condition ");
            		return;
            	}
            	else{//else equip is able? move card to equip list or weapon or skill
            		if(battle_inf.second_hand_list[clicked].type == 2){
            			if(battle_inf.second_weapon != null){ //weapon already equipped 
            				//detach
            				cards.detachEffect(io,socket,battle_inf, false ,battle_inf.second_weapon.num);
            				battle_inf.second_tomb_list.push(battle_inf.second_weapon);
            				battle_inf.second_weapon = null;
            				battle_inf.second_weapon_mark = 0;
            				
            				var detach_msg = config.newResponse(); //send detach msg
            				detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
            				detach_msg.where = 1; //weapon
            				detach_msg.index = 0;
            				detach_msg.is_first = false;
            				
            				io.sockets.in(battle_inf.room_name).emit('data', detach_msg);
            			}
            			battle_inf.second_weapon = battle_inf.second_hand_list[clicked];
            			
            			//send weapon equipped msg
            			var weapon_equipped_msg = config.newResponse(); 
            			weapon_equipped_msg.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
            			weapon_equipped_msg.list = [];
            			
            			var weapon_item = config.newEffectInf();
            			weapon_item.field_num = 44;
            			weapon_item.value = battle_inf.second_weapon;
            			
            			weapon_equipped_msg.list.push(weapon_item);
            			
            			io.sockets.in(battle_inf.room_name).emit('data', weapon_equipped_msg);
            		}
            		else if(battle_inf.second_hand_list[clicked].type == 5){
            			//if skill is already equipped ?
            			if(battle_inf.second_skill != null){ //skill already equipped
            				//detach
            				battle_inf.second_tomb_list.push(battle_inf.second_skill);
            				battle_inf.second_skill = null;
            				
            				var detach_msg = config.newResponse(); //send detach msg
            				detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
            				detach_msg.where = 2; //skill
            				detach_msg.index = 0;
            				detach_msg.is_first = false;
            				
            				io.sockets.in(battle_inf.room_name).emit('data', detach_msg);
            			}
            			
            			battle_inf.second_skill = battle_inf.second_hand_list[clicked];
            			
            			//send skill equipped msg
            			var skill_equipped_msg = config.newResponse(); 
            			skill_equipped_msg.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
            			skill_equipped_msg.list = [];
            			
            			var skill_item = config.newEffectInf();
            			skill_item.field_num = 42;
            			skill_item.value = battle_inf.second_skill;
            			
            			skill_equipped_msg.list.push(skill_item);
            			
            			io.sockets.in(battle_inf.room_name).emit('data', skill_equipped_msg);
            		}
            		else if(battle_inf.second_hand_list[clicked].type == 6 ){
            			battle_inf.second_equiped_list.push(battle_inf.second_hand_list[clicked]);
            			
            			//send item equipped msg
            			var item_equipped_msg = config.newResponse(); 
            			item_equipped_msg.MessageNum = config.SERVER_REQUEST_ATTACHED;
            			item_equipped_msg.list = battle_inf.second_equiped_list;
            			item_equipped_msg.where = 3;
            			item_equipped_msg.is_first = false;
            			item_equipped_msg.index = battle_inf.second_equiped_list.length - 1;
            			
            			io.sockets.in(battle_inf.room_name).emit('data', item_equipped_msg);
            		}
            	}
            }
            
            //adjust card effect
            var is_first = false;
            console.log("adjust card effect num : " + battle_inf.second_hand_list[clicked].num);
            cards.cardUsedFromHand(io, socket, battle_inf, is_first , battle_inf.second_hand_list[clicked].num,clicked);
            
 
            //send splice msg
    		var splice_msg = config.newResponse();
    		splice_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
    		splice_msg.where = 4; //hand
    		splice_msg.index = clicked;
    		splice_msg.is_first = false;
    			
    		io.sockets.in(battle_inf.room_name).emit('data', splice_msg);  	
    		
    		//splice from hand.
    		battle_inf.used_list.push(clicked);
        }
      }
     
      //check weapon is match with character's mark
      //	if not match : drop
      if(battle_inf.first_weapon != null){
	      if(cards.checkCondition(io,socket,battle_inf, true ,battle_inf.first_weapon.num) != true ){
	      	//detach
	  		cards.detachEffect(io,socket,battle_inf, false ,battle_inf.first_weapon.num);
	  		battle_inf.first_tomb_list.push(battle_inf.first_weapon);
	  		battle_inf.first_weapon = null;
	  		battle_inf.first_weapon_mark = 0;
	  			
	  		var detach_msg = config.newResponse(); //send detach msg
	  		detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
	  		detach_msg.where = 1; //weapon
	  		detach_msg.index = 0;
	  		detach_msg.is_first = true;
	  			
	  		io.sockets.in(battle_inf.room_name).emit('data', detach_msg);  
	      }
      }
      if(battle_inf.second_weapon != null){
	      if(cards.checkCondition(io,socket,battle_inf, false ,battle_inf.second_weapon.num) != true){
	    	//detach
			cards.detachEffect(io,socket,battle_inf, false ,battle_inf.second_weapon.num);
			battle_inf.second_tomb_list.push(battle_inf.second_weapon);
			battle_inf.second_weapon = null;
			battle_inf.second_weapon_mark = 0;
				
			var detach_msg = config.newResponse(); //send detach msg
			detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
			detach_msg.where = 1; //weapon
			detach_msg.index = 0;
			detach_msg.is_first = false;
			
			io.sockets.in(battle_inf.room_name).emit('data', detach_msg);
	      }
      }
      
      //check skill is match with weapon's mark
      //	if not match : drop
      if(battle_inf.first_skill != null){
	      if(cards.checkCondition(io,socket,battle_inf, true ,battle_inf.first_skill.num) != true){
	  		//detach
	  		battle_inf.first_tomb_list.push(battle_inf.first_skill);
	  		battle_inf.first_skill = null;
	  			
	  		var detach_msg = config.newResponse(); //send detach msg
	  		detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
	  		detach_msg.where = 2; //skill
	  		detach_msg.index = 0;
	  		detach_msg.is_first = true;
	  			
	  		io.sockets.in(battle_inf.room_name).emit('data', detach_msg);  	    
	      }
      }
      if(battle_inf.second_skill != null){
	      if(cards.checkCondition(io,socket,battle_inf, false ,battle_inf.second_skill.num) != true){
			//detach
			battle_inf.second_tomb_list.push(battle_inf.second_skill);
			battle_inf.second_skill = null;
				
			var detach_msg = config.newResponse(); //send detach msg
			detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
			detach_msg.where = 2; //skill
			detach_msg.index = 0;
			detach_msg.is_first = false;
				
			io.sockets.in(battle_inf.room_name).emit('data', detach_msg);  	  
	      }
      }
      
      //console.log("battle inf card used result ========================================================================");
      //console.log(battle_inf);
      //console.log(used_list);
      
      //send CARD_USE_RESULT
      var use_res = config.newResponse();
      use_res.MessageNum = config.SERVER_RESPONSE_CARD_USE;
      if(battle_inf.turn_num%2 == 1){ //first user's turn
  		io.sockets.socket(first.session_id).emit('data',use_res); 
      }
      else{
  		io.sockets.socket(second.session_id).emit('data',use_res); 
      }
      
      break;
      
    //////////////////////////////
    //         TURN END         //
    //////////////////////////////      
    case config.CLIENT_REQUEST_TURNEND :
   

      var battle_inf = findBattleInfById(received.battle_inf_id);
      var is_skill = received.skill_used;
            
      var  first = battle_inf.first;
      var  second = battle_inf.second;	
    	
      //result for send to client
	  var res = config.newResponse();
	  res.MessageNum = config.SERVER_REQUEST_TURN_END;
	  res.list = [];
	  
      if(battle_inf.turn_num%2 == 1){ //first user's turn
          if(socket.id == second.session_id){
              console.log("invalid input - this is first user's turn");
              return;
          }
      }
      else{
          if(socket.id == first.session_id){
              console.log("invalid input - this is second user's turn");
              return;
          }
      }

      ////////////////////
      //first user's turn
      ////////////////////
      if(battle_inf.turn_num%2 == 1){ //first user's turn
	      //calculate damage - normal attack or skill effect
	      //	check damage block flag    	  
    	  var atk_sum = battle_inf.first_character.base_atk + battle_inf.first_atk + battle_inf.first_special_card_effect.first_atk +  battle_inf.second_special_card_effect.first_atk;
    	  var def_sum = battle_inf.second_character.base_def + battle_inf.second_def + battle_inf.first_special_card_effect.second_def + battle_inf.second_special_card_effect.second_def;
    	  var skill_sum = 0;
    	  var damage = 0;
    	 
    	  // if normal attack
    	  if(is_skill == false){
	    	  if(battle_inf.first_block_send_damage_turn > 0){ //check
	    		  //can't send damage
	    		  //send msg
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK_FAILED;
	    		  msg.reason = "normal attack blocked";
	    	  			
	    		  io.sockets.in(battle_inf.room_name).emit('data', msg);  	    
	    		  return;
	    	  }  
	    	  else if(stat_damage_missed != true){
	    		  //attack
	    		  console.log("===atk_sum : " + atk_sum + "(" + battle_inf.first_character.base_atk + " , " + battle_inf.first_atk + " , " + battle_inf.first_special_card_effect.first_atk + + " , " + battle_inf.second_special_card_effect.first_atk + ")");
	    		  console.log("===def sum : " + def_sum + " ( " + battle_inf.second_character.base_def + " , " + battle_inf.second_def + " , " + battle_inf.first_special_card_effect.second_def +" , " + battle_inf.second_special_card_effect.second_def+ ")");
	    		  damage = atk_sum - def_sum;
	    		  battle_inf.second_damaged_hp =  battle_inf.second_damaged_hp + damage;
	    		  
	    		  //send msg - normal atk damage
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK;
	    		  msg.is_first = false;
	    		  msg.damaged_hp = battle_inf.second_damaged_hp;
	    	  			
	    		  io.sockets.in(battle_inf.room_name).emit('data', msg);  	
	    	  }
    	  }
    	  else{
	    	  // else skill attack
    		  if(battle_inf.first_skill == null){
	    		  //skill card not equipped
	    		  //send msg
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK_FAILED;
	    		  msg.reason = "no skill card";
	    	  			
	    		  io.sockets.socket(battle_inf.first.session_id).emit('data',msg);  
	    		  return;   			  
    		  }
	    	  if(battle_inf.first_skill_blocked_turn > 0){ //check
	    		  //can't use skill, do normal attack
	    		  //send msg
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK_FAILED;
	    		  msg.reason = "skill blocked";
	    	  			
	    		  io.sockets.socket(battle_inf.first.session_id).emit('data',msg);  
	    		  return;
	    	  }
	    	  if(battle_inf.first_skill_cooltime > 0 ){
	    		  //send msg
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK_FAILED;
	    		  msg.reason = "skill cooltime";
	    	  			
	    		  io.sockets.socket(battle_inf.first.session_id).emit('data',msg); 	    
	    		  
	    		  return;	    		  
	    	  }
	    	  else if(stat_skill_missed != true){
	    		  console.log("SKILL USED");
	    		  //use skill
	    		  var skill_damage = cards.skillCardUsed(io,socket, battle_inf,true ,battle_inf.first_skill.num);
	    		  damage = atk_sum + skill_damage - def_sum ;
	    		  battle_inf.second_damaged_hp =  battle_inf.second_damaged_hp + damage;
	    		  
	    		  //send msg - skill atk damage
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK;
	    		  msg.is_first = false;
	    		  msg.damaged_hp = battle_inf.second_damaged_hp;
	    	  			
	    		  io.sockets.in(battle_inf.room_name).emit('data', msg);  	
	    	  }
    	  }

    	  if(battle_inf.first_reflect_damage_turn > 0){
    		  //reflect damage to second
    		  var reflect_percent = (battle_inf.first_special_card_effect.first_reflect_damage_percent + battle_inf.first_special_card_effect.first_reflect_damage_percent + battle_inf.first_reflect_damage_percent)/100;
    		  
    		  var reflect_value = parseInt(damage * reflect_percent);
    		  
    		  console.log("reflect percent : " + reflect_percent);
    		  console.log("reflect value : " + reflect_value);
    		  
    		  battle_inf.first_damaged_hp = battle_inf.first_damaged_hp + reflect_value;
    		  
    		  //send reflect msg
    		  var msg = config.newResponse(); //send detach msg
    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK;
    		  msg.is_first = false;
    		  msg.damaged_hp = battle_inf.first_damaged_hp;
    	  			
    		  io.sockets.in(battle_inf.room_name).emit('data', msg);  
    	  }
    	  
	      //sort used list - pop larger index previously
    	  battle_inf.used_list.sort();
    	  //move out used card to tomb
    	  for(var i = battle_inf.used_list.length - 1 ; i >= 0 ; i--){
    		  	console.log("^^^^move to tomb");
    		  	console.log(battle_inf.used_list[i] + " : " + battle_inf.second_hand_list[battle_inf.used_list[i]]);
    		  	
    		  	var used = battle_inf.used_list[i];
    		  	
        		if(battle_inf.first_hand_list[battle_inf.used_list[i]].type != 2 			//weapon
              		&& battle_inf.first_hand_list[battle_inf.used_list[i]].type != 5		//skill
              		&& battle_inf.first_hand_list[battle_inf.used_list[i]].type != 6 ){
        			battle_inf.first_tomb_list.push(battle_inf.first_hand_list[battle_inf.used_list[i]]);
        		}
	    	  battle_inf.first_hand_list.splice(battle_inf.used_list[i],1);
    	  }
    	  
    	  //reset block and reflect flags : turn num -1
    	  if(battle_inf.first_reflect_damage_turn > 0){
    		  battle_inf.first_reflect_damage_turn = battle_inf.first_reflect_damage_turn - 1;
    		  
    		  if(battle_inf.first_reflect_damage_turn == 0){
    			  battle_inf.first_reflect_damage_percent = 0;
    		  }
    		  
    		  //add msg to list
    		  var damage_reflect_turn_updated = config.newEffectInf();
    		  damage_reflect_turn_updated.field_num = 30;
    		  damage_reflect_turn_updated.value =  battle_inf.first_reflect_damage_turn;
    		  
    		  res.list.push(damage_reflect_turn_updated);
    	  }
    	  if(battle_inf.first_block_send_damage_turn > 0){
    		  battle_inf.first_block_send_damage_turn = battle_inf.first_block_send_damage_turn - 1;
    		  
    		  //add msg to list
    		  var damage_block_turn_updated = config.newEffectInf();
    		  damage_block_turn_updated.field_num = 21;
    		  damage_block_turn_updated.value = battle_inf.first_block_send_damage_turn;
    		  
    		  res.list.push(damage_block_turn_updated);
    	  }
    	  if(battle_inf.first_skill_blocked_turn > 0){
    		  battle_inf.first_skill_blocked_turn = battle_inf.first_skill_blocked_turn - 1;
    		  
    		  //add msg to list
    		  var skill_block_updated = config.newEffectInf();
    		  skill_block_updated.field_num = 22;
    		  skill_block_updated.value = battle_inf.first_skill_blocked_turn;
    		  
    		  res.list.push(skill_block_updated);
    	  }
    	  
    	  //skill cootime--
    	  if(battle_inf.first_skill_cooltime > 0)
    		  battle_inf.first_skill_cooltime = battle_inf.first_skill_cooltime - 1;
    	  
    	  var cooltime_updated = config.newEffectInf();
    	  cooltime_updated.field_num = 14;
    	  cooltime_updated.value =  battle_inf.first_skill_cooltime;
    	  res.list.push(cooltime_updated);
    	 
      }
      ////////////////////
      //second user's turn
      ////////////////////      
      else{
	      //calculate damage - normal attack or skill effect
	      //	check damage block flag    	  
    	  var atk_sum = battle_inf.second_character.base_atk + battle_inf.second_atk + battle_inf.first_special_card_effect.second_atk+ battle_inf.second_special_card_effect.second_atk;
    	  var def_sum = battle_inf.first_character.base_def + battle_inf.first_def + battle_inf.first_special_card_effect.first_def + battle_inf.second_special_card_effect.first_def;
    	  var skill_sum = 0;
    	  var damage = 0;
    	 
    	  // if normal attack
    	  if(is_skill == false){
	    	  if(battle_inf.second_block_send_damage_turn > 0){ //check
	    		  //can't send damage
	    		  //send msg
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK_FAILED;
	    		  msg.reason = "normal attack blocked";
	    	  			
	    		  io.sockets.in(battle_inf.room_name).emit('data', msg);  	    
	    	  }  
	    	  else if(stat_damage_missed != true){
	    		  //attack
	    		  console.log("===atk_sum : " + atk_sum + "(" + battle_inf.second_character.base_atk + " , " + battle_inf.second_atk + " , " + battle_inf.first_special_card_effect.second_atk +  " , " + battle_inf.second_special_card_effect.second_atk + ")");
	    		  console.log("===def sum : " + def_sum + " ( " + battle_inf.first_character.base_def + " , " + battle_inf.first_def + " , " + battle_inf.first_special_card_effect.first_def +  " , " + battle_inf.second_special_card_effect.first_def + ")");
	    		  damage = atk_sum - def_sum;
	    		  battle_inf.first_damaged_hp =  battle_inf.first_damaged_hp + damage;
	    		  
	    		  //send msg - normal atk damage
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK;
	    		  msg.is_first = true;
	    		  msg.damaged_hp = battle_inf.first_damaged_hp;
	    	  			
	    		  io.sockets.in(battle_inf.room_name).emit('data', msg);  	
	    	  }
    	  }
    	  else{
	    	  // else skill attack
    		  if(battle_inf.second_skill == null){
        		  //skill card not equipped
        		  //send msg
        		  var msg = config.newResponse(); //send detach msg
        		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK_FAILED;
        		  msg.reason = "no skill card";

        		  io.sockets.socket(battle_inf.second.session_id).emit('data',msg); 
        		  return;   			  
    		  }
    		  
	    	  if(battle_inf.second_skill_blocked_turn > 0){ //check
	    		  //can't use skill, do normal attack
	    		  //send msg
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK_FAILED;
	    		  msg.reason = "skill blocked";
	    	  			
	    		  io.sockets.socket(battle_inf.second.session_id).emit('data',msg); 	    
	    		  
	    		  return;
	    	  }
	    	  
	    	  if(battle_inf.second_skill_cooltime > 0 ){
	    		  //send msg
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK_FAILED;
	    		  msg.reason = "skill cooltime";
	    	  			
	    		  io.sockets.socket(battle_inf.second.session_id).emit('data',msg); 	    
	    		  
	    		  return;	    		  
	    	  }
	    	  
	    	  else if(stat_skill_missed != true){
	    		  console.log("SKILL USED");
	    		  //use skill
	    		  var skill_damage = cards.skillCardUsed(io,socket, battle_inf, false ,battle_inf.second_skill.num);
	    		  damage = atk_sum + skill_damage - def_sum ;
	    		  battle_inf.first_damaged_hp =  battle_inf.first_damaged_hp + damage;
	    		  
	    		  //send msg - skill atk damage
	    		  var msg = config.newResponse(); //send detach msg
	    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK;
	    		  msg.is_first = true;
	    		  msg.damaged_hp = battle_inf.first_damaged_hp;
	    	  			
	    		  io.sockets.in(battle_inf.room_name).emit('data', msg);  	
	    	  }
    	  }

    	  if(battle_inf.second_reflect_damage_turn > 0){
    		  //reflect damage to second
    		  var reflect_percent = (battle_inf.second_special_card_effect.first_reflect_damage_percent + battle_inf.first_special_card_effect.first_reflect_damage_percent + battle_inf.first_reflect_damage_percent)/100;
    		  
    		  var reflect_value = parseInt(damage * reflect_percent);
    		  
    		  console.log("reflect percent : " + reflect_percent);
    		  console.log("reflect value : " + reflect_value);
    		  
    		  battle_inf.second_damaged_hp = battle_inf.second_damaged_hp + reflect_value;
    		  
    		  //send reflect msg
    		  var msg = config.newResponse(); //send detach msg
    		  msg.MessageNum = config.SERVER_RESPONSE_ATTACK;
    		  msg.is_first = true; //target
    		  msg.damaged_hp = battle_inf.second_damaged_hp;
    	  			
    		  io.sockets.in(battle_inf.room_name).emit('data', msg);  
    	  }
	      
    	  //move out used card to tomb
    	  battle_inf.used_list.sort();
    	  for(var i = battle_inf.used_list.length - 1 ; i >= 0 ; i--){
  		  	console.log("^^^^move to tomb");
	      	//console.log(battle_inf.used_list);
	      	console.log(battle_inf.used_list[i] + " : " + battle_inf.second_hand_list[battle_inf.used_list[i]]);
	      	console.log(battle_inf.second_hand_list);
	      	
      		if(battle_inf.second_hand_list[battle_inf.used_list[i]].type != 2 				//weapon
            		&& battle_inf.second_hand_list[battle_inf.used_list[i]].type != 5		//skill
            		&& battle_inf.second_hand_list[battle_inf.used_list[i]].type != 6 ){
	    	  battle_inf.second_tomb_list.push(battle_inf.second_hand_list[battle_inf.used_list[i]]);
      		}
	    	  battle_inf.second_hand_list.splice(battle_inf.used_list[i],1);
      		
    	  }
    	  
    	  //reset block and reflect flags : turn num -1
    	  if(battle_inf.second_reflect_damage_turn > 0){
    		  battle_inf.second_reflect_damage_turn = battle_inf.second_reflect_damage_turn - 1;
    		  
    		  if(battle_inf.second_reflect_damage_turn == 0){
    			  battle_inf.second_reflect_damage_percent = 0;
    		  }
    		  
    		  //add msg to list
    		  var damage_reflect_turn_updated = config.newEffectInf();
    		  damage_reflect_turn_updated.field_num = 59;
    		  damage_reflect_turn_updated.value =  battle_inf.second_reflect_damage_turn;
    		  
    		  res.list.push(damage_reflect_turn_updated);
    	  }
    	  if(battle_inf.second_block_send_damage_turn > 0){
    		  battle_inf.second_block_send_damage_turn = battle_inf.second_block_send_damage_turn - 1;
    		  
    		  //add msg to list
    		  var damage_block_turn_updated = config.newEffectInf();
    		  damage_block_turn_updated.field_num = 50;
    		  damage_block_turn_updated.value = battle_inf.second_block_send_damage_turn;
    		  
    		  res.list.push(damage_block_turn_updated);
    	  }
    	  if(battle_inf.second_skill_blocked_turn > 0){
    		  battle_inf.second_skill_blocked_turn = battle_inf.second_skill_blocked_turn - 1;
    		  
    		  //add msg to list
    		  var skill_block_updated = config.newEffectInf();
    		  skill_block_updated.field_num = 51;
    		  skill_block_updated.value = battle_inf.second_skill_blocked_turn;
    		  
    		  res.list.push(skill_block_updated);
    	  }
    	  
    	  //skill cootime--
    	  if(battle_inf.second_skill_cooltime > 0)
    		  battle_inf.second_skill_cooltime = battle_inf.second_skill_cooltime - 1;
    	  
    	  var cooltime_updated = config.newEffectInf();
    	  cooltime_updated.field_num = 43;
    	  cooltime_updated.value =  battle_inf.second_skill_cooltime;
    	  res.list.push(cooltime_updated);
      }
      
      ////////////////////////////////
      //  first second common case
      ///////////////////////////////
      
      ////////////////////////
      // adjust status effect
      ////////////////////////
      var stat_skill_missed = false;
      var stat_damage_missed = false;
      var stat_draw_missed = false;
      
      if(battle_inf.turn_num%2 == 1){ //first user turn ended - adjust first's status effect
    	  if(battle_inf.first_burn == 1){ //burn card - 50%
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_percent = parseInt(Math.random() * 100); //50%
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.first_burn = 0;
    			  
    			  //item field
    			  stat_item.field_num = 16;
    			  stat_item.value = battle_inf.first_burn; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 1;    			  
    			  stat_res.is_first = true;
    			  stat_res.value = stat_item;

    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    		  else if(stat_percent < 50){ //else burn
	    		  //set burn index
	    		  var index = parseInt(Math.random() * (battle_inf.first_hand_list.length -1));
	    		  battle_inf.first_hand_list.splice(index,1);
	    		  
	    		  //item field
	    		  stat_item.field_num = 10;
	    		  stat_item.value = battle_inf.first_hand_list;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 2;
    			  stat_res.is_first = true;
    			  stat_res.value = stat_item;
    			  stat_res.index = index;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }
    	  if(battle_inf.first_frozen == 1){ //skill miss - 50%
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_percent = parseInt(Math.random() * 100); //50%
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.first_frozen = 0;
    			  
    			  //item field
    			  stat_item.field_num = 17;
    			  stat_item.value = battle_inf.first_frozen; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 3;
    			  stat_res.is_first = true;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
       		  }
    		  else if(stat_percent < 50){ //else frozen
    			  stat_skill_missed = true;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 4;
    			  stat_res.is_first = true;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }

    	  if(battle_inf.first_poison == 1){ //damaged +10
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.first_poison = 0;
    			  
    			  //item field
    			  stat_item.field_num = 18;
    			  stat_item.value = battle_inf.first_poison; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 5;
    			  stat_res.is_first = true;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
       		  }
    		  else{//poison
    			  battle_inf.first_damaged_hp = battle_inf.first_damaged_hp + 10;
    			  
    			//item field
	    		  stat_item.field_num = 8;
	    		  stat_item.value = battle_inf.first_damaged_hp;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 6;
    			  stat_res.is_first = true;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }
    	  
    	  if(battle_inf.first_paralysis == 1){ //damage miss - 50%
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_percent = parseInt(Math.random() * 100); //50%
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.first_paralysis = 0;
    			  
    			  //item field
    			  stat_item.field_num = 19;
    			  stat_item.value = battle_inf.first_paralysis; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 7;
    			  stat_res.is_first = true;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
       		  }
    		  else if(stat_percent < 50){ //else paralysis
    			  stat_damage_missed = true;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 8;
    			  stat_res.is_first = true;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }
    	  if(battle_inf.first_dark == 1){ //draw miss - 50%
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_percent = parseInt(Math.random() * 100); //50%
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.first_dark = 0;
    			  
    			  //item field
    			  stat_item.field_num = 20;
    			  stat_item.value = battle_inf.first_dark; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 9;
    			  stat_res.is_first = true;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
       		  }
    		  else if(stat_percent < 50){ //else dark
    			  stat_draw_missed = true;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 10;
    			  stat_res.is_first = true;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }
      }
      else{//second user turn ended - adjust second's status effect
    	  if(battle_inf.second_burn == 1){ //burn card - 50%
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_percent = parseInt(Math.random() * 100); //50%
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.second_burn = 0;
    			  
    			  //item field
    			  stat_item.field_num = 45;
    			  stat_item.value = battle_inf.second_burn; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 1;    			  
    			  stat_res.is_second = true;
    			  stat_res.value = stat_item;

    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    		  else if(stat_percent < 50){ //else burn
	    		  //set burn index
	    		  var index = parseInt(Math.random() * (battle_inf.second_hand_list.length -1));
	    		  battle_inf.second_hand_list.splice(index,1);
	    		  
	    		  //item field
	    		  stat_item.field_num = 39;
	    		  stat_item.value = battle_inf.second_hand_list;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 2;
    			  stat_res.is_second = true;
    			  stat_res.value = stat_item;
    			  stat_res.index = index;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }
    	  if(battle_inf.second_frozen == 1){ //skill miss - 50%
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_percent = parseInt(Math.random() * 100); //50%
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.second_frozen = 0;
    			  
    			  //item field
    			  stat_item.field_num = 46;
    			  stat_item.value = battle_inf.second_frozen; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 3;
    			  stat_res.is_second = true;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
       		  }
    		  else if(stat_percent < 50){ //else frozen
    			  stat_skill_missed = true;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 4;
    			  stat_res.is_second = true;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }

    	  if(battle_inf.second_poison == 1){ //damaged +10
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.second_poison = 0;
    			  
    			  //item field
    			  stat_item.field_num = 47;
    			  stat_item.value = battle_inf.second_poison; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 5;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
       		  }
    		  else{//poison
    			  battle_inf.second_damaged_hp = battle_inf.second_damaged_hp + 10;
    			  
    			  //item field
	    		  stat_item.field_num = 37;
	    		  stat_item.value = battle_inf.second_damaged_hp;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 6;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }
    	  
    	  if(battle_inf.second_paralysis == 1){ //damage miss - 50%
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_percent = parseInt(Math.random() * 100); //50%
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.second_paralysis = 0;
    			  
    			  //item field
    			  stat_item.field_num = 48;
    			  stat_item.value = battle_inf.second_paralysis; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 7;
    			  stat_res.is_second = true;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
       		  }
    		  else if(stat_percent < 50){ //else paralysis
    			  stat_damage_missed = true;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 8;
    			  stat_res.is_second = true;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }
    	  if(battle_inf.second_dark == 1){ //draw miss - 50%
    		  var stat_res = config.newResponse();
    		  var stat_item = config.newEffectInf();
    	      var stat_percent = parseInt(Math.random() * 100); //50%
    	      var stat_recover_percent = parseInt(Math.random() * 100);//10%
    	      
    		  //if recover?
    		  if(stat_recover_percent < 10){
    			  battle_inf.second_dark = 0;
    			  
    			  //item field
    			  stat_item.field_num = 49;
    			  stat_item.value = battle_inf.second_dark; 
    			  
    			  //send msg
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 9;
    			  stat_res.is_second = true;
    			  stat_res.value = stat_item;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
       		  }
    		  else if(stat_percent < 50){ //else dark
    			  stat_draw_missed = true;
	    		  
	    		  //send msg    			  
    			  stat_res.MessageNum = config.SERVER_REQUEST_STATUS_EFFECTS;
    			  stat_res.stat_type = 10;
    			  stat_res.is_second = true;
    			  
    			  io.sockets.in(battle_inf.room_name).emit('data', stat_res);
    		  }
    	  }
      }
      
      
      //reset used list
      battle_inf.used_list = [];
      
      //reset one-turn variables : is_specialcard_used, is_evolutioncard_used
      battle_inf.is_evolutioncard_used = false;
      battle_inf.is_specialcard_used = false;
      
      //set speical card's effects back.
      if(battle_inf.turn_num % 2 == 0){ //if turn over
	      battle_inf.second_special_card_effect = config.newSpecialInf();
	      
	      var special_updated = config.newEffectInf();
	      special_updated.field_num = 62;
	      special_updated.value = battle_inf.second_special_card_effect;
	      
	      res.list.push(special_updated);
      }
      else{
	      battle_inf.first_special_card_effect = config.newSpecialInf();
	      
	      var special_updated = config.newEffectInf();
	      special_updated.field_num = 61;
	      special_updated.value = battle_inf.first_special_card_effect;
	      
	      res.list.push(special_updated);   	  
      }
      
      //////////////////
      //check game over
      //////////////////
      //console.log("first damaged hp : " + battle_inf.first_damaged_hp + "first max hp : " + battle_inf.first_max_hp + "first deck length : " + battle_inf.first_deck_list.length);
      //console.log("second damaged hp : " + battle_inf.second_damaged_hp + "second max hp : " + battle_inf.second_max_hp + "second deck length : " + battle_inf.second_deck_list.length);
 	  if(battle_inf.first_damaged_hp >= (battle_inf.first_max_hp + battle_inf.first_character.base_max_hp) || battle_inf.first_deck_list.length < 1){
 		  var win_res = config.newResponse();
 		  var lose_res = config.newResponse();
 		  win_res.MessageNum = config.SERVER_REQUEST_GAME_END;
 		  lose_res.MessageNum = config.SERVER_REQUEST_GAME_END;
 		  
 		  //second win
 		  //set reward
 		  win_res.is_win = true;
 		  lose_res.is_win = false;
 		  
 		  win_res.reward_gold = 500 *  battle_inf.first.exp;
 		  lose_res.reward_gold = 100 * battle_inf.second.exp;
 		  
 		  win_res.reward_exp = 100 * battle_inf.first.exp;
 		  lose_res.reward_exp = 20 * battle_inf.second.exp;
 		  
 		  //set db infs
 		  var winner = battle_inf.second;
 		  winner.money = winner.money + win_res.reward_gold;
 		  winner.exp = winner.exp +  win_res.reward_exp;
 		  winner.win_num = winner.win_num + 1;
 		  
 		  var loser = battle_inf.first;
 		  loser.money = loser.money + lose_res.reward_gold;
 		  loser.exp = loser.exp + lose_res.reward_exp;
 		  loser.lose_num = loser.lose_num + 1;
 		  
 		  //write to db
 		 db_module.update_battle_res(winner, db_conn ,function(){
 	 		 db_module.update_battle_res(loser, db_conn ,function(){
 	 			 io.sockets.socket(battle_inf.first.session_id).emit('data',lose_res); //send to first
		 		  io.sockets.socket(battle_inf.second.session_id).emit('data',win_res); //send to second	
		 		  
		 		  var room = battle_inf.room_name;
		 		  
		 		  //pop from BATTLE_LIST
		 		  popBattleInf(battle_inf.first.session_id);
		 		  //pop from ROOM_LIST
		 		  socket.leave(battle_inf.room_name);
		 		  app.popRoomInf(battle_inf.room_name);
		 		  
		 		  //broadcast to others
		          var update_room_res = config.newResponse();
		          update_room_res.MessageNum = config.SERVER_REQUEST_UPDATE_ROOM_INF;
		          update_room_res.room_name = room;
		          update_room_res.room_inf = -1;
		          io.sockets.emit('data',update_room_res); 
 	 		 });
			 
 		 });
 		  
 	  }
 	  else if(battle_inf.second_damaged_hp >= (battle_inf.second_max_hp + battle_inf.second_character.base_max_hp) || battle_inf.second_deck_list.length < 1){
 		  var win_res = config.newResponse();
 		  var lose_res = config.newResponse();
 		 
 		  //first win
 		  //set reward
 		  win_res.is_win = true;
 		  lose_res.is_win = false;
 		  
 		  win_res.reward_gold = 500 *  battle_inf.second.exp;
 		  lose_res.reward_gold = 100 * battle_inf.first.exp;
 		  
 		  win_res.reward_exp = 100 * battle_inf.second.exp;
 		  lose_res.reward_exp = 20 * battle_inf.first.exp;		
 		  
 		  //set db infs
 		  var winner = battle_inf.first;
 		  winner.money = winner.money + win_res.reward_gold;
 		  winner.exp = winner.exp +  win_res.reward_exp;
 		  winner.win_num = winner.win_num + 1;
 		  
 		  var loser = battle_inf.second;
 		  loser.money = loser.money + lose_res.reward_gold;
 		  loser.exp = loser.exp + lose_res.reward_exp;
 		  loser.lose_num = loser.lose_num + 1;
 		  
 		  console.log(winner);
 		 console.log(loser);
 		  
 		  //write to db
 		 db_module.update_battle_res(winner, db_conn ,function(){
 	 		 db_module.update_battle_res(loser, db_conn ,function(){
		 		  io.sockets.socket(battle_inf.first.session_id).emit('data',win_res); //send to first
		 		  io.sockets.socket(battle_inf.second.session_id).emit('data',lose_res); //send to second	
		 		  
		 		  var room = battle_inf.room_name;
		 		  
		 		  //pop from BATTLE_LIST
		 		  popBattleInf(battle_inf.first.session_id);
		 		  //pop from ROOM_LIST
		 		  socket.leave(battle_inf.room_name);
		 		  app.popRoomInf(battle_inf.room_name);
		 		  
		 		  //broadcast to others
		          var update_room_res = config.newResponse();
		          update_room_res.MessageNum = config.SERVER_REQUEST_UPDATE_ROOM_INF;
		          update_room_res.room_name = room;
		          update_room_res.room_inf = -1;
		          io.sockets.emit('data',update_room_res); 			 
 	 		 });
 		 });

 	  }

      
      
      //draw next's card from deck
	  var draw_res_first = config.newResponse();
	  draw_res_first.MessageNum = config.SERVER_REQUEST_ATTACHED;

	  var draw_res_second = config.newResponse();
	  draw_res_second.MessageNum = config.SERVER_REQUEST_ATTACHED;
	  
      //turn changed : turnNum ++
      battle_inf.turn_num = battle_inf.turn_num + 1;
      
	  var turn_changed = config.newEffectInf();      
	  turn_changed.field_num = 1;
	  turn_changed.value = battle_inf.turn_num;
	  res.list.push(turn_changed);
	    
	  //draw first user's hand card
	  if(stat_draw_missed != true){
		  if(battle_inf.turn_num%2 == 0){ 
			  var index = parseInt( Math.random() * (battle_inf.first_deck_list.length - 1) ); //random index from deck
			  
			  battle_inf.first_hand_list.push(battle_inf.first_deck_list[index]); //deck to hand
			  
			  battle_inf.first_deck_list.splice(index,1); //splice from deck
			  
	  
			  draw_res_first.list = battle_inf.first_hand_list; 
			  draw_res_first.where = 4;
			  draw_res_first.index = battle_inf.first_hand_list.length - 1;
			  draw_res_first.is_first = true;
			  
			  //send card draw res to first	  
			  io.sockets.socket(battle_inf.first.session_id).emit('data',draw_res_first); //send to first
			  
			  //send card draw res to second
			  var invisable_list = [];
			  for(var j = 0 ; j < battle_inf.first_hand_list.length ; j++)
				  invisable_list.push(unknown_card);

			  draw_res_second.list = invisable_list;
			  draw_res_second.where = 4;
			  draw_res_second.index = invisable_list.length - 1;
			  draw_res_second.is_first = true;
			  
			  io.sockets.socket(battle_inf.second.session_id).emit('data',draw_res_second); //send to second
		  }
		  else{//draw second user's hand card
			  var index = parseInt( Math.random() * (battle_inf.second_deck_list.length - 1) );
			  
			  battle_inf.second_hand_list.push(battle_inf.second_deck_list[index]);
			  
			  battle_inf.second_deck_list.splice(index,1);	   //splice from deck
			  
			  draw_res_second.list = battle_inf.second_hand_list; 
			  draw_res_second.where = 4;
			  draw_res_second.index = battle_inf.second_hand_list.length - 1;
			  draw_res_second.is_first = false;
			  io.sockets.socket(battle_inf.second.session_id).emit('data',draw_res_second); //send to second
			  
			  //send card draw res to first
			  var invisable_list = [];
			  for(var j = 0 ; j < battle_inf.second_hand_list.length ; j++)
				  invisable_list.push(unknown_card);
			  
			  draw_res_first.list = invisable_list;
			  draw_res_first.where = 4;
			  draw_res_first.index = invisable_list.length - 1;
			  draw_res_first.is_first = false;
			  
			  io.sockets.socket(battle_inf.first.session_id).emit('data',draw_res_first); //send to first
		  }
	 }
	  	  
	  //send changed information to client
	  io.sockets.in(battle_inf.room_name).emit('data', res);  	
	  
      //send block off msg
      console.log("battle inf card used result ========================================================================");
      console.log(battle_inf);
      console.log(battle_inf.used_list);
      
      break;

  }
};

function popBattleInf(session_id){
	  for(var i = 0 ; i < BATTLE_LIST.length ; i++){
		    var first_session = BATTLE_LIST[i].first.session_id;
		    var second_session = BATTLE_LIST[i].second.session_id;
		    
		    if(session_id == first_session || session_id == second_session)
		      BATTLE_LIST.splice(i,1);	
	  }
}

exports.popDisconnectedBattleInf = function(session_id){

  for(var i = 0 ; i < BATTLE_LIST.length ; i++){
    var first_session = BATTLE_LIST[i].first.session_id;
    var second_session = BATTLE_LIST[i].second.session_id;
    
    if(session_id == first_session || session_id == second_session)
      BATTLE_LIST.splice(i,1);
    
  }
  
};