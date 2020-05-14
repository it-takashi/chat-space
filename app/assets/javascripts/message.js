$(function(){

  function buildHTML(message) {
    if ( message.image ) {
      var html = `<div class="main-chat__message-list__box">
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
        `<div class="main-chat__message-list__box">
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
      $('.main-chat__message-list').append(html);
      $('.form__submit').prop('disabled', false);
      $('#new_message')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
    })

    .fail(function(){
      alert("メッセージ送信に失敗しました")
      $('.form__submit').prop('disabled', false);
    })


  })
});