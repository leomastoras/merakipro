/* ===========================================================
   Το μεράκι της Γιωτάννας — Interactivity
   - Mobile nav toggle
   - Sticky navbar shadow on scroll
   - Menu tabs
   - Click-to-add basket with quantity controls
   - Delivery + reservation form handling
   =========================================================== */

(() => {
  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  const setNav = (open) => {
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού');
  };

  navToggle?.addEventListener('click', () => {
    setNav(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  navLinks?.addEventListener('click', e => {
    if (e.target.tagName === 'A') setNav(false);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') setNav(false);
  });

  // Close when crossing into desktop breakpoint
  const mq = window.matchMedia('(min-width: 880px)');
  const onMq = () => { if (mq.matches) setNav(false); };
  mq.addEventListener?.('change', onMq);

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu tabs ---------- */
  const tabs   = document.querySelectorAll('.menu-tabs .tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    });
  });

  /* ---------- Basket ---------- */
  const basketEl       = document.getElementById('basket');
  const basketTotalEl  = document.getElementById('basket-total');
  const basketAmountEl = document.getElementById('basket-total-amount');
  const floatCta       = document.querySelector('.float-cta');
  const basketCount    = document.createElement('span');
  basketCount.className = 'cta-count';
  floatCta?.appendChild(basketCount);

  const cart = new Map(); // id -> { id, name, price, qty }

  const fmt = n => n.toFixed(2).replace('.', ',') + '€';

  function render() {
    if (cart.size === 0) {
      basketEl.innerHTML = '<p class="basket-empty">Διάλεξε πιάτα από το <a href="#menu">μενού</a> για να ξεκινήσεις.</p>';
      basketTotalEl.hidden = true;
      basketCount.textContent = '';
      basketCount.style.display = 'none';
      return;
    }
    let total = 0;
    let count = 0;
    const rows = [];
    cart.forEach(item => {
      const sub = item.price * item.qty;
      total += sub;
      count += item.qty;
      rows.push(`
        <div class="basket-row" data-id="${item.id}">
          <div class="br-info">
            <span class="br-qty">${item.qty}×</span>
            <span class="br-name">${item.name}</span>
          </div>
          <div class="br-controls">
            <span class="br-sub">${fmt(sub)}</span>
            <div class="qty-ctrl">
              <button type="button" class="qty-btn" data-act="dec" aria-label="Μείωση">−</button>
              <span class="qty-val">${item.qty}</span>
              <button type="button" class="qty-btn" data-act="inc" aria-label="Αύξηση">+</button>
            </div>
            <button type="button" class="br-remove" data-act="rm" aria-label="Αφαίρεση">×</button>
          </div>
        </div>`);
    });
    basketEl.innerHTML = rows.join('');
    basketAmountEl.textContent = fmt(total);
    basketTotalEl.hidden = false;
    basketCount.textContent = count;
    basketCount.style.display = 'inline-flex';
  }

  function addItem(id, name, price) {
    if (cart.has(id)) {
      cart.get(id).qty++;
    } else {
      cart.set(id, { id, name, price, qty: 1 });
    }
    render();
  }

  function changeQty(id, delta) {
    const item = cart.get(id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart.delete(id);
    render();
  }

  function removeItem(id) {
    cart.delete(id);
    render();
  }

  // Click-to-add on menu items
  document.querySelectorAll('.menu-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const { id, name, price } = btn.dataset;
      addItem(id, name, parseFloat(price));
      btn.classList.add('just-added');
      setTimeout(() => btn.classList.remove('just-added'), 450);
    });
  });

  // Basket controls (event delegation)
  basketEl.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const row = btn.closest('.basket-row');
    if (!row) return;
    const id = row.dataset.id;
    const act = btn.dataset.act;
    if (act === 'inc') changeQty(id, +1);
    else if (act === 'dec') changeQty(id, -1);
    else if (act === 'rm') removeItem(id);
  });

  /* ---------- Delivery form ---------- */
  const dForm = document.getElementById('delivery-form');
  const dOk   = document.getElementById('delivery-success');
  dForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (cart.size === 0) {
      basketEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      basketEl.classList.add('shake');
      setTimeout(() => basketEl.classList.remove('shake'), 500);
      return;
    }
    if (!dForm.checkValidity()) {
      dForm.reportValidity();
      return;
    }
    dOk.hidden = false;
    setTimeout(() => {
      dForm.reset();
      cart.clear();
      render();
    }, 600);
    setTimeout(() => { dOk.hidden = true; }, 6000);
  });

  /* ---------- Reservation form ---------- */
  const rForm = document.getElementById('reservation-form');
  const rOk   = document.getElementById('reservation-success');
  rForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!rForm.checkValidity()) {
      rForm.reportValidity();
      return;
    }
    rOk.hidden = false;
    setTimeout(() => rForm.reset(), 600);
    setTimeout(() => { rOk.hidden = true; }, 6000);
  });

  // Set min date on reservation
  const dateInput = rForm?.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  render();
})();
