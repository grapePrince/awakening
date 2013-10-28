var config = require("./config");

//unknown card
/*var unknown_card = config.newCardInf();
unknown_card.num = -1;
unknown_card.name = "unknown";
unknown_card.img_src = "back.png";
unknown_card.cost = -1;
unknown_card.type = -1;
unknown_card.content = "unknown card.";
*/
/*************************************************************
//                   CARD USE FROM HAND                     //
************************************************************/
exports.cardUsedFromHand = function(io,socket, battle_inf, is_first ,card_num,hand_index){

  var result = config.newBattleInf();
  
  switch(card_num){
    case 1:
      choco_normal_evolve(io,socket, is_first ,battle_inf);
      break;
      
    case 2:
      destroy(io,socket, is_first ,battle_inf);
      break;
      
    case 3:
      critical_hit(io,socket, is_first ,battle_inf);
      break;
      
    case 4:
      drop_drop(io,socket, is_first ,battle_inf);
      break;
      
    case 5:
      drake_oil_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 6:
      friend_shield_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 7:
      healing_portion(io,socket, is_first ,battle_inf);
      break;
      
    case 8:
      explosive_flask(io,socket, is_first ,battle_inf);
      break;
      
    case 9:
      frozen_flask(io,socket, is_first ,battle_inf);
      break;
      
    case 10:
      unknown_flask(io,socket, is_first ,battle_inf);
      break;
      
    case 11:
      teddy_shield_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 12:
      teddy_tackle_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 13:
      teddy_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 14:
      iter_normal_evolve(io,socket, is_first ,battle_inf);
      break;
      
    case 15:
      hand_slipped(io,socket, is_first ,battle_inf);
      break;
      
    case 16:
      magic_glove_equip(io,socket, is_first ,battle_inf);
      break;
    
    case 17:
      hell_gate_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 18:
      solid_fire_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 19:
      ignition_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 20:
      leo_normal_evolve(io,socket, is_first ,battle_inf);
      break;
      
    case 21:
      old_buster_sword_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 22:
      rush_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 23:
      solid_defense_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 24:
      zephyros_normal_evolve(io,socket, is_first ,battle_inf);
      break;
      
    case 25:
      basic_clow_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 26:
      envenom_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 27:
      batter_equip(io,socket, is_first ,battle_inf);
      break;
      
    case 28:
    	detox_juice(io, socket, is_first, battle_inf);
    	break;
    	
    case 29:
    	burn_cream(io, socket, is_first, battle_inf);
    	break;
    	
    case 30:
    	hand_warmer(io, socket, is_first, battle_inf);
    	break;
    	
    case 31:
    	artificial_tears(io, socket, is_first, battle_inf);
    	break;
    	
    case 32:
    	patch(io, socket, is_first, battle_inf);
    	break;
    	
    case 33:
    	vampire_stone(io, socket, is_first, battle_inf);
    	break;
    	
    case 34:
    	cloth_armor_equip(io, socket, is_first, battle_inf);
    	break;
    	
    case 35:
    	power_glove_equip(io, socket, is_first, battle_inf);
    	break;
    	
    case 36:
    	teddy_plus_equip(io, socket, is_first, battle_inf);
    	break;
    	
    case 37:
    	buster_sword_equip(io, socket, is_first, battle_inf);
    	break;
    	
    case 38:
    	cat_clow_equip(io, socket, is_first, battle_inf);
    	break;
    	
    case 39:
    	red_medicine(io, socket, is_first, battle_inf);
    	break;
    	
    case 40:
    	flare_bomb(io, socket, is_first, battle_inf);
    	break;
    	
    case 41:
    	double_edged_sword(io, socket, is_first, battle_inf);
    	break;
    	
    case 42:
    	strange_portion(io, socket, is_first, battle_inf);
    	break;
    	
    case 43:
    	thorny_bush_equip(io, socket, is_first, battle_inf);
    	break;
    	
    case 44:
    	all_or_nothing(io, socket, is_first, battle_inf);
    	break;
    	
    case 45:
    	slow_motion(io, socket, is_first, battle_inf);
    	break;
    	
    case 46:
    	purify_talisman_equip(io, socket, is_first, battle_inf);
    	break;
    	
    case 47:
    	magic_eye(io, socket, is_first, battle_inf);
    	break;
    	
    case 48:
    	quick_quick(io, socket, is_first, battle_inf);
    	break;
    	
    case 49:
    	shuffle(io, socket, is_first, battle_inf,hand_index);
    	break;
    	
    case 50:
    	nutrious_tonic(io, socket, is_first, battle_inf);
    	break;
    	
    case 51:
    	steal(io, socket, is_first, battle_inf);
    	break;
    	
  }
  
  return result;
};
/*************************************************************
//                   CHECK EQUIP CONDITION					//
************************************************************/
exports.checkCondition = function(io,socket, battle_inf, is_first ,card_num){
	
	var res = false;
	
	switch(card_num){
	case 5:
		res = drake_oil_check(io,socket, is_first ,battle_inf);
	      break;
	case 6:
		res =friend_shield_check(io,socket, is_first ,battle_inf);
	     break;
	case 11:
		res = teddy_shield_check(io,socket, is_first ,battle_inf);
		 break;      
	case 12:
		res = teddy_tackle_check(io,socket, is_first ,battle_inf);
		break;
	case 13:
		res =teddy_check(io,socket, is_first ,battle_inf);
		break;
	case 16:
		res =magic_glove_check(io,socket, is_first ,battle_inf);
		break;
	case 17:
		res =hell_gate_check(io,socket, is_first ,battle_inf);
		break;
	case 18:
		res =solid_fire_check(io,socket, is_first ,battle_inf);
		break;
	case 19:
		res =ignition_check(io,socket, is_first ,battle_inf);
		break;
	case 21:
		res =old_buster_sword_check(io,socket, is_first ,battle_inf);
		break;
	case 22:
		res =rush_check(io,socket, is_first ,battle_inf);
		break;
	case 23:
		res =solid_defense_check(io,socket, is_first ,battle_inf);
		break;
	case 25:
		res =basic_clow_check(io,socket, is_first ,battle_inf);
		break;
	case 26:
		res =envenom_check(io,socket, is_first ,battle_inf);
		break;
	case 27:
		res =batter_check(io,socket, is_first ,battle_inf);
		break;
	case 34:
		res = cloth_armor_check(io, socket, is_first, battle_inf);
		break;
	case 35:
		res = power_glove_check(io, socket, is_first, battle_inf);
		break;
	case 36:
		res = teddy_plus_check(io, socket, is_first, battle_inf);
		break;
	case 37:
		res = buster_sword_check(io, socket, is_first, battle_inf);
		break;
	case 38:
		res = cat_clow_check(io, socket, is_first, battle_inf);
		break;
	case 43:
		res = thorny_bush_check(io, socket, is_first, battle_inf);
		break;
	case 46:
		res = purify_talisman_check(io, socket, is_first, battle_inf);
		break;
	}
	
	return res;
};
/*************************************************************
//                    EFFECT DETACH	          				//
************************************************************/
exports.detachEffect = function(io,socket, battle_inf, is_first ,card_num){
	
	var res = false;
	
	switch(card_num){
	case 5:
		res = drake_oil_detach(io,socket, is_first ,battle_inf);
	      break;
	case 6:
		res =friend_shield_detach(io,socket, is_first ,battle_inf);
	     break;
	case 13:
		res =teddy_detach(io,socket, is_first ,battle_inf);
		break;
	case 16:
		res =magic_glove_detach(io,socket, is_first ,battle_inf);
		break;
	case 21:
		res =old_buster_sword_detach(io,socket, is_first ,battle_inf);
		break;
	case 25:
		res =basic_clow_detach(io,socket, is_first ,battle_inf);
		break;
	case 34:
		res = cloth_armor_detach(io, socket, is_first, battle_inf);
		break;
	case 35:
		res = power_glove_detach(io, socket, is_first, battle_inf);
		break;
	case 36:
		res = teddy_plus_detach(io, socket, is_first, battle_inf);
		break;
	case 37:
		res = buster_sword_detach(io, socket, is_first, battle_inf);
		break;
	case 38:
		res = cat_clow_detach(io, socket, is_first, battle_inf);
		break;
	case 43:
		res = thorny_bush_detach(io, socket, is_first, battle_inf);
		break;
	case 46:
		res = purify_talisman_detach(io, socket, is_first, battle_inf);
		break;
	}
	
	return res;
};
/*************************************************************
//                      SKILL CARD USED                     //
************************************************************/
exports.skillCardUsed = function(io,socket, battle_inf, is_first ,card_num){
// call skill card's adjust function	
	var damage = 0;
	 switch(card_num){
	 case 11:
		 damage = teddy_shield_use(io, socket, is_first, battle_inf);
		 break;
	 case 12:
		 damage = teddy_tackle_use(io, socket, is_first, battle_inf);
		 break;
	 case 17:
		 damage =  hell_gate_use(io, socket, is_first, battle_inf);
		 break;
	 case 18:
		 damage = solid_fire_use(io, socket, is_first, battle_inf);
		 break;
	 case 19:
		 damage = ignition_use(io, socket, is_first, battle_inf);
		 break;
	 case 22:
		 damage = rush_use(io, socket, is_first, battle_inf);
		 break;
	 case 23:
		 damage = solid_defense_use(io, socket, is_first, battle_inf);
		 break;
	 case 26:
		 damage =  envenom_use(io, socket, is_first, battle_inf);
		 break;
	 case 27:
		 damage = batter_use(io, socket, is_first, battle_inf);
		 break;
		 
	 }
	 return damage;
};

/*********************************************************
//                    CARD DETAILS                      //
*********************************************************/
/////////////////////////////
//	CHOCO NORMAL EVOLVE
/////////////////////////////
function choco_normal_evolve(io,socket, is_first,battle_inf){
  
  //change character_inf
  var char_inf = config.newCharacterInf();
  
  if(is_first == true){ //if user is first
    if(battle_inf.first_character.title == ' '){//title is match
    	
    	battle_inf.first_character.mark = 1;
    	
      if(battle_inf.first_character.level == 1){ //evolve to level 2
        battle_inf.first_character.base_atk = 5;
        battle_inf.first_character.base_def = 5;
        battle_inf.first_character.base_max_hp = 210;
        battle_inf.first_character.level = 2;
      }
      else if(battle_inf.first_character.level == 2){ //evolve to level 3
        battle_inf.first_character.base_atk = 10;
        battle_inf.first_character.base_def = 15;
        battle_inf.first_character.base_max_hp = 230;      
        battle_inf.first_character.level = 3;
      }
      else{
        battle_inf.first_character.base_atk = 20;
        battle_inf.first_character.base_def = 20;
        battle_inf.first_character.base_max_hp = 250;         
        battle_inf.first_character.level = 4; //max    
      }
    }
    else{ //title not match - evolve to level 2
        battle_inf.first_character.base_atk = 5;
        battle_inf.first_character.base_def = 5;
        battle_inf.first_character.base_max_hp = 210;    
        battle_inf.first_character.level = 2;
    }
    
    var res = config.newResponse();
    res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
    res.list = [];
    
    //make result
     var item = config.newEffectInf();
     item.field_num = 4; //first character
     item.value = battle_inf.first_character;
     
     res.list.push(item);
   
     //send result to client using room name
     io.sockets.in(battle_inf.room_name).emit('data', res);

  }
  else{ //if user is second
   if(battle_inf.second_character.title == ' '){//title is match
	   
	   battle_inf.second_character.mark = 1;
	   
      if(battle_inf.second_character.level == 1){ //evolve to level 2
        battle_inf.second_character.base_atk = 5;
        battle_inf.second_character.base_def = 5;
        battle_inf.second_character.base_max_hp = 210;      
        battle_inf.second_character.level = 2;
      }
      else if(battle_inf.second_character.level == 2){ //evolve to level 3
        battle_inf.second_character.base_atk = 10;
        battle_inf.second_character.base_def = 15;
        battle_inf.second_character.base_max_hp = 230;      
        battle_inf.second_character.level = 3;     
      }
      else{
        battle_inf.second_character.base_atk = 20;
        battle_inf.second_character.base_def = 20;
        battle_inf.second_character.base_max_hp = 250;         
        battle_inf.second_character.level = 4; //max          
      }  
    }
    else{//title not match - evolve to level 1
        battle_inf.second_character.base_atk = 5;
        battle_inf.second_character.base_def = 5;
        battle_inf.second_character.base_max_hp = 210;    
        battle_inf.second_character.level = 2;   
    }
    
   var res = config.newResponse();
   res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
   res.list = [];
   
   //make result
    var item = config.newEffectInf();
    item.field_num = 33; //second character
    item.value = battle_inf.second_character;
    
    res.list.push(item);
  
    //send result to client using room name
    io.sockets.in(battle_inf.room_name).emit('data', res);
  }
}

/////////////////////////////
//	DESTROY
/////////////////////////////
function destroy(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
	if(is_first == true){ //if user is first
		battle_inf.first_special_card_effect.second_def = 0 - (battle_inf.second_def + battle_inf.second_character.base_def);
		
		item.field_num = 61;
		item.value = battle_inf.first_special_card_effect;
	}
	else{ //else user is second

		battle_inf.second_special_card_effect.first_def = 0 - (battle_inf.first_def + battle_inf.first_character.base_def);
		
		item.field_num = 62;
		item.value = battle_inf.second_special_card_effect;
	}
  
	res.list.push(item);
	
	//send result to client using room name
	io.sockets.in(battle_inf.room_name).emit('data', res);
}

/////////////////////////////
//	CRITICAL HIT
/////////////////////////////
function critical_hit(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
	if(is_first == true){ //if user is first
		battle_inf.first_special_card_effect.first_atk =  battle_inf.first_special_card_effect.first_atk + 10; //set special card's effect.		
		item.field_num = 61;
		item.value = battle_inf.first_special_card_effect;
	}
	else{ //else user is second
		battle_inf.second_special_card_effect.second_atk = battle_inf.second_special_card_effect.second_atk + 10; //set special card's effect.		
		item.field_num = 62;
		item.value = battle_inf.second_special_card_effect;
	}
  
	res.list.push(item);
  
	//send result to client using room name
	io.sockets.in(battle_inf.room_name).emit('data', res);

}
/////////////////////////////
//	DROP DROP
/////////////////////////////
function drop_drop(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
	if(is_first == true){ //if user is first
		//check equip - if equip is exist 
		if(battle_inf.second_equiped_list.length > 0){
			battle_inf.second_equiped_list.splice(0,1); //pop first item
			
			item.field_num = 38;
			item.value = battle_inf.second_equiped_list;
		}
		
	}
	else{ //else user is second
		//check equip - if equip is exist
		if(battle_inf.first_equiped_list.length > 0){
			battle_inf.first_equiped_list.splice(0,1); //pop first item
			
			item.field_num = 9;
			item.value = battle_inf.first_equiped_list;
		}
	}
  
	res.list.push(item);
	
	//no need to set special effect field.
  
	//send result to client using room name
	io.sockets.in(battle_inf.room_name).emit('data', res);
}

/////////////////////////////
//	DRAKE OIL
/////////////////////////////
//check
function drake_oil_check(io,socket, is_first ,battle_inf){
	return true;
}

//equip
function drake_oil_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk + 10;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk + 10;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}
	
//detach
function drake_oil_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk - 10;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk - 10;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
//	FRIEND SHIELD
/////////////////////////////
//check
function friend_shield_check(io,socket, is_first ,battle_inf){
		return true;
}
//equip
function friend_shield_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_def = battle_inf.first_def + 10;
			
			item.field_num = 7; //first atk
			item.value = battle_inf.first_def;
		}
		else{ //else user is second
			battle_inf.second_def = battle_inf.second_def + 10;
			
			item.field_num = 36; //second atk
			item.value = battle_inf.second_def;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}

//detach
function friend_shield_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_def = battle_inf.first_def - 10;
			
			item.field_num = 7; //first atk
			item.value = battle_inf.first_def;
			
		}
		else{ //else user is second
			battle_inf.second_def = battle_inf.second_def - 10;
			
			item.field_num = 36; //second atk
			item.value = battle_inf.second_def;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
//	HEALING PORTION
/////////////////////////////
function healing_portion(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
	  if(battle_inf.first_damaged_hp - 20 > 0)
		  battle_inf.first_damaged_hp = battle_inf.first_damaged_hp - 20;
	  else
		  battle_inf.first_damaged_hp = 0;
    item.field_num = 8; // first user's damaged hp
    item.value =  battle_inf.first_damaged_hp;
  }
  else{ //else user is second
	  if(battle_inf.second_damaged_hp - 20 > 0)
		  battle_inf.second_damaged_hp = battle_inf.second_damaged_hp - 20;
	  else
		  battle_inf.second_damaged_hp = 0;
    item.field_num = 37; // second user's damaged hp
    item.value =  battle_inf.second_damaged_hp;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}

/////////////////////////////
//	EXPLOSIVE FLASK
/////////////////////////////
function explosive_flask(io,socket, is_first,battle_inf){
  var rand = parseInt(Math.random() * 100);
  var addStatus = false;
  
  //set result's field
  var res = config.newResponse();
  res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
  res.list = [];
  var item_damage = config.newEffectInf(); //effect of damage
  var item_status = config.newEffectInf(); //effect of status attack
  
  var immune = 0;
  if(is_first == true){
	  immune =  battle_inf.first_immune_burn +  battle_inf.first_special_card_effect.first_immune_burn + battle_inf.second_special_card_effect.first_immune_burn;
  }
  else{
	  immune =  battle_inf.second_immune_burn +  battle_inf.first_special_card_effect.second_immune_burn + battle_inf.second_special_card_effect.second_immune_burn;
  }
  
  if(rand < 50 - immune) //percentage 50.
      addStatus = true;
  
  if(is_first == true){ //if user is first
    battle_inf.second_damaged_hp = battle_inf.second_damaged_hp + 20;
    
    item_damage.field_num = 37;
    item_damage.value = battle_inf.second_damaged_hp;
    
    res.list.push(item_damage);
    
    if(addStatus == true){
        battle_inf.second_burn = 1;
        
        item_status.field_num = 45;
        item_status.value = 1; 
        res.list.push(item_status);
    }
  }
  else{ //else user is second
    battle_inf.first_damaged_hp = battle_inf.first_damaged_hp + 20;
    
    item_damage.field_num = 8;
    item_damage.value = battle_inf.first_damaged_hp;
    
    res.list.push(item_damage);
    
       if(addStatus == true){
       
    	   battle_inf.first_burn = 1;
       
           item_status.field_num = 16;
           item_status.value = 1; 
           res.list.push(item_status);
       }
  }
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}

/////////////////////////////
//	FROZEN FLASK
/////////////////////////////
function frozen_flask(io,socket, is_first,battle_inf){
  var rand = parseInt(Math.random() * 100);
  var addStatus = false;
  
  //set result's field
  var res = config.newResponse();
  res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
  res.list = [];
  var item_damage = config.newEffectInf(); //effect of damage
  var item_status = config.newEffectInf(); //effect of status attack
  var immune = 0;
  
  if(is_first == true){
	  immune =  battle_inf.first_immune_frozen +  battle_inf.first_special_card_effect.first_immune_frozen + battle_inf.second_special_card_effect.first_immune_frozen;
  }
  else{
	  immune =  battle_inf.second_immune_frozen +  battle_inf.first_special_card_effect.second_immune_frozen + battle_inf.second_special_card_effect.second_immune_frozen;
  }
  
  
  if(rand < 50 - immune) //percentage 50.
      addStatus = true;
  
  if(is_first == true){ //if user is first
    battle_inf.second_damaged_hp = battle_inf.second_damaged_hp + 20;
    
    item_damage.field_num = 37;
    item_damage.value = battle_inf.second_damaged_hp;
    
    res.list.push(item_damage);
    
      if(addStatus == true){
        battle_inf.second_frozen = 1;
        
        item_status.field_num = 46; //frozen
        item_status.value = 1; 
        res.list.push(item_status);
      }
  }
  else{ //else user is second
    battle_inf.first_damaged_hp = battle_inf.first_damaged_hp + 20;
    
    item_damage.field_num = 8;
    item_damage.value = battle_inf.first_damaged_hp;
    
    res.list.push(item_damage);
    
       if(addStatus == true){
          battle_inf.first_frozen = 1;
          
          item_status.field_num = 17;
          item_status.value = 1; 
          res.list.push(item_status);
       }
  }

  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
}

/////////////////////////////
//	UNKNOWN FLASK
/////////////////////////////
function unknown_flask(io,socket, is_first,battle_inf){
	
	//set result's field
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	var item = config.newEffectInf(); //effect of damage

  
  if(is_first == true){ //if user is first
    battle_inf.second_damaged_hp = battle_inf.second_damaged_hp + 30;
    
    item.field_num = 37;
    item.value = battle_inf.second_damaged_hp;
    
  }
  else{ //else user is second
    battle_inf.first_damaged_hp = battle_inf.first_damaged_hp + 30;
    
    item.field_num = 8;
    item.value = battle_inf.first_damaged_hp;
  }
  
  res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
}

/////////////////////////////
//	TEDDY SHIELD
/////////////////////////////
//check
function teddy_shield_check (io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_weapon_mark != 1){
			return false;
		}
	}
	else{
		if(battle_inf.second_weapon_mark != 1){
			return false;		
		}
	}
	return true;
}
//equip
function teddy_shield_equip(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var cooltime_item = config.newEffectInf();
	
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 0;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = battle_inf.first_skill_cooltime;
	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 0;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  io.sockets.in(battle_inf.room_name).emit('data', res);
		return;
}
//skill use
function teddy_shield_use (io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
	var cooltime_item = config.newEffectInf();
	
	if(is_first == true){ //if user is first
		battle_inf.first_special_card_effect.first_def = battle_inf.first_special_card_effect.first_def + 30;
		battle_inf.first_skill_cooltime = 3;
		
		item.field_num = 61; //first atk
		item.value = battle_inf.first_special_card_effect;
		
		cooltime_item.field_num = 14;
		cooltime_item.value = 3;
	}
	else{ //else user is second
		battle_inf.second_special_card_effect.second_def =battle_inf.second_special_card_effect.second_def + 30;
		battle_inf.second_skill_cooltime = 3;
		
		item.field_num = 62; //second atk
		item.value = battle_inf.second_special_card_effect;
		
		cooltime_item.field_num = 43;
		cooltime_item.value = 3;
	}
  
	res.list.push(item);
	res.list.push(cooltime_item);
  
	console.log("##################cooltime");
	console.log(battle_inf.skill_cooltime);
	
	//send result to client using room name
	io.sockets.in(battle_inf.room_name).emit('data', res);
	
	return 0;
}

/////////////////////////////
//	TEDDY TACKLE
/////////////////////////////
//check
function teddy_tackle_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_weapon_mark != 1){
			return false;
		}
	}
	else{
		if(battle_inf.second_weapon_mark != 1){
			return false;		
		}
	}
	return true;
}
//equip
function teddy_tackle_equip(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var cooltime_item = config.newEffectInf();
	
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 0;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = battle_inf.first_skill_cooltime;
	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 0;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  io.sockets.in(battle_inf.room_name).emit('data', res);
	return;
}
//skill use
function teddy_tackle_use(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var cooltime_item = config.newEffectInf();
	
	if(is_first == true){
		battle_inf.first_skill_cooltime = 2;
		
		cooltime_item.field_num = 14;
		cooltime_item.value = 2;
	}
	else{
		battle_inf.second_skill_cooltime = 2;
		
		cooltime_item.field_num = 43;
		cooltime_item.value = 2;
	}
	
	res.list.push(cooltime_item);
	
	console.log("##################cooltime");
	console.log(battle_inf.skill_cooltime);
	
	io.sockets.in(battle_inf.room_name).emit('data', res);
	
	var damage = 10;
	
	return damage;
}

/////////////////////////////
//	TEDDY
/////////////////////////////
function teddy_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_character.mark != 1)
			return false;
	}
	else{
		if(battle_inf.second_character.mark != 1)
			return false;		
	}
	
	return true;
}
//equip
function teddy_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk + 10;
			battle_inf.first_weapon_mark = 1
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk + 10;
			battle_inf.second_weapon_mark = 1
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}

//detach
function teddy_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk - 10;
			battle_inf.first_weapon_mark = 0;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk - 10;
			battle_inf.second_weapon_mark = 0;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
//	ITER NORMAL EVOLVE
/////////////////////////////
function iter_normal_evolve(io,socket, is_first,battle_inf){
  //change character_inf
  
  var char_inf = config.newCharacterInf();
  
  if(is_first == true){ //if user is first
    if(battle_inf.first_character.title == ' '){//title is match
    	
    	battle_inf.first_character.mark = 2;
    	
      if(battle_inf.first_character.level == 1){ //evolve to level 2
          battle_inf.first_character.base_atk = 20;
          battle_inf.first_character.base_def = 10;
          battle_inf.first_character.base_max_hp = 240;
          battle_inf.first_character.level = 2;     
      }
      else if(battle_inf.first_character.level == 2){ //evolve to level 3
          battle_inf.first_character.base_atk = 25;
          battle_inf.first_character.base_def = 15;
          battle_inf.first_character.base_max_hp = 250;
          battle_inf.first_character.level = 3;      
      }
      else{
          battle_inf.first_character.base_atk = 35;
          battle_inf.first_character.base_def = 20;
          battle_inf.first_character.base_max_hp = 265;
          battle_inf.first_character.level = 4;        
      }
    }
    else{ //title not match - evolve to level 1
          battle_inf.first_character.base_atk = 20;
          battle_inf.first_character.base_def = 10;
          battle_inf.first_character.base_max_hp = 240;
          battle_inf.first_character.level = 2;        
    }
    
    var res = config.newResponse();
    res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
    res.list = [];
    
    //make result
     var item = config.newEffectInf();
     item.field_num = 4; //first character
     item.value = battle_inf.first_character;
     
     res.list.push(item);
   
     //send result to client using room name
     io.sockets.in(battle_inf.room_name).emit('data', res);
  }
  else{ //if user is second
   if(battle_inf.second_character.title == ' '){//title is match
	   
	   battle_inf.second_character.mark = 2;
	   
      if(battle_inf.second_character.level == 1){ //evolve to level 2
          battle_inf.second_character.base_atk = 20;
          battle_inf.second_character.base_def = 10;
          battle_inf.second_character.base_max_hp = 240;
          battle_inf.second_character.level = 2;        
      }
      else if(battle_inf.second_character.level == 2){ //evolve to level 3
          battle_inf.second_character.base_atk = 25;
          battle_inf.second_character.base_def = 15;
          battle_inf.second_character.base_max_hp = 250;
          battle_inf.second_character.level = 3;           
      }
      else{
          battle_inf.second_character.base_atk = 35;
          battle_inf.second_character.base_def = 20;
          battle_inf.second_character.base_max_hp = 265;
          battle_inf.second_character.level = 4;            
      }  
    }
    else{//title not match - evolve to level 1
          battle_inf.second_character.base_atk = 20;
          battle_inf.second_character.base_def = 10;
          battle_inf.second_character.base_max_hp = 240;
          battle_inf.second_character.level = 2;            
    }
   
   var res = config.newResponse();
   res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
   res.list = [];
   
   //make result
    var item = config.newEffectInf();
    item.field_num = 33; //second character
    item.value = battle_inf.second_character;
    
    res.list.push(item);
  
    //send result to client using room name
    io.sockets.in(battle_inf.room_name).emit('data', res);
  
  }
  
}
/////////////////////////////
//	HAND SLIPPED
/////////////////////////////
function hand_slipped(io,socket, is_first ,battle_inf){
	var first_res = config.newResponse();
	first_res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	first_res.list = [];
	var second_res = config.newResponse();
	second_res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	second_res.list = [];	
	var first_item = config.newEffectInf();
	var second_item = config.newEffectInf();
		
	if(is_first == true){ //if user is first
		
		if(battle_inf.second_hand_list.length > 0){
			battle_inf.second_hand_list.splice(0,1); //pop first item
			
			second_item.field_num = 39;
			second_item.value = battle_inf.second_hand_list;
			first_item.field_num = 39;
			var list = [];
			for(var i = 0 ; i < battle_inf.second_hand_list.length ; i++){
	        	var unknown_card = config.newCardInf();
					unknown_card.num = -1;
					unknown_card.name = "unknown";
					unknown_card.img_src = "back.png";
					unknown_card.cost = -1;
					unknown_card.type = -1;
					unknown_card.content = "unknown card.";
					
	        		unknown_card.deck_id_num = battle_inf.second_hand_list[i].deck_id_num;
				list.push(unknown_card);
			}
			first_item.value = list;
		}
		
	}
	else{ //else user is second
		
		if(battle_inf.first_hand_list.length > 0){
			battle_inf.first_hand_list.splice(0,1); //pop first item
			
			first_item.field_num = 10;
			first_item.value = battle_inf.first_hand_list;
			second_item.field_num = 10;
			var list = [];
			for(var i = 0 ; i < battle_inf.first_hand_list.length ; i++){
	        	var unknown_card = config.newCardInf();
					unknown_card.num = -1;
					unknown_card.name = "unknown";
					unknown_card.img_src = "back.png";
					unknown_card.cost = -1;
					unknown_card.type = -1;
					unknown_card.content = "unknown card.";
					
	        		unknown_card.deck_id_num = battle_inf.first_hand_list[i].deck_id_num;
				list.push(unknown_card);
			}
			second_item.value = list;
		}
	}
  
	first_res.list.push(first_item);
	second_res.list.push(second_item);
	
	//no need to set special effect field.
  
	//send result to client using room name
	io.sockets.socket(battle_inf.first.session_id).emit('data', first_res);
	io.sockets.socket(battle_inf.second.session_id).emit('data',second_res); 
}

/////////////////////////////
//	MAGIC GLOVE
/////////////////////////////
//check
function magic_glove_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_character.mark != 2)
			return false;
	}
	else{
		if(battle_inf.second_character.mark != 2)
			return false;		
	}
		return true;
}

//equip
function magic_glove_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk + 20;
			battle_inf.first_weapon_mark = 2;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk + 20;
			battle_inf.second_weapon_mark = 2;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}

//detach
function magic_glove_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk - 20;
			battle_inf.first_weapon_mark = 0;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk - 20;
			battle_inf.second_weapon_mark = 0;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
//	HELL GATE
/////////////////////////////
//check
function hell_gate_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_weapon_mark != 2
				|| battle_inf.first_character.lv < 3)
			return false;
	}
	else{
		if(battle_inf.second_weapon_mark != 2
				|| battle_inf.second_character.lv < 3)
			return false;		
	}
	return true;
}
//equip
function hell_gate_equip(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var cooltime_item = config.newEffectInf();
	
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 0;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = battle_inf.first_skill_cooltime;
	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 0;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  io.sockets.in(battle_inf.room_name).emit('data', res);
		return;
}
//skill use
function hell_gate_use(io,socket, is_first ,battle_inf){

	//set result's field
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	var item_status = config.newEffectInf(); //effect of status attack
	var cooltime_item = config.newEffectInf();
	

	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 4;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = 6;
			
		   battle_inf.second_burn = 1;
		    
		   item_status.field_num = 45;
		   item_status.value = 1; 
		   res.list.push(item_status);

	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 6;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = 6;
			
		   battle_inf.first_burn = 1;
		       
		   item_status.field_num = 16;
		   item_status.value = 1; 
		   res.list.push(item_status);
		  
	  }
	  res.list.push(cooltime_item);
	  
	  console.log("################");
	  console.log(res);
	  
	  //send result to client using room name
	  io.sockets.in(battle_inf.room_name).emit('data', res);
	  
		return 50;
}

/////////////////////////////
// SOLID FIRE
/////////////////////////////
//check
 function solid_fire_check(io,socket, is_first ,battle_inf){
		if(is_first == true){
			if(battle_inf.first_weapon_mark != 2
					|| battle_inf.first_character.lv < 2)
				return false;
		}
		else{
			if(battle_inf.second_weapon_mark != 2
					|| battle_inf.second_character.lv < 2)
				return false;		
		}
		return true;
}
//equip
function solid_fire_equip(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var cooltime_item = config.newEffectInf();
	
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 0;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = battle_inf.first_skill_cooltime;
	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 0;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  io.sockets.in(battle_inf.room_name).emit('data', res);
		return;
}
//skill use
function solid_fire_use (io,socket, is_first ,battle_inf){
	var rand = parseInt(Math.random() * 100);
	//set result's field
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	var item_status = config.newEffectInf(); //effect of status attack
	var cooltime_item = config.newEffectInf();
	
	 var immune = 0;
	  if(is_first == true){
		  immune =  battle_inf.first_immune_burn +  battle_inf.first_special_card_effect.first_immune_burn  +  battle_inf.second_special_card_effect.first_immune_burn;
	  }
	  else{
		  immune =  battle_inf.second_immune_burn +  battle_inf.first_special_card_effect.second_immune_burn +  battle_inf.second_special_card_effect.second_immune_burn;
	  }
	  
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 4;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = 4;
			
		    if(rand < 50 - immune){
		        battle_inf.second_burn = 1;
		        
		        item_status.field_num = 45;
		        item_status.value = 1; 
		        res.list.push(item_status);
		    }
	  }
	  else{ //else user is second
			battle_inf.second_skill_cooltime = 4;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = 4;
			
		       if(rand < 50 - immune){
		       
		    	   battle_inf.first_burn = 1;
		       
		           item_status.field_num = 16;
		           item_status.value = 1; 
		           res.list.push(item_status);
		       }
		  
	  }
	  res.list.push(cooltime_item);
	  
	  console.log("################");
	  console.log(res);
	  
	  //send result to client using room name
	  io.sockets.in(battle_inf.room_name).emit('data', res);
	return 30;
}

/////////////////////////////
//	IGNITION
/////////////////////////////
//check
function ignition_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_weapon_mark != 2)
			return false;
	}
	else{
		if(battle_inf.second_weapon_mark != 2)
			return false;		
	}
	return true;
}
//equip
function ignition_equip(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var cooltime_item = config.newEffectInf();
	
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 0;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = battle_inf.first_skill_cooltime;
	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 0;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  io.sockets.in(battle_inf.room_name).emit('data', res);
		return;
}
//skill use
function ignition_use(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var cooltime_item = config.newEffectInf();
	
	if(is_first == true){
		battle_inf.first_skill_cooltime = 2;
		
		cooltime_item.field_num = 14;
		cooltime_item.value = 2;
	}
	else{
		battle_inf.second_skill_cooltime = 2;
		
		cooltime_item.field_num = 43;
		cooltime_item.value = 2;
	}
	
	res.list.push(cooltime_item);
	
	  console.log("################");
	  console.log(res);
	
	io.sockets.in(battle_inf.room_name).emit('data', res);
	
	return 20;
}

/////////////////////////////
//	LEO NORMAL EVOLVE
/////////////////////////////
function leo_normal_evolve(io,socket, is_first,battle_inf){
	  //change character_inf
	  
	  var char_inf = config.newCharacterInf();
	  
	  if(is_first == true){ //if user is first
	    if(battle_inf.first_character.title == ' '){//title is match
	    	
	    	battle_inf.first_character.mark = 3;
	    	
	      if(battle_inf.first_character.level == 1){ //evolve to level 2
	          battle_inf.first_character.base_atk = 15;
	          battle_inf.first_character.base_def = 10;
	          battle_inf.first_character.base_max_hp = 295;
	          battle_inf.first_character.level = 2;     
	      }
	      else if(battle_inf.first_character.level == 2){ //evolve to level 3
	          battle_inf.first_character.base_atk = 20;
	          battle_inf.first_character.base_def = 20;
	          battle_inf.first_character.base_max_hp = 310;
	          battle_inf.first_character.level = 3;      
	      }
	      else{
	          battle_inf.first_character.base_atk = 30;
	          battle_inf.first_character.base_def = 25;
	          battle_inf.first_character.base_max_hp = 330;
	          battle_inf.first_character.level = 4;        
	      }
	    }
	    else{ //title not match - evolve to level 1
	          battle_inf.first_character.base_atk = 15;
	          battle_inf.first_character.base_def = 10;
	          battle_inf.first_character.base_max_hp = 295;
	          battle_inf.first_character.level = 2;     
	    }
	    
	    var res = config.newResponse();
	    res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	    res.list = [];
	    
	    //make result
	     var item = config.newEffectInf();
	     item.field_num = 4; //first character
	     item.value = battle_inf.first_character;
	     
	     res.list.push(item);
	   
	     //send result to client using room name
	     io.sockets.in(battle_inf.room_name).emit('data', res);
	  }
	  else{ //if user is second
	   if(battle_inf.second_character.title == ' '){//title is match
		   
		   battle_inf.second_character.mark = 3;
		   
	      if(battle_inf.second_character.level == 1){ //evolve to level 2
	          battle_inf.second_character.base_atk = 15;
	          battle_inf.second_character.base_def = 10;
	          battle_inf.second_character.base_max_hp = 295;
	          battle_inf.second_character.level = 2;        
	      }
	      else if(battle_inf.second_character.level == 2){ //evolve to level 3
	          battle_inf.second_character.base_atk = 20;
	          battle_inf.second_character.base_def = 20;
	          battle_inf.second_character.base_max_hp = 310;
	          battle_inf.second_character.level = 3;           
	      }
	      else{
	          battle_inf.second_character.base_atk = 30;
	          battle_inf.second_character.base_def = 25;
	          battle_inf.second_character.base_max_hp = 330;
	          battle_inf.second_character.level = 4;            
	      }  
	    }
	    else{//title not match - evolve to level 1
	          battle_inf.second_character.base_atk = 15;
	          battle_inf.second_character.base_def = 10;
	          battle_inf.second_character.base_max_hp = 295;
	          battle_inf.second_character.level = 2;           
	    }
	   
	   var res = config.newResponse();
	   res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	   res.list = [];
	   
	   //make result
	    var item = config.newEffectInf();
	    item.field_num = 33; //second character
	    item.value = battle_inf.second_character;
	    
	    res.list.push(item);
	  
	    //send result to client using room name
	    io.sockets.in(battle_inf.room_name).emit('data', res);
	  
	  }
}

/////////////////////////////
//	OLD BUSTER SWORD
/////////////////////////////
//check
function old_buster_sword_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_character.mark != 3)
			return false;
	}
	else{
		if(battle_inf.second_character.mark != 3)
			return false;		
	}
		return true;
}
//equip
function old_buster_sword_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk + 10;
			battle_inf.first_weapon_mark = 3;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk + 10;
			battle_inf.second_weapon_mark = 3;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}
//detach
function old_buster_sword_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk - 10;
			battle_inf.first_weapon_mark = 0;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk - 10;
			battle_inf.second_weapon_mark = 0;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
//	RUSH
/////////////////////////////
//check
function rush_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_weapon_mark != 3
				|| battle_inf.first_character.lv < 2)
			return false;
	}
	else{
		if(battle_inf.second_weapon_mark != 3
				|| battle_inf.second_character.lv < 2)
			return false;		
	}
	return true;
}
//equip
function rush_equip(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var cooltime_item = config.newEffectInf();
	
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 0;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = battle_inf.first_skill_cooltime;
	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 0;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  io.sockets.in(battle_inf.room_name).emit('data', res);
		return;
}
//skill use
function rush_use(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var cooltime_item = config.newEffectInf();
	
	if(is_first == true){ //if user is first
		battle_inf.first_skill_cooltime = 4;
				
		cooltime_item.field_num = 14;
		cooltime_item.value = battle_inf.first_skill_cooltime;
	}
	else{
		battle_inf.second_skill_cooltime = 4;
				
		cooltime_item.field_num = 43;
		cooltime_item.value = battle_inf.second_skill_cooltime;
	}
	 res.list.push(cooltime_item);
	 
	return 10;
}
/////////////////////////////
//	SOLID DEFENSE
/////////////////////////////
//check
function solid_defense_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_weapon_mark != 3)
			return false;
	}
	else{
		if(battle_inf.second_weapon_mark != 3)
			return false;		
	}
	return true;
}
//equip
function solid_defense_equip(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var cooltime_item = config.newEffectInf();
	
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 0;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = battle_inf.first_skill_cooltime;
	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 0;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  io.sockets.in(battle_inf.room_name).emit('data', res);
	return;
}
//skill use
function solid_defense_use(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
	var cooltime_item = config.newEffectInf();
	
	if(is_first == true){ //if user is first
		battle_inf.first_def = battle_inf.first_def + 10;
		
		item.field_num = 7; //first atk
		item.value = battle_inf.first_def;
		
		battle_inf.first_skill_cooltime = 3;
		cooltime_item.field_num = 14;
		cooltime_item.value = battle_inf.first_skill_cooltime;
	}
	else{ //else user is second
		battle_inf.second_def = battle_inf.second_def + 10;
		
		item.field_num = 36; //second atk
		item.value = battle_inf.second_def;
		
		battle_inf.second_skill_cooltime = 3;
		
		cooltime_item.field_num = 43;
		cooltime_item.value = battle_inf.second_skill_cooltime;
	}
  
	res.list.push(item);
	res.list.push(cooltime_item);
  
	battle_inf.special_card_effect = res.list; //set special card's effect.
	
	//send result to client using room name
	io.sockets.in(battle_inf.room_name).emit('data', res);
	
	return 0;
}
/////////////////////////////
//	ZEPHYROS NORMAL EVOLVE
/////////////////////////////
function zephyros_normal_evolve(io,socket, is_first,battle_inf){
	  //change character_inf
	  
	  var char_inf = config.newCharacterInf();
	  
	  if(is_first == true){ //if user is first
	    if(battle_inf.first_character.title == ' '){//title is match
	      if(battle_inf.first_character.level == 1){ //evolve to level 2
	          battle_inf.first_character.base_atk = 25;
	          battle_inf.first_character.base_def = 5;
	          battle_inf.first_character.base_max_hp = 240;
	          battle_inf.first_character.level = 2;     
	          battle_inf.first_character.mark = 4;
	      }
	      else if(battle_inf.first_character.level == 2){ //evolve to level 3
	          battle_inf.first_character.base_atk = 30;
	          battle_inf.first_character.base_def = 10;
	          battle_inf.first_character.base_max_hp = 250;
	          battle_inf.first_character.level = 3;      
	          battle_inf.first_character.mark = 4;
	      }
	      else{
	          battle_inf.first_character.base_atk = 50;
	          battle_inf.first_character.base_def = 15;
	          battle_inf.first_character.base_max_hp = 260;
	          battle_inf.first_character.level = 4;        
	      }
	    }
	    else{ //title not match - evolve to level 1
	          battle_inf.first_character.base_atk = 25;
	          battle_inf.first_character.base_def = 5;
	          battle_inf.first_character.base_max_hp = 240;
	          battle_inf.first_character.level = 2;      
	          battle_inf.first_character.mark = 4;
	    }
	    
	    var res = config.newResponse();
	    res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	    res.list = [];
	    
	    //make result
	     var item = config.newEffectInf();
	     item.field_num = 4; //first character
	     item.value = battle_inf.first_character;
	     
	     res.list.push(item);
	   
	     //send result to client using room name
	     io.sockets.in(battle_inf.room_name).emit('data', res);
	  }
	  else{ //if user is second
	   if(battle_inf.second_character.title == ' '){//title is match
	      if(battle_inf.second_character.level == 1){ //evolve to level 2
	          battle_inf.second_character.base_atk = 25;
	          battle_inf.second_character.base_def = 5;
	          battle_inf.second_character.base_max_hp = 240;
	          battle_inf.second_character.level = 2;      
	          battle_inf.second_character.mark = 4;
	      }
	      else if(battle_inf.second_character.level == 2){ //evolve to level 3
	          battle_inf.second_character.base_atk = 30;
	          battle_inf.second_character.base_def = 10;
	          battle_inf.second_character.base_max_hp = 250;
	          battle_inf.second_character.level = 3;       
	          battle_inf.second_character.mark = 4;
	      }
	      else{
	          battle_inf.second_character.base_atk = 50;
	          battle_inf.second_character.base_def = 15;
	          battle_inf.second_character.base_max_hp = 260;
	          battle_inf.second_character.level = 4;
	          battle_inf.second_character.mark = 4;
	      }  
	    }
	    else{//title not match - evolve to level 1
	          battle_inf.second_character.base_atk = 25;
	          battle_inf.second_character.base_def = 5;
	          battle_inf.second_character.base_max_hp = 240;
	          battle_inf.second_character.level = 2;    
	          battle_inf.second_character.mark = 4;
	    }
	   
	   var res = config.newResponse();
	   res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	   res.list = [];
	   
	   //make result
	    var item = config.newEffectInf();
	    item.field_num = 33; //second character
	    item.value = battle_inf.second_character;
	    
	    res.list.push(item);
	  
	    //send result to client using room name
	    io.sockets.in(battle_inf.room_name).emit('data', res);
	  
	  }
}
/////////////////////////////
//	BASIC CLOW
/////////////////////////////
//check
function basic_clow_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_character.mark != 4)
			return false;

	}
	else{
		if(battle_inf.second_character.mark != 4)
			return false;
	}
	return true;
}
//equip
function basic_clow_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk + 25;
			battle_inf.first_weapon_mark = 4;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
					
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk + 25;
			battle_inf.second_weapon_mark = 4;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
			
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}
//detach
function basic_clow_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk -25;
			battle_inf.first_weapon_mark = 0;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk - 25;
			battle_inf.second_weapon_mark = 0;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}
/////////////////////////////
//	ENVENOM
/////////////////////////////
//check
function envenom_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_weapon_mark != 4)
			return false;
	}
	else{
		if(battle_inf.second_weapon_mark != 4)
			return false;		
	}
	return true;
}
//equip
function envenom_equip(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var cooltime_item = config.newEffectInf();
	
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 0;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = battle_inf.first_skill_cooltime;
	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 0;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  io.sockets.in(battle_inf.room_name).emit('data', res);
	return;
}
//skill use
function envenom_use(io,socket, is_first ,battle_inf){
	//set result's field
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	var item_status = config.newEffectInf(); //effect of status attack
	var cooltime_item = config.newEffectInf();

	  if(is_first == true){ //if user is first

		   battle_inf.second_poison = 1;
		    
		   item_status.field_num = 47;
		   item_status.value = 1; 
		   res.list.push(item_status);
		   
		   battle_inf.first_skill_cooltime = 3;
		   cooltime_item.field_num = 14;
		   cooltime_item.value = battle_inf.first_skill_cooltime;

	  }
	  else{ //else user is second
		       
		   battle_inf.first_poison = 1;
		       
		   item_status.field_num = 18;
		   item_status.value = 1; 
		   res.list.push(item_status);
		   
			battle_inf.second_skill_cooltime = 3;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  
	  //send result to client using room name
	  io.sockets.in(battle_inf.room_name).emit('data', res);
	return 0;
}
/////////////////////////////
//	BATTER
/////////////////////////////
//check
function batter_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_weapon_mark != 4
				|| battle_inf.first_character.lv < 2)
			return false;
	}
	else{
		if(battle_inf.second_weapon_mark != 4
				|| battle_inf.second_character.lv < 2)
			return false;		
	}
	return true;
}
//equip
function batter_equip(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	
	var cooltime_item = config.newEffectInf();
	
	  if(is_first == true){ //if user is first
			battle_inf.first_skill_cooltime = 0;
			
			cooltime_item.field_num = 14;
			cooltime_item.value = battle_inf.first_skill_cooltime;
	  }
	  else{ //else user is second
		   
			battle_inf.second_skill_cooltime = 0;
			
			cooltime_item.field_num = 43;
			cooltime_item.value = battle_inf.second_skill_cooltime;
		  
	  }
	  res.list.push(cooltime_item);
	  io.sockets.in(battle_inf.room_name).emit('data', res);
	return;
}
//skill use
function batter_use(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	  
	var cooltime_item = config.newEffectInf();
	
	if(is_first == true){ //if user is first
		battle_inf.first_skill_cooltime = 5;
				
		cooltime_item.field_num = 14;
		cooltime_item.value = battle_inf.first_skill_cooltime;
	}
	else{
		battle_inf.second_skill_cooltime = 5;
				
		cooltime_item.field_num = 43;
		cooltime_item.value = battle_inf.second_skill_cooltime;
	}
	 res.list.push(cooltime_item);
	
	var rand = parseInt(Math.random() * 4);
	  
	  return rand * 10;
}

/////////////////////////////
//DETOX_JUICE
/////////////////////////////
function detox_juice(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
    battle_inf.first_poison = 0;
    item.field_num = 18; // first user's damaged hp
    item.value =  battle_inf.first_poison;
  }
  else{ //else user is second
    battle_inf.second_poison = 0;
    item.field_num = 47; // second user's damaged hp
    item.value =  battle_inf.second_poison;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}


/////////////////////////////
//BURN_CREAM
/////////////////////////////
function burn_cream(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
    battle_inf.first_burn = 0;
    item.field_num = 16; // first user's damaged hp
    item.value =  battle_inf.first_burn;
  }
  else{ //else user is second
    battle_inf.second_burn = 0;
    item.field_num = 45; // second user's damaged hp
    item.value =  battle_inf.second_burn;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}

/////////////////////////////
//HAND_WARMER
/////////////////////////////
function hand_warmer(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
    battle_inf.first_frozen = 17;
    item.field_num = 18; // first user's damaged hp
    item.value =  battle_inf.first_frozen;
  }
  else{ //else user is second
    battle_inf.second_frozen = 0;
    item.field_num = 46; // second user's damaged hp
    item.value =  battle_inf.second_frozen;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}

/////////////////////////////
//ARTIFICIAL_TEARS
/////////////////////////////
function artificial_tears(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
    battle_inf.first_dark = 0;
    item.field_num = 20; // first user's damaged hp
    item.value =  battle_inf.first_dark;
  }
  else{ //else user is second
    battle_inf.second_dark = 0;
    item.field_num = 49; // second user's damaged hp
    item.value =  battle_inf.second_dark;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}

/////////////////////////////
//PATCH
/////////////////////////////
function patch(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
    battle_inf.first_paralysis = 0;
    item.field_num = 19; // first user's damaged hp
    item.value =  battle_inf.first_paralysis;
  }
  else{ //else user is second
    battle_inf.second_paralysis = 0;
    item.field_num = 48; // second user's damaged hp
    item.value =  battle_inf.second_paralysis;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}

/////////////////////////////
//VAMPIRE_STONE
/////////////////////////////
function vampire_stone(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
	var opp_item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
    battle_inf.first_damaged_hp = battle_inf.first_damaged_hp - 10;
    item.field_num = 8; // first user's damaged hp
    item.value =  battle_inf.first_damaged_hp;
    
    battle_inf.second_damaged_hp = battle_inf.second_damaged_hp + 20;
    
    opp_item.field_num = 37;
    opp_item.value = battle_inf.second_damaged_hp;
  }
  else{ //else user is second
    battle_inf.second_damaged_hp = battle_inf.second_damaged_hp - 10;
    item.field_num = 37; // second user's damaged hp
    item.value =  battle_inf.second_damaged_hp;
    
    battle_inf.first_damaged_hp = battle_inf.first_damaged_hp + 20;
    
    opp_item.field_num = 8;
    opp_item.value = battle_inf.first_damaged_hp;
  }
  
  res.list.push(item);
  res.list.push(opp_item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}
/////////////////////////////
//CLOTH_ARMOR
/////////////////////////////
//check
function cloth_armor_check(io,socket, is_first ,battle_inf){
		return true;
}
//equip
function cloth_armor_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_def = battle_inf.first_def + 20;
			
			item.field_num = 7; //first atk
			item.value = battle_inf.first_def;
		}
		else{ //else user is second
			battle_inf.second_def = battle_inf.second_def + 20;
			
			item.field_num = 36; //second atk
			item.value = battle_inf.second_def;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}

//detach
function cloth_armor_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_def = battle_inf.first_def - 20;
			
			item.field_num = 7; //first atk
			item.value = battle_inf.first_def;
			
		}
		else{ //else user is second
			battle_inf.second_def = battle_inf.second_def - 20;
			
			item.field_num = 36; //second atk
			item.value = battle_inf.second_def;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
// POWER GLOVE
/////////////////////////////
//check
function power_glove_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_character.mark != 2 || battle_inf.first_character.lv < 2)
			return false;
	}
	else{
		if(battle_inf.second_character.mark != 2 || battle_inf.second_character.lv < 2)
			return false;		
	}
		return true;
}

//equip
function power_glove_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk + 35;
			battle_inf.first_weapon_mark = 2;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk + 35;
			battle_inf.second_weapon_mark = 2;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}

//detach
function power_glove_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk - 35;
			battle_inf.first_weapon_mark = 0;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk - 35;
			battle_inf.second_weapon_mark = 0;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
// TEDDY_PLUS
/////////////////////////////
function teddy_plus_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_character.mark != 1  || battle_inf.first_character.lv < 2)
			return false;
	}
	else{
		if(battle_inf.second_character.mark != 1  || battle_inf.second_character.lv < 2)
			return false;		
	}
	
	return true;
}
//equip
function teddy_plus_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk + 15;
			battle_inf.first_weapon_mark = 1
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk + 15;
			battle_inf.second_weapon_mark = 1
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}

//detach
function teddy_plus_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk - 15;
			battle_inf.first_weapon_mark = 0;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk - 15;
			battle_inf.second_weapon_mark = 0;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
// BUSTER SWORD
/////////////////////////////
//check
function buster_sword_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_character.mark != 3  || battle_inf.first_character.lv < 2)
			return false;
	}
	else{
		if(battle_inf.second_character.mark != 3  || battle_inf.second_character.lv < 2)
			return false;		
	}
	return true;
}
//equip
function buster_sword_equip(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
	
	if(is_first == true){ //if user is first
		battle_inf.first_atk = battle_inf.first_atk + 20;
		battle_inf.first_weapon_mark = 3;
		
		item.field_num = 6; //first atk
		item.value = battle_inf.first_atk;
		
	}
	else{ //else user is second
		battle_inf.second_atk = battle_inf.second_atk + 20;
		battle_inf.second_weapon_mark = 3;
		
		item.field_num = 35; //second atk
		item.value = battle_inf.second_atk;
	}
  
	res.list.push(item);
	
	//send result to client using room name
	io.sockets.in(battle_inf.room_name).emit('data', res);
}
//detach
function buster_sword_detach(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
	
	if(is_first == true){ //if user is first
		battle_inf.first_atk = battle_inf.first_atk - 20;
		battle_inf.first_weapon_mark = 0;
		
		item.field_num = 6; //first atk
		item.value = battle_inf.first_atk;
		
	}
	else{ //else user is second
		battle_inf.second_atk = battle_inf.second_atk - 20;
		battle_inf.second_weapon_mark = 0;
		
		item.field_num = 35; //second atk
		item.value = battle_inf.second_atk;
	}
  
	res.list.push(item);
	
	//send result to client using room name
	io.sockets.in(battle_inf.room_name).emit('data', res);	
}
/////////////////////////////
// CAT CLAW
/////////////////////////////
//check
function cat_clow_check(io,socket, is_first ,battle_inf){
	if(is_first == true){
		if(battle_inf.first_character.mark != 4  || battle_inf.first_character.lv < 3)
			return false;

	}
	else{
		if(battle_inf.second_character.mark != 4  || battle_inf.second_character.lv < 3)
			return false;
	}
	return true;
}
//equip
function cat_clow_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk + 45;
			battle_inf.first_weapon_mark = 4;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
					
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk + 45;
			battle_inf.second_weapon_mark = 4;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
			
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}
//detach
function cat_clow_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_atk = battle_inf.first_atk -45;
			battle_inf.first_weapon_mark = 0;
			
			item.field_num = 6; //first atk
			item.value = battle_inf.first_atk;
			
		}
		else{ //else user is second
			battle_inf.second_atk = battle_inf.second_atk - 45;
			battle_inf.second_weapon_mark = 0;
			
			item.field_num = 35; //second atk
			item.value = battle_inf.second_atk;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}
/////////////////////////////
// RED MEDICINE
/////////////////////////////
function red_medicine(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
    battle_inf.first_damaged_hp = battle_inf.first_damaged_hp - 30;
    item.field_num = 8; // first user's damaged hp
    item.value =  battle_inf.first_damaged_hp;
  }
  else{ //else user is second
    battle_inf.second_damaged_hp = battle_inf.second_damaged_hp - 30;
    item.field_num = 37; // second user's damaged hp
    item.value =  battle_inf.second_damaged_hp;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}

/////////////////////////////
// FLARE BOMB
/////////////////////////////
function flare_bomb(io,socket, is_first,battle_inf){
	  var rand = parseInt(Math.random() * 100);
	  var addStatus = false;
	  
	  //set result's field
	  var res = config.newResponse();
	  res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	  res.list = [];
	  var item_status = config.newEffectInf(); //effect of status attack
	  var immune = 0;
	  
	  if(is_first == true){
		  immune =  battle_inf.first_immune_dark +  battle_inf.first_special_card_effect.first_immune_dark + battle_inf.second_special_card_effect.first_immune_dark;
	  }
	  else{
		  immune =  battle_inf.second_immune_dark +  battle_inf.first_special_card_effect.second_immune_dark + battle_inf.second_special_card_effect.second_immune_dark;
	  }
	  
	  
	  if(rand < (70 - immune) ) //percentage 70.
	      addStatus = true;
	  
	  if(is_first == true){ //if user is first
	    
	      if(addStatus == true){
	        battle_inf.second_dark = 1;
	        
	        item_status.field_num = 49; //dark
	        item_status.value = 1; 
	        res.list.push(item_status);
	      }
	  }
	  else{ //else user is second
	    
	       if(addStatus == true){
	          battle_inf.first_dark = 1;
	          
	          item_status.field_num = 20;
	          item_status.value = 1; 
	          res.list.push(item_status);
	       }
	  }

	  //send result to client using room name
	  io.sockets.in(battle_inf.room_name).emit('data', res);
}

/////////////////////////////
// DOUBLE_EDGED_SWORD
/////////////////////////////
function double_edged_sword(io,socket, is_first ,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
	var hp_item = config.newEffectInf();
		
	if(is_first == true){ //if user is first
		battle_inf.first_special_card_effect.first_atk =  battle_inf.first_special_card_effect.first_atk + 40; //set special card's effect.		
		item.field_num = 61;
		item.value = battle_inf.first_special_card_effect;
		
		battle_inf.first_damaged_hp = battle_inf.first_damaged_hp + 20;
		hp_item.field_num = 8; // first user's damaged hp
	    hp_item.value =  battle_inf.first_damaged_hp;
	}
	else{ //else user is second
		battle_inf.second_special_card_effect.second_atk = battle_inf.second_special_card_effect.second_atk + 40; //set special card's effect.		
		item.field_num = 62;
		item.value = battle_inf.second_special_card_effect;
		
		battle_inf.second_damaged_hp = battle_inf.second_damaged_hp + 20;
		hp_item.field_num = 37; // second user's damaged hp
	    hp_item.value =  battle_inf.second_damaged_hp;
	}
  
	res.list.push(item);
	res.list.push(hp_item);
  
	//send result to client using room name
	io.sockets.in(battle_inf.room_name).emit('data', res);

}
/////////////////////////////
// STRANGE PORTION
/////////////////////////////
function strange_portion(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();

  if(is_first == true){ //if user is first
	  if(battle_inf.first_damaged_hp - 50 > 0)
		  battle_inf.first_damaged_hp = battle_inf.first_damaged_hp - 50;
	  else 
		  battle_inf.first_damaged_hp = 0;
    item.field_num = 8; // first user's damaged hp
    item.value =  battle_inf.first_damaged_hp;
  }
  else{ //else user is second
	  if( battle_inf.second_damaged_hp - 50 > 0)
		  battle_inf.second_damaged_hp = battle_inf.second_damaged_hp - 50;
	  else
		  battle_inf.second_damaged_hp = 0;
    item.field_num = 37; // second user's damaged hp
    item.value =  battle_inf.second_damaged_hp;
  }
  
 res.list.push(item);

	var rand = parseInt(Math.random() * 100);
	
	if(rand < 40){
		var status_item = config.newEffectInf();
		if(is_first == true){
			battle_inf.first_poison = 1;
			status_item.field_num = 18;
			status_item.value = 1;
		}
		else{
			battle_inf.second_poison = 1;
			status_item.field_num = 47;
			status_item.value = 1;
		}
		
		res.list.push(status_item);
	}
		 
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}
/////////////////////////////
// THORNY BUSH
/////////////////////////////
//check
function thorny_bush_check(io,socket, is_first ,battle_inf){
	return true;
}

//equip
function thorny_bush_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var turn_item = config.newEffectInf();
		var percent_item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_reflect_damage_turn = battle_inf.first_reflect_damage_turn + 5;
			battle_inf.first_reflect_damage_percent = battle_inf.first_reflect_damage_percent + 50;
			
			turn_item.field_num = 30; //first atk
			turn_item.value =battle_inf.first_reflect_damage_turn;
			
			percent_item.field_num = 31;
			percent_item.value = battle_inf.first_reflect_damage_percent;
		}
		else{ //else user is second
			battle_inf.second_reflect_damage_turn = battle_inf.second_reflect_damage_turn + 5;
			battle_inf.second_reflect_damage_percent = battle_inf.second_reflect_damage_percent + 50;
			
			turn_item.field_num = 59; //second atk
			turn_item.value = battle_inf.second_reflect_damage_turn;
			
			percent_item.field_num = 60;
			percent_item.value = battle_inf.second_reflect_damage_percent;			
		}
	  
		res.list.push(turn_item);
		res.list.push(percent_item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}
	
//detach
function thorny_bush_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var turn_item = config.newEffectInf();
		var percent_item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			if(battle_inf.first_reflect_damage_turn - 5 > 0)
				battle_inf.first_reflect_damage_turn = battle_inf.first_reflect_damage_turn - 5;
			else
				battle_inf.first_reflect_damage_turn = 0;
			
			battle_inf.first_reflect_damage_percent = battle_inf.first_reflect_damage_percent - 50;
			
			turn_item.field_num = 30; //first atk
			turn_item.value =battle_inf.first_reflect_damage_turn;
			
			percent_item.field_num = 31;
			percent_item.value = battle_inf.first_reflect_damage_percent;
		}
		else{ //else user is second
			if(battle_inf.second_reflect_damage_turn - 5 > 0)
				battle_inf.second_reflect_damage_turn = battle_inf.second_reflect_damage_turn - 5;
			else
				battle_inf.second_reflect_damage_turn = 0;
			battle_inf.second_reflect_damage_percent = battle_inf.second_reflect_damage_percent - 50;
			
			turn_item.field_num = 59; //second atk
			turn_item.value = battle_inf.second_reflect_damage_turn;
			
			percent_item.field_num = 60;
			percent_item.value = battle_inf.second_reflect_damage_percent;			
		}
	  
		res.list.push(turn_item);
		res.list.push(second_item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
// ALL OR NOTING
/////////////////////////////
function all_or_nothing(io,socket, is_first ,battle_inf){
	
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var rand = parseInt(Math.random() * 100);
	
	var first_item = config.newEffectInf();
	
	var first_hp = battle_inf.first_damaged_hp;
	var second_hp = battle_inf.second_damaged_hp;
	
	if(rand < 50){
		battle_inf.first_damaged_hp = second_hp;
		battle_inf.second_damaged_hp = first_hp;
		
		first_item.field_num = 8; // first user's damaged hp
		first_item.value =  battle_inf.first_damaged_hp;
		second_item.field_num = 37; // second user's damaged hp
		second_item.value =  battle_inf.second_damaged_hp;
		
		res.list.push(first_item);
		res.list.push(second_item);
		
		io.sockets.in(battle_inf.room_name).emit('data', res);	
	}
}

/////////////////////////////
// SLOW MOTION
/////////////////////////////
function slow_motion(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
    battle_inf.second_skill_cooltime = battle_inf.second_skill_cooltime + 1;
    item.field_num = 43; 
    item.value =  battle_inf.second_skill_cooltime;
  }
  else{ //else user is second
    battle_inf.first_skill_cooltime = battle_inf.first_skill_cooltime + 1;
    item.field_num = 14; // second user's damaged hp
    item.value =  battle_inf.first_skill_cooltime;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}
/////////////////////////////
// PURIFY TALISMAN
/////////////////////////////
//check
function purify_talisman_check(io,socket, is_first ,battle_inf){
		return true;
}
//equip
function purify_talisman_equip(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_immune_poison = battle_inf.first_immune_poison + 50;
			
			item.field_num = 27; //first atk
			item.value = battle_inf.first_immune_poison;
		}
		else{ //else user is second
			battle_inf.second_immune_poison = battle_inf.second_immune_poison + 50;
			
			item.field_num = 56; //second atk
			item.value = battle_inf.second_immune_poison ;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);
}

//detach
function purify_talisman_detach(io,socket, is_first ,battle_inf){
		var res = config.newResponse();
		res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
		res.list = [];
		
		var item = config.newEffectInf();
		
		if(is_first == true){ //if user is first
			battle_inf.first_immune_poison = battle_inf.first_immune_poison - 50;
			
			item.field_num = 27; //first atk
			item.value = battle_inf.first_immune_poison;
		}
		else{ //else user is second
			battle_inf.second_immune_poison = battle_inf.second_immune_poison - 50;
			
			item.field_num = 56; //second atk
			item.value = battle_inf.second_immune_poison ;
		}
	  
		res.list.push(item);
		
		//send result to client using room name
		io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
// MAGIC EYE
/////////////////////////////
function magic_eye(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
	
	if(is_first == true){ //if user is first
		item.field_num = 39; //second hand list
		item.value = battle_inf.second_hand_list;
	}
	else{
		item.field_num = 10;
		item.value = battle_inf.first_hand_list;
	}
	
	res.list.push(item);
	
	//send result to client using room name
	io.sockets.in(battle_inf.room_name).emit('data', res);	
}
/////////////////////////////
// QUICK QUICK
/////////////////////////////
function quick_quick(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first
	  if(battle_inf.first_skill_cooltime -1 > 0)
		  battle_inf.first_skill_cooltime = battle_inf.first_skill_cooltime - 1;
	  else
		  battle_inf.first_skill_cooltime = 0;

	  item.field_num = 14; 
	  item.value =  battle_inf.first_skill_cooltime;
  }
  else{ //else user is second
	  if( battle_inf.second_skill_cooltime - 1 > 0 )
		  battle_inf.second_skill_cooltime = battle_inf.second_skill_cooltime - 1;
	  else
		  battle_inf.second_skill_cooltime = 0;
    
	  item.field_num = 43; // second user's damaged hp
	  item.value =  battle_inf.second_skill_cooltime;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);
  
}

/////////////////////////////
// SHUFFLE
/////////////////////////////
function shuffle(io,socket, is_first,battle_inf,hand_index){
	var first_res = config.newResponse();
	first_res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	first_res.list = [];
	var second_res = config.newResponse();
	second_res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	second_res.list = [];	
	var first_item = config.newEffectInf();
	var second_item = config.newEffectInf();
	
	if(is_first == true){ //if user is first
		console.log("======================");
		console.log("======================");
		console.log(battle_inf.first_hand_list);
		for(var i = 0 ; i < battle_inf.first_hand_list.length ; i++ ){
			// if used ? - skip
			var used = false;
			for(var j = 0 ; j < battle_inf.used_list.length ; j++){
				if(i == battle_inf.used_list[j] || i == hand_index){
					used = true;
					break;
				}
			}
			// not used?
			if(used != true){
				// send card drop msg
				battle_inf.first_deck_list.push( battle_inf.first_hand_list[i] );
				
				var detach_msg = config.newResponse(); //send detach msg
				detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
				detach_msg.where = 4; //hand
				detach_msg.index = i;
				detach_msg.deck_id_num = battle_inf.first_hand_list[i].deck_id_num;
				detach_msg.is_first = true;
				
				io.sockets.in(battle_inf.room_name).emit('data', detach_msg);
				
				// get index
				var index = parseInt(Math.random() * (battle_inf.first_deck_list.length-1));
				var indexed_card = battle_inf.first_deck_list[index];
				
				// swap with deck[index]
				battle_inf.first_hand_list[i] = battle_inf.first_deck_list[index];
				battle_inf.first_deck_list.splice(index,1);
			}
		}
		
		console.log("======================");
		console.log("======================");
		console.log(battle_inf.first_hand_list);
		
		// send revised hand card list to client
		first_item.field_num = 10;
		first_item.value = battle_inf.first_hand_list;
		second_item.field_num = 10;
		var list = [];
		for(var i = 0 ; i < battle_inf.first_hand_list.length ; i++){
	        	var unknown_card = config.newCardInf();
					unknown_card.num = -1;
					unknown_card.name = "unknown";
					unknown_card.img_src = "back.png";
					unknown_card.cost = -1;
					unknown_card.type = -1;
					unknown_card.content = "unknown card.";
					
	        		unknown_card.deck_id_num = battle_inf.first_hand_list[i].deck_id_num;
				list.push(unknown_card);
		}
		second_item.value = list;

	}
	else{ //else user is second
		console.log("======================");
		console.log("======================");
		console.log(battle_inf.second_hand_list);
		
		for(var i = 0 ; i < battle_inf.second_hand_list.length ; i++ ){
			// if used ? - skip
			var used = false;
			for(var j = 0 ; j < battle_inf.used_list.length ; j++){
				if(i == battle_inf.used_list[j]  || i == hand_index){
					used = true;
					break;
				}
			}
			// not used?
			if(used != true){
				// send card drop msg
				battle_inf.second_deck_list.push( battle_inf.second_hand_list[i] );
				
				var detach_msg = config.newResponse(); //send detach msg
				detach_msg.MessageNum = config.SERVER_REQUEST_EUQUIP_DETACHED;
				detach_msg.where = 4; //hand
				detach_msg.index = i;
				detach_msg.deck_id_num =  battle_inf.second_hand_list[i].deck_id_num;
				detach_msg.is_first = false;
				
				io.sockets.in(battle_inf.room_name).emit('data', detach_msg);
				
				// get index
				var index = parseInt(Math.random() * (battle_inf.second_deck_list.length-1));
				var indexed_card = battle_inf.second_deck_list[index];
				
				// swap with deck[index]
				battle_inf.second_hand_list[i] = battle_inf.second_deck_list[index];
				battle_inf.second_deck_list.splice(index,1);
			}
		}
		
		console.log("======================");
		console.log("======================");
		console.log(battle_inf.second_hand_list);
		
		// send revised hand card list to client
		second_item.field_num = 39;
		second_item.value = battle_inf.second_hand_list;
		first_item.field_num = 39;
		var list = [];
		for(var i = 0 ; i < battle_inf.second_hand_list.length ; i++){
	        	var unknown_card = config.newCardInf();
					unknown_card.num = -1;
					unknown_card.name = "unknown";
					unknown_card.img_src = "back.png";
					unknown_card.cost = -1;
					unknown_card.type = -1;
					unknown_card.content = "unknown card.";
					
	        		unknown_card.deck_id_num = battle_inf.second_hand_list[i].deck_id_num;
				list.push(unknown_card);
		}
		first_item.value = list;
	}
  
	first_res.list.push(first_item);
	second_res.list.push(second_item);
  
	//send result to client using room name
	io.sockets.socket(battle_inf.first.session_id).emit('data', first_res);
	io.sockets.socket(battle_inf.second.session_id).emit('data',second_res); 
  
}

/////////////////////////////
// NUTRIOUS TONIC
/////////////////////////////
function nutrious_tonic(io,socket, is_first,battle_inf){
	var res = config.newResponse();
	res.MessageNum = config.SERVER_REQUEST_FIELD_CHANGED;
	res.list = [];
	
	var item = config.newEffectInf();
		
  if(is_first == true){ //if user is first

	battle_inf.first_max_hp = battle_inf.first_max_hp + 30;

	  item.field_num = 5; 
	  item.value =  battle_inf.first_max_hp;
  }
  else{ //else user is second

		battle_inf.second_max_hp = battle_inf.second_max_hp + 30;
    
	  item.field_num = 34; // second user's damaged hp
	  item.value =  battle_inf.second_max_hp;
  }
  
 res.list.push(item);
  
  //send result to client using room name
  io.sockets.in(battle_inf.room_name).emit('data', res);	
}

/////////////////////////////
// STEAL
/////////////////////////////
function steal(io,socket, is_first,battle_inf){
	var first_res = config.newResponse();
	first_res.MessageNum = config.SERVER_REQUEST_ATTACHED;
	
	var second_res = config.newResponse();
	second_res.MessageNum = config.SERVER_REQUEST_ATTACHED;
		
	if(is_first == true){ //if user is first
		
		//get hand card from deck
        var index = parseInt( Math.random() * (battle_inf.second_deck_list.length-1));

        //get card from deck and push card to hand list
        battle_inf.first_hand_list.push( battle_inf.second_deck_list[index] );
        //pop card from deck
        battle_inf.second_deck_list.splice(index,1);

		first_res.list = battle_inf.first_hand_list;
		first_res.where = 4;
		first_res.is_first = true;
		first_res.index = battle_inf.first_hand_list.length - 1;
		
		var list = [];
		for(var i = 0 ; i < battle_inf.first_hand_list.length ; i++){
	        	var unknown_card = config.newCardInf();
					unknown_card.num = -1;
					unknown_card.name = "unknown";
					unknown_card.img_src = "back.png";
					unknown_card.cost = -1;
					unknown_card.type = -1;
					unknown_card.content = "unknown card.";
					
	        		unknown_card.deck_id_num = battle_inf.first_hand_list[i].deck_id_num;
				list.push(unknown_card);
		}
		
		second_res.list = list;
		second_res.where = 4;
		second_res.is_first = true;
		second_res.index = battle_inf.first_hand_list.length - 1; 
	}
	else{ //else user is second

        var index = parseInt( Math.random() * (battle_inf.first_deck_list.length-1));

        //get card from deck and push card to hand list
        battle_inf.second_hand_list.push( battle_inf.first_deck_list[index] );
        //pop card from deck
        battle_inf.first_deck_list.splice(index,1);
        
		second_res.list = battle_inf.second_hand_list;
		second_res.where = 4;
		second_res.is_first = false;
		second_res.index = battle_inf.second_hand_list.length - 1;

		var list = [];
		for(var i = 0 ; i < battle_inf.second_hand_list.length ; i++){
	        	var unknown_card = config.newCardInf();
					unknown_card.num = -1;
					unknown_card.name = "unknown";
					unknown_card.img_src = "back.png";
					unknown_card.cost = -1;
					unknown_card.type = -1;
					unknown_card.content = "unknown card.";
					
	        		unknown_card.deck_id_num = battle_inf.second_hand_list[i].deck_id_num;
				list.push(unknown_card);
		}
		
		first_res.list = list;
		first_res.where = 4;
		first_res.is_first = false;
		first_res.index = battle_inf.second_hand_list.length - 1; 
	}
  
	//send result to client using room name
	io.sockets.socket(battle_inf.first.session_id).emit('data', first_res);
	io.sockets.socket(battle_inf.second.session_id).emit('data',second_res); 
}