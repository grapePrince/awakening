var mysql      = require('mysql');
var config    = require('./config');

//**********************************
//  get host and client's main deck
//**********************************
exports.getHostClientDeck = function(host_id,client_id,db_conn ,callback){           
  var query = "select deck.deck_name,deck.character_num ,deck_item.card_num, "
              + " card.card_name, card.img_src,card.cost,card.type, "
              + " character_card.character_name, character_card.base_max_hp, character_card.base_atk, character_card.base_def,character_card.src, character_card.level, character_card.title, character_card.mark "
              + " from ((deck inner join (deck_item inner join card on card.num = deck_item.card_num) " 
              + " on deck.num = deck_item.deck_num)"    
              + " inner join user on deck.user_num = user.num) "
              + " inner join character_card "
              + " on character_card.num = deck.character_num " 
              + " where deck.is_main = 1 and ( user.id = '" + host_id + "'or user.id='" + client_id + "' );";
  
  try {
      db_conn.query(query, function(err, rows, fields){
          
          var host_deck_inf = config.newDeckInf();
          var client_deck_inf = config.newDeckInf();
      
          if (err){
              console.log("ERROR : " + err);
          }
          else{
          
            //console.log("\n\n rows 0 is \n" );
            //console.log(rows[0].card_num);
          
            if(rows[0].id == host_id){ //rows 0 ~ 29 is host's inf
              host_deck_inf.deck_name = rows[0].deck_name;
              host_deck_inf.main_character = config.newCharacterInf(); //set deck's character card inf
              host_deck_inf.main_character.num = rows[0].character_num;
              host_deck_inf.main_character.name = rows[0].character_name;
              host_deck_inf.main_character.base_max_hp = rows[0].base_max_hp;
              host_deck_inf.main_character.base_atk = rows[0].base_atk;
              host_deck_inf.main_character.base_def = rows[0].base_def;
              host_deck_inf.main_character.src = rows[0].src;
              host_deck_inf.main_character.level = rows[0].level;
              host_deck_inf.main_character.title = rows[0].title;
              host_deck_inf.main_character.mark = rows[0].mark;
              host_deck_inf.deck_list = [];
              
              for(var i = 0 ; i < rows.length/2 ; i++){
                var cardInf = config.newCardInf();
                //console.log("i is : " + i + "and card num is  : " + rows[i].card_num);
                cardInf.deck_id_num = i;
                cardInf.num = rows[i].card_num;
                cardInf.name = rows[i].card_name;
                cardInf.img_src = rows[i].img_src;
                cardInf.cost = rows[i].cost;
                cardInf.type = rows[i].type;

                host_deck_inf.deck_list.push(cardInf);
              }
              
              client_deck_inf.deck_name = rows[rows.length/2].deck_name;
              client_deck_inf.main_character = config.newCharacterInf(); //set deck's character card inf
              client_deck_inf.main_character.num = rows[rows.length/2].character_num;
              client_deck_inf.main_character.name = rows[rows.length/2].character_name;
              client_deck_inf.main_character.base_max_hp = rows[rows.length/2].base_max_hp;
              client_deck_inf.main_character.base_atk = rows[rows.length/2].base_atk;
              client_deck_inf.main_character.base_def = rows[rows.length/2].base_def;
              client_deck_inf.main_character.src = rows[rows.length/2].src;
              client_deck_inf.main_character.level = rows[rows.length/2].level;
              client_deck_inf.main_character.title = rows[rows.length/2].title;
              client_deck_inf.main_character.mark = rows[rows.length/2].mark;
              client_deck_inf.deck_list = [];
              
              for(var i = rows.length/2 ; i < rows.length ; i++){
                var cardInf = config.newCardInf();
                //console.log("i is : " + i + "and card num is  : " + rows[i].card_num);
                cardInf.deck_id_num = i;
                cardInf.num = rows[i].card_num;
                cardInf.name = rows[i].card_name;
                cardInf.img_src = rows[i].img_src;
                cardInf.cost = rows[i].cost;
                cardInf.type = rows[i].type;

                client_deck_inf.deck_list.push(cardInf);
              }
            }
            else{ //rows 0 ~ 29 is client's inf
              host_deck_inf.deck_name = rows[rows.length/2].deck_name;
              host_deck_inf.main_character = config.newCharacterInf(); //set deck's character card inf
              host_deck_inf.main_character.num = rows[rows.length/2].character_num;
              host_deck_inf.main_character.name = rows[rows.length/2].character_name;
              host_deck_inf.main_character.base_max_hp = rows[rows.length/2].base_max_hp;
              host_deck_inf.main_character.base_atk = rows[rows.length/2].base_atk;
              host_deck_inf.main_character.base_def = rows[rows.length/2].base_def;
              host_deck_inf.main_character.src = rows[rows.length/2].src;
              host_deck_inf.main_character.level = rows[rows.length/2].level;
              host_deck_inf.main_character.title = rows[rows.length/2].title;
              host_deck_inf.main_character.mark = rows[rows.length/2].mark;
              host_deck_inf.deck_list = [];
              
              for(var i = rows.length/2 ; i < rows.length; i++){
                var cardInf = config.newCardInf();
                //console.log("i is : " + i + "and card num is  : " + rows[i].card_num);
                cardInf.num = rows[i].card_num;
                cardInf.name = rows[i].card_name;
                cardInf.img_src = rows[i].img_src;
                cardInf.cost = rows[i].cost;
                cardInf.type = rows[i].type;

                host_deck_inf.deck_list.push(cardInf);
              }
              
              client_deck_inf.deck_name = rows[0].deck_name;
              client_deck_inf.main_character = rows[0].character_num;
              client_deck_inf.main_character = config.newCharacterInf(); //set deck's character card inf
              client_deck_inf.main_character.num = rows[0].character_num;
              client_deck_inf.main_character.name = rows[0].character_name;
              client_deck_inf.main_character.base_max_hp = rows[0].base_max_hp;
              client_deck_inf.main_character.base_atk = rows[0].base_atk;
              client_deck_inf.main_character.base_def = rows[0].base_def;
              client_deck_inf.main_character.src = rows[0].src;
              client_deck_inf.main_character.level = rows[0].level;
              client_deck_inf.main_character.title = rows[0].title;
              client_deck_inf.main_character.mark = rows[0].mark;
              client_deck_inf.deck_list = [];
              
              for(var i = 0 ; i < rows.length/2 ; i++){
                var cardInf = config.newCardInf();
                //console.log("i is : " + i + "and card num is  : " + rows[i].card_num);
                cardInf.num = rows[i].card_num;
                cardInf.name = rows[i].card_name;
                cardInf.img_src = rows[i].img_src;
                cardInf.cost = rows[i].cost;
                cardInf.type = rows[i].type;

                client_deck_inf.deck_list.push(cardInf);
              }
            }
           
            callback(host_deck_inf,client_deck_inf);

            return;
          }
      });
      //callback();
  }
  catch(ex){
      console.log("EXCEPTION : " + ex);
  }
};


//************************
//  login 
//************************
exports.login = function(user_id, user_pass , db_conn ,callback){
              
  var query = "select user.num, user.id, user.name, user.email, user.exp, user.money, user.win_num, user.lose_num, "
              + " deck.character_num, deck.deck_name,deck.character_num ,deck_item.card_num, "
              + " card.card_name, card.img_src,card.cost,card.type, "
              + " character_card.character_name, character_card.base_max_hp, character_card.base_atk, character_card.base_def,character_card.src , character_card.level, character_card.title, character_card.mark"
              + " from ((deck inner join "
              + " (deck_item inner join card on card.num = deck_item.card_num) "
              + " on deck.num = deck_item.deck_num) "     
              + " inner join user " 
              + " on deck.user_num = user.num) " 
              + " inner join character_card " 
              + " on deck.character_num = character_card.num "
              + " where (deck.is_main = 1) and (user.id = '" + user_id + "' and user.password = '" + user_pass + "');";       
  try {
      var user_inf ;
      var main_deck_inf ;
      
      db_conn.query(query, function(err, rows, fields){
          if (err){
              console.log("ERROR : " + err);
          }
          else{     
            if(rows.length < 1){
              user_inf = -1
              main_deck_inf = -1;
            }
            else{
              //fill user inf
              user_inf = config.newUserInf();
              user_inf.num = rows[0].num;
              user_inf.id = rows[0].id;
              user_inf.name = rows[0].name;
              user_inf.exp = rows[0].exp;
              user_inf.main_character_num = rows[0].character_num;
              user_inf.money = rows[0].money;
              user_inf.win_num = rows[0].win_num;
              user_inf.lose_num = rows[0].lose_num;
              user_inf.lv = config.calculate_lv(rows[0].exp);
              //console.log("dbmodule + " + user_inf.main_character.name);
              //fill deck inf
              main_deck_inf = config.newDeckInf();
              main_deck_inf.deck_name = rows[0].deck_name;
              main_deck_inf.main_character = config.newCharacterInf();
              main_deck_inf.main_character.num = rows[0].character_num;
              main_deck_inf.main_character.name = rows[0].character_name;
              main_deck_inf.main_character.base_atk = rows[0].base_atk;
              main_deck_inf.main_character.base_def = rows[0].base_def;
              main_deck_inf.main_character.base_max_hp = rows[0].base_max_hp;
              main_deck_inf.main_character.src =  rows[0].src;
              main_deck_inf.main_character.level =  rows[0].level;
              main_deck_inf.main_character.title =  rows[0].title;
              main_deck_inf.main_character.mark =  rows[0].mark;
              main_deck_inf.deck_list = [];
             
              var cost_sum = 0;
              for(var i = 0 ; i < rows.length ; i++){ //get main deck's card list
                var cardInf = config.newCardInf();
                cardInf.num = rows[i].card_num;
                cardInf.name = rows[i].card_name;
                cardInf.img_src = rows[i].img_src;
                cardInf.cost = rows[i].cost;
                cardInf.type = rows[i].type;
                cost_sum = cost_sum +  rows[i].cost;
                
                main_deck_inf.deck_list.push(cardInf);
              }
              user_inf.cost = cost_sum;
            }
            callback(user_inf, main_deck_inf);
            return user_inf;
        }
      });
  }
  catch(ex){
      console.log("EXCEPTION : " + ex);
  }
};

//************************
// get all deck 
//************************
exports.all_deck = function(user_id, db_conn ,callback){
    
	  var query = "select deck.is_main, deck.num, deck.deck_name,deck.character_num ,deck_item.card_num, deck_item.num,  "
		  			+ " card.card_name, card.img_src,card.cost,card.type,  " 
		  			+ " character_card.character_name, character_card.base_max_hp, character_card.base_atk, character_card.base_def,character_card.src , character_card.level, character_card.title, character_card.mark "
		  			+ " from ((deck join " 
		  			+ " (deck_item join card on card.num = deck_item.card_num) "
		  			+ " on deck.num = deck_item.deck_num)"     
		  			+ " join user "  
		  			+ " on deck.user_num = user.num) " 
		  			+ " left outer join character_card "
		  			+ " on deck.character_num = character_card.num " 	
		  			+ " where (user.id = '" + user_id + "' );";       
	  try {
	      var main_deck_inf = null;
	      var sub_deck_inf = null;
	      
	      db_conn.query(query, function(err, rows, fields){
	          if (err){
	              console.log("ERROR : " + err);
	          }
	          else{     
	            if(rows.length < 1){
	              main_deck_inf = -1;
	    	      sub_deck_inf = -1 ;
	            }
	            else{
	            	
	            	//console.log(rows);
	            	
	              for(var i = 0 ; i < rows.length ; i++){ 
	            	  if(rows[i].is_main == 1){
		                if(main_deck_inf == null){
			              //fill deck inf
			              main_deck_inf = config.newDeckInf();
			              main_deck_inf.deck_name = rows[0].deck_name;
			              main_deck_inf.main_character = config.newCharacterInf();
			              main_deck_inf.main_character.num = rows[0].character_num;
			              main_deck_inf.main_character.name = rows[0].character_name;
			              main_deck_inf.main_character.base_atk = rows[0].base_atk;
			              main_deck_inf.main_character.base_def = rows[0].base_def;
			              main_deck_inf.main_character.base_max_hp = rows[0].base_max_hp;
			              main_deck_inf.main_character.src =  rows[0].src;
			              main_deck_inf.main_character.level =  rows[0].level;
			              main_deck_inf.main_character.title =  rows[0].title;
			              main_deck_inf.main_character.mark =  rows[0].mark;
			              main_deck_inf.deck_list = [];		                	
		                }
		                var cardInf = config.newCardInf();
		                cardInf.num = rows[i].card_num;
		                cardInf.name = rows[i].card_name;
		                cardInf.img_src = rows[i].img_src;
		                cardInf.cost = rows[i].cost;
		                cardInf.type = rows[i].type;
		                cardInf.deck_item_num = rows[i].num;
		                		                
		                main_deck_inf.deck_list.push(cardInf);
	            	  }
	            	  else{
	            		  if(sub_deck_inf == null){
				              sub_deck_inf = config.newDeckInf();
				              sub_deck_inf.deck_name = rows[i].deck_name;
				              sub_deck_inf.deck_list = [];		
	            		  }
			                var cardInf = config.newCardInf();
			                cardInf.num = rows[i].card_num;
			                cardInf.name = rows[i].card_name;
			                cardInf.img_src = rows[i].img_src;
			                cardInf.cost = rows[i].cost;
			                cardInf.type = rows[i].type;
			                cardInf.deck_item_num = rows[i].num;
			                		                
			                sub_deck_inf.deck_list.push(cardInf);	            		  
	            	  }
	              }
	            }
	            callback(main_deck_inf, sub_deck_inf);
	        }
	      });
	  }
	  catch(ex){
	      console.log("EXCEPTION : " + ex);
	  }
};

//***************************
// get available characters
//***************************
exports.available_characters = function(user_id, db_conn ,callback){
          
	var query = "select character_card.num, character_card.character_name, character_card.base_max_hp, character_card.base_atk, character_card.base_def,character_card.src , character_card.level, character_card.title, character_card.mark "
				+ " from character_card join (user join user_character on user.num = user_character.user_num) " 
				+ " on user_character.character_card_num = character_card.num " 
				+ " where (user.id = '" + user_id + "' );";     
	var char_list = [];
	
	try {
	  db_conn.query(query, function(err, rows, fields){
	      if (err){
	          console.log("ERROR : " + err);
	      }
	      else{     
	    	  for(var i = 0 ; i < rows.length ; i++){ //get character list
	    		  var char_inf = config.newCharacterInf();
	    		  char_inf.num = rows[i].num;
	    		  char_inf.name = rows[i].character_name;
	    		  char_inf.title = rows[i].title;
	    		  char_inf.base_atk = rows[i].base_atk;
	    		  char_inf.base_def = rows[i].base_def;
	    		  char_inf.base_max_hp = rows[i].base_max_hp;
	    		  char_inf.level = rows[i].level;
	    		  char_inf.mark = rows[i].mark;
	    		  char_inf.src = rows[i].src;
	    		  
	    		  char_list.push(char_inf);
	          }
	        callback(char_list);
	      }
	  });
	}
	catch(ex){
	  console.log("EXCEPTION : " + ex);
	}
};

//***************************
//get deck num
//***************************
exports.get_deck_num = function(user_id, db_conn ,callback){
       
	var query = "select deck.num from "
				+ " deck inner join user on user.num = deck.user_num  " 
				+ " where (user.id = '" + user_id + "' )";     
	
	var main_num;
	var others_num;
	
	try {
	  db_conn.query(query, function(err, rows, fields){
	      if (err){
	          console.log("ERROR : " + err);
	      }
	      else{    
	    	  main_num = rows[0].num
	    	  others_num = rows[1].num
	    	  
	    	  console.log(main_num);
	    	  console.log(others_num);
	    	  
	    	  callback(main_num, others_num);
	      }
	  });
	}
	catch(ex){
	  console.log("EXCEPTION : " + ex);
	}
};

//***************************
// delete deck_items
//***************************
exports.delete_deck_items = function(main_num, others_num, db_conn ,callback){
     
	var query = "delete from deck_item"
				+ " where deck_num = " 
				+  main_num  
				+ " or  "
				+ " deck_num =  "
				+ others_num;     
	console.log(query);
	
	try {
	  db_conn.query(query, function(err, rows, fields){
	      if (err){
	          console.log("ERROR : " + err);
	      }
	      else{    
	    	  callback();
	      }
	  });
	}
	catch(ex){
	  console.log("EXCEPTION : " + ex);
	}
};

//***************************
// update deck character
//***************************
exports.update_deck_char = function(main_num, char_num, db_conn ,callback){
  
	var query = "update deck set character_num = "
				+ char_num
				+ " where num = "
				+ main_num;
	
	console.log(query);
	
	try {
	  db_conn.query(query, function(err, rows, fields){
	      if (err){
	          console.log("ERROR : " + err);
	      }
	      else{    
	    	  callback();
	      }
	  });
	}
	catch(ex){
	  console.log("EXCEPTION : " + ex);
	}
};

//***************************
// insert deck item
//***************************
exports.insert_deck_item = function(main_num, others_num, main_deck, others , db_conn ,callback){
  
	var query = "insert into deck_item (num,deck_num, card_num) values ? ON DUPLICATE KEY UPDATE deck_num = values(deck_num) , card_num = values(card_num)";

	var values = [];
	var index = 0
	for( var i = 0 ; i < main_deck.deck_list.length ; i++,index++){
		values[index] = [ main_deck.deck_list[i].deck_item_num, main_num , main_deck.deck_list[i].num];
	}
	for(var j = 0 ; j < others.length ; j++,index++){
		values[index] = [others[j].deck_item_num ,others_num , others[j].num];
	}
	
	try {
	  db_conn.query(query,[values],function(err, rows, fields){
	      if (err){
	          console.log("ERROR : " + err);
	      }
	      else{    
	    	  callback(main_deck, others);
	      }
	  });
	}
	catch(ex){
	  console.log("EXCEPTION : " + ex);
	}
};

//***************************
// update battle res
//***************************
exports.update_battle_res = function(user, db_conn ,callback){
	  
	var query = "update user set exp = ?, money = ?, win_num = ?, lose_num = ? where id = ?";
	var values = [user.exp, user.money, user.win_num, user.lose_num, user.id];
	
	try {
	db_conn.query(query, values ,function(err, rows, fields){
	  if (err){
	      console.log("ERROR : " + err);
	  }
	  else{    
		  callback();
	  }
	});
	}
	catch(ex){
	console.log("EXCEPTION : " + ex);
	}
};

//***************************
// get field list
//***************************
exports.get_field_list = function(lv, db_conn ,callback){
	var query = "SELECT * FROM field " ;
	var list = [];
	try {
		db_conn.query(query ,function(err, rows, fields){
		  if (err){
		      console.log("ERROR : " + err);
		  }
		  else{    
			  //set result
			  for(var i = 0 ; i < rows.length ; i++){
				  var item = config.newFieldInf();
				  item.num = rows[i].num;
				  item.name = rows[i].name;
				  item.lv = rows[i].lv;
				  item.pos_x = rows[i].pos_x;
				  item.pos_y = rows[i].pos_y;
				  item.img_src = rows[i].img_src;
				  item.background_src = "background_"+rows[i].img_src;
				  item.floor = rows[i].floor;
				  if(lv < item.lv)
					  item.explorable = false;
				  else
					  item.explorable = true;
				  
				  list.push(item);
			  }
			  
			  callback(list);
		  }
		});
	}
	catch(ex){
		console.log("EXCEPTION : " + ex);
	}
}

//***************************
//get field inf
//***************************
exports.get_field_inf = function(field_num, db_conn ,callback){
	var query = "SELECT * FROM field where num = " + field_num ;

	try {
		db_conn.query(query ,function(err, rows, fields){
		  if (err){
		      console.log("ERROR : " + err);
		  }
		  else{    
			var item = config.newFieldInf();
			item.num = rows[0].num;
			item.name = rows[0].name;
			item.lv = rows[0].lv;
			item.pos_x = rows[0].pos_x;
			item.pos_y = rows[0].pos_y;
			item.img_src = rows[0].img_src;
			item.background_src = "background_"+rows[0].img_src;
			item.floor = rows[0].floor;
			  
			  
			  callback(item);
		  }
		});
	}
	catch(ex){
		console.log("EXCEPTION : " + ex);
	}
}

//********************************
// get material list by field_num
//********************************
exports.get_material_list = function(field_num, db_conn ,callback){
	var query = "select * from material where field_num = " + field_num;
	var list = [];
	try {
		db_conn.query(query ,function(err, rows, fields){
		  if (err){
		      console.log("ERROR : " + err);
		  }
		  else{    
			  //set result
			  for(var i = 0 ; i < rows.length ; i++){
				  var item = config.newMaterialInf();
				  item.num = rows[i].num;
				  item.name = rows[i].name;
				  item.img_src = rows[i].img_src;
				  item.prob = rows[i].prob;
				  item.gold = rows[i].gold;
				  item.content = rows[i].content;
				  
				  list.push(item);
			  }
			  
			  callback(list);
		  }
		});
	}
	catch(ex){
		console.log("EXCEPTION : " + ex);
	}
}

//********************************
//get monster list by field_num
//********************************
exports.get_monster_list = function(field_num, db_conn ,callback){
	var query = "select monster.*, monster_material.material_num,material.name as material_name, " + 
				"material.img_src as material_img_src, material.content as material_content from " +
				" (monster_material inner join material on monster_material.material_num = material.num) " +
				" inner join monster on monster.num = monster_material.monster_num " +
				" where monster.field_num = " + field_num ;
	
	var list = [];
	try {
		db_conn.query(query ,function(err, rows, fields){
		  if (err){
		      console.log("ERROR : " + err);
		  }
		  else{    
			  //set result
			  var num = null;
			  var item = config.newMonsterInf();
			  
			  for(var i = 0 ; i < rows.length ; i++){
				  
				  if(rows[i].num != num){
					  item = config.newMonsterInf();
					  item.material_list = [];
					  
						item.num = rows[i].num;
						item.name = rows[i].name;
						item.hp = rows[i].hp;
						item.power =  rows[i].power;
						item.damaged_hp = 0;
						item.def =  rows[i].def;
						item.atk = rows[i].atk;
						item.gold = rows[i].gold;
						item.field_num = rows[i].field_num;
						item.img_src = rows[i].img_src;
						item.r_heal = rows[i].roulette_heal;
						item.r_attack = rows[i].roulette_attack;
						item.r_defense = rows[i].roulette_defense;
						item.r_critical = rows[i].roulette_critical;
						item.r_more = rows[i].roulette_more;
						item.r_evolve = rows[i].roulette_evolve;
						
						num = rows[i].num;
						list.push(item);
				  }
				  
					var material_inf = config.newMaterialInf();
						  
					material_inf.num = rows[i].material_num;
					material_inf.name = rows[i].material_name;
					material_inf.img_src = rows[i].material_img_src;
					material_inf.content = rows[i].material_content;
						  
					item.material_list.push(material_inf);
			  }
			  //console.log("====================list is");
			  //console.log(list);
			  callback(list);
		  }
		});
	}
	catch(ex){
		console.log("EXCEPTION : " + ex);
	}
}

//***************************
// update gold
//***************************
exports.update_user_gold = function(user_num, gold, db_conn ,callback){
	  
	var query = "update user set money = money + "+ gold + " where num = " + user_num;
	
	try {
	db_conn.query(query,function(err, rows, fields){
	  if (err){
	      console.log("ERROR : " + err);
	  }
	  else{    
		  callback();
	  }
	});
	}
	catch(ex){
	console.log("EXCEPTION : " + ex);
	}
};

//***************************
// insert material card
//***************************
exports.insert_deck_item = function(material_num, user_num , db_conn ,callback){

	var query = "insert into user_material (user_num, material_num) values ( " + user_num + "," + material_num + ")";
	
	try {
	  db_conn.query(query,function(err, rows, fields){
	      if (err){
	          console.log("ERROR : " + err);
	      }
	      else{    
	    	  callback();
	      }
	  });
	}
	catch(ex){
	  console.log("EXCEPTION : " + ex);
	}
};

//***************************
//update explore res
//***************************
exports.update_explore_res = function(user_id, money, exp, db_conn ,callback){
	  
	var query = "update user set exp = ?, money = ? where id = ?";
	var values = [exp, money,user_id];
	try {
	db_conn.query(query, values ,function(err, rows, fields){
	  if (err){
	      console.log("ERROR : " + err);
	  }
	  else{    
		  callback();
	  }
	});
	}
	catch(ex){
	console.log("EXCEPTION : " + ex);
	}
};











