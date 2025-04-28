let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
} catch (e) {
    console.error('Failed to parse cart from localStorage:', e);
    localStorage.removeItem('cart');
}
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartCountElement = document.getElementById('cart-count');

function updateCartCount() {
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    localStorage.setItem('cartCount', cartCount.toString());
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartItems && cartTotal) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center text-gray-600">Your cart is empty.</p>';
            cartTotal.textContent = '0';
            if (checkoutBtn) checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="product-card">
                    <div>
                        <h3>${item.name}</h3>
                        <p>UGX ${item.price.toLocaleString('en-UG')}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-index="${index}" aria-label="Decrease quantity of ${item.name}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-index="${index}" aria-label="Increase quantity of ${item.name}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}" aria-label="Remove ${item.name} from cart">Remove</button>
                </div>
            `).join('');
            cartTotal.textContent = cart
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString('en-UG');
            if (checkoutBtn) checkoutBtn.disabled = false;
        }
    }

    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const button = event.target;
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);
        const page = button.dataset.page || 'default';

        if (!name || isNaN(price) || price <= 0) {
            console.error('Invalid item data:', { name, price });
            alert('Error: Invalid item.');
            return;
        }

        console.log('Adding to cart:', { name, price, page });
        const existingItemIndex = cart.findIndex(item => item.name === name && item.price === price);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push({ name, price, quantity: 1, page });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart for UGX ${price}!`);
        updateCart();
    } else if (event.target.classList.contains('remove-item')) {
        const index = parseInt(event.target.dataset.index);
        cart.splice(index, 1);
        updateCart();
    } else if (event.target.classList.contains('increase-quantity')) {
        const index = parseInt(event.target.dataset.index);
        cart[index].quantity++;
        updateCart();
    } else if (event.target.classList.contains('decrease-quantity')) {
        const index = parseInt(event.target.dataset.index);
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
    }
});

// Update cart on page load
document.addEventListener('DOMContentLoaded', () => {
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
        localStorage.removeItem('cart');
        cart = [];
    }
    updateCart();
});

// Listen for storage changes (e.g., from other tabs)
window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
        try {
            cart = JSON.parse(event.newValue) || [];
            updateCart();
        } catch (e) {
            console.error('Failed to parse updated cart from storage event:', e);
        }
    } else if (event.key === 'cartCount') {
        cartCount = parseInt(event.newValue) || 0;
        if (cartCountElement) cartCountElement.textContent = cartCount;
    }
});

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Theme toggle
function initializeTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    }
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });
}

// Update cart and theme on page load
document.addEventListener('DOMContentLoaded', () => {
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
        localStorage.removeItem('cart');
        cart = [];
    }
    updateCart();
    initializeTheme();
});

// Listen for storage changes (e.g., from other tabs)
window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
        try {
            cart = JSON.parse(event.newValue) || [];
            updateCart();
        } catch (e) {
            console.error('Failed to parse updated cart from storage event:', e);
        }
    } else if (event.key === 'cartCount') {
        cartCount = parseInt(event.newValue) || 0;
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = cartCount;
        });
    } else if (event.key === 'theme') {
        document.documentElement.setAttribute('data-theme', event.newValue || 'light');
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = event.newValue === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode';
        }
    }
});

// Listen for storage changes (e.g., from other tabs)
window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
        try {
            cart = JSON.parse(event.newValue) || [];
            updateCart();
        } catch (e) {
            console.error('Failed to parse updated cart from storage event:', e);
        }
    } else if (event.key === 'cartCount') {
        cartCount = parseInt(event.newValue) || 0;
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = cartCount;
        });
    } else if (event.key === 'theme') {
        document.documentElement.setAttribute('data-theme', event.newValue || 'light');
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = event.newValue === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }
});