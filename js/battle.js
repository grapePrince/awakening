var my_battle_inf;


function server_response_startbattle(data) {
    
    if( data.isSuccess == 1 ){
        my_battle_inf = data.battle_inf;
        init_battle();
    }
 
}

function init_battle() {
    //battle started successfully.
    //see other  init_somthing functions in other .js files.
    //init screen and wait for user's command. 
    
    //please use main.js  , socket.js  also see other .js files.
    
    //if you want  some explain, call me anytime.
    //good luck!     
    
    console.log('battle started!!');
    console.log('my_battle_inf : ', my_battle_inf);
    
    hide_all();
    $("#battle").show();
    
}
