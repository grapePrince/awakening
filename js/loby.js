
function loby_init() {

    $("#user_id").text("" + my_user_information.id);
	$("#user_cost").text(""+my_user_information.cost);
    $("#lv").text("Lv_  " + my_user_information.lv);
    $("#win").text("Win_  " + my_user_information.win_num);
    $("#lose").text("Lose_  " + my_user_information.lose_num);
    $("#gold").text("Gold_  " + my_user_information.money);


    $("#loby #character_image").css('background-image', 'url('+  "images/character/"+my_selected_deck.main_character.src+"_square_145x145.png"  +')'  );
  

    //103. go to loby 를 요청한다.
    var req = new request();
    req.MessageNum = CLENT_REQUEST_GO_BATTLE_LOBBY;
    sock_send_request(req);

    hide_all();
    $("#loby").show();
}


function server_request_addroom(data) {
    if (data) {
        console.log('server request addroom');
        
        my_room_list.push(data.room_inf);
        loby_show_roomlist();
    }
   
}

function loby_show_roomlist(){

    console.log('show roomlist : ', my_room_list);

            $('#loby #room_list').empty();

            for (var i = 0; i < my_room_list.length; i++) {
                $('#loby #room_list').append(createRoomItem(my_room_list[i],  i)) ;
            }
            for (var i = 0; i < my_room_list.length; i++) {
                if (!my_room_list[i].is_idle) {
                    $($("#loby #room_list #background #fullstamp")[i]).css('visibility', 'visible');
                    $($("#loby #room_list #background #enterbutton")[i]).attr("disabled", "disabled");
                }
            }
}

function server_response_close_room(data) {
    if (data) {
        if (data.is_success) {
            my_room_list = data.room_list;
            loby_show_roomlist();
 
            hide_all();
            $("#loby").show();
            

        } else {
          console.log('방 닫기 실패')
          }
      } else {
          console.log('데이터가 존재하지 않습니다.')
    }
}


function server_response_go_battle_loby(data) {
    if (data) {
        if (data.is_go_success) {
            my_room_list = data.room_list;
            loby_show_roomlist();

        } else {
            console.log('로비 이동 실패')
        }
    } else {
        console.log('데이터가 존재하지 않습니다.')
    }
}

function createRoomItem(room_item, num) {

    var back = $("<div id='background'></div>");
    back.append($("<div id='no'></div>"));
    back.append($("<div id='no_word'>" + num + "</div>"));
    back.append($("<div id='listimage_back'></div>"));
    back.append($("<div id='listimage'></div>")
             .css('background-image', 'url('+  "images/character/"+room_item.host_inf.character_inf.src+"_square_100x100.png"  +')'  )     
    );
  
    back.append($("<div id='cost_word'>" + "cost_ "+room_item.host_inf.cost + "</div>"));
    back.append($("<div id='level'></div>"));
    back.append($("<div id='level_word'>" + room_item.host_inf.lv + "</div>"));
    back.append($("<div id='userid'>" + room_item.host_inf.id + "</div>"));
    back.append($("<div id='roomtitle'>" + room_item.subject + "</div>"));
    back.append($("<div id='lock'></div>"));
    back.append($("<div id='enterbutton'></div>").click(function() {
   
        enterroom_init( room_item );

    }));
    back.append($("<div id='fullstamp'></div>"));
    return back;
}

/*
 var my_room_list = new Array();
 var room_item1 = new roomInf();
 room_item1.num = 0;
 room_item1.name = "들어와라 아가야1"
 room_item1.is_idle = 0;
 room_item1.host_inf = new userInf();
 room_item1.host_inf.cost = 20;
 room_item1.host_inf.id = "tul901";
 room_item1.host_inf.lv = 999;
 room_item1.host_inf.name = "초천재님1";
 my_room_list.push(room_item1);

 var room_item2 = new roomInf();
 room_item2.num = 0;
 room_item2.name = "들어와라 아가야2"
 room_item2.is_idle = 1;
 room_item2.host_inf = new userInf();
 room_item2.host_inf.cost = 20;
 room_item2.host_inf.id = "tul902";
 room_item2.host_inf.lv = 999;
 room_item2.host_inf.name = "초천재님2";
 my_room_list.push(room_item2);

 var room_item3 = new roomInf();
 room_item3.num = 0;
 room_item3.name = "들어와라 아가야3"
 room_item3.is_idle = 0;
 room_item3.host_inf = new userInf();
 room_item3.host_inf.cost = 20;
 room_item3.host_inf.id = "tul903";
 room_item3.host_inf.lv = 999;
 room_item3.host_inf.name = "초천재님3";
 my_room_list.push(room_item3);
 */
