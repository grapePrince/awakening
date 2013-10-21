

function room_init() {

    $("#room #roomname_word").text("" + current_room_inf.subject);

    $("#room #userInf_image_guest").css('visibility', 'hidden');
    $("#room #userInf_words_guest").css('visibility', 'hidden');
    $("#room #character_name_guest ").css('visibility', 'hidden');
    $("#room #character_image_guest").css('visibility', 'hidden');
    $("#room #battlestart_button").css('visibility', 'hidden');
        
    if (current_room_inf.host_inf != -1) {
       $("#room #character_image_host").css('background-image', 'url('+  "images/character/"+current_room_inf.host_inf.character_inf.src+"_default_standing.png"  +')'  );
       $("#room #character_name_host").text( current_room_inf.host_inf.character_inf.src.toUpperCase() );
        
       // $("#room #character_image_host").css('background-image', 'url('+  "images/character/_default_standing.png"  +')'  );
        //$("#room #character_name_host").text( "Choco" );
        
        $("#room #userid_word_host").text("" + current_room_inf.host_inf.id);
        $("#room #userlevel_word_host").text("" + current_room_inf.host_inf.lv);
        $("#room #userwin_word_host").text("" + current_room_inf.host_inf.win_num);
        $("#room #userlose_word_host").text("" + current_room_inf.host_inf.lose_num);
    } else {
        console.log('host가 없다니 이상하군요');
    }

    if (current_room_inf.client_inf != -1) {
       $("#room #character_image_guest").css('background-image', 'url('+  "images/character/"+current_room_inf.client_inf.character_inf.src+"_enemy_standing.png"  +')'  );
       $("#room #character_name_guest").text( current_room_inf.client_inf.character_inf.src.toUpperCase() );
         
        //$("#room #character_image_guest").css('background-image', 'url('+  "images/character/_default_standing.png"  +')'  );
        //$("#room #character_name_guest").text( "Iter" );
      
        $("#room #userid_word_guest").text("" + current_room_inf.client_inf.id);
        $("#room #userlevel_word_guest").text("" + current_room_inf.client_inf.lv);
        $("#room #userwin_word_guest").text("" + current_room_inf.client_inf.win_num);
        $("#room #userlose_word_guest").text("" + current_room_inf.client_inf.lose_num);

        $("#room #userInf_image_guest").css('visibility', 'visible');
        $("#room #userInf_words_guest").css('visibility', 'visible');
        $("#room #character_name_guest ").css('visibility', 'visible');
        $("#room #character_image_guest").css('visibility', 'visible');
     

    }

    //battle start button to host
    if (current_room_inf.host_inf.id == my_user_information.id) {
        $("#room #battlestart_button").css('visibility', 'visible');
    }

    hide_all();
    $("#room").show();
}


function battlestart_btn(){
    var req = new request();
    var name = current_room_inf.name;

    req.room_name = name;
    req.MessageNum = CLIENT_REQUEST_STARTBATTLE;
    
    sock_send_request(req);
}

function server_response_update_room_inf( data ) {
    
    my_room_list = data.room_list;
    loby_show_roomlist();
    
    if (data.room_inf != -1) {
        if (data.room_inf.name == current_room_inf.name) {
            console.log('this is my room update room info');
            current_room_inf = data.room_inf;
            room_init();
        }
    }
    
}




function close_room() {

    var req = new request();
    var name = current_room_inf.name;

    req.room_name = name;
    req.MessageNum = CLIENT_REQUEST_CLOSE_ROOM;
    
    current_room_inf = new roomInf();
    
    sock_send_request(req);
}

