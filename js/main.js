
  //====================== MAIN CONTROL ========================
  var CLIENT_REQUEST_LOGIN = 101;
  var SERVER_RESPONSE_LOGIN = 102;
  var CLENT_REQUEST_GO_BATTLE_LOBBY = 103;
  var SERVER_RESPONSE_GO_BATTLE_LOBBY = 104;
  var CLIENT_REQUEST_MAKE_ROOM = 105;
  var SERVER_RESPONSE_MAKE_ROOM = 106;
  var CLIENT_REQUEST_PARTICIPATE = 107;
  var SERVER_RESPONSE_PARTICIPATE = 108;;
  var CLIENT_REQUEST_CLOSE_ROOM = 109;;
  var SERVER_RESPONSE_CLOSE_ROOM = 110;;
  var SERVER_REQUEST_ADDROOM = 111; 
  var SERVER_REQUEST_UPDATE_ROOM_INF = 112; 
  var CLIENT_REQUEST_GO_DECK_CONFIG = 113;
  var SERVER_RESPONSE_GO_DECK_CONFIG = 114;
  var CLIENT_REQUEST_DECK_CARD_MOVE_CHECK = 115;
  var SERVER_RESPONSE_DECK_CARD_MOVE_CHECK = 116;
  var CLIENT_REQUEST_CHARACTER_CHANGE = 117;
  var SERVER_RESPONSE_CHARACTER_CHANGE = 118;
  var CLIENT_REQUEST_AVAILABLE_CHARACTER = 119;
  var SERVER_RESPONSE_AVAILABLE_CHARACTER = 120;
  var CLIENT_REQUEST_DECK_CHANGE = 121;
  var SERVER_RESPONSE_DECK_CHANGE = 122;
  var CLIENT_REQUEST_GO_WORLD_MAP = 123;
  var SERVER_RESULT_GO_WORLD_MAP = 124;
  //======================= BATTLE CONTROL=======================
  var CLIENT_REQUEST_STARTBATTLE = 201;
  var SERVER_RESPONSE_STARTBATTLE = 202;
  var CLIENT_REQUEST_CARD_USE = 203;
  var SERVER_REQUEST_FIELD_CHANGED = 204;
  var SERVER_RESPONSE_CARD_USE_FAILED = 205;
  var SERVER_RESPONSE_SPECIAL_USE = 206;
  var SERVER_REQUEST_SPECIAL_BACK = 207;
  var SERVER_REQUEST_EUQUIP_DETACHED = 208;
  var CLIENT_REQUEST_TURNEND = 209;
  var SERVER_RESPONSE_ATTACK_FAILED = 210;
  var SERVER_RESPONSE_ATTACK = 211;
  var SERVER_REQUEST_TURN_END = 212;
  var SERVER_REQUEST_STATUS_EFFECTS = 213;
  var SERVER_REQUEST_GAME_END = 214;
  var SERVER_REQUEST_ATTACHED = 215;
  var SERVER_RESPONSE_CARD_USE = 216;
  
  //var SERVER_RESPONSE_TURNEND = 209;
  //var SERVER_REQUEST_DESTROY = 210;
  //var SERVER_REQUEST_PASSIVESKILL = 211;

  //======================== ADVENTURE CONTROL =============================
  var CLIENT_REQUEST_GO_TO_FIELD = 301;
  var SERVER_RESULT_GO_TO_FIELD = 302;
  var CLIENT_REQUEST_EXPLORE_FLOOR = 303;
  var SERVER_RESULT_EXPLORE_FLOOR = 306;
  var CLIENT_REQUEST_FIELD_BATTLE_START = 304;
  var SERVER_RESPONSE_FIELD_BATTLE_START = 305;
  var CLIENT_REQUEST_FIELD_BATTLE_TURN_END = 307;
  var SERVER_RESPONSE_FIELD_BATTLE_TURN_END = 308;
  var SERVER_REQUEST_FIELD_BATTLE_RESULT = 309;
  var SERVER_REQUEST_FIELD_ADVENTURE_END = 310;
  var SERVER_RESPONSE_MY_TURN_RESULT = 311;
  var SERVER_RESPONSE_OPP_TURN_RESULT = 312;



var CHARACTER_NAME_IMAGE =[
    'url("images/room/choco.png")'
    , 'url("images/room/iter.png")'
    , 'url("images/room/leo.png")'
    , 'url("images/room/zephyros.png")'
];

var my_selected_deck = new deckInf();
var my_user_information = new userInf();
var my_room_list = new Array();
var current_room_inf = new roomInf();


function hide_all(){
    $("#login").hide();
    $("#loby").hide();
    $("#makeroom").hide();
    $("#enterroom").hide();
    $("#room").hide();
    $("#basecamp").hide();
    $("#battle").hide();
}


function request() {
    var MessageNum;
    var user_id;
}

function userInf() {
    var session_id;
    var id;
    var name;
    var main_character_num;
    var lv;
    var cost;
    var money;
    var win_num;
    var lose_num;
}

function deckInf() {
    var main_character;
    var deck_list = [];
    var deck_name;
}

function cardInf() {
    var num;
    var name;
    var img_src;
    var cost;
    var type;
    var content;

}

function roomInf() {
    var name;
    var host_inf  = new userInf();
    var password;
    var client_inf = new userInf();
    var num;
    var is_idle;
    var subject;
}

function characterInf() {
    var num;
    var name;
    var title;
    var base_atk;
    var base_def;
    var base_max_hp;
    var level;
    var src;
}
