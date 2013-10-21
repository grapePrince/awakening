function camp_init() {
 

    $("#basecamp #char_img").css('background-image', 'url('+  "images/character/"+my_selected_deck.main_character.src+"_bust.png"  +')'  );
    $("#basecamp #charname_word").text(""+ my_selected_deck.main_character.name);
    
   $("#basecamp #userid_word").text("" + my_user_information.id);
    $("#basecamp #lv_word").text("Lv_  " + my_user_information.lv);
    $("#basecamp #cost_word").text("Cost_  " + my_user_information.cost);
    $("#basecamp #gold_word").text("Gold_  " + my_user_information.money);

    hide_all();
    $("#basecamp").show();
}

function go_battlezone() {
    loby_init();
}

