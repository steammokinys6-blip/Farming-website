/* Willow Bend Farm - JavaScript for the home page (index.html) */
(function () {
  'use strict';

  /* ================== SETTINGS (edit these) ================== */
  var WHATSAPP = '37060000000';              // number with country code, no + or spaces
  var EMAIL = 'hello@willowbend.example';
  var FARM = 'Willow Bend Farm';

  /* ================== DATA ================== */
  /* ----- Opening hours ----- */
  var HOURS = [                            // Monday first
    ['Monday', 'Closed'],
    ['Tuesday', '10:00 – 18:00'],
    ['Wednesday', '10:00 – 18:00'],
    ['Thursday', '10:00 – 18:00'],
    ['Friday', '10:00 – 18:00'],
    ['Saturday', '8:00 – 14:00 (market)'],
    ['Sunday', '10:00 – 14:00']
  ];

  /* ----- Food (also needed here so the basket knows every price) ----- */
  var PRODUCTS = [
    { id: 'p1',  name: 'Free-range eggs (10)',   cat: 'Eggs',       price: 3.80, unit: 'box',  stock: 40, emoji: '🥚', fresh: true,  note: 'Laid this morning' },
    { id: 'p2',  name: 'Duck eggs (6)',          cat: 'Eggs',       price: 4.50, unit: 'box',  stock: 12, emoji: '🥚', fresh: false, note: 'Rich and creamy' },
    { id: 'p3',  name: 'Carrots',                cat: 'Vegetables', price: 1.90, unit: 'kg',   stock: 30, emoji: '🥕', fresh: true,  note: 'Sweet and crunchy' },
    { id: 'p4',  name: 'Potatoes',               cat: 'Vegetables', price: 1.20, unit: 'kg',   stock: 80, emoji: '🥔', fresh: false, note: 'Good for baking' },
    { id: 'p5',  name: 'Tomatoes',               cat: 'Vegetables', price: 4.20, unit: 'kg',   stock: 15, emoji: '🍅', fresh: true,  note: 'Greenhouse grown' },
    { id: 'p6',  name: 'Cucumbers',              cat: 'Vegetables', price: 2.80, unit: 'kg',   stock: 0,  emoji: '🥒', fresh: false, note: 'Back next week' },
    { id: 'p7',  name: 'Wildflower honey 500 g', cat: 'Honey',      price: 7.50, unit: 'jar',  stock: 25, emoji: '🍯', fresh: false, note: 'From our river hives' },
    { id: 'p8',  name: 'Linden honey 500 g',     cat: 'Honey',      price: 8.50, unit: 'jar',  stock: 10, emoji: '🍯', fresh: false, note: 'Light and floral' },
    { id: 'p9',  name: 'Rye bread',              cat: 'Bread',      price: 3.60, unit: 'loaf', stock: 20, emoji: '🍞', fresh: true,  note: 'Baked today' },
    { id: 'p10', name: 'Sourdough loaf',         cat: 'Bread',      price: 4.20, unit: 'loaf', stock: 14, emoji: '🥖', fresh: true,  note: 'Baked today' },
    { id: 'p11', name: 'Apples',                 cat: 'Fruit',      price: 2.40, unit: 'kg',   stock: 50, emoji: '🍎', fresh: false, note: 'Autumn harvest' },
    { id: 'p12', name: 'Strawberry jam 250 g',   cat: 'Fruit',      price: 4.90, unit: 'jar',  stock: 18, emoji: '🍓', fresh: false, note: 'Made in our kitchen' }
  ];

  /* ----- Farm supplies (also needed here so the basket knows every price) ----- */
  var SUPPLIES = [
    { id: 's1',  name: 'Laying hen feed 25 kg',      cat: 'Feed',            price: 14.90,  unit: 'bag',    stock: 30, emoji: '🌾', note: 'Complete mix for layers' },
    { id: 's2',  name: 'Cattle pellets 25 kg',       cat: 'Feed',            price: 17.50,  unit: 'bag',    stock: 24, emoji: '🐄', note: 'For cows and heifers' },
    { id: 's3',  name: 'Goat and sheep mix 20 kg',   cat: 'Feed',            price: 15.20,  unit: 'bag',    stock: 18, emoji: '🐐', note: 'Grain and mineral mix' },
    { id: 's4',  name: 'Hay bale (small)',           cat: 'Feed',            price: 6.50,   unit: 'bale',   stock: 60, emoji: '🌿', note: 'Dry meadow hay' },
    { id: 's5',  name: 'Mineral lick block 10 kg',   cat: 'Feed',            price: 9.80,   unit: 'block',  stock: 5,  emoji: '🧂', note: 'Salt and trace minerals' },
    { id: 's6',  name: 'Electric fence energizer',   cat: 'Fencing',         price: 89.00,  unit: 'unit',   stock: 6,  emoji: '⚡', note: 'Mains or 12V battery' },
    { id: 's7',  name: 'Fence posts (10 pack)',      cat: 'Fencing',         price: 24.00,  unit: 'pack',   stock: 20, emoji: '🪵', note: 'Treated wood, 1.5 m' },
    { id: 's8',  name: 'Electric fence wire 500 m',  cat: 'Fencing',         price: 32.00,  unit: 'roll',   stock: 12, emoji: '🧵', note: 'Strong and visible' },
    { id: 's9',  name: 'Automatic poultry drinker',  cat: 'Water & feeders', price: 12.50,  unit: 'unit',   stock: 25, emoji: '💧', note: 'Keeps water clean' },
    { id: 's10', name: 'Water trough 100 L',         cat: 'Water & feeders', price: 38.00,  unit: 'unit',   stock: 8,  emoji: '🪣', note: 'For cattle and goats' },
    { id: 's11', name: 'Hen feeder 10 kg',           cat: 'Water & feeders', price: 16.90,  unit: 'unit',   stock: 15, emoji: '🐔', note: 'Rain-proof lid' },
    { id: 's12', name: 'Portable milking machine',   cat: 'Equipment',       price: 640.00, unit: 'unit',   stock: 3,  emoji: '🥛', note: 'For cows and goats' },
    { id: 's13', name: 'Egg incubator (48 eggs)',    cat: 'Equipment',       price: 175.00, unit: 'unit',   stock: 4,  emoji: '🥚', note: 'Automatic turning' },
    { id: 's14', name: 'Beekeeper smoker',           cat: 'Tools',           price: 24.00,  unit: 'unit',   stock: 9,  emoji: '🐝', note: 'Stainless steel' },
    { id: 's15', name: 'Pitchfork',                  cat: 'Tools',           price: 21.00,  unit: 'unit',   stock: 14, emoji: '🔱', note: 'Ash handle, 4 tines' },
    { id: 's16', name: 'Wheelbarrow',                cat: 'Tools',           price: 69.00,  unit: 'unit',   stock: 0,  emoji: '🛒', note: 'Back in stock soon' },
    { id: 's17', name: 'Hoof trimming kit',          cat: 'Animal care',     price: 28.00,  unit: 'kit',    stock: 11, emoji: '✂️', note: 'Shears and rasp' },
    { id: 's18', name: 'Animal first aid kit',       cat: 'Animal care',     price: 22.00,  unit: 'kit',    stock: 16, emoji: '🩹', note: 'Bandages and antiseptic' },
    { id: 's19', name: 'Fly spray 1 L',              cat: 'Animal care',     price: 9.40,   unit: 'bottle', stock: 22, emoji: '🧴', note: 'Safe for livestock' }
  ];

  var CATALOG = PRODUCTS.concat(SUPPLIES);   // everything that can go in the basket

  /* ================== HELPERS ================== */
  function $(id) { return document.getElementById(id); }
  function money(n) { return '€' + n.toFixed(2); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function find(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
  function load(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }

  /* ================== BASKET ================== */
  /* The basket is saved in the browser, so it follows the customer from page to page. */
  var cart = load('wb-cart', {});     // { itemId: quantity }

  function changeQty(id, delta) {
    var p = find(CATALOG, id);
    if (!p) return;
    var q = (cart[id] || 0) + delta;
    if (q > p.stock) { q = p.stock; toast('That is all we have in stock'); }
    if (q <= 0) delete cart[id]; else cart[id] = q;
    save('wb-cart', cart);
    renderCart();
    refresh();                        // each page redraws its own list (see below)
  }

  function addToBasket(id) {
    changeQty(id, 1);
    var p = find(CATALOG, id);
    if (p) toast(p.name + ' added to basket');
    var btn = $('openCart');
    btn.classList.remove('bump');
    void btn.offsetWidth;
    btn.classList.add('bump');
  }

  function cartTotal() {
    var t = 0;
    Object.keys(cart).forEach(function (id) { var p = find(CATALOG, id); if (p) t += p.price * cart[id]; });
    return t;
  }

  function renderCart() {
    var ids = Object.keys(cart).filter(function (id) { return find(CATALOG, id); });
    var count = 0;
    ids.forEach(function (id) { count += cart[id]; });
    $('count').textContent = count;
    $('total').textContent = money(cartTotal());

    $('items').innerHTML = ids.length ? ids.map(function (id) {
      var p = find(CATALOG, id), q = cart[id];
      return '<div class="line">' +
        '<div class="n">' + p.emoji + ' ' + esc(p.name) + '</div>' +
        '<div class="p">' + money(p.price * q) + '</div>' +
        '<div class="qty"><button type="button" data-dec="' + id + '" aria-label="Less">−</button>' +
        '<span>' + q + '</span>' +
        '<button type="button" data-inc="' + id + '" aria-label="More">+</button>' +
        '<button type="button" class="rm" data-rm="' + id + '">Remove</button></div>' +
        '<div class="meta" style="text-align:right;color:var(--muted);font-size:.85rem">' + money(p.price) + ' / ' + esc(p.unit) + '</div>' +
        '</div>';
    }).join('') : '<p class="none">Your basket is empty.</p>';
  }

  $('items').addEventListener('click', function (e) {
    var t = e.target;
    if (t.getAttribute('data-inc')) changeQty(t.getAttribute('data-inc'), 1);
    else if (t.getAttribute('data-dec')) changeQty(t.getAttribute('data-dec'), -1);
    else if (t.getAttribute('data-rm')) changeQty(t.getAttribute('data-rm'), -cart[t.getAttribute('data-rm')]);
  });

  function openCart() {
    $('drawer').classList.add('open');
    $('veil').classList.add('open');
    $('drawer').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    $('drawer').classList.remove('open');
    $('veil').classList.remove('open');
    $('drawer').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  $('openCart').addEventListener('click', openCart);
  $('closeCart').addEventListener('click', closeCart);
  $('veil').addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });

  function orderText(form) {
    var d = new FormData(form);
    var lines = Object.keys(cart).map(function (id) {
      var p = find(CATALOG, id);
      return '- ' + cart[id] + ' x ' + p.name + ' (' + money(p.price * cart[id]) + ')';
    });
    return 'New order for ' + FARM + '\n\n' + lines.join('\n') +
      '\n\nTotal: ' + money(cartTotal()) +
      '\nName: ' + d.get('name') +
      '\nPhone: ' + d.get('phone') +
      '\nPickup: ' + d.get('pickup');
  }

  function finishOrder(form) {
    cart = {};
    save('wb-cart', cart);
    form.reset();
    renderCart();
    refresh();
    closeCart();
  }

  $('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!Object.keys(cart).length) { toast('Your basket is empty'); return; }
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(orderText(this));
    window.open(url, '_blank', 'noopener');
    toast('Opening WhatsApp…');
    finishOrder(this);
  });

  $('emailOrder').addEventListener('click', function () {
    var form = $('orderForm');
    if (!form.reportValidity()) return;
    if (!Object.keys(cart).length) { toast('Your basket is empty'); return; }
    window.location.href = 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent('Order from ' + new FormData(form).get('name')) +
      '&body=' + encodeURIComponent(orderText(form));
    finishOrder(form);
  });

  /* ================== HOME PAGE ================== */
  function refresh() {}               // nothing on this page depends on the basket

  var freshHtml = PRODUCTS.filter(function (p) { return p.fresh && p.stock > 0; })
    .slice(0, 5)
    .map(function (p) {
      return '<li><span>' + p.emoji + ' ' + esc(p.name) + '</span><span>' + esc(p.note) + '</span></li>';
    }).join('');
  $('boardList').innerHTML = freshHtml || '<li><span>Check back soon</span><span></span></li>';

  var today = (new Date().getDay() + 6) % 7;   // Monday = 0
  $('hours').innerHTML = HOURS.map(function (h, i) {
    return '<tr' + (i === today ? ' class="today"' : '') + '><td>' + h[0] + '</td><td>' + h[1] + '</td></tr>';
  }).join('');

  $('msgForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(this);
    window.location.href = 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent('Message from ' + d.get('name')) +
      '&body=' + encodeURIComponent(d.get('text') + '\n\n' + d.get('name') + '\n' + d.get('email'));
    toast('Opening your email app…');
    this.reset();
  });

  $('yr').textContent = new Date().getFullYear();
  renderCart();
})();
