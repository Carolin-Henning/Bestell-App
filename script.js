
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

    overlayRef.innerHTML = getCartHeaderAndSummaryTemplate(subtotal, deliveryCost, total);

    updateCart();
}

function updateCart() {
    let cartItemsRef = document.getElementById('cart-items');
    cartItemsRef.innerHTML = "";

    if (cart.length === 0) {
        cartItemsRef.innerHTML = getEmptyCartTemplate();
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        cartItemsRef.innerHTML += getCartItemTemplate(cart[i], i);
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
    document.body.insertAdjacentHTML('beforeend', getMobileCartHTML());
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
        container.innerHTML = getEmptyMobileCartTemplate();

    } else {
        for (let i = 0; i < cart.length; i++) {
            container.innerHTML += getMobileCartItemTemplate(cart[i], i);
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
    summaryRef.innerHTML = getCartSummaryTemplate(subtotal, deliveryCost);
}


injectMobileCartHTML();

