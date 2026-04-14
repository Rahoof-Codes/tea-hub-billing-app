/* ── DATA ─────────────────────────────────────── */
const ADMIN = { user: 'admin', pass: 'admin1234' };

const defaultProducts = [
  { id:1,  name:'Masala Chai',       price:20,  cat:'Beverages', img:'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400', inStock:true },
  { id:2,  name:'Filter Coffee',     price:25,  cat:'Beverages', img:'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=400', inStock:true },
  { id:3,  name:'Cappuccino',        price:60,  cat:'Beverages', img:'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400', inStock:true },
  { id:4,  name:'Cold Coffee',       price:70,  cat:'Beverages', img:'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400', inStock:true },
  { id:5,  name:'Iced Lemonade',     price:35,  cat:'Beverages', img:'https://images.unsplash.com/photo-1543644574-19750f5194ad?w=400', inStock:true },
  { id:6,  name:'Fresh Lime Soda',   price:40,  cat:'Beverages', img:'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400', inStock:true },
  { id:7,  name:'Mango Shake',       price:65,  cat:'Beverages', img:'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400', inStock:true },
  { id:8,  name:'Samosa',            price:15,  cat:'Snacks',    img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', inStock:true },
  { id:9,  name:'Veg Puff',          price:20,  cat:'Snacks',    img:'https://images.unsplash.com/photo-1604908176997-431cfa9e3b87?w=400', inStock:true },
  { id:10, name:'Chicken Puff',      price:30,  cat:'Snacks',    img:'https://images.unsplash.com/photo-1626082840244-92df44abd6ca?w=400', inStock:true },
  { id:11, name:'Medu Vada',         price:18,  cat:'Snacks',    img:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400', inStock:true },
  { id:12, name:'Sandwich',          price:50,  cat:'Snacks',    img:'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', inStock:true },
  { id:13, name:'Butter Bun',        price:18,  cat:'Snacks',    img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', inStock:true },
  { id:14, name:'Croissant',         price:55,  cat:'Bakery',    img:'https://images.unsplash.com/photo-1555507036-ab794f4afe5c?w=400', inStock:true },
  { id:15, name:'Dark Brownie',      price:55,  cat:'Bakery',    img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400', inStock:true },
  { id:16, name:'Blueberry Muffin',  price:65,  cat:'Bakery',    img:'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', inStock:true },
  { id:17, name:'Donut',             price:45,  cat:'Bakery',    img:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', inStock:true },
  { id:18, name:'Banana Bread',      price:70,  cat:'Bakery',    img:'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=400', inStock:true },
  { id:19, name:'Choco Cookie',      price:45,  cat:'Bakery',    img:'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', inStock:true },
  { id:20, name:'Waffle',            price:80,  cat:'Bakery',    img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', inStock:true },
  { id:21, name:'Choco Truffle',     price:85,  cat:'Cakes',     img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', inStock:true },
  { id:22, name:'Strawberry Cake',   price:75,  cat:'Cakes',     img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400', inStock:true },
  { id:23, name:'Red Velvet Slice',  price:90,  cat:'Cakes',     img:'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400', inStock:true },
  { id:24, name:'Cheesecake',        price:95,  cat:'Cakes',     img:'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400', inStock:true },
  { id:25, name:'Pancake Stack',     price:80,  cat:'Specials',  img:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400', inStock:true },
];

/* ── STATE ────────────────────────────────────── */
let products   = JSON.parse(localStorage.getItem('thb_products')) || defaultProducts;
let cart       = [];
let revenue    = parseFloat(localStorage.getItem('thb_revenue'))  || 0;
let expenses   = parseFloat(localStorage.getItem('thb_expenses')) || 0;
let orderCount = parseInt(localStorage.getItem('thb_orders'))    || 0;
let bizOpen    = localStorage.getItem('thb_biz') !== 'closed';
let activeCategory = 'All';

/* ── LOGIN / LOGOUT ───────────────────────────── */
function doLogin() {
  const u = document.getElementById('l-user').value.trim();
  const p = document.getElementById('l-pass').value;
  if (u === ADMIN.user && p === ADMIN.pass) {
    document.getElementById('login-overlay').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    init();
  } else {
    document.getElementById('login-err').style.display = 'block';
    document.getElementById('l-pass').value = '';
  }
}
document.getElementById('l-pass').addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); });
document.getElementById('l-user').addEventListener('keydown', e => { if(e.key==='Enter') document.getElementById('l-pass').focus(); });

function doLogout() {
  document.getElementById('login-overlay').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  document.getElementById('l-user').value = '';
  document.getElementById('l-pass').value = '';
  document.getElementById('login-err').style.display = 'none';
}

/* ── INIT ─────────────────────────────────────── */
function init() {
  document.getElementById('date-disp').textContent = new Date().toDateString();
  document.getElementById('stat-date').textContent = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  buildCategoryFilters();
  renderProducts();
  renderBill();
  renderAdmin();
  updateDashboard();
  updateStatusUI();
}

/* ── NAVIGATION ───────────────────────────────── */
const TITLES = { pos:'Point of Sale', dash:'Dashboard', admin:'Admin Panel' };
function showSection(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  btn.classList.add('active');
  document.getElementById('page-title').textContent = TITLES[id];
  // Mobile cart bar: show only on POS section
  const cartBar = document.getElementById('mob-cart-bar');
  if (cartBar) {
    if (id === 'pos') {
      cartBar.style.removeProperty('display'); // let CSS media query decide
    } else {
      cartBar.style.display = 'none';
      closeBillPanel(); // close if switching away
    }
  }
}

/* ── MOBILE SIDEBAR ───────────────────────────── */
function openSidebar() {
  document.getElementById('sidebar').classList.add('mob-open');
  document.getElementById('sb-backdrop').classList.add('mob-open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('mob-open');
  document.getElementById('sb-backdrop').classList.remove('mob-open');
}

/* ── MOBILE BILL PANEL ────────────────────────── */
function openBillPanel() {
  document.getElementById('bill-panel').classList.add('mob-open');
  document.getElementById('bill-backdrop').classList.add('show');
  document.getElementById('mob-cart-bar').classList.add('cart-open');
}
function closeBillPanel(e) {
  if (e) e.stopPropagation();
  document.getElementById('bill-panel').classList.remove('mob-open');
  document.getElementById('bill-backdrop').classList.remove('show');
  const cartBar = document.getElementById('mob-cart-bar');
  if (cartBar) cartBar.classList.remove('cart-open');
}
function toggleBillPanel() {
  const bp = document.getElementById('bill-panel');
  if (bp.classList.contains('mob-open')) {
    closeBillPanel();
  } else {
    openBillPanel();
  }
}
function handleBillHeaderTap() {
  if (window.innerWidth <= 900) {
    toggleBillPanel();
  }
}

// Close bill panel when tapping backdrop (handled by bill-backdrop onclick)
// Fallback: close on outside tap
document.addEventListener('click', function(e) {
  // FIX: If the clicked element was deleted during a re-render, ignore it!
  if (!document.body.contains(e.target)) return;

  const bp = document.getElementById('bill-panel');
  const cartBar = document.getElementById('mob-cart-bar');
  const backdrop = document.getElementById('bill-backdrop');
  if (window.innerWidth <= 900 && bp && bp.classList.contains('mob-open')) {
    if (!bp.contains(e.target) && !(cartBar && cartBar.contains(e.target)) && !(backdrop && backdrop.contains(e.target))) {
      closeBillPanel();
    }
  }
});


/* ── CATEGORIES ───────────────────────────────── */
function buildCategoryFilters() {
  const cats = ['All', ...new Set(products.map(p => p.cat))];
  const wrap = document.getElementById('cat-filters');
  wrap.innerHTML = cats.map(c => `
    <button class="cat-btn ${c==='All'?'active':''}" onclick="setCategory('${c}',this)">${c}</button>
  `).join('');
}

function setCategory(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterProducts();
}

/* ── PRODUCTS ─────────────────────────────────── */
function filterProducts() {
  const q = document.getElementById('search-box').value.toLowerCase();
  const filtered = products.filter(p =>
    (activeCategory === 'All' || p.cat === activeCategory) &&
    p.name.toLowerCase().includes(q)
  );
  renderProducts(filtered);
}

function renderProducts(list = products) {
  document.getElementById('product-grid').innerHTML = list.map(p => `
    <div class="product-card ${!p.inStock ? 'oos' : ''}" onclick="${p.inStock ? 'addToCart('+p.id+')' : ''}">
      ${!p.inStock ? '<div class="oos-badge">✕ Out of Stock</div>' : ''}
      <img src="${p.img}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'">
      <div class="card-info">
        <div class="card-cat">${p.cat}</div>
        <h4>${p.name}</h4>
        <div class="card-price">₹${p.price}</div>
      </div>
      <div class="card-add-btn">${p.inStock ? '+ Add to Bill' : 'Unavailable'}</div>
    </div>
  `).join('');
}

/* ── CART ─────────────────────────────────────── */
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p || !p.inStock) return;
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty++;
  else cart.push({ ...p, qty: 1 });
  renderBill();
  showToast(`${p.name} added to bill`);
  // Auto-open bill panel on mobile when first item is added
  if (window.innerWidth <= 900 && cart.length === 1) {
    openBillPanel();
  }
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  renderBill();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderBill();
}

function clearCart() {
  cart = [];
  renderBill();
}

function renderBill() {
  const list = document.getElementById('bill-items');
  const totalQty = cart.reduce((s,i) => s + i.qty, 0);

  // ── Update mobile cart bottom bar ──
  const mcbLabel    = document.getElementById('mcb-label');
  const mcbTotalVal = document.getElementById('mcb-total-val');
  if (mcbLabel && mcbTotalVal) {
    if (cart.length === 0) {
      mcbLabel.textContent    = 'Cart is empty';
      mcbTotalVal.textContent = '₹0';
    } else {
      const tempSub   = cart.reduce((s,i) => s + i.price * i.qty, 0);
      const tempTotal = tempSub + Math.round(tempSub * 0.05);
      mcbLabel.textContent    = totalQty + (totalQty === 1 ? ' item' : ' items') + ' · incl. GST';
      mcbTotalVal.textContent = '₹' + tempTotal;
    }
  }

  if (cart.length === 0) {
    list.innerHTML = `
      <div class="bill-empty">
        <div class="be-icon">🛒</div>
        <p>Your bill is empty.<br>Tap an item to add it.</p>
      </div>`;
    setTotals(0);
    document.getElementById('bill-count').textContent = '0 items';
    document.getElementById('pay-btn').disabled = true;
    return;
  }

  const sub   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax   = Math.round(sub * 0.05);
  const total = sub + tax;

  list.innerHTML = cart.map(item => `
    <div class="bill-row">
      <div class="br-info">
        <div class="br-name">${item.name}</div>
        <div class="br-cat">${item.cat}</div>
        <div class="br-unit">₹${item.price} each</div>
      </div>
      <div class="qty-ctrl">
        <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
        <div class="qty-num">${item.qty}</div>
        <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
      </div>
      <div class="br-price">₹${item.price * item.qty}</div>
      <button class="br-del" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');

  setTotals(sub, tax, total);
  const cnt = cart.reduce((s,i) => s + i.qty, 0);
  document.getElementById('bill-count').textContent = cnt + (cnt===1?' item':' items');
  document.getElementById('pay-btn').disabled = false;
}

function setTotals(sub, tax=0, total=0) {
  document.getElementById('b-sub').textContent   = '₹' + sub;
  document.getElementById('b-tax').textContent   = '₹' + tax;
  document.getElementById('b-total').textContent = '₹' + total;
  document.getElementById('pay-total').textContent = '₹' + total;
}

/* ── CHECKOUT ─────────────────────────────────── */
function checkout() {
  if (cart.length === 0) return;
  const sub   = cart.reduce((s,i) => s + i.price*i.qty, 0);
  const tax   = Math.round(sub * 0.05);
  const total = sub + tax;

  revenue += total;
  orderCount++;
  localStorage.setItem('thb_revenue', revenue);
  localStorage.setItem('thb_orders',  orderCount);

  printReceipt(sub, tax, total);
  updateDashboard();
  cart = [];
  renderBill();
  closeBillPanel();
  showToast('✅ Order complete! Bill printed.');
}

function printReceipt(sub, tax, total) {
  const now     = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true });
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const itemRows = cart.map(i => `
    <tr>
      <td>
        <div class="td-name">${i.name}</div>
        <div class="td-qty">${i.qty} × ₹${i.price}</div>
      </td>
      <td>₹${i.price * i.qty}</td>
    </tr>
  `).join('');

  document.getElementById('print-area').innerHTML = `
    <div class="r-shop-name">☕ Tea Hub Bakes</div>
    <div class="r-shop-tag">BAKERY &amp; CAFÉ</div>
    <div class="r-shop-addr">Palani, Tamil Nadu</div>
    <div class="r-line solid"></div>
    <div class="r-meta">Date: ${dateStr} &nbsp;|&nbsp; Time: ${timeStr}</div>
    <div class="r-meta">Bill No: #${String(orderCount).padStart(4,'0')}</div>
    <div class="r-line"></div>
    <div class="r-section-hdr">Items Ordered (${totalItems} item${totalItems !== 1 ? 's' : ''})</div>
    <table class="r-items-table">
      <thead><tr><th>Item</th><th>Amount</th></tr></thead>
      <tbody>${itemRows}</tbody>
    </table>
    <div class="r-line"></div>
    <div class="r-summary-row"><span>Subtotal</span><span>₹${sub}</span></div>
    <div class="r-summary-row"><span>GST (5%)</span><span>₹${tax}</span></div>
    <div class="r-line solid"></div>
    <div class="r-total-row"><span>TOTAL AMOUNT</span><span>₹${total}</span></div>
    <div class="r-line"></div>
    <div class="r-border-box">THANK YOU FOR YOUR VISIT!</div>
    <div class="r-thanks">
      <div>Come back soon ☕</div>
      <div>Tea Hub Bakes — Made with love</div>
    </div>
  `;
  window.print();
}

/* ── DASHBOARD ────────────────────────────────── */
function updateDashboard() {
  document.getElementById('stat-rev').textContent = '₹' + revenue;
  document.getElementById('stat-exp').textContent = '₹' + expenses;
  document.getElementById('stat-net').textContent = '₹' + (revenue - expenses);
  document.getElementById('stat-ord').textContent = orderCount;
  const avg = orderCount > 0 ? Math.round(revenue / orderCount) : 0;
  document.getElementById('stat-avg').textContent = '₹' + avg;
}

function addExpense() {
  const desc = document.getElementById('exp-desc').value.trim();
  const amt  = parseFloat(document.getElementById('exp-amt').value);
  if (!desc || isNaN(amt) || amt <= 0) { showToast('⚠️ Fill all fields correctly'); return; }
  expenses += amt;
  localStorage.setItem('thb_expenses', expenses);
  updateDashboard();
  document.getElementById('exp-desc').value = '';
  document.getElementById('exp-amt').value  = '';
  showToast(`Expense of ₹${amt} added`);
}

/* ── STATUS ───────────────────────────────────── */
function toggleStatus() {
  bizOpen = !bizOpen;
  localStorage.setItem('thb_biz', bizOpen ? 'open' : 'closed');
  updateStatusUI();
  showToast(bizOpen ? '🟢 Business is now OPEN' : '🔴 Business is now CLOSED');
}

function updateStatusUI() {
  const dot  = document.getElementById('sb-dot');
  const txt  = document.getElementById('sb-status-txt');
  const bdot = document.getElementById('big-dot');
  const btxt = document.getElementById('big-status-txt');
  const bbtn = document.getElementById('big-toggle-btn');

  if (bizOpen) {
    dot.className  = 'status-dot open';
    txt.textContent = "We're Open";
    bdot.className  = 'big-dot open';
    btxt.textContent = '🟢 Business is OPEN';
    bbtn.className  = 'toggle-btn open-action';
    bbtn.textContent = 'Mark as Closed';
  } else {
    dot.className  = 'status-dot closed';
    txt.textContent = "We're Closed";
    bdot.className  = 'big-dot closed';
    btxt.textContent = '🔴 Business is CLOSED';
    bbtn.className  = 'toggle-btn close-action';
    bbtn.textContent = 'Mark as Open';
  }
}

/* ── ADMIN ────────────────────────────────────── */
function renderAdmin() {
  document.getElementById('admin-grid').innerHTML = products.map(p => `
    <div class="admin-item-card">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'">
      <div class="aic-body">
        <div class="aic-name">${p.name}</div>
        <div class="aic-cat">${p.cat}</div>
        <div class="aic-price">₹${p.price}</div>
        <div class="stock-toggle">
          <span class="stock-label">${p.inStock ? 'In Stock' : 'Out of Stock'}</span>
          <label class="toggle-switch">
            <input type="checkbox" ${p.inStock ? 'checked' : ''} onchange="toggleStock(${p.id}, this.checked)">
            <span class="ts-slider"></span>
          </label>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleStock(id, val) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  p.inStock = val;
  localStorage.setItem('thb_products', JSON.stringify(products));
  filterProducts();
  showToast(`${p.name} marked ${val ? 'In Stock' : 'Out of Stock'}`);
}

/* ── TOAST ────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 2500);
}