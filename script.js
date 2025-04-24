
let cart = [];

let deliveryCost = 5.00;
    


function init() {
    renderDishes();
    renderCart();
}

function renderDishes() {
    let contentRef = document.getElementById('content-wrapper');
    contentRef.innerHTML = "";
    contentRef.innerHTML += getRestaurantTemplate();

    for (let category in myRestaurant.menu) {
        contentRef.innerHTML += getMenuTemplate(category, myRestaurant.menu[category]);
    }

      let dishes = document.getElementsByClassName('dish');
      for (let i = 0; i < dishes.length; i++) {
          dishes[i].addEventListener('click', function () {
              let name = this.querySelector('h4').innerText;
              let priceText = this.querySelector('.dish-price').innerText;
              let price = parseFloat(priceText.replace('€', '').replace(',', '.'));
  
              addToCart(name, price);
          });
      }
  }

  function addToCart(name, price) {
    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    renderCart();
    renderMobileCart();
    updateMobileCartTotal();
}

function renderCart() {
    let overlayRef = document.getElementById('overlay');
    if (!overlayRef) {
        console.error("Overlay-Element nicht gefunden");
        return;
    }

    overlayRef.classList.remove('d_none'); 


    let subtotal = calculateSubtotal();
    let deliveryCost = 5.00;
    let total = subtotal + deliveryCost;

    overlayRef.innerHTML = `
    <h2 class="cart-position">Warenkorb</h2>
    <div id="cart-items"></div>
    <div class="cart-summary">
        <div class="cart-line">
            <span>Zwischensumme</span>
            <span>${subtotal.toFixed(2)} €</span>
        </div>
        <div class="cart-line">
            <span>Lieferkosten</span>
            <span>${deliveryCost.toFixed(2)} €</span>
        </div>
        <div class="cart-line">
            <strong>Gesamt</strong>
            <strong>${total.toFixed(2)} €</strong>
        </div>
    </div>
`;

    updateCart();
}

function updateCart() {
    let cartItemsRef = document.getElementById('cart-items');
    cartItemsRef.innerHTML = "";

    if (cart.length === 0) {
        cartItemsRef.innerHTML = `
        <img class="shopping-bag" src="./icons/shopping-bag.png">
        <p>Wähle leckere Gerichte aus der Karte und bestelle Dein Menü.</p>`;
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        cartItemsRef.innerHTML += `
        <div class="cart-items">
            <div class="cart-item-title">
                <h4>${item.name}</h4>
            </div>
            <div class="cart-item-controls">
                <img class="cart-items-position" onclick="decreaseQuantity(${i})" src="./icons/minus.png">
                <span>${item.quantity}x</span>
                <img class="cart-items-position" onclick="increaseQuantity(${i})" src="./icons/plus.png">
                <span>${(item.price * item.quantity).toFixed(2)}€</span>
                <img class="cart-items-position" onclick="removeFromCart(${i})" src="./icons/trash.png">
            </div>
        </div>
    `;
    }
}

function increaseQuantity(index) {
    cart[index].quantity++;
    renderCart();
    renderMobileCart();
    updateMobileCartTotal();
    updateMobileCartSummary();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    renderCart();
    renderMobileCart();
    updateMobileCartTotal();
    updateMobileCartSummary();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
    renderMobileCart();
    updateMobileCartTotal();
    updateMobileCartSummary();
}

function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateTotal() {
    return calculateSubtotal() + deliveryCost;
}


function getRestaurantTemplate() {
    return `
        <div class="restaurant-container">
            <img class="restaurant-img" src="${myRestaurant.cover}">
            <img class="profile-img" src="${myRestaurant.profile}">
        </div>
        <div class="order-information-container">
            <div class="order-information">
                <h2>${myRestaurant.restaurant}</h2>
                <span class="recession-info">${myRestaurant.recession}</span>
            </div>
            <div class="toggle-menu-container">
                <img class="arrow-icon" src="./icons/arrow.png">
                <a href="#" class="category-links" data-target="pizza">Pizza</a>
                <a href="#" class="category-links" data-target="pasta">Pasta</a>
                <a href="#" class="category-links" data-target="salad">Salad</a>
                <a href="#" class="category-links" data-target="dessert">Dessert</a>
                <a href="#" class="category-links" data-target="drinks">Drinks</a>
            </div>
        </div>
    `;
}

function getMenuTemplate(categoryName, categoryData) {
    let html = `
            <div class="category-bg" id="${categoryName}" style="background-image: url('${categoryData.cover}')"></div>
            <div class="category-content">
                <h3>${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h3>
            </div>
    `;

    for (let dish of categoryData.dishes) {
        html += `
            <div class="dish">
                <img class="add-icon-dish-category" src="${dish.cover}">
                <h4>${dish.name}</h4>
                <p>${dish.description}</p>
                <p class="dish-price">${dish.price.toFixed(2)}€</p>
            </div>
        `;
    }

    html += `</div>`;

    return html;
}


document.addEventListener('click', function (event) {
    const link = event.target.closest('.category-links');
    if (link) {
        event.preventDefault();
        const targetId = link.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('Ziel-Element nicht gefunden für:', targetId);
        }
    }
});


function injectMobileCartHTML() {
    let html = `
        <button id="open-cart-button" onclick="openResponsiveCart()">
            Warenkorb öffnen (<span id="mobile-cart-total">0.00</span> €)
        </button>
        <div id="mobile-cart-overlay" class="d_none">
        <div class="mobile-cart-header">
            <h2>Warenkorb</h2>
            <div><span onclick="closeResponsiveCart()" class="close">&times;</span></div>
        </div>
        <div id="mobile-cart-items"></div>
        <div class="cart-summary"></div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
}


function openResponsiveCart() {
    let existingOverlay = document.getElementById('mobile-cart-overlay');

    if (!existingOverlay) {
        
    } else {
        existingOverlay.classList.remove('d_none');
    }

    document.getElementById('overlay').classList.add('d_none');
    renderMobileCart();
    updateMobileCartSummary();
}

function closeResponsiveCart() {
    const mobileOverlay = document.getElementById('mobile-cart-overlay');
    if (mobileOverlay) {
        mobileOverlay.classList.add('d_none');
    }
    document.getElementById('overlay').classList.remove('d_none');
}


function renderMobileCart() {
    let container = document.getElementById('mobile-cart-items');
    if (!container) return; 

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="mobile-cart-empty">
                <img src="./icons/shopping-bag.png" alt="Leer">
                <p>Wähle leckere Gerichte aus der Karte und bestelle Dein Menü.</p>
            </div>`;
    } else {
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            container.innerHTML += `
                <div class="cart-items">
                    <div class="cart-item-title">
                        <h4>${item.name}</h4>
                    </div>
                    <div class="cart-item-controls">
                        <img class="cart-items-position" onclick="decreaseQuantity(${i})" src="./icons/minus.png">
                        <span>${item.quantity}x</span>
                        <img class="cart-items-position" onclick="increaseQuantity(${i})" src="./icons/plus.png">
                        <span>${(item.price * item.quantity).toFixed(2)}€</span>
                        <img class="cart-items-position" onclick="removeFromCart(${i})" src="./icons/trash.png">
                    </div>
                </div>
            `;
        }
    }
}

function updateMobileCartTotal() {
    let totalRef = document.getElementById('mobile-cart-total');
    if (totalRef) {
        totalRef.innerText = calculateTotal().toFixed(2);
    }
}

function updateMobileCartSummary() {
    const subtotal = calculateSubtotal();
    const deliveryCost = 5.00;
    const total = subtotal + deliveryCost;

    const summaryRef = document.querySelector('#mobile-cart-overlay .cart-summary');
    if (summaryRef) {
        summaryRef.innerHTML = `
            <div class="cart-line">
                <span>Zwischensumme</span>
                <span>${subtotal.toFixed(2)} €</span>
            </div>
            <div class="cart-line">
                <span>Lieferkosten</span>
                <span>${deliveryCost.toFixed(2)} €</span>
            </div>
            <div class="cart-line">
                <strong>Gesamt</strong>
                <strong>${total.toFixed(2)} €</strong>
            </div>
        `;
    }
}

injectMobileCartHTML();

