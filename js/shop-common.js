

// =======================
// Генерация карточек
// =======================
function generateProductCards(options) {
    const { count, imagePrefix, imageFolder, mount } = options;
    const container = document.querySelector(mount);
  
    if (!container) {
      console.warn(`Element ${mount} did not found`);
      return;
    }
  
    let html = '';
    for (let i = 1; i <= count; i++) {
      let article = `${imagePrefix}${i}`;
  
      // Универсальный путь (всегда от корня сайта)
      let imgSrc = `${imageFolder}${article}.jpg`.replace(/^\/+/, '');
      let shownAbs = new URL(imgSrc, window.location.origin).href;
  
      html += `
        <div class="col s12 m4">
          <div class="card hoverable">
            <div class="card-image">
              <img oncontextmenu="return false;" class="materialboxed anysize_wd" src="${shownAbs}">
              <span class="card-title">
                ${article} 
                <button type="button"
                   class="btn-floating btn-small white add-to-cart"
                   data-article="${article}"
                   data-img="${imgSrc}">
                  <i class="material-icons black-text">add</i>
                </button>
              </span>
            </div>
          </div>
        </div>`;
    }
    container.innerHTML += html;
  }
  
  // =======================
  // Добавление в корзину
  // =======================
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
  
    const article = btn.getAttribute('data-article');
    const imgPath = btn.getAttribute('data-img');
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      article: article,
      imagePath: imgPath, // сохраняем универсальный путь
      quantity: 1,
      comment: ''
    });
  
    localStorage.setItem('cart', JSON.stringify(cart));
    if (window.M && M.toast) {
      M.toast({ html: 'Item is Added + ' });
    }
  });
  
  // =======================
  // Отображение корзины
  // =======================
  function renderCart(mountSelector) {
    const container = document.querySelector(mountSelector);
    if (!container) return;
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    if (cart.length === 0) {
      container.innerHTML = "<p>Cart is Empty</p>";
      return;
    }
  
    let html = `
    <div class="responsive-table">
      <table class="striped centered">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Article</th>
            <th>Quantity</th>
            <th>Comment</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    cart.forEach((item, index) => {
      let fullImg = new URL(item.imagePath.replace(/^\/+/, ''), window.location.origin).href;
      html += `
        <tr>
          <td><img src="${fullImg}" style="max-width:100px"></td>
          <td>${item.article}</td>
          <td>${item.quantity}</td>
          <td>${item.comment || ''}</td>
          <td><button type="button" class="remove-item btn red" data-index="${index}">
                <i class="material-icons">delete</i>
              </button></td>
        </tr>`;
    });
  
    html += "</tbody></table></div>";
    container.innerHTML = html;
  }
  
  // =======================
  // Удаление из корзины
  // =======================
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.remove-item');
    if (!btn) return;
  
    let index = btn.getAttribute('data-index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart('#cartTable');
  });
  