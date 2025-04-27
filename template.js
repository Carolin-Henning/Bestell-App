
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

function getCartItemTemplate(item, index) {
    return `
        <div class="cart-items">
            <div class="cart-item-title">
                <h4>${item.name}</h4>
            </div>
            <div class="cart-item-controls">
                <img class="cart-items-position" onclick="decreaseQuantity(${index})" src="./icons/minus.png">
                <span>${item.quantity}x</span>
                <img class="cart-items-position" onclick="increaseQuantity(${index})" src="./icons/plus.png">
                <span>${(item.price * item.quantity).toFixed(2)}€</span>
                <img class="cart-items-position" onclick="removeFromCart(${index})" src="./icons/trash.png">
            </div>
        </div>
    `;
}

function getEmptyCartTemplate() {
    return `
        <div class="mobile-cart-empty">
            <img src="./icons/shopping-bag.png" alt="Leer">
            <p>Wähle leckere Gerichte aus der Karte und bestelle Dein Menü.</p>
        </div>
    `;
}

function getCartSummaryTemplate(subtotal, deliveryCost) {
    const total = subtotal + deliveryCost;
    return `
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

function getMobileCartItemTemplate(item, index) {
    return `
        <div class="cart-items">
            <div class="cart-item-title">
                <h4>${item.name}</h4>
            </div>
            <div class="cart-item-controls">
                <img class="cart-items-position" onclick="decreaseQuantity(${index})" src="./icons/minus.png">
                <span>${item.quantity}x</span>
                <img class="cart-items-position" onclick="increaseQuantity(${index})" src="./icons/plus.png">
                <span>${(item.price * item.quantity).toFixed(2)}€</span>
                <img class="cart-items-position" onclick="removeFromCart(${index})" src="./icons/trash.png">
            </div>
        </div>
    `;
}

function getCartHeaderAndSummaryTemplate(subtotal, deliveryCost, total) {
    return `
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
        <button id="order-button-desktop" onclick="placeOrder()" class="order-button">Bestellen</button>
    `;
}

function getMobileCartHTML() {
    return `
        <div id="mobile-cart-container">
            <button id="open-cart-button" onclick="openResponsiveCart()" class="mobile-cart-button">
                Warenkorb öffnen (<span id="mobile-cart-total">0.00</span> €)
            </button>

            <div id="mobile-cart-overlay" class="d_none mobile-cart-overlay">
                <div class="mobile-cart-header">
                    <h2>Warenkorb</h2>
                    <span onclick="closeResponsiveCart()" class="close">&times;</span>
                </div>
                <div id="mobile-cart-items" class="mobile-cart-items"></div>
                <div class="cart-summary mobile-cart-summary"></div>
                <button id="order-button" onclick="placeOrder()" class="order-button">Bestellen</button>
            </div>
        </div>
    `;
}

function getOrderConfirmationMessage() {
    return `
        <div class="order-confirmation-message">
            <p>Testbestellung erfolgreich!<br> Vielen Dank für Ihre Bestellung.</p>
        </div>
    `;
}

function getEmptyMobileCartTemplate() {
    return `
        <div class="mobile-cart-empty">
            <img src="./icons/shopping-bag.png" alt="Leer">
            <p>Wähle leckere Gerichte aus der Karte und bestelle Dein Menü.</p>
        </div>`;
}