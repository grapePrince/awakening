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