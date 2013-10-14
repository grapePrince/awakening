exports.PORT = 9999;
exports.HOST_URL = "http://lattetime.cafe24.com";


  //====================== MAIN CONTROL ========================
  exports.CLIENT_REQUEST_LOGIN = 101;
  exports.SERVER_RESPONSE_LOGIN = 102;
  exports.CLIENT_REQUEST_GO_BATTLE_LOBBY = 103;
  exports.SERVER_RESPONSE_GO_BATTLE_LOBBY = 104;
  exports.CLIENT_REQUEST_MAKE_ROOM = 105;
  exports.SERVER_RESPONSE_MAKE_ROOM = 106;
  exports.CLIENT_REQUEST_PARTICIPATE = 107;
  exports.SERVER_RESPONSE_PARTICIPATE = 108;;
  exports.CLIENT_REQUEST_CLOSE_ROOM = 109;;
  exports.SERVER_RESPONSE_CLOSE_ROOM = 110;;
  exports.SERVER_REQUEST_ADDROOM = 111; 
  exports.SERVER_REQUEST_UPDATE_ROOM_INF = 112; 
  exports.CLIENT_REQUEST_GO_DECK_CONFIG = 113;
  exports.SERVER_RESPONSE_GO_DECK_CONFIG = 114;
  exports.CLIENT_REQUEST_DECK_CARD_MOVE_CHECK = 115;
  exports.SERVER_RESPONSE_DECK_CARD_MOVE_CHECK = 116;
  exports.CLIENT_REQUEST_CHARACTER_CHANGE = 117;
  exports.SERVER_RESPONSE_CHARACTER_CHANGE = 118;
  exports.CLIENT_REQUEST_AVAILABLE_CHARACTER = 119;
  exports.SERVER_RESPONSE_AVAILABLE_CHARACTER = 120;
  exports.CLIENT_REQUEST_DECK_CHANGE = 121;
  exports.SERVER_RESPONSE_DECK_CHANGE = 122;
  exports.CLIENT_REQUEST_GO_WORLD_MAP = 123;
  exports.SERVER_RESULT_GO_WORLD_MAP = 124;
  //======================= BATTLE CONTROL=======================
  exports.CLIENT_REQUEST_STARTBATTLE = 201;
  exports.SERVER_RESPONSE_STARTBATTLE = 202;
  exports.CLIENT_REQUEST_CARD_USE = 203;
  exports.SERVER_REQUEST_FIELD_CHANGED = 204;
  exports.SERVER_RESPONSE_CARD_USE_FAILED = 205;
  exports.SERVER_RESPONSE_SPECIAL_USE = 206;
  exports.SERVER_REQUEST_SPECIAL_BACK = 207;
  exports.SERVER_REQUEST_EUQUIP_DETACHED = 208;
  exports.CLIENT_REQUEST_TURNEND = 209;
  exports.SERVER_RESPONSE_ATTACK_FAILED = 210;
  exports.SERVER_RESPONSE_ATTACK = 211;
  exports.SERVER_REQUEST_TURN_END = 212;
  exports.SERVER_REQUEST_STATUS_EFFECTS = 213;
  exports.SERVER_REQUEST_GAME_END = 214;
  exports.SERVER_REQUEST_ATTACHED = 215;
  exports.SERVER_RESPONSE_CARD_USE = 216;
  
  //exports.SERVER_RESPONSE_TURNEND = 209;
  //exports.SERVER_REQUEST_DESTROY = 210;
  //exports.SERVER_REQUEST_PASSIVESKILL = 211;

  //======================== ADVENTURE CONTROL =============================
  exports.CLIENT_REQUEST_GO_TO_FIELD = 301;
  exports.SERVER_RESULT_GO_TO_FIELD = 302;
  exports.CLIENT_REQUEST_EXPLORE_FLOOR = 303;
  exports.SERVER_RESULT_EXPLORE_FLOOR = 306;
  exports.CLIENT_REQUEST_FIELD_BATTLE_START = 304;
  exports.SERVER_RESPONSE_FIELD_BATTLE_START = 305;
  exports.CLIENT_REQUEST_FIELD_BATTLE_TURN_END = 307;
  exports.SERVER_RESPONSE_FIELD_BATTLE_TURN_END = 308;
  exports.SERVER_REQUEST_FIELD_BATTLE_RESULT = 309;
  exports.SERVER_REQUEST_FIELD_ADVENTURE_END = 310;
  exports.SERVER_RESPONSE_MY_TURN_RESULT = 311;
  exports.SERVER_RESPONSE_OPP_TURN_RESULT = 312;

  
//Data Types
function response() {
  var MessageNum;
  var isSuccess;
}
exports.newResponse = function(){
  return new response();
};
function request() {
  var MessageNum;
  var user_id;
}
exports.newRequest = function(){
  return new request();
};

function userInf(){
  var session_id;
  var id;
  var name;
  var main_character_num;
  var exp;
  var cost;
  var money;
  var win_num;
  var lose_num;
  var lv;
}
exports.newUserInf = function(){
  return new userInf();
};

function deckInf(){
  var main_character;
  var deck_list;
  var deck_name;
}
exports.newDeckInf = function(){
  return new deckInf();
};
function cardInf(){
  var num;
  var name;
  var img_src;
  var cost;
  var type;
  var content;
  var deck_item_num;
  var deck_id_num;
}
exports.newCardInf = function(){
  return new cardInf();
};

function roomInf(){
  var name; //primary key. random string 
  var host_inf;
  var client_inf;
  var password;
  var is_idle;
  //var num;
  var subject; 
}
exports.newRoomInf = function(){
  return new roomInf();
};

function characterInf(){
  var num;
  var name;
  var title;
  var base_atk;
  var base_def;
  var base_max_hp;
  var level;
  var mark;
  var src;
}
exports.newCharacterInf = function(){
  return new characterInf();
};

function battleInf(){
  //first user's fields
  var id; //id of this battle inf. this is random string. primary key.
  var room_name; //name of the room.
  var first;
  var first_character;
  var first_max_hp; //these are additional variables. not base.
  var first_atk;
  var first_def;
  var first_damaged_hp;
  var first_equiped_list;
  var first_hand_list; //*
  var first_tomb_list; //**
  var first_deck_list;  //**
  var first_skill;
  var first_skill_cooltime;
  var first_weapon;
  var first_weapon_mark;
  var first_burn; //abnormal status
  var first_frozen;
  var first_poison;
  var first_paralysis;
  var first_dark;
  var first_block_send_damage_turn; //ignore flags - turn num
  var first_skill_blocked_turn;
  var first_immune_brun; //status abnormal immune value : float, minus from original prob
  var first_immune_frozen;
  var first_immune_poison;
  var first_immune_paralysis;
  var first_immune_dark;
  var first_reflect_damage_turn;
  var first_reflect_damage_percent; //if receive damage, reflect to second n% damage
  //second user's fields
  var second;
  var second_character;
  var second_max_hp;
  var second_atk;
  var second_def;
  var second_damaged_hp;
  var second_equiped_list;
  var second_hand_list; //*
  var second_tomb_list; //**
  var second_deck_list; //**
  var second_skill;
  var second_skill_cooltime;
  var second_weapon;
  var second_weapon_mark;
  var second_burn; //abnormal status
  var second_frozen;
  var second_poison;
  var second_paralysis;
  var second_dark; 
  var second_block_send_damage_turn; //ignore flags - turn num
  var second_skill_blocked_turn;
  var second_immune_brun; //status abnormal immune value : float, minus from original prob
  var second_immune_frozen;
  var second_immune_poison;
  var second_immune_paralysis;
  var second_immune_dark;
  var second_reflect_damage_turn;
  var second_reflect_damage_percent; //if receive damage, reflect to first n% damage
  //global fields 
  var turn_num;
  var is_specialcard_used;
  //var special_card_effect;
  var first_special_card_effect;
  var second_special_card_effect;
  var is_evolutioncard_used;
  
}
exports.newBattleInf = function(){
  return new battleInf();
};

function specialInf(){
	var first_atk;
	var first_def;
	var first_immune_burn;
	var first_immune_frozen;
	var first_immune_poison;
	var first_immune_paralysis;
	var first_immune_dark;
	var first_reflect_damage_percent;
	var second_atk;
	var second_def;
	var second_immune_burn;
	var second_immune_frozen;
	var second_immune_poison;
	var second_immune_paralysis;
	var second_immune_dark;
	var second_reflect_damage_percent;
}
exports.newSpecialInf = function(){
	var res = new specialInf();
	
	res.first_atk = 0;
	res.first_def= 0;
	res.first_immune_burn= 0;
	res.first_immune_frozen= 0;
	res.first_immune_poison= 0;
	res.first_immune_paralysis= 0;
	res.first_immune_dark= 0;
	res.first_reflect_damage_percent= 0;
	res.second_atk= 0;
	res.second_def= 0;
	res.second_immune_burn= 0;
	res.second_immune_frozen= 0;
	res.second_immune_poison= 0;
	res.second_immune_paralysis= 0;
	res.second_immune_dark= 0;
	res.second_reflect_damage_percent= 0;
		
	return res;
};

function effectInf(){
  var field_num;
  var value;
  var show_type;
}

exports.newEffectInf = function(){
  return new effectInf();
};

function fieldInf(){
	var num;
	var name;
	var lv;
	var pos_x;
	var pos_y;
	var img_src; //icon
	var background_src;
	var floor;
	var explorable;
}
exports.newFieldInf = function(){
	return new fieldInf();
};

function floorInf(){
	//	- type	: 	1 -> none
	//				2 -> get card
	//				3 -> start monster battle
	//				4 -> get gold
	var type;
	
	//	- value : null , card_inf , monster_battle_inf, int
	var value;
}
exports.newFloorInf = function(){
	return new floorInf();
};

function fieldExploreInf(){
	// field explore inf
	var session_id;
	var field_inf;
	var material_list;
	var monster_list;
	var current_floor;
	var floor_list;	// - floor_list<floorInf>
}
exports.newFieldExploreInf = function(){
	return new fieldExploreInf();
};

function materialInf(){
	  var num;
	  var name;
	  var img_src;
	  var content;
	  var prob;
	  var gold;
}
exports.newMaterialInf = function(){
	return new materialInf();
};

function monsterInf(){
	var num;
	var name;
	var power;
	var hp;
	var damaged_hp;
	var atk;
	var def;
	var gold;
	var material_list = [];
	var field_num;
	var img_src;
	var r_heal;
	var r_attack;
	var r_defense;
	var r_critical;
	var r_more;
	var r_evolve;
}
exports.newMonsterInf = function(){
	return new monsterInf();
};

function monsterBattleInf(){
	var monster_inf;
	var power;
	var player_char_name;
	var player_char_src;
	var player_max_hp;
	var player_damaged_hp;
	var player_atk;
	var player_def;
	var player_r_heal;
	var player_r_attack;
	var player_r_defense;
	var player_r_critical;
	var player_r_more;
	var player_r_evolve;
}
exports.newMonsterBattleInf = function(){
	return new monsterBattleInf();
};

exports.randomString = function() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 15;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }//document.randform.randomfield.value = randomstring;return randomstring;}
  return randomstring;
};

exports.calculate_lv = function(exp){
	var lv ;
	
	for(lv = 1 ; lv < 999 ; lv++){
		if(exp < (lv+1)*(lv*lv*lv)*1000)
			break;
	}
	
	return lv - 1;
};

exports.calculate_exp = function(lv){
	var exp = 1;
	
	exp = (lv + 1)*(lv*lv*lv)*1000;
	
	return exp;
};


