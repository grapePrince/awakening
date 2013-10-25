var my_battle_inf;
var is_first;

var first_hand_page;
var second_hand_page;

var first_equip_page;
var second_equip_page;

var selected_hand;
var selected_is_fist;
var selected_target;

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
    first_hand_page = 1;
    second_hand_page = 1;
    
    first_equip_page = 1;
    second_equip_page = 1;
    
    selected_hand = -1;
    
    $("#battle #card_big").css('visibility', 'hidden');
    $("#battle #card_big_cancel").css('visibility', 'hidden');
    
    //hide hands
    $("#battle #first_hand_1").css('visibility', 'hidden');
    $("#battle #first_hand_2").css('visibility', 'hidden');
    $("#battle #first_hand_3").css('visibility', 'hidden');
    $("#battle #first_hand_4").css('visibility', 'hidden');
    $("#battle #first_hand_5").css('visibility', 'hidden');
    $("#battle #second_hand_1").css('visibility', 'hidden');
    $("#battle #second_hand_2").css('visibility', 'hidden');
    $("#battle #second_hand_3").css('visibility', 'hidden');
    $("#battle #second_hand_4").css('visibility', 'hidden');
    $("#battle #second_hand_5").css('visibility', 'hidden');
    
    //hide equips
    $("#battle #first_equip_1").css('visibility', 'hidden');
    $("#battle #first_equip_2").css('visibility', 'hidden');
    $("#battle #first_equip_3").css('visibility', 'hidden');
    $("#battle #first_equip_4").css('visibility', 'hidden');
    $("#battle #second_equip_1").css('visibility', 'hidden');
    $("#battle #second_equip_2").css('visibility', 'hidden');
    $("#battle #second_equip_3").css('visibility', 'hidden');
    $("#battle #second_equip_4").css('visibility', 'hidden');
    
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
    for(var i = 0 ; i < my_battle_inf.second_hand_list.length ; i++){ //first hand
    	var target = "#battle #second_hand_" + (i+1);
    	var src = my_battle_inf.second_hand_list[i].img_src;
    	if(src == "back")
    		src = "card_back.png";
    		
    	attach_hand_card(true,target,src);
		for(var j = i ; j < my_battle_inf.second_hand_list.length ; j++){
			$("#battle #second_hand_" + (j+1)).delay(200);
		}
    }
    for(var i = 0 ; i < my_battle_inf.first_hand_list.length ; i++){ //second hand
    	var target = "#battle #first_hand_" + (i+1);
    	var src = my_battle_inf.first_hand_list[i].img_src;
    	if(src == "back")
    		src = "card_back.png";
    		
    	attach_hand_card(false,target,src);
		for(var j = i ; j < my_battle_inf.first_hand_list.length ; j++){
			$("#battle #first_hand_" + (j+1)).delay(200);
		}
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
	
	console.log("selected hand : " + selected_hand);
	
	if(selected_hand == -1)
		return;

	if(is_first != selected_is_first)
		return;
	
	var req = new request();
	req.MessageNum = 203;
	//set hand_index
	req.hand_index = selected_hand;
	//set battle_inf_id
	req.battle_inf_id = my_battle_inf.id;
	//send to server
	sock_send_request(req);
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

function server_request_field_change(list){
	//get changed data
	for(var i = 0 ; i < list.length ; i++){	
     //adjust
     switch(list[i].field_num){
        case 1: //turn num
        	my_battle_inf.turn_num = list[i].value;
        	$("#battle #turn_num").text(""+list[i].value);	
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
        	$("#battle #first_remain_hp").text("" + (max_hp - list[i].value));			
        	break;
        case 9: //first equiped list
        	var new_equip_list =  list[i].value;
        	first_equip_list = my_battle_inf.first_equiped_list;
        	
        	for(var j = 0 ; j < new_equip_list.length ; j++){
        		if(j+1 > 4)
        			break;
        		$("#battle #first_equip_"+(j+1)).css('visibility', 'visible');
        		//console.log("#battle #first_equip_"+(j+1) + " : " +  new_equip_list[j].img_src);
        		attach_card("#battle #first_equip_"+(j+1),new_equip_list[j].img_src);
        	}
        	 my_battle_inf.first_equiped_list = list[i].value;	
        	 
        	break;
        case 10: //first hand list
        	var hand_list = list[i].value;
        	first_hand_list = my_battle_inf.first_hand_list;
        	for(var j = 0 ; j < hand_list.length ; j++){
        		if(j+1 > 5)
        			break;
        		attach_card("#battle #first_hand_"+(j+1), first_hand_list[j].img_src);
        	}
        	
        	break;
        case 13: //first skill
        	my_battle_inf.first_skill = list[i].value;
        	$("#battle #first_skill").css('visibility', 'visible');
        	attach_card("#battle #first_skill",list[i].value.img_src);		
        	break;
        case 14: //first skill cooltime
        	my_battle_inf.first_skill_cooltime = list[i].value;
        	$("#battle #first_skill_cooltime").text(list[i].value);	
        	break;
        case 15: //fist weapon
        	my_battle_inf.first_weapon = list[i].value;
        	$("#battle #first_weapon").css('visibility', 'visible');
        	attach_card("#battle #first_weapon",list[i].value.img_src);			
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
        	$("#battle #second_remain_hp").text("" + (max_hp - list[i].value));					
        	break;
        case 38: //second equip list
        	var new_equip_list =  list[i].value;
        	second_equip_list = my_battle_inf.second_equiped_list;
        	
        	for(var j = 0 ; j < new_equip_list.length ; j++){
        		if(j+1 > 4)
        			break;
        		$("#battle #second_equip_"+(j+1)).css('visibility', 'visible');
        		//console.log("#battle #first_equip_"+(j+1) + " : " +  new_equip_list[j].img_src);
        		attach_card("#battle #second_equip_"+(j+1),new_equip_list[j].img_src);
        	}
        	 my_battle_inf.second_equiped_list = list[i].value;	
        	break;
        case 39: //second hand list
        	var hand_list = list[i].value;
        	second_hand_list = my_battle_inf.second_hand_list;
        	for(var j = 0 ; j < hand_list.length ; j++){
        		if(j+1 > 5)
        			break;
        		attach_card("#battle #second_hand_"+(j+1), second_hand_list[j].img_src);
        	}
        	
        	break;
        case 42: //second skill
        	my_battle_inf.second_skill = list[i].value;
        	$("#battle #second_skill").css('visibility', 'visible');
        	attach_card("#battle #second_skill",list[i].value.img_src);			
        	break;
        case 43: //second skill cooltime
        	my_battle_inf.second_skill_cooltime = list[i].value;
        	$("#battle #second_skill_cooltime").text(list[i].value);	
        	break;
        case 44: //second weapon
        	my_battle_inf.second_weapon = list[i].value;
        	$("#battle #second_weapon").css('visibility', 'visible');
        	attach_card("#battle #second_weapon",list[i].value.img_src);					
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
				detach_card("#battle #first_weapon");
				$("#battle #first_weapon").delay(200);
				attach_card("#battle #first_weapon",list[0].img_src);
				break;
			case 2: //skill
				my_battle_inf.first_skill = list[0];
				detach_card("#battle #first_skill");
				$("#battle #first_skill").delay(200);
				attach_card("#battle #first_skill",list[0].img_src);				
				break;
			case 3: //equip
				
				//check page and index!!!
			
				for(var j = 0 ; j < list.length ; j++){
					$("#battle #first_equip_" + (j+1)).css('visibility', 'visible');
					attach_card("#battle #first_equip_" + (j+1),list[j].img_src);	
				}
				break;
			case 3: //hand
			
				//check page and index!!!
				
				break;
		}
	}
	else{
		
	}
}
function server_request_equip_detached(where,index,is_first){
	if(is_first == true){ //first user
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
				//check current page and get range from it
				//if index is in range?
				
				break;
			case 4: //hand
			
				break;
		}
	}
	else{ //second user
		switch(index){
			case 1: //weapon
			
				break;
			case 2: //skill
			
				break;
			case 3: //equip
			
				break;
			case 4: //hand
			
				break;
		}		
	}
}

//*****************************
//	CLIENT DISPLAY FUNCTIONS
//*****************************

//show next hand page
function show_next_hand(is_first){
	if(is_first == true){
		if(first_hand_page*5 < my_battle_inf.first_hand_list.length){
			first_hand_page++;
			//show next cards
		}
	}
	else{
		if(second_hand_page*5 < my_battle_inf.second_hand_list.length){
			second_hand_page++;
			//show next cards
		}	
	}
}
function show_prev_hand(is_first){
	if(is_first == true){
		if(first_hand_page>1){
			first_hand_page--;
			//show prev cards
		}
	}
	else{
		if(second_hand_page>1){
			second_hand_page--;
			//show prev cards
		}	
	}
}

//if click hand card, stratch the card
function show_card_big(target,is_first,is_hand,clicked_idx){
	var patt=/\"|\'|\)/g;
	var url = $(target).css('background-image');
	url = url.split('/').pop().replace(patt,'');
	$("#battle #card_big").css('background-image', 'url('+  "images/cards/"+url+')') ; 
	
	$("#battle #card_big").css('visibility', 'visible');
	$("#battle #card_big_cancel").css('visibility', 'visible');
	
	selected_target = target;
	
	//calculate hand index
	if(is_hand){ //if hand card? set selected index
		if(is_first){
			selected_hand = (first_hand_page-1)*5 + clicked_idx;
			selected_is_first = true;
		}
		else{
			selected_hand = (second_hand_page-1)*5 + clicked_idx;
			selected_is_first = false;
		}
	}
	else //else not hand card? set selected hand index to none
		selected_hand = -1;
}

//close stratched card
function close_card_inf(){
	$("#battle #card_big ").css('visibility', 'hidden');
	$("#battle #card_big_cancel").css('visibility', 'hidden');

	//reset selected index to none
	selected_hand = -1;
}

//attach card fuction
function attach_card(target,src){
	console.log("target : " + target + "src : " + src);
	$(target).css('background-image', 'url('+  "images/cards/"+src +')'  ) ; 
	$(target).css('opacity', '0.0');
	$(target).css('visibility', 'visible');
	$(target).animate({
		opacity:1.0
	},1000);
}
//attach hand card function
function attach_hand_card(is_first,target,src){
	console.log("target : " + target + "src : " + src);
	$(target).css('background-image', 'url('+  "images/cards/"+src +')'  ) ; 
	$(target).css('opacity', '0.0');
	if(is_first == true)
		$(target).css('left', '+=20');
	else
		$(target).css('left', '-=20');
	$(target).css('visibility', 'visible');
	if(is_first == true)
		$(target).animate({
			opacity:1.0,
			left : '-=20'
		},1500);
	else
		$(target).animate({
			opacity:1.0,
			left : '+=20'
		},1500);	
}
//detach card function
function detach_card(target){
	$(target).animate({
		opacity:0.0
	},1000);
	$(target).css('visibility', 'hidden');
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