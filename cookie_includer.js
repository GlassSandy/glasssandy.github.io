document.addEventListener("DOMContentLoaded", function() {
    fetch('/cookie_modal.html')
      .then(resp => resp.text())
      .then(html => {
        document.getElementById('cookie-modal-placeholder').innerHTML = html;
  
        // После вставки HTML сразу подключаем cookie скрипт
        initCookieModal();
      })
      .catch(err => console.error('Include failed', err));
  });