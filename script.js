const defaultProducts = [
    { id: 1, name: "Vada", price: 15, img: "https://placehold.co/150x100/orange/white?text=Vada", inStock: true },
    { id: 2, name: "Choco Cake", price: 85, img: "https://placehold.co/150x100/5D4037/white?text=Cake", inStock: true },
    { id: 3, name: "Cool Drink", price: 40, img: "https://placehold.co/150x100/2980b9/white?text=Soda", inStock: true },
    { id: 4, name: "Egg Puffs", price: 25, img: "https://placehold.co/150x100/f1c40f/black?text=Puff", inStock: true }
];

let products = JSON.parse(localStorage.getItem('bakeryProducts')) || defaultProducts;

products.forEach(p => { if (p.inStock === undefined) p.inStock = true; });

let cart = [];
let revenue = parseFloat(localStorage.getItem('revenue')) || 0;
let expenses = parseFloat(localStorage.getItem('expenses')) || 0;

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderMgmt(); // Render the management list
    updateDashboard();
    if (document.getElementById('date-display')) {
        document.getElementById('date-display').innerText = new Date().toLocaleDateString();
    }
});

// --- MENU & NAVIGATION ---
function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    nav.classList.toggle('active');
}

function menuAction(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
    document.getElementById(sectionId).classList.add('active-section');
    document.getElementById('nav-menu').classList.remove('active');
}

// --- POS: RENDER BILLING MENU ---
function renderMenu() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => {
        // If out of stock, add special class
        const stockClass = p.inStock ? '' : 'out-of-stock';
        return `
        <div class="product-card ${stockClass}" onclick="addToCart(${p.id})">
            <img src="${p.img}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p style="color:#6D4C41; font-weight:bold;">₹${p.price}</p>
        </div>
    `
    }).join('');
}

// --- POS: CART LOGIC ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    
    
    if (!product.inStock) return;
    
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty++;
    else cart.push({ ...product, qty: 1 });
    renderCart();
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-items');
    const totalEl = document.getElementById('grand-total');
    
    if (cart.length === 0) {
        list.innerHTML = '<p class="empty-msg" style="text-align:center; padding:20px; color:#999;">Cart is empty...</p>';
        totalEl.innerText = "₹0";
        return;
    }
    
    let total = 0;
    list.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <div style="flex:1;">
                    <strong>${item.name}</strong> <br> 
                    <small>₹${item.price}</small>
                </div>
                <div style="display:flex; align-items:center;">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                    <span style="margin:0 8px; font-weight:bold;">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
                <div style="margin-left:10px; font-weight:bold; min-width:40px; text-align:right;">
                    ₹${item.price * item.qty}
                </div>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `;
    }).join('');
    totalEl.innerText = "₹" + total;
}

function clearCart() {
    if (cart.length > 0) {
        if (confirm("Clear current bill?")) {
            cart = [];
            renderCart();
        }
    }
}

// --- INVENTORY MANAGEMENT (NEW FEATURES) ---

// 1. Add New Product
function addNewProduct() {
    const name = document.getElementById('new-name').value;
    const price = parseFloat(document.getElementById('new-price').value);
    const urlInput = document.getElementById('new-img-url').value;
    const finalImg = urlInput ? urlInput : "https://placehold.co/150x100/orange/white?text=" + name;
    
    if (name && price) {
        products.push({ id: Date.now(), name, price, img: finalImg, inStock: true });
        saveAndRender();
        document.getElementById('new-name').value = '';
        document.getElementById('new-price').value = '';
        document.getElementById('new-img-url').value = '';
        alert("Product Added!");
    } else {
        alert("Please enter Name and Price");
    }
}

// 2. Render Management List
function renderMgmt() {
    const list = document.getElementById('management-list');
    list.innerHTML = products.map(p => `
        <div class="mgmt-item">
            <div class="mgmt-info">
                <img src="${p.img}" class="mgmt-img">
                <div>
                    <strong>${p.name}</strong> (₹${p.price})<br>
                    ${p.inStock ? '<span class="in-stock-badge">In Stock</span>' : '<span class="no-stock-badge">Out of Stock</span>'}
                </div>
            </div>
            <div class="mgmt-actions">
                <button class="btn-toggle" onclick="toggleStock(${p.id})">
                    ${p.inStock ? 'Mark Out' : 'Mark In'}
                </button>
                <button class="btn-delete" onclick="deleteProduct(${p.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

// 3. Toggle Stock Status
function toggleStock(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.inStock = !product.inStock;
        saveAndRender();
    }
}

// 4. Delete Product
function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this item permanently?")) {
        products = products.filter(p => p.id !== id);
        saveAndRender();
    }
}

// Helper to save data and refresh all views
function saveAndRender() {
    localStorage.setItem('bakeryProducts', JSON.stringify(products));
    renderMenu(); // Update Billing View
    renderMgmt(); // Update Management List
}

// --- PRINTING ---
function printBill() {
    if (cart.length === 0) return alert("Cart is empty!");
    
    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    revenue += total;
    localStorage.setItem('revenue', revenue);
    updateDashboard();
    
    const printArea = document.getElementById('print-area');
    printArea.innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <h2>🍰 Tea Hub Bakes</h2>
            <p>Palani, Tamil Nadu</p>
            <p>Date: ${new Date().toLocaleString()}</p>
        </div>
        <table style="width:100%; border-collapse:collapse; text-align:left;">
            <tr style="border-bottom:1px solid #000;"><th>Item</th><th>Qty</th><th>Price</th></tr>
            ${cart.map(i => `
                <tr>
                    <td>${i.name}</td>
                    <td>${i.qty}</td>
                    <td>${i.price * i.qty}</td>
                </tr>
            `).join('')}
        </table>
        <h3 style="text-align:right; margin-top:20px;">Total: ₹${total}</h3>
        <p style="text-align:center; margin-top:30px;">Thank You!</p>
    `;
    
    window.print();
    cart = [];
    renderCart();
}

// --- ANALYTICS ---
function addExpense() {
    const val = parseFloat(document.getElementById('expense-amt').value);
    if (val) {
        expenses += val;
        localStorage.setItem('expenses', expenses);
        updateDashboard();
        document.getElementById('expense-amt').value = '';
    }
}

function resetShopData() {
    if (confirm("⚠️ RESET ALL DATA? This cannot be undone.")) {
        revenue = 0;
        expenses = 0;
        localStorage.setItem('revenue', 0);
        localStorage.setItem('expenses', 0);
        updateDashboard();
    }
}

function updateDashboard() {
    if (document.getElementById('total-revenue')) {
        document.getElementById('total-revenue').innerText = revenue;
        document.getElementById('total-expense').innerText = expenses;
        document.getElementById('net-profit').innerText = revenue - expenses;
    }
}