(function () {
  'use strict';

  /* ================== KONFIGURASI ================== */
  var WA_NUMBER = '6283151427749';
  var WA_DISPLAY = '083151427749';
  var LS_PRODUCTS = 'mygabin.products.v1';
  var LS_ACTIVITIES = 'mygabin.activities.v1';
  var LS_AUTH = 'mygabin.admin.session.v1';
  var ADMIN_USER = 'admin';
  var ADMIN_PASS = 'admin';
  var MAX_ACTIVITIES = 300;

  /* ================== ILUSTRASI SVG ================== */
  var FLAVORS = {
    cookies:    { label: 'Cookies n Cream', cream: '#F5EAD8', accent: '#E7D2B2', speck: '#4A2C1B', bg: '#F3E3C8', drizzle: '#8A5B3C' },
    strawberry: { label: 'Strawberry',      cream: '#F3A6AF', accent: '#F8CBD1', speck: '#C4495E', bg: '#FADBDD', drizzle: '#E07C89' },
    matcha:     { label: 'Matcha',          cream: '#B4CB8F', accent: '#D2E0B6', speck: '#7A9655', bg: '#E4EBD3', drizzle: '#94B26B' },
    cokelat:    { label: 'Cokelat',         cream: '#8B5B3C', accent: '#A97A58', speck: '#5A3320', bg: '#EBD8C6', drizzle: '#6E4329' },
    vanilla:    { label: 'Vanilla',         cream: '#F7E9C9', accent: '#FBF3DD', speck: '#D9BE85', bg: '#F6EBCF', drizzle: '#EBD7A9' },
    custom:     { label: 'Varian Baru',     cream: '#F0D8B4', accent: '#F8E8CD', speck: '#B98F5F', bg: '#EFE0C5', drizzle: '#D8B486' }
  };

  function rng(seed) {
    var s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }
  function n(v) { return Math.round(v * 10) / 10; }
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Satu potong gabin isi es krim, tampak samping */
  function sandwich(kind) {
    var f = FLAVORS[kind] || FLAVORS.custom;
    var rand = rng((kind || 'x').length * 977 + 41);
    var out = '<g stroke="#51321F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">';

    /* cracker bawah */
    out += '<rect x="74" y="246" width="252" height="46" rx="21" fill="#DFA45C"/>';
    /* isi es krim */
    out += '<rect x="84" y="194" width="232" height="60" rx="17" fill="' + f.cream + '"/>';
    /* tetesan es krim */
    out += '<circle cx="126" cy="252" r="13" fill="' + f.cream + '"/>';
    out += '<circle cx="286" cy="256" r="10" fill="' + f.cream + '"/>';
    /* cracker atas */
    out += '<rect x="74" y="150" width="252" height="48" rx="21" fill="#E2A85F"/>';
    out += '</g>';

    /* tekstur cracker */
    out += '<path d="M96 168h208" stroke="#F3CB93" stroke-width="7" stroke-linecap="round" opacity=".85"/>';
    out += '<path d="M96 268h208" stroke="#F3CB93" stroke-width="6" stroke-linecap="round" opacity=".7"/>';
    var i;
    for (i = 0; i < 7; i++) {
      out += '<circle cx="' + (104 + i * 32) + '" cy="158" r="3.5" fill="#B77C3C"/>';
      out += '<circle cx="' + (104 + i * 32) + '" cy="284" r="3.2" fill="#B77C3C"/>';
    }
    /* highlight es krim */
    out += '<rect x="96" y="203" width="208" height="9" rx="4.5" fill="' + f.accent + '" opacity=".75"/>';

    /* bintik rasa */
    var specks = kind === 'cookies' ? 16 : kind === 'strawberry' ? 11 : kind === 'matcha' ? 8 : kind === 'cokelat' ? 12 : 5;
    for (i = 0; i < specks; i++) {
      var cx = 100 + rand() * 200;
      var cy = 214 + rand() * 32;
      var r = 2 + rand() * 3.4;
      out += '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="' + n(r) + '" fill="' + f.speck + '" opacity="' + (0.55 + rand() * 0.4).toFixed(2) + '"/>';
    }
    return out;
  }

  function art(kind, cls) {
    var f = FLAVORS[kind] || FLAVORS.custom;
    var star = '<path d="M0 -9 L2.4 -2.4 L9 0 L2.4 2.4 L0 9 L-2.4 2.4 L-9 0 L-2.4 -2.4 Z" fill="#51321F" opacity=".45"/>';
    return '<svg class="' + (cls || 'art') + '" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi es krim roti gabin varian ' + esc(f.label) + '">' +
      '<rect width="400" height="400" fill="' + f.bg + '"/>' +
      '<circle cx="200" cy="196" r="146" fill="' + f.accent + '" opacity=".75"/>' +
      '<circle cx="200" cy="196" r="146" fill="none" stroke="#51321F" stroke-opacity=".22" stroke-width="2" stroke-dasharray="7 11"/>' +
      '<g transform="translate(72 92) scale(1)">' + star + '</g>' +
      '<g transform="translate(332 112) scale(.8)">' + star + '</g>' +
      '<g transform="translate(300 296) scale(.6)">' + star + '</g>' +
      '<ellipse cx="200" cy="320" rx="128" ry="20" fill="#51321F" opacity=".16"/>' +
      '<g transform="translate(200 236) rotate(-3) translate(-200 -226)">' + sandwich(kind) + '</g>' +
      '</svg>';
  }

  function heroArt() {
    var i, a, x1, y1, x2, y2, rays = '', star = '<path d="M0 -13 L3.6 -3.6 L13 0 L3.6 3.6 L0 13 L-3.6 3.6 L-13 0 L-3.6 -3.6 Z" fill="#51321F"/>';
    for (i = 0; i < 24; i++) {
      a = (i * 15) * Math.PI / 180;
      x1 = 260 + Math.cos(a) * 70; y1 = 244 + Math.sin(a) * 70;
      x2 = 260 + Math.cos(a) * 330; y2 = 244 + Math.sin(a) * 330;
      rays += '<line x1="' + n(x1) + '" y1="' + n(y1) + '" x2="' + n(x2) + '" y2="' + n(y2) + '" stroke="#E99A35" stroke-width="' + (i % 2 ? 9 : 3.5) + '" stroke-linecap="round" opacity="' + (i % 2 ? 0.2 : 0.38) + '"/>';
    }
    function place(x, y, s, rot, kind) {
      return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ') translate(-200 -226)">' + sandwich(kind) + '</g>';
    }
    return '<svg viewBox="0 0 520 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi es krim roti gabin MY.GABIN">' +
      '<rect width="520" height="470" fill="#F8DDB8"/>' +
      '<circle cx="260" cy="244" r="196" fill="#FFFAF0"/>' +
      rays +
      '<circle cx="260" cy="244" r="196" fill="none" stroke="#51321F" stroke-width="2" stroke-dasharray="8 12" opacity=".35"/>' +
      '<ellipse cx="260" cy="396" rx="196" ry="44" fill="#FFFAF0" stroke="#51321F" stroke-width="4"/>' +
      '<ellipse cx="260" cy="392" rx="162" ry="32" fill="none" stroke="#51321F" stroke-width="2" stroke-dasharray="6 9" opacity=".5"/>' +
      '<g transform="translate(172 244) scale(.58)" opacity=".9">' + sandwich('strawberry') + '</g>' +
      place(226, 300, 0.72, -7, 'cookies') +
      place(300, 268, 0.66, 8, 'matcha') +
      '<g transform="translate(392 152) scale(.9)">' + star + '</g>' +
      '<g transform="translate(140 128) scale(.62)">' + star + '</g>' +
      '<g transform="translate(420 232) scale(.5)">' + star + '</g>' +
      '<circle cx="106" cy="292" r="5" fill="#51321F" opacity=".45"/>' +
      '<circle cx="424" cy="316" r="4" fill="#51321F" opacity=".4"/>' +
      '<circle cx="368" cy="368" r="6" fill="#51321F" opacity=".3"/>' +
      '</svg>';
  }

  function markSvg() {
    return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="32" cy="32" r="30" fill="#F7EDDA" stroke="#51321F" stroke-width="3"/>' +
      '<rect x="11" y="19" width="42" height="9" rx="4.5" fill="#E2A85F" stroke="#51321F" stroke-width="2.5"/>' +
      '<rect x="13" y="28" width="38" height="9" rx="4.5" fill="#F6ECDC" stroke="#51321F" stroke-width="2.5"/>' +
      '<rect x="11" y="37" width="42" height="9" rx="4.5" fill="#E2A85F" stroke="#51321F" stroke-width="2.5"/>' +
      '</svg>';
  }

  /* ================== UTIL ================== */
  function rupiah(value) {
    return 'Rp' + Number(value || 0).toLocaleString('id-ID');
  }
  function formatDateTime(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    try {
      return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return d.toISOString();
    }
  }
  function dayKey(d) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function $(id) { return document.getElementById(id); }
  var toastTimer = null;
  function toast(message) {
    var el = $('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }
  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  /* ================== DATA ================== */
  var DEFAULT_PRODUCTS = [
    { id: 'p-cookies', name: 'Cookies n Cream', price: 10000, image: 'art:cookies', active: true },
    { id: 'p-strawberry', name: 'Strawberry', price: 10000, image: 'art:strawberry', active: true },
    { id: 'p-matcha', name: 'Matcha', price: 10000, image: 'art:matcha', active: true },
    { id: 'p-cokelat', name: 'Cokelat', price: 10000, image: 'art:cokelat', active: true },
    { id: 'p-vanilla', name: 'Vanilla', price: 10000, image: 'art:vanilla', active: true }
  ];

  var state = { products: [], activities: [], selectedId: null, qty: 1 };

  function normaliseProduct(p) {
    return {
      id: String(p.id || 'p-' + Math.random().toString(36).slice(2, 9)),
      name: String(p.name || 'Varian Baru').slice(0, 40),
      price: Math.max(0, Math.round(Number(p.price) || 0)),
      image: typeof p.image === 'string' && p.image ? p.image : 'art:custom',
      active: p.active !== false
    };
  }

  function loadProducts() {
    try {
      var raw = localStorage.getItem(LS_PRODUCTS);
      if (raw === null) return clone(DEFAULT_PRODUCTS);
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return clone(DEFAULT_PRODUCTS);
      return arr.map(normaliseProduct);
    } catch (e) {
      return clone(DEFAULT_PRODUCTS);
    }
  }
  function loadActivities() {
    try {
      var raw = localStorage.getItem(LS_ACTIVITIES);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }
  function saveProducts() {
    try {
      localStorage.setItem(LS_PRODUCTS, JSON.stringify(state.products));
      return true;
    } catch (e) {
      toast('Gagal menyimpan: penyimpanan browser penuh. Coba gambar yang lebih kecil.');
      return false;
    }
  }
  function saveActivities() {
    try {
      localStorage.setItem(LS_ACTIVITIES, JSON.stringify(state.activities));
    } catch (e) {
      state.activities = state.activities.slice(0, 60);
    }
  }

  function resolveImage(image) {
    if (typeof image === 'string' && image.indexOf('art:') === 0) {
      var kind = image.slice(4);
      if (!FLAVORS[kind]) kind = 'custom';
      return art(kind);
    }
    if (typeof image === 'string' && image.indexOf('data:image/') === 0) {
      return '<img src="' + esc(image) + '" alt="Foto produk" style="width:100%;height:100%;object-fit:cover">';
    }
    return art('custom');
  }

  function money(value) { return value.toFixed(2); }

  /* ================== TOKO: KATALOG ================== */
  function activeProducts() {
    return state.products.filter(function (p) { return p.active; });
  }
  function productById(id) {
    for (var i = 0; i < state.products.length; i++) {
      if (state.products[i].id === id) return state.products[i];
    }
    return null;
  }

  function renderCatalog() {
    var grid = $('menuGrid');
    if (!grid) return;
    var list = activeProducts();
    if (!list.length) {
      grid.innerHTML = '<div class="empty-state"><h3>Belum ada menu aktif</h3><p class="muted small">Menu akan tampil di sini setelah admin mengaktifkan produk.</p></div>';
      return;
    }
    var html = '';
    list.forEach(function (p) {
      var selected = state.selectedId === p.id;
      html += '<article class="card' + (selected ? ' is-selected' : '') + '" data-id="' + esc(p.id) + '">' +
        (selected ? '<span class="card-badge">Dipilih</span>' : '') +
        '<div class="card-art">' + resolveImage(p.image) + '</div>' +
        '<div class="card-body">' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<p class="card-price">' + rupiah(p.price) + ' <span>/ porsi</span></p>' +
          '<button class="btn btn-sm" type="button" data-pick="' + esc(p.id) + '">' + (selected ? 'Varian Dipilih' : 'Pilih Menu') + '</button>' +
        '</div>' +
      '</article>';
    });
    grid.innerHTML = html;
  }

  function renderVariants() {
    var box = $('variantList');
    if (!box) return;
    var list = activeProducts();
    if (!list.length) {
      box.innerHTML = '<p class="hint">Belum ada varian aktif saat ini.</p>';
      return;
    }
    var html = '';
    list.forEach(function (p) {
      var f = FLAVORS[(p.image || '').indexOf('art:') === 0 ? p.image.slice(4) : 'custom'] || FLAVORS.custom;
      var active = state.selectedId === p.id;
      html += '<button class="variant' + (active ? ' is-active' : '') + '" type="button" role="radio" aria-checked="' + (active ? 'true' : 'false') + '" data-pick="' + esc(p.id) + '">' +
        '<span class="dot" style="background:' + f.cream + '"></span>' + esc(p.name) +
        '</button>';
    });
    box.innerHTML = html;
  }

  /* ================== TOKO: RINGKASAN ================== */
  function currentOrder() {
    var product = state.selectedId ? productById(state.selectedId) : null;
    if (product && !product.active) product = null;
    var qty = Math.max(1, Math.min(99, parseInt(state.qty, 10) || 1));
    var total = product ? product.price * qty : 0;
    return { product: product, qty: qty, total: total };
  }

  function renderOrder() {
    var order = currentOrder();
    var sumProduct = $('sumProduct'), sumQty = $('sumQty'), sumUnit = $('sumUnit'),
        sumTotal = $('sumTotal'), miniTotal = $('miniTotal'), btn = $('waCheckout'),
        hint = $('orderHint'), summaryArt = $('summaryArt');

    if (sumProduct) sumProduct.textContent = order.product ? order.product.name : '—';
    if (sumQty) sumQty.textContent = order.product ? order.qty + ' porsi' : '—';
    if (sumUnit) sumUnit.textContent = order.product ? rupiah(order.product.price) : '—';
    if (sumTotal) sumTotal.textContent = rupiah(order.total);
    if (miniTotal) miniTotal.textContent = rupiah(order.total);
    if (btn) btn.disabled = !order.product;
    if (hint) {
      hint.textContent = order.product
        ? 'Varian ' + order.product.name + ' dipilih. Jumlah bisa diubah, tetapi hanya satu varian per pesanan.'
        : 'Pilih satu varian rasa terlebih dahulu untuk melanjutkan pemesanan.';
    }
    if (summaryArt) {
      summaryArt.innerHTML = order.product
        ? resolveImage(order.product.image)
        : art('custom');
    }
    if (order.product && $('qtyInput') && $('qtyInput').value !== String(order.qty)) {
      $('qtyInput').value = order.qty;
    }
  }

  function selectProduct(id, shouldScroll) {
    var p = productById(id);
    if (!p || !p.active) return;
    state.selectedId = id;
    renderCatalog();
    renderVariants();
    renderOrder();
    if (shouldScroll !== false) {
      var target = $('pesan');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function setQty(value) {
    var q = parseInt(value, 10);
    if (isNaN(q)) q = 1;
    q = Math.max(1, Math.min(99, q));
    state.qty = q;
    if ($('qtyInput')) $('qtyInput').value = String(q);
    renderOrder();
  }

  /* ================== PEMESANAN WHATSAPP ================== */
  function buildMessage(order) {
    return 'Halo MY.GABIN! 👋\n' +
      'Saya ingin memesan es krim roti gabin:\n\n' +
      '• Nama produk: ' + order.product.name + '\n' +
      '• Jumlah: ' + order.qty + ' porsi\n' +
      '• Harga satuan: ' + rupiah(order.product.price) + '\n' +
      '• Total harga: ' + rupiah(order.total) + '\n\n' +
      'Mohon konfirmasi ketersediaan dan cara pembayarannya. Terima kasih!';
  }

  function logActivity(order) {
    var entry = {
      id: 'a-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      ts: new Date().toISOString(),
      productId: order.product.id,
      variant: order.product.name,
      qty: order.qty,
      unitPrice: order.product.price,
      total: order.total
    };
    state.activities.unshift(entry);
    if (state.activities.length > MAX_ACTIVITIES) state.activities.length = MAX_ACTIVITIES;
    saveActivities();
  }

  function checkout() {
    var order = currentOrder();
    if (!order.product) {
      toast('Pilih satu varian rasa terlebih dahulu, ya.');
      return;
    }
    logActivity(order);
    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(buildMessage(order));
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast('Pesanan diteruskan ke WhatsApp. Aktivitas tercatat di dashboard.');
  }

  /* ================== ADMIN ================== */
  function isLoggedIn() {
    try { return sessionStorage.getItem(LS_AUTH) === '1'; } catch (e) { return false; }
  }
  function setLoggedIn(value) {
    try {
      if (value) sessionStorage.setItem(LS_AUTH, '1');
      else sessionStorage.removeItem(LS_AUTH);
    } catch (e) { /* abaikan */ }
  }

  function renderStats() {
    var box = $('statGrid');
    if (!box) return;
    var clicks = state.activities.length;
    var active = activeProducts().length;
    var estimate = state.activities.reduce(function (sum, a) { return sum + (Number(a.total) || 0); }, 0);
    var portions = state.activities.reduce(function (sum, a) { return sum + (Number(a.qty) || 0); }, 0);
    box.innerHTML =
      '<div class="stat"><span>Klik Pesanan WhatsApp</span><strong>' + clicks + '</strong><small>Total aktivitas tercatat</small></div>' +
      '<div class="stat"><span>Produk Aktif</span><strong>' + active + '</strong><small>Dari ' + state.products.length + ' produk</small></div>' +
      '<div class="stat"><span>Estimasi Nilai Pesanan</span><strong>' + rupiah(estimate) + '</strong><small>Dari ' + portions + ' porsi</small></div>' +
      '<div class="stat"><span>Rata-rata per Pesanan</span><strong>' + rupiah(clicks ? Math.round(estimate / clicks) : 0) + '</strong><small>Estimasi nilai pesanan</small></div>';
  }

  function renderChart() {
    var box = $('chart');
    if (!box) return;
    var days = [];
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var labels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    var counts = {};
    state.activities.forEach(function (a) {
      var d = new Date(a.ts);
      if (isNaN(d.getTime())) return;
      var key = dayKey(d);
      counts[key] = (counts[key] || 0) + 1;
    });
    var max = 1;
    var i;
    for (i = 6; i >= 0; i--) {
      var d2 = new Date(today.getTime() - i * 86400000);
      var c = counts[dayKey(d2)] || 0;
      if (c > max) max = c;
      days.push({ date: d2, count: c });
    }
    var html = '';
    days.forEach(function (day) {
      var pct = Math.max(6, Math.round((day.count / max) * 100));
      html += '<div class="chart-col" title="' + day.count + ' aktivitas">' +
        '<span class="chart-val">' + day.count + '</span>' +
        '<div class="chart-bar' + (day.count === 0 ? ' zero' : '') + '" style="height:' + pct + '%"></div>' +
        '<span class="chart-label">' + labels[day.date.getDay()] + '<br>' + day.date.getDate() + '/' + (day.date.getMonth() + 1) + '</span>' +
        '</div>';
    });
    box.innerHTML = html;
  }

  function renderActivities() {
    var body = $('activityBody');
    if (!body) return;
    if (!state.activities.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="4">Belum ada aktivitas pemesanan. Data muncul setelah pelanggan menekan tombol pesanan WhatsApp.</td></tr>';
      return;
    }
    var html = '';
    state.activities.slice(0, 60).forEach(function (a) {
      html += '<tr>' +
        '<td>' + esc(formatDateTime(a.ts)) + '</td>' +
        '<td>' + esc(a.variant || '—') + '</td>' +
        '<td>' + (Number(a.qty) || 0) + ' porsi</td>' +
        '<td>' + rupiah(a.total) + '</td>' +
        '</tr>';
    });
    body.innerHTML = html;
  }

  function renderProducts() {
    var body = $('productBody');
    if (!body) return;
    if (!state.products.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="5">Belum ada produk. Tambahkan produk baru di atas.</td></tr>';
      return;
    }
    var html = '';
    state.products.forEach(function (p) {
      html += '<tr data-id="' + esc(p.id) + '">' +
        '<td>' +
          '<div class="thumb">' + resolveImage(p.image) + '</div>' +
          '<label class="mini-btn" style="margin-top:6px">Ganti<input type="file" accept="image/*" data-act="image" hidden></label>' +
        '</td>' +
        '<td><input class="inp inp-sm" type="text" data-field="name" maxlength="40" value="' + esc(p.name) + '"></td>' +
        '<td><input class="inp inp-sm" type="number" min="0" step="500" data-field="price" value="' + (Number(p.price) || 0) + '" style="max-width:130px"></td>' +
        '<td><button class="status-pill' + (p.active ? '' : ' off') + '" type="button" data-act="toggle">' + (p.active ? 'Aktif' : 'Nonaktif') + '</button></td>' +
        '<td><div class="row-actions">' +
          '<button class="mini-btn solid" type="button" data-act="save">Simpan</button>' +
          '<button class="mini-btn danger" type="button" data-act="delete">Hapus</button>' +
        '</div></td>' +
      '</tr>';
    });
    body.innerHTML = html;
  }

  function renderDashboard() {
    renderStats();
    renderChart();
    renderActivities();
    renderProducts();
  }

  function renderAdmin() {
    var logged = isLoggedIn();
    var login = $('loginCard'), dash = $('dashboard'), logout = $('logoutBtn');
    if (login) login.hidden = logged;
    if (dash) dash.hidden = !logged;
    if (logout) logout.hidden = !logged;
    if (logged) renderDashboard();
  }

  /* ================== GAMBAR PRODUK ================== */
  function readImageFile(file, maxSize) {
    return new Promise(function (resolve, reject) {
      if (!file) { resolve(null); return; }
      if (file.type.indexOf('image/') !== 0) { reject(new Error('File harus berupa gambar.')); return; }
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var limit = maxSize || 560;
          var scale = Math.min(1, limit / Math.max(img.width, img.height));
          var canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = '#F7EDDA';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          try {
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          } catch (err) {
            reject(new Error('Gambar tidak bisa diproses.'));
          }
        };
        img.onerror = function () { reject(new Error('Gambar tidak bisa dibaca.')); };
        img.src = reader.result;
      };
      reader.onerror = function () { reject(new Error('Gagal membaca file.')); };
      reader.readAsDataURL(file);
    });
  }

  /* ================== ROUTING ================== */
  function route() {
    var hash = (location.hash || '').replace(/^#\/?/, '').toLowerCase();
    var isAdmin = hash === 'admin';
    var store = $('store'), admin = $('admin');
    if (store) store.hidden = isAdmin;
    if (admin) admin.hidden = !isAdmin;
    document.title = isAdmin ? 'Dashboard Admin — MY.GABIN' : 'MY.GABIN — Es Krim Roti Gabin Homemade';
    if (isAdmin) {
      renderAdmin();
    } else {
      renderCatalog();
      renderVariants();
      renderOrder();
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /* ================== EVENT ================== */
  function bindEvents() {
    /* navbar mobile */
    var navToggle = $('navToggle'), navLinks = $('navLinks');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* pilih varian dari katalog / chip */
    document.addEventListener('click', function (e) {
      var pick = e.target.closest('[data-pick]');
      if (pick) {
        e.preventDefault();
        selectProduct(pick.getAttribute('data-pick'));
      }
    });

    /* jumlah */
    var minus = $('qtyMinus'), plus = $('qtyPlus'), input = $('qtyInput');
    if (minus) minus.addEventListener('click', function () { setQty(currentOrder().qty - 1); });
    if (plus) plus.addEventListener('click', function () { setQty(currentOrder().qty + 1); });
    if (input) {
      input.addEventListener('change', function () { setQty(input.value); });
      input.addEventListener('blur', function () { setQty(input.value); });
    }

    /* checkout */
    var wa = $('waCheckout');
    if (wa) wa.addEventListener('click', checkout);

    /* login */
    var loginForm = $('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var user = ($('loginUser').value || '').trim();
        var pass = $('loginPass').value || '';
        var error = $('loginError');
        if (user === ADMIN_USER && pass === ADMIN_PASS) {
          setLoggedIn(true);
          if (error) error.hidden = true;
          loginForm.reset();
          renderAdmin();
          toast('Selamat datang, admin!');
        } else if (error) {
          error.hidden = false;
        }
      });
    }

    /* logout */
    var logout = $('logoutBtn');
    if (logout) {
      logout.addEventListener('click', function () {
        setLoggedIn(false);
        renderAdmin();
        toast('Kamu sudah logout.');
      });
    }

    /* refresh */
    var refresh = $('refreshDash');
    if (refresh) {
      refresh.addEventListener('click', function () {
        state.products = loadProducts();
        state.activities = loadActivities();
        renderDashboard();
        toast('Data dashboard dimuat ulang.');
      });
    }

    /* tambah produk */
    var addForm = $('addForm');
    if (addForm) {
      addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = ($('newName').value || '').trim();
        var price = Math.max(0, Math.round(Number($('newPrice').value) || 0));
        if (!name) { toast('Nama varian wajib diisi.'); return; }
        if (!price) { toast('Harga harus lebih dari 0.'); return; }
        var file = $('newImage').files && $('newImage').files[0];
        readImageFile(file).then(function (dataUrl) {
          state.products.push({
            id: 'p-' + Date.now().toString(36),
            name: name.slice(0, 40),
            price: price,
            image: dataUrl || 'art:custom',
            active: true
          });
          if (saveProducts()) {
            addForm.reset();
            $('newPrice').value = '10000';
            renderProducts();
            renderStats();
            renderCatalog();
            renderVariants();
            toast('Produk baru ditambahkan.');
          }
        }).catch(function (err) {
          toast(err.message || 'Gambar gagal diproses.');
        });
      });
    }

    /* aksi per produk */
    var productBody = $('productBody');
    if (productBody) {
      productBody.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-act]');
        if (!btn) return;
        var row = btn.closest('tr');
        if (!row) return;
        var id = row.getAttribute('data-id');
        var product = productById(id);
        if (!product) return;
        var act = btn.getAttribute('data-act');

        if (act === 'toggle') {
          product.active = !product.active;
          if (saveProducts()) {
            renderProducts();
            renderStats();
            renderCatalog();
            renderVariants();
            toast(product.active ? 'Produk diaktifkan.' : 'Produk dinonaktifkan.');
          }
        } else if (act === 'save') {
          var nameInput = row.querySelector('[data-field="name"]');
          var priceInput = row.querySelector('[data-field="price"]');
          var newName = (nameInput.value || '').trim();
          var newPrice = Math.max(0, Math.round(Number(priceInput.value) || 0));
          if (!newName) { toast('Nama produk tidak boleh kosong.'); return; }
          if (!newPrice) { toast('Harga harus lebih dari 0.'); return; }
          product.name = newName.slice(0, 40);
          product.price = newPrice;
          if (saveProducts()) {
            renderProducts();
            renderCatalog();
            renderVariants();
            renderOrder();
            toast('Perubahan produk disimpan.');
          }
        } else if (act === 'delete') {
          if (!window.confirm('Hapus produk "' + product.name + '"?')) return;
          state.products = state.products.filter(function (p) { return p.id !== id; });
          if (state.selectedId === id) state.selectedId = null;
          if (saveProducts()) {
            renderProducts();
            renderStats();
            renderCatalog();
            renderVariants();
            renderOrder();
            toast('Produk dihapus.');
          }
        }
      });

      productBody.addEventListener('change', function (e) {
        var input = e.target;
        if (!input || input.getAttribute('data-act') !== 'image') return;
        var row = input.closest('tr');
        var product = productById(row.getAttribute('data-id'));
        var file = input.files && input.files[0];
        if (!product || !file) return;
        readImageFile(file).then(function (dataUrl) {
          if (!dataUrl) return;
          product.image = dataUrl;
          if (saveProducts()) {
            renderProducts();
            renderCatalog();
            renderVariants();
            renderOrder();
            toast('Gambar produk diperbarui.');
          }
        }).catch(function (err) {
          toast(err.message || 'Gambar gagal diproses.');
        });
      });
    }

    window.addEventListener('hashchange', route);
  }

  /* ================== INISIALISASI ================== */
  function init() {
    state.products = loadProducts();
    state.activities = loadActivities();

    var mark = markSvg();
    ['brandMark', 'brandMarkFooter', 'brandMarkAdmin'].forEach(function (id) {
      var el = $(id);
      if (el) el.innerHTML = mark;
    });

    var hero = $('heroArt');
    if (hero) hero.innerHTML = heroArt();

    var track = $('marqueeTrack');
    if (track) {
      var items = ['5 varian rasa', 'Rp10.000 per porsi', 'Satu varian per pesanan', 'Homemade setiap hari', 'Pesan via WhatsApp'];
      var line = '';
      items.forEach(function (t) { line += '<span>' + t + '</span>'; });
      track.innerHTML = line + line;
    }

    var year = $('yearNow');
    if (year) year.textContent = String(new Date().getFullYear());

    bindEvents();
    route();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
