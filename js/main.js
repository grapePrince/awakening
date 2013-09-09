
var CLIENT_REQUEST_LOGIN  = 101	;
var SERVER_RESPONSE_LOGIN  = 102;
var CLENT_REQUEST_GO_BATTLE_LOBBY = 103	;
var SERVER_RESPONSE_GO_BATTLE_LOBBY  = 104	;
var CLIENT_REQUEST_MAKE_ROOM  = 105	;
var SERVER_RESPONSE_MAKE_ROOM  = 106	;
var CLIENT_REQUEST_PARTICIPATE  =  107	;
var SERVER_RESPONSE_PARTICIPATE  = 108	;
var CLIENT_REQUEST_CLOSE_ROOM  = 109	;
var SERVER_RESPONSE_CLOSE_ROOM  = 110	;
var SERVER_REQUEST_ADDROOM  = 111	;
var SERVER_REQUEST_UPDATE_ROOM_INF  = 112	;

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
