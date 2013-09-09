var makeroom_pass_state;

function makeroom_dialog_pass(){
    if( makeroom_pass_state == 0){
        makeroom_pass_state = 1;
        $("#makeroom #pass_text").prop('disabled', false);
        $("#makeroom #pass_button").css('background-image', 'url("images/makeroom/lock_lock.png")');    
    }
    else if( makeroom_pass_state == 1 ){
        makeroom_pass_state = 0;
        $("#makeroom #pass_text").prop('disabled', true);
        $("#makeroom #pass_button").css('background-image', 'url("images/makeroom/lock_open.png")'); 
    }
}



function makeroom_dialog_ok(){
        var name = $('#makeroom #title_text').val();
        var pass= "";
        if( makeroom_pass_state == 1){
            pass = $('#makeroom #pass_text').val();
        }

        var req = new request();
        
        req.room_name = name;
        req.room_pass = pass;
        req.MessageNum = 105;
        
        sock_send_request(req);
}

function server_response_make_room(data)
{
    current_room_inf = data.room_inf;
    room_init();
}

function makeroom_dialog_off(){
    $("#makeroom").css('visibility', 'hidden');
}
