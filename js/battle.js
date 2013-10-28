var my_battle_inf;
var is_first;

var selected_hand_index; //selected hand card's index
var selected_is_first; //if selected card is first's card - true
var selected_target; //selected card

var skill_used;

//hand list for draw
var first_hand_list;
var second_hand_list;

//equip list for draw
var first_equip_list;
var second_equip_list;

var CARD_INTERVAL = 10;
var CARD_WIDTH = 71;
function server_response_startbattle(data) {
    
    if( data.isSuccess == 1 ){
        my_battle_inf = data.battle_inf;
        is_first = data.is_first;
        console.log("is first : "+is_first);
        init_battle();
    }
}

function init_battle() {
    //battle started successfully.
    first_hand_page = 0;
    second_hand_page = 0;
    
    first_equip_page = 0;
    second_equip_page = 0;
    
    selected_hand = -1;
    
    skill_used = false;
    
    $("#battle #card_big").css('visibility', 'hidden');
    $("#battle #card_big_cancel").css('visibility', 'hidden');
    
    //set hands
	first_hand_list = $("#battle #first_hand_list");
	second_hand_list = $("#battle #second_hand_list");
    
    first_equip_list = $("#battle #first_equip_list");
	second_equip_list = $("#battle #second_equip_list");
		 
    //character lv,name and title
   	$("#battle #second_character_lv").text("Lv." + my_battle_inf.second_character.level);
   	$("#battle #first_character_lv").text("Lv." + my_battle_inf.first_character.level);
   	$("#battle #second_character_name").text("" + my_battle_inf.second_character.name);
   	$("#battle #first_character_name").text("" + my_battle_inf.first_character.name);
   	$("#battle #second_character_title").text("" + my_battle_inf.second_character.title);
   	$("#battle #first_character_title").text("" + my_battle_inf.first_character.title);
   	
   	//character img
   	$("#battle #second_character").css('background-image', 'url('+  "images/character/"+my_battle_inf.second_character.src+"_bust.png"  +')'  ) ; 
   	$("#battle #first_character").css('background-image', 'url('+  "images/character/"+my_battle_inf.first_character.src+"_bust.png"  +')'  ) ; 
    
    //hp,atk,def,id
    $("#battle #second_atk").text("" + (parseInt(my_battle_inf.second_character.base_atk) + parseInt(my_battle_inf.second_atk)) );
    $("#battle #second_def").text("" + (parseInt(my_battle_inf.second_character.base_def) + parseInt(my_battle_inf.second_def)) );
    $("#battle #first_atk").text("" + (parseInt(my_battle_inf.first_character.base_atk) + parseInt(my_battle_inf.first_atk)) );
    $("#battle #first_def").text("" + (parseInt(my_battle_inf.first_character.base_def) + parseInt(my_battle_inf.first_def)) );   	
    $("#battle #first_id").text("" + my_battle_inf.first.id);
	$("#battle #second_id").text("" + my_battle_inf.second.id);
	var my_max = (parseInt(my_battle_inf.second_character.base_max_hp) + parseInt(my_battle_inf.second_max_hp)) ;
	var opp_max = (parseInt(my_battle_inf.first_character.base_max_hp) + parseInt(my_battle_inf.first_max_hp)) ;
	$("#battle #second_remain_hp").text(my_max + "/" + my_max);
	$("#battle #first_remain_hp").text(opp_max + "/"+ opp_max);
	
    //first? second? - dialog
    if(is_first == false){
    	 $("#battle #turn_end_btn").css('visibility', 'hidden');
    }
    	 
    //hand setting
	for(var i = 0 ; i < my_battle_inf.first_hand_list.length ; i++){
		attach_hand_card_to_list(my_battle_inf.first_hand_list[i].img_src,i,true,i*300);
	}
	
	for(var i = 0 ; i < my_battle_inf.second_hand_list.length ; i++){
		attach_hand_card_to_list(my_battle_inf.second_hand_list[i].img_src,i,false,i*300);
	}
    
    console.log('battle started!!');
    console.log('my_battle_inf : ', my_battle_inf);
    
    hide_all();
    $("#battle").show();
    
}

//*****************************
//	CLINET REQUEST FUNCTIONS
//*****************************
//send msg 203 to server
function use_hand_card(){
	
	var deck_id_num;
	
	if(selected_hand_index == -1)
		return;

	if(is_first != selected_is_first)
		return;
		
	if(is_first)
		deck_id_num = my_battle_inf.first_hand_list[selected_hand_index].deck_id_num;
	else
		deck_id_num = my_battle_inf.second_hand_list[selected_hand_index].deck_id_num;
	
	var req = new request();
	req.MessageNum = 203;
	//set hand_index
	req.hand_index = selected_hand_index;
	req.deck_id_num = deck_id_num;
	//set battle_inf_id
	req.battle_inf_id = my_battle_inf.id;
	//send to server
	sock_send_request(req);
}

//send msg 209
function client_request_turn_end(){
	console.log("request turn end");
	var req = new request();
	if(skill_used == true){
		req.skill_used = true;
	}
	else{
		req.skill_used = false;
	}
	req.MessageNum = 209;
	req.battle_inf_id = my_battle_inf.id;
	//send to server
	sock_send_request(req);	
	skill_used = false;
}

//*****************************
//	SERVER RESPONSE FUNCTIONS
//*****************************

//response of card_use
function server_response_card_used(){
	$("#battle #card_big_cancel").fadeOut("slow",function(){
		$("#battle #card_big_cancel").css('visibility','hidden');	
		$("#battle #card_big_cancel").show();
	});
	$("#battle #card_big").fadeOut("slow",function(){
		$("#battle #card_big").css('visibility','hidden');
		$("#battle #card_big").show();
	});
	
	$(selected_target).delay(500);
	$(selected_target).fadeOut("slow",function(){
		$(selected_target).css('visibility', 'hidden');
		$(selected_target).show();
	});
	
	//reset selected index to none
	selected_hand = -1;	
}

function server_response_attack(is_first,damaged_hp){
	var ratio = 1.0;
	var max_hp;

	if(is_first == true){
		max_hp = my_battle_inf.first_character.base_max_hp + my_battle_inf.first_max_hp;
		ratio = ( (max_hp-damaged_hp)/max_hp );
		$("#battle #first_hp_in").css('width', ""+(335*ratio));
		$("#battle #first_remain_hp ").text(max_hp + "/" + (max_hp-damaged_hp));
	}
	else{
		max_hp = my_battle_inf.second_character.base_max_hp + my_battle_inf.second_max_hp;
		ratio = ( (max_hp-damaged_hp)/max_hp );
		$("#battle #second_hp_in").css('width', ""+(335*ratio));
		$("#battle #second_remain_hp ").text(max_hp + "/" + (max_hp-damaged_hp));		
	}
}

function server_request_field_change(list){
	//get changed data
	for(var i = 0 ; i < list.length ; i++){	
     //adjust
     switch(list[i].field_num){
        case 1: //turn num
        	my_battle_inf.turn_num = list[i].value;
        	$("#battle #turn_num").text(""+list[i].value);	
        	
        	if(list[i].value%2 == 1){ //first user'turn
				if(is_first == true)
        			$("#battle #turn_end_btn").css('visibility', 'visible');
        		else
        			$("#battle #turn_end_btn").css('visibility', 'hidden');
        	}
        	else{ //second user's turn
				if(is_first == false)
        			$("#battle #turn_end_btn").css('visibility', 'visible');
        		else
        			$("#battle #turn_end_btn").css('visibility', 'hidden');
        	}
        	
        	break;
        case 4: //first character
        	//name + title
        	my_battle_inf.first_character = list[i].value;
        	$("#battle #first_character_title").text(""+list[i].value.title);		
        	//base atk
        	$("#battle #first_atk").text("" + (list[i].value.base_atk + my_battle_inf.first_atk + my_battle_inf.first_special_card_effect.first_atk));			
        	//base def
        	$("#battle #first_def").text("" + (list[i].value.base_def + my_battle_inf.first_def + my_battle_inf.first_special_card_effect.first_def));		
        	//base max hp
        	var max_hp = list[i].value.base_max_hp + my_battle_inf.first_max_hp ;
        	$("#battle #first_remain_hp").text( max_hp + "/" + (max_hp - my_battle_inf.first_damaged_hp));				
        	//level
        	$("#battle #first_character_lv").text("Lv."+list[i].value.level);		
        	break;
        	
        case 5:	//first max hp
        	my_battle_inf.first_max_hp = list[i].value ;
        	var max_hp = my_battle_inf.first_character.base_max_hp + list[i].value ;
        	$("#battle #first_remain_hp").text( max_hp + "/" + (max_hp - my_battle_inf.first_damaged_hp));				
        	break;
        case 6: //first atk
        	my_battle_inf.first_atk = list[i].value;
        	$("#battle #first_atk").text("" + (list[i].value + my_battle_inf.first_character.base_atk + my_battle_inf.first_special_card_effect.first_atk));			
        	break;
        case 7: //first def
        	my_battle_inf.first_def = list[i].value;
        	$("#battle #first_def").text("" + (list[i].value + my_battle_inf.first_character.base_def + my_battle_inf.first_special_card_effect.first_def));			
        	break;
        case 8: //first damaged hp
        	my_battle_inf.first_damaged_hp = list[i].value;
        	var max_hp = my_battle_inf.first_character.base_max_hp + my_battle_inf.first_max_hp;	

			var ratio = ( (max_hp-list[i].value)/max_hp );
			$("#battle #first_hp_in").css('width', ""+(335*ratio));
			$("#battle #first_remain_hp ").text( max_hp + "/" + (max_hp-list[i].value));
        	
        	break;
        case 9: //first equiped list

        	break;
        case 10: //first hand list

        	break;
        case 13: //first skill
        	my_battle_inf.first_skill = list[i].value;
        	$("#battle #first_skill").css('visibility', 'visible');
        	attach_skill_weapon_card("#battle #first_skill",list[i].value.img_src);		
        	break;
        case 14: //first skill cooltime
        	my_battle_inf.first_skill_cooltime = list[i].value;
        	$("#battle #first_skill_cooltime").text(list[i].value);	
        	break;
        case 15: //fist weapon
        	my_battle_inf.first_weapon = list[i].value;
        	$("#battle #first_weapon").css('visibility', 'visible');
        	attach_skill_weapon_card("#battle #first_weapon",list[i].value.img_src);			
        	break;
        case 16: //first burn
        			
        	break;
        case 17: //first frozen
        			
        	break;
        case 18: //first poison
        			
        	break;
        case 19: //first paralysis
        			
        	break;
        case 20: //first dark
        			
        	break;
        case 21: //first blocked damage sending
        	break;
        case 22: //first skill blocked
        	break;
        case 25: //first immune burn
        	
        	break;
        case 26: //first immune frozen
        			
        	break;
        case 27: // first immune poison
        		
        	break;
        case 28: //first immune paralysis
        			
        	break;
        case 29: //first immune dark
        		
        	break;
        case 30: //first reflect damage turn
        	break;
        case 31: //first reflect damage percent
        	break;
        case 33: //second character
        	//name + title
        	my_battle_inf.second_character = list[i].value;
        	$("#battle #second_character_title").text(""+list[i].value.title);		
        	//base atk
        	$("#battle #second_atk").text("" + (list[i].value.base_atk + my_battle_inf.second_atk + my_battle_inf.second_special_card_effect.second_atk));			
        	//base def
        	$("#battle #second_def").text("" + (list[i].value.base_def + my_battle_inf.second_def + my_battle_inf.second_special_card_effect.second_def));		
        	//base max hp
        	var max_hp = list[i].value.base_max_hp + my_battle_inf.second_max_hp ;
        	$("#battle #second_remain_hp").text( max_hp + "/" + (max_hp - my_battle_inf.second_damaged_hp));				
        	//level
        	$("#battle #second_character_lv").text("Lv."+list[i].value.level);		
        	break;
        case 34: //second max hp
        	my_battle_inf.second_max_hp = list[i].value ;
        	var max_hp = my_battle_inf.second_character.base_max_hp + list[i].value ;
        	$("#battle #second_remain_hp").text( max_hp + "/" + (max_hp - my_battle_inf.second_damaged_hp));				
        	break;
        case 35: //second atk
        	my_battle_inf.second_atk = list[i].value;
        	$("#battle #second_atk").text("" + (list[i].value + my_battle_inf.second_character.base_atk + my_battle_inf.second_special_card_effect.second_atk));			
        	break;
        case 36: //second def
        	my_battle_inf.second_def = list[i].value;
        	$("#battle #second_def").text("" + (list[i].value + my_battle_inf.second_character.base_def + my_battle_inf.second_special_card_effect.first_def));		
        	break;
        case 37: //second damaged hp
        	my_battle_inf.second_damaged_hp = list[i].value;
        	var max_hp = my_battle_inf.second_character.base_max_hp + my_battle_inf.second_max_hp;	

			var ratio = ( (max_hp-list[i].value)/max_hp );
			$("#battle #second_hp_in").css('width', ""+(335*ratio));
			$("#battle #second_remain_hp ").text( max_hp + "/" + (max_hp-list[i].value));			
        	break;
        case 38: //second equip list

        	break;
        case 39: //second hand list

        	
        	break;
        case 42: //second skill
        	my_battle_inf.second_skill = list[i].value;
        	$("#battle #second_skill").css('visibility', 'visible');
        	attach_skill_weapon_card("#battle #second_skill",list[i].value.img_src);			
        	break;
        case 43: //second skill cooltime
        	my_battle_inf.second_skill_cooltime = list[i].value;
        	$("#battle #second_skill_cooltime").text(list[i].value);	
        	break;
        case 44: //second weapon
        	my_battle_inf.second_weapon = list[i].value;
        	$("#battle #second_weapon").css('visibility', 'visible');
        	attach_skill_weapon_card("#battle #second_weapon",list[i].value.img_src);					
        	break;
        case 45: //second burn
        			
        	break;
        case 46: //second frozen
        		
        	break;
        case 47: //second poison
        			
        	break;
        case 48: //second paralisys
        			
        	break;
        case 49: //second dark
        			
        	break;
        case 50: //second block send damage turn
        	break;
        case 51: //second second skill blocked turn
        	break;
        case 52: // second weapon blocked turn
        	break;
        case 53: //second equip blocked turn
        	break;
        case 54: // second immune burn
        			
        	break;
        case 55: //second immune frozen
        			
        	break;
        case 56: //second immune poison
        		
        	break;
        case 57: //second immune paralisys
        		
        	break;
        case 58: //second immune dark
        			
        	break;
        case 59: //second reflect damage turn
        	break;
        case 60: //second reflect damage percent
        	break;
        case 61: //special inf - first
        //atk
        //def
        //atk2
        //def2
         			
        	break;
        case 62://special inf - second

             			
        			
        			
        	break;
        }//end of switch
       }//end of for	
}
function server_request_attached(list,where,index,is_first){
	if(is_first == true){
		switch(where){
			case 1: //weapon
				my_battle_inf.first_weapon = list[0];
				detach_skill_weapon_card("#battle #first_weapon");
				$("#battle #first_weapon").delay(1000);
				attach_skill_weapon_card("#battle #first_weapon",list[0].img_src);
				break;
			case 2: //skill
				my_battle_inf.first_skill = list[0];
				detach_skill_weapon_card("#battle #first_skill");
				$("#battle #first_skill").delay(1000);
				attach_skill_weapon_card("#battle #first_skill",list[0].img_src);				
				break;
			case 3: //equip

				break;
			case 4: //hand
				console.log("hand attached : " + list[index].img_src);
				attach_hand_card_to_list(list[index].img_src,index,true,0);
				my_battle_inf.first_hand_list = list;
				break;
		}
	}
	else{
		switch(where){
			case 1: //weapon
				my_battle_inf.second_weapon = list[0];
				detach_skill_weapon_card("#battle #second_weapon");
				$("#battle #second_weapon").delay(1000);
				attach_skill_weapon_card("#battle #second_weapon",list[0].img_src);
				break;
			case 2: //skill
				my_battle_inf.second_skill = list[0];
				detach_skill_weapon_card("#battle #second_skill");
				$("#battle #second_skill").delay(1000);
				attach_skill_weapon_card("#battle #second_skill",list[0].img_src);				
				break;
			case 3: //equip

				break;
			case 4: //hand
				console.log("hand attached : " + list[index].img_src);
				attach_hand_card_to_list(list[index].img_src,index,false,0);
				my_battle_inf.second_hand_list = list;
				break;
		}
		
	}
}
function server_request_equip_detached(where,deck_id_num,is_first){
	
	var index = -1;
	
	if(is_first == true){ //first user
		//find index
		
		switch(where){
			case 1: //weapon
				my_battle_inf.first_weapon = null;
				detach_card("#battle #first_weapon");
				$("#battle #first_weapon").css('background-image', 'url('+  "images/battle/no_weapon"  +')'  ) ; 
				break;
			case 2: //skill
				my_battle_inf.first_skill = null;
				detach_card("#battle #first_skill");
				$("#battle #first_skill").css('background-image', 'url('+  "images/battle/no_skill"  +')'  ) ; 
				break;
			case 3: //equip

				
				break;
			case 4: //hand
				for(var i = 0 ; i < my_battle_inf.first_hand_list.length ; i++){
					if(my_battle_inf.first_hand_list[i].deck_id_num == deck_id_num){
						index = i;
						break;
					}
				}
				if(index == -1){
					console.log("no index for detach");
				}
				console.log("detach index is : " + index);
				detach_hand_card_from_list(true,index);
				break;
		}
	}
	else{ //second user
		switch(where){
			case 1: //weapon
				my_battle_inf.second_weapon = null;
				detach_card("#battle #second_weapon");
				$("#battle #second_weapon").css('background-image', 'url('+  "images/battle/no_weapon"  +')'  ) ; 
				break;
			case 2: //skill
				my_battle_inf.second_skill = null;
				detach_card("#battle #second_skill");
				$("#battle #second_skill").css('background-image', 'url('+  "images/battle/no_skill"  +')'  ) ; 
				break;
			case 3: //equip

				
				break;
			case 4: //hand
				for(var i = 0 ; i < my_battle_inf.second_hand_list.length ; i++){
					if(my_battle_inf.second_hand_list[i].deck_id_num == deck_id_num){
						index = i;
						break;
					}
				}
				if(index == -1){
					console.log("no index for detach");
				}
				detach_hand_card_from_list(false,index);
				break;
		}	
	}
}

//*****************************
//	CLIENT DISPLAY FUNCTIONS
//*****************************

//attach card to list
function attach_hand_card_to_list(src,idx,is_first,delay_time){
	if(src == "back")
		src = "card_back.png";
	
	var card = $("<div id='card'></div>");
	card.css('opacity','0.0');
	
	card.css('left',(idx*CARD_WIDTH)+((idx+1)*CARD_INTERVAL)+"px");
		
	card.css('background-image', 'url('+  "images/cards/"+src  +')'  ) ;
	
	card.click(function(){ //add handler
		show_card_big(src,idx,is_first,card);
	});
	
	if(is_first == true){
		first_hand_list.append(card);
	}
	else{
		second_hand_list.append(card);
	}
	
	card.delay(delay_time);	
	card.animate({
		opacity: '+=1.0'
	}, 1200);
}

function attach_skill_weapon_card(target,src){
	$(target).css('opacity','0.0');
	$(target).css('visibility','visible');
	$(target).css('background-image', 'url('+  "images/cards/"+src  +')'  ) ;
	
	$(target).animate({
		opacity: '+=1.0'
	}, 1200);
}

function detach_hand_card_from_list(is_first,index){
	if(is_first == true){
		my_battle_inf.first_hand_list[index] = null;

		$($("#battle #first_hand_list #card")[index]).animate({
			opacity: '0.0'
		}, 1200, function(){ //after card detach animation
			//detach index from list
			$($("#battle #first_hand_list #card")[index]).remove(); //remove index
			my_battle_inf.first_hand_list.splice(index,1); //reflect change to my_battle_inf's list
			//line up rears
			for(var i = my_battle_inf.first_hand_list.length - 1 ; i >= index ; i--){
				//console.log("rear : " + i + " - " + $($("#battle #first_hand_list #card")[i]).css('background-image'));
				$($("#battle #first_hand_list #card")[i]).remove();
				
			}
			for(var i = index ; i < my_battle_inf.first_hand_list.length ; i++){
				attach_hand_card_to_list(my_battle_inf.first_hand_list[i].img_src,i,true,0);
			}
		});
	}
	else{
		my_battle_inf.second_hand_list[index] = null;
		console.log("second detach : " + index);

		$($("#battle #second_hand_list #card")[index]).animate({
			opacity: '0.0'
		}, 1200, function(){ //after card detach animation
			//detach index from list
			$($("#battle #second_hand_list #card")[index]).remove(); //remove index
			my_battle_inf.second_hand_list.splice(index,1); //reflect change to my_battle_inf's list
			//line up rears
			for(var i = my_battle_inf.second_hand_list.length - 1 ; i >= index ; i--){
				//console.log("rear : " + i + " - " + $($("#battle #first_hand_list #card")[i]).css('background-image'));
				$($("#battle #second_hand_list #card")[i]).remove();
				//attach_hand_card_to_list(my_battle_inf.second_hand_list[i].img_src,i,false,0);
			}
			for(var i = index ; i < my_battle_inf.second_hand_list.length ; i++){
				attach_hand_card_to_list(my_battle_inf.second_hand_list[i].img_src,i,false,0);
			}
		});
	}
}

function detach_skill_weapon_card(target){
	$(target).animate({
		opacity: '-=0.0'
	}, 1200,function(){
		$(target).css('visibility','hidden');
	});	
}
//show card big
function show_card_big(src,idx,is_first,target){
	selected_hand_index = idx;
	selected_is_first = is_first;
	selected_target = target;
	$("#battle #card_big ").css('visibility', 'visible');
	$("#battle #card_big_cancel").css('visibility', 'visible');
	
	$("#battle #card_big ").css('background-image', 'url('+  "images/cards/"+src  +')'  ) ;
}
//close stratched card
function close_card_inf(){
	$("#battle #card_big ").css('visibility', 'hidden');
	$("#battle #card_big_cancel").css('visibility', 'hidden');

	//reset selected index to none
	selected_hand_index = -1;
}

//show next hand page
function show_next_hand(is_first){
	if(is_first == true){
		$("#battle #first_hand_list").animate({
            scrollLeft: '+=100'
        }, 100);
	}
	else{
		$("#battle #second_hand_list").animate({
            scrollLeft: '+=100'
        }, 100);		
	}
}

function show_prev_hand(is_first){
	if(is_first == true){
		$("#battle #first_hand_list").animate({
            scrollLeft: '-=100'
        }, 100);
	}
	else{
		$("#battle #second_hand_list").animate({
            scrollLeft: '-=100'
        }, 100);		
	}
}


//move target to left
function move_to_left(target,speed){
		$(target).animate({
		left:'+=10'
	},speed);
}
//move target to right
function move_to_right(target,speed){
		$(target).animate({
		right:'+=10'
	},speed);
}