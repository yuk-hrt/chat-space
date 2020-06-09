$(function(){
    function buildHTML(message){
      if ( message.image ) {
        let html =
          `<div class="MessageBox" data-message-id=${message.id}>
            <div class="message-list__message-box">
                <div class="message-list__message-info">
                <div class="message-info__user_name">
                    ${message.user_name}
                </div>
                <div class="message-info__date">
                    ${message.created_at}
                </div>
                </div>
                <div class="message-list__message">
                <p class="Message__content">
                    ${message.content}
                </p>
                <img class="Message__image" src="${message.image}">
                </div>
            </div>
          </div>`
        return html;
      } else {
        let html =
        `<div class="MessageBox" data-message-id=${message.id}>
            <div class="message-list__message-box">
            <div class="message-list__message-info">
                <div class="message-info__user_name">
                ${message.user_name}
                </div>
                <div class="message-info__date">
                ${message.created_at}
                </div>
                </div>
                <div class="message-list__message">
                <p class="Message__content">
                ${message.content}
                </p>
            </div>
          </div>
        </div>`
        return html;
      };
    }
  
    $('.form').on('submit', function(e){
      e.preventDefault();
      let formData = new FormData(this);
      let url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        let html = buildHTML(data);
        $('.message-list').append(html);      
        $('form')[0].reset();
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
        $('.form-btn').prop("disabled", false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
        $('.form-btn').prop("disabled", false);
      });
    });
});