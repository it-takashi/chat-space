$(function(){

  function always() {
    $('.form__submit').prop('disabled', false);
    $('#new_message')[0].reset();
  }

  var box = $(".main-chat__message-list");

  function buildHTML(message) {
    if ( message.image ) {
      var html = `<div class="main-chat__message-list__box" data-message-id=${message.id}>
                    <div class="main-chat__message-list__box__comment-info">
                      <div class="main-chat__message-list__box__comment-info__name">
                        ${message.user_name}
                      </div>
                      <div class="main-chat__message-list__box__comment-info__day">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main-chat__message-list__box__comment">
                      <p>
                      ${message.content}
                      </p>
                      <img class="lower-message__image" src=${message.image} >
                    </div>
                  </div>`
      return html;
    } else {
      var html =
        `<div class="main-chat__message-list__box" data-message-id=${message.id}>
          <div class="main-chat__message-list__box__comment-info">
            <div class="main-chat__message-list__box__comment-info__name">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__box__comment-info__day">
            ${message.created_at}
              </div>
          </div>
          <div class="main-chat__message-list__box__comment">
            <p>
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
    var url = $(this).attr('action');

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
      box.append(html);
      box.animate({ scrollTop: box[0].scrollHeight});
      // always()
    })

    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
    always()
  })


  var reloadMessages = function() {
    var last_message_id = $('.main-chat__message-list__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        box.append(insertHTML);
        box.animate({ scrollTop: box[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error')
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});