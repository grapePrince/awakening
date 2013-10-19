var makeroom_pass_state;

var enterroom_room_item;

function server_response_participate(data) {
    if(  data.is_success == 1) {
        current_room_inf = enterroom_room_item ;
        room_init();
    }
}

function enterroom_init(_room_item){
    enterroom_room_item = _room_item;
    $('#enterroom #pass_text').val("");
    $('#enterroom').show();
}

function enterroom_dialog_ok(){
        var req = new request();
        req.room_name = enterroom_room_item.name;
        req.room_pass = $('#enterroom #pass_text').val();
        req.MessageNum = CLIENT_REQUEST_PARTICIPATE;
        sock_send_request(req);
}
function enterroom_dialog_off(){
    $("#enterroom").hide();
}


function makeroom_dialog_on() {
    makeroom_pass_state = 1;
    $("#makeroom #title_text").val("");
    $("#makeroom #pass_text").val("");
    $("#makeroom").show();
}


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
