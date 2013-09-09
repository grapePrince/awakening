
    function send_login(){
        var id = $("#input_id").val();
        var pass = $("#input_pw").val();
        var req = new request();
        
        req.user_id = id;
        req.user_password = pass;
        req.MessageNum = CLIENT_REQUEST_LOGIN  ;
      
        console.log(req);
        socket.emit('data', req);       
 
      }
   
    function send_join(){
       
      }
       
    function login_init(){
        $('#login #input_id').val("");
        $('#login #input_pw').val("");
         $('#loby').hide();
         $("#login").show();
      }   
       
   function server_response_login(data){
       if( data ){
           if( data.is_login_success ){
               my_selected_deck = data.selected_deck;
               my_user_information = data.user_information;
               loby_init(); 
           }     
           else { 
               console.log('로그인 실패')
           }
       }
       else {
           console.log('데이터가 존재하지 않습니다.')
       }    		
   }
   
  
