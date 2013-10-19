var config = require("./config");
var app = require("./app");
var db_module = require("./db_modules");

//**************
// main function
//**************

exports.call = function(io,socket,db_conn,received){
  
  var result = config.newResponse();
  
  //get message type
  switch( parseInt(received.MessageNum,10) ){
    /*********
    //login // 
    *********/
    case config.CLIENT_REQUEST_LOGIN :  
      console.log("main_control - login");
      var input_id;
      var input_pass;
      
      // get user's input datas
      input_id = received.user_id;
      input_pass = received.user_password;
     
      db_module.login(input_id,input_pass,db_conn,function(user_inf,main_deck_inf){ //do login
      
    	  if(user_inf == -1){ //login err
    		  console.log("login failed");
    		  
              result.is_login_success = 3;
              socket.emit('data',result);     
    		  return;
    	  }
    	  
        console.log("main character : " + main_deck_inf.main_character.name);
        //set result's field
        result.MessageNum = config.SERVER_RESPONSE_LOGIN;
        result.isSuccess = true;
        
        // login is success?
        if(user_inf == -1){
          result.is_login_success = 3;
        }
        else{ 
          result.is_login_success = 1;
          result.user_information =user_inf;
          result.user_information.session_id = socket.id;
          result.selected_deck = main_deck_inf;
          
          // add user information into LOGIN_USER_LIST
          app.addUserInf(user_inf);
          
          console.log(user_inf);
        }
   
        socket.emit('data',result);     
       
     });

      break;
    /**************
    // go lobby  // 
    **************/
    case config.CLIENT_REQUEST_GO_BATTLE_LOBBY :  //go battle lobby
      
      console.log("main_control - go battle lobby");
      // set result's fields
      result.MessageNum = config.SERVER_RESPONSE_GO_BATTLE_LOBBY;
      result.isSuccess = true;
      result.is_go_success = 1;
      result.room_list = app.getRoomList();
      
      console.log("room list\n");
      console.log(io.sockets.manager.rooms);
      console.log("=====================================\n ROOM_LIST")
      if(result.room_list.length < 1)
        console.log("no room");
      for(var i = 0 ; i < result.room_list.length ; i++){
        console.log(i + "th room name : " +result.room_list[i].name + " , host is : " + result.room_list[i].host_inf.id + " , client is : "+ result.room_list[i].client_inf.id);
      }
      
      //send result
      socket.emit('data',result);
      
      break;
    /**************
    // make room // 
    **************/  
    case config.CLIENT_REQUEST_MAKE_ROOM : 
      
      console.log("main_control - make room");
      
      // add room's information to ROOM_LIST
      var room_inf = config.newRoomInf();
      room_inf.name = config.randomString();
      if(received.room_password == null)
        room_inf.password = received.room_pass;
      else 
        room_inf.password = received.room_pass;
      
      // room's inf - get host's information from LOGGIN_USER_LIST
      room_inf.host_inf = app.findUserById(received.user_id);
      room_inf.client_inf = -1;
      room_inf.is_idle = true;
      room_inf.subject =  received.room_name ;
      
      //room_inf.id = config.randomString();
      //console.log(room_inf.id);
     
      app.addRoomInf(room_inf);
      
      // set result's fields
      result.MessageNum = config.SERVER_RESPONSE_MAKE_ROOM;
      result.isSuccess = true;
      result.room_inf = room_inf;
      
      //make the room(host)
      socket.join(room_inf.name);
      
      // send result to client(host)
      socket.emit('data', result);
      
      // send server reqeust to clients(others) - add room
      var addroom_res = config.newResponse();
      addroom_res.MessageNum = config.SERVER_REQUEST_ADDROOM;
      addroom_res.room_inf = room_inf;
      io.sockets.emit('data',addroom_res);
      
      break;
    /**************
    // join room // 
    **************/    
    case config.CLIENT_REQUEST_PARTICIPATE : 
      //join
      //get room's information from ROOM_LIST
      var name = received.room_name;
      console.log("attempt to join : " +  name);
      var pass = received.room_pass; 
      var room_inf = app.getRoomInf(name);
      
      result.MessageNum = config.SERVER_RESPONSE_PARTICIPATE;
      
      //check room's state  - is idle & clients num < 2?
      //                    - password match?
      if(room_inf.client_inf != -1){
        result.is_success = 2;
        result.msg = "alerady occupied";
      }
      else{
        if( room_inf.password != pass){
          result.is_success = 2;
          console.log("pass : " + pass + " , roominf.pass : " + room_inf.password );
          result.msg = "password not match";
        }
        else{
          result.is_success = 1;
        }
      }
      
      //join the client and refresh ROOM_LIST with client_inf
      if(result.is_success == 1){
        //join the client to host's room
        socket.join(room_inf.name);
        
        //change ROOM_INF
        var client_inf = app.findUserById(received.user_id);
        room_inf.client_inf = client_inf;
        room_inf.is_idle = false;
        app.changeRoomInf(room_inf.name,room_inf);
        
        //broadcast to others
        var update_room_res = config.newResponse();
        update_room_res.MessageNum = config.SERVER_REQUEST_UPDATE_ROOM_INF;
        update_room_res.room_inf = room_inf;
        
        socket.emit('data', result);
        io.sockets.emit('data',update_room_res);
        return;
      }
      
      //send result to client
      socket.emit('data', result);
      
      break;
    /**************
    // close room // 
    **************/        
    case config.CLIENT_REQUEST_CLOSE_ROOM : 
      //when user leave the room
      
      var name = received.room_name;
      var room_inf = app.getRoomInf(name);
      console.log("delete room name is " + name);
      var update_room_res = config.newResponse();
      update_room_res.MessageNum = config.SERVER_REQUEST_UPDATE_ROOM_INF;

      //if room's user num is 1 - pop room inf from ROOM_LIST
      if(io.sockets.clients(room_inf.name).length < 2){
        app.popRoomInf(name);
        update_room_res.room_inf = -1;
      }
      else{
        //if user is host - refresh room inf(change host_inf)
        if(room_inf.host_inf.id == received.user_id){
          room_inf.host_inf = room_inf.client_inf;
          room_inf.client_inf = -1;
          room_inf.is_idle = true;
          
          app.changeRoomInf(room_inf.name,room_inf);
          update_room_res.room_inf = room_inf;
        }
        else{ //else user is client - leave the room and refresh room inf
          room_inf.client_inf = -1;
          room_inf.is_idle = true;
          
          app.changeRoomInf(room_inf.name,room_inf);
          update_room_res.room_inf = room_inf;
        }
      }
      //leave room
      socket.leave(room_inf.name);
      
      //send result to client
      result.is_success = 1;
      result.room_list = app.getRoomList();
      result.MessageNum = config.SERVER_RESPONSE_CLOSE_ROOM ;
      socket.emit('data', result);
      
      //broadcast changed ROOM_LIST
      update_room_res.room_name = room_inf.name;
      io.sockets.emit('data',update_room_res);
      
      break;
    /*******************
    // go config deck // 
    *******************/         
    case config.CLIENT_REQUEST_GO_DECK_CONFIG :
    	//deck list
        db_module.all_deck(received.user_id,db_conn,function(main_deck_inf, sub_deck_inf){ //get deck inf and cards
         
        	console.log(main_deck_inf);
        	console.log(sub_deck_inf);
        	
	        result.is_success = 1;
	        result.MessageNum = config.SERVER_RESPONSE_GO_DECK_CONFIG;
	        result.main_deck = main_deck_inf;
	        result.others = sub_deck_inf.deck_list;
	    	
	        //send        
	        io.sockets.emit('data',result);
       });

    	break;
    /**************
    // card move // 
    **************/      	
    case config.CLIENT_REQUEST_DECK_CARD_MOVE_CHECK :
    	// get data
    	var main_deck = received.deck_inf.deck_list;
    	var others = received.others;
    	var index = received.index;
    	
    	console.log(others);
    	console.log(main_deck);
    	
    	//set result data
    	var res = true;
    	var msg = "";
        result.MessageNum = config.SERVER_RESPONSE_DECK_CARD_MOVE_CHECK;

    	// check
    	if(received.move_to_main == true){
    		//	no more than 3
    		var count = 0;
    		for(var i = 0 ; i < main_deck.length ; i++){
    			if(main_deck[i].num == others[index].num)
    				count++;
    		}
    		if(count > 3){
    			res = false;
    			msg = "The same card can not put more than 3.";
    			
    	        result.is_success = res;
    	        result.msg = msg;
    	        io.sockets.emit('data',result);
    			return;
    		}
    		
    		//	if card type is 1 : character match
    		if(others[index].type == 1){
    			var main_char = received.deck_inf.main_character;
    			var card = others[index];
    			console.log("char --------------");
    			console.log(main_char);
    			if(check_char(card.num, main_char.num) == false){
    				res = false;
    				msg = "The evolution card can not be assigned in dismatching character's deck.";
        	       
    				result.is_success = res;
        	        result.msg = msg;
        	        io.sockets.emit('data',result);  				
    				return;
    			}
    		}
    		
    		//	total length is 30	
    		if(main_deck.length > 28){
    			res = false;
    			msg = "The total number of cards in the main deck can not be more than 30.";
    	       
    			result.is_success = res;
    	        result.msg = msg;
    	        io.sockets.emit('data',result);			
    			return;
    		}
    		
    		//pop from others
    		var card = others[index];
    		others.splice(index,1);
    		//push to main deck
    		main_deck.push(card);
    		//send
            result.is_success = res;
            var deck = received.deck_inf;
            deck.deck_list = main_deck;
            result.deck_inf = deck;
            result.others = others;
            
            io.sockets.emit('data',result);	
    	}
    	else{
    		//pop from main deck
    		var card = main_deck[index];
    		main_deck.splice(index,1);
    		//push to others
    		others.push(card);
    		
    		//send
            result.is_success = res;
            var deck = received.deck_inf;
            deck.deck_list = main_deck;
            result.deck_inf = deck;
            result.others = others;
            
            io.sockets.emit('data',result);	
    	}

    	break;
    /******************
    // character list // 
    ******************/
    case config.CLIENT_REQUEST_AVAILABLE_CHARACTER :
    	//character list
    	 db_module.available_characters(received.user_id,db_conn,function(list){ //get deck inf and cards
             
    	        result.is_success = 1;
    	        result.MessageNum = config.SERVER_RESPONSE_AVAILABLE_CHARACTER;
    	        result.char_list = list;
    	    	
    	        //send result   
    	        io.sockets.emit('data',result);
    	});
    	
    	break;
    /**********************
    // character changed // 
    **********************/      	
    case config.CLIENT_REQUEST_CHARACTER_CHANGE :
    	// get input data
    	var char_num = received.character_num;
    	var main_deck = received.main_deck;
    	var others = received.others;
    	
    	// change deck's character inf
	   	 db_module.available_characters(received.user_id,db_conn,function(list){ //get deck inf and cards
	         
		        result.is_success = 1;
		        result.MessageNum = config.SERVER_RESPONSE_CHARACTER_CHANGE;

		        var char_inf = null;
		        for(var i = 0 ; i < list.length ; i++){
		        	if(list[i].num == char_num){
		        		char_inf = config.newCharacterInf();
		        		
		      		  	char_inf.num = list[i].num;
		      		  	char_inf.name = list[i].character_name;
		      		  	char_inf.title = list[i].title;
		      		  	char_inf.base_atk = list[i].base_atk;
		      		  	char_inf.base_def = list[i].base_def;
		      		  	char_inf.base_max_hp = list[i].base_max_hp;
		      		  	char_inf.level = list[i].level;
		      		  	char_inf.mark = list[i].mark;
		      		  	char_inf.src = list[i].src;
		        		break;
		        	}
		        }
		        
		        main_deck.main_character = char_inf;
		        
		        // move all main deck's cards to others
		        for(var i = 0 ; i < main_deck.deck_list.length ; i++){
		        	others.push(main_deck.deck_list[i]);
		        	
		        }
		        main_deck.deck_list = [];
		        result.main_deck = main_deck;
		        result.others = others;
		        
		        //send result   
		        io.sockets.emit('data',result);
		});
    	
    	
    	// send result
    	break;
   /************************
   // adjust changed deck // 
   ************************/     	
    case config.CLIENT_REQUEST_DECK_CHANGE : 
    	//get data
    	var main_deck = received.main_deck;
    	var others = received.others;
    	//check
    	//	if length is not 30 - err msg
    	if(main_deck.deck_list.length != 29){
    		result.MessageNum = config.SERVER_RESPONSE_DECK_CARD_MOVE_CHECK;
			msg = "The total number of main deck's card must be 29.";
	       
			result.is_success = false;
	        result.msg = msg;
	        io.sockets.emit('data',result);  	
	        
	        return;
    	}
    	
    	//db management
    	//	get deck_num
	   	 db_module.get_deck_num(received.user_id ,db_conn, function(main_num, others_num){ 
	   		 //	delete
//	   		 db_module.delete_deck_items(main_num,others_num,db_conn,function(){
	   			 //update main deck's character
	   			  db_module.update_deck_char(main_num , main_deck.main_character.num ,db_conn,function(){
			   			//	insert	 
			   			db_module.insert_deck_item(main_num,others_num, main_deck,others,db_conn ,function(main_deck, others){ 
			    	        result.is_success = 1;
			    	        result.MessageNum = config.SERVER_RESPONSE_DECK_CHANGE;
			    	        result.msg = "The main deck changed successfully.";
			    	        result.main_deck = main_deck;
			    	        result.others = others;
			    	    	
			    	        //send result   
			    	        io.sockets.emit('data',result);
			   			});
	   			 });
//	   		 });
		});  	
    	
    	break;
   /************************
   // go to world map		// 
   ************************/       	
    case config.CLIENT_REQUEST_GO_WORLD_MAP :
    	//console.log(app.findUserById(received.id));
    	var exp = app.findUserById(received.id).exp;
    	//calculate user's level
    	var lv = config.calculate_lv(exp);
    	//get explorable field list from db
    	
    	db_module.get_field_list(lv,db_conn, function(list){ 
    		result.is_success = 1;
	        result.MessageNum = config.SERVER_RESULT_GO_WORLD_MAP;
	        result.list = list;
	        
	        console.log(list);
	        
	        //send result   
	        io.sockets.emit('data',result);
    	});
    	
    	break;
    	
    	
  }

};

//////////////////////////////////////////////////////
function check_char(card_num, character_num){
	var res = false;
	
	switch (character_num) {
	case 1:
		if(card_num == 1)
			res = true;
		break;
	case 2:
		if(card_num == 14)
			res = true;
		break;
	case 3:
		if(card_num == 20)
			res = true;
		break;
	case 4:
		if(card_num == 24)
			res = true;
		break;
	}
	
	return res;
}