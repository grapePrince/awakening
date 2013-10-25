var socket = io.connect('lattetime.cafe24.com:9999');

//when socket is connected
socket.on('connect', function() {
    console.log(this.socket.sessionid);
    //client's session id
});

socket.on('data', function(data) {
    console.log(data);

    switch( parseInt(data.MessageNum,10) ) {
        case SERVER_RESPONSE_LOGIN   :      //102      
            server_response_login(data);
            break;
        case SERVER_RESPONSE_GO_BATTLE_LOBBY  : //104
            server_response_go_battle_loby(data);
           	break;
		case SERVER_RESPONSE_MAKE_ROOM  : //106
              server_response_make_room(data);
              break;	 
        case SERVER_RESPONSE_CLOSE_ROOM  : //110
              server_response_close_room(data);
              break;                
        case SERVER_REQUEST_ADDROOM  : //111
              server_request_addroom(data);
              break;	    
        case SERVER_RESPONSE_PARTICIPATE  : //108
              server_response_participate(data);
              break;     
        case SERVER_REQUEST_UPDATE_ROOM_INF  : //112
              server_response_update_room_inf(data);
              break;                 
        case  SERVER_RESPONSE_STARTBATTLE : //202
            server_response_startbattle(data);
            break;
        case SERVER_RESPONSE_CARD_USE : //216
            server_response_card_used();
            break;
        case SERVER_REQUEST_FIELD_CHANGED : //204
            server_request_field_change(data.list);
            break;
        case SERVER_REQUEST_EUQUIP_DETACHED : //208
        
        	break;
        case SERVER_REQUEST_ATTACHED : //215
        	server_request_attached(data.list,data.where,data.index,data.is_first);
        	break;
        case SERVER_RESPONSE_ATTACK: //211
        	
        	break;
        case SERVER_RESPONSE_ATTACK_FAILED: //211
            
            break;
    }
});

function newRequest() {
	 var req = new request();
        req.user_id = my_user_information.id;
        req.MessageNum = 100;
}

function sock_send_request(req) {
    var id = my_user_information.id ;
    req.user_id = id;
    console.log(req);
    socket.emit('data', req);
}
