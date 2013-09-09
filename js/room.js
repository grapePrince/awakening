function room_init() {

    $("#room #roomname_word").text("" + current_room_inf.subject);

    if (current_room_inf.host_inf != -1) {
        $("#room #character_name_host").css('background-image', CHARACTER_NAME_IMAGE[current_room_inf.host_inf.main_character_num]);
        $("#room #userid_word_host").text("" + current_room_inf.host_inf.id);
        $("#room #userlevel_word_host").text("" + current_room_inf.host_inf.lv);
        $("#room #userwin_word_host").text("" + current_room_inf.host_inf.win_num);
        $("#room #userlose_word_host").text("" + current_room_inf.host_inf.lose_num);
    } else {
        console.log('host가 없다니 이상하군요');
    }

    if (current_room_inf.client_inf != -1) {
        $("#room #character_name_guest").css('background-image', CHARACTER_NAME_IMAGE[current_room_inf.client_inf.main_character_num]);
        $("#room #userid_word_guest").text("" + current_room_inf.client_inf.id);
        $("#room #userlevel_word_guest").text("" + current_room_inf.client_inf.lv);
        $("#room #userwin_word_guest").text("" + current_room_inf.client_inf.win_num);
        $("#room #userlose_word_guest").text("" + current_room_inf.client_inf.lose_num);

        $("#room #userInf_image_guest").css('visibility', 'visible');
        $("#room #userInf_words_guest").css('visibility', 'visible');

    }

    //battle start button to host
    if (current_room_inf.host_inf.id == my_user_information.id) {
        $("#room #battlestart_button").css('visibility', 'visible');
        battlestart_button
    }

    $("#loby").hide();
    $("#makeroom").hide();
    $("#room").show();
}

function close_room() {

    var req = new request();
    var name = current_room_inf.name;

    req.room_name = name;
    req.MessageNum = CLIENT_REQUEST_CLOSE_ROOM;

    sock_send_request(req);
}

