
let cart = [];

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
        <div id="cart-items">
        <img class="cart-items-position" src="./icons/minus.png">
        <img class="cart-items-position" src="./icons/plus.png">
        <img class="cart-items-position" src="./icons/trash.png">
        </div>
        <div class="cart-summary">
            <p>Zwischensumme ${subtotal.toFixed(2)} €</p>
            <p>Lieferkosten ${deliveryCost.toFixed(2)} €</p>
            <p id="cart-total"><strong>Gesamt ${total.toFixed(2)} €</strong></p>
        </div>
    `;

    updateCart();
}

function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
                <img class="add-icon-dish-category" src="./icons/plus-bold.png">
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