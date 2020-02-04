$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-box">
           <div class="upper-box__name">
             ${message.user_name}
           </div>
           <div class="upper-box__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-box">
           <p class="lower-box__text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-box">
           <div class="upper-box__name">
             ${message.user_name}
           </div>
           <div class="upper-box__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-box">
           <p class="lower-box__text">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
  }  
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);      
       $('form')[0].reset();
       $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
  })
  .fail(function() {
    alert('error');
  })
  .always(function() {
    $('.form__submit').prop('disabled', false);
  });
  })
});