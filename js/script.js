/* ============================================================
   Το μεράκι της Γιωτάννας — interactive script
   - Builds the menu by category
   - Opens a modal with details when an item is clicked
   - Handles tab switching, mobile nav, forms, and footer year
============================================================ */

const MENU = {
  pizza: [
    { icon: '🍕', name: 'Μαργαρίτα',        price: 7.50, desc: 'Κλασική ιταλική με σπιτική σάλτσα ντομάτας, μοτσαρέλα και φρέσκο βασιλικό.', ing: ['Ντομάτα','Μοτσαρέλα','Βασιλικός','Ελαιόλαδο'] },
    { icon: '🍕', name: 'Σπέσιαλ',           price: 9.00, desc: 'Η αγαπημένη μας πίτσα με ζαμπόν, μπέικον, μανιτάρια και πιπεριά.', ing: ['Ζαμπόν','Μπέικον','Μανιτάρια','Πιπεριά','Μοτσαρέλα'] },
    { icon: '🌶️', name: 'Διάβολος',          price: 9.50, desc: 'Πικάντικη με σαλάμι αέρος, καυτερή πιπεριά και κρεμμύδι.', ing: ['Σαλάμι','Καυτερή πιπεριά','Κρεμμύδι','Μοτσαρέλα'] },
    { icon: '🥬', name: 'Λαχανικών',          price: 8.50, desc: 'Με μανιτάρια, πιπεριές, ντομάτα, ελιές και κρεμμύδι.', ing: ['Μανιτάρια','Πιπεριές','Ντομάτα','Ελιές','Κρεμμύδι'] },
    { icon: '🐟', name: 'Θαλασσινών',         price: 9.50, desc: 'Με γαρίδες, μύδια, καλαμάρι και άρωμα λεμονιού.', ing: ['Γαρίδες','Μύδια','Καλαμάρι','Λεμόνι'] },
    { icon: '🧀', name: 'Τέσσερα τυριά',      price: 9.00, desc: 'Ένας ύμνος στο τυρί: μοτσαρέλα, παρμεζάνα, γκοργκοντζόλα και γραβιέρα.', ing: ['Μοτσαρέλα','Παρμεζάνα','Γκοργκοντζόλα','Γραβιέρα'] },
  ],

  burgers: [
    { icon: '🍔', name: 'Classic Burger',     price: 6.90, desc: 'Μοσχαρίσιο μπιφτέκι 200γρ, τσένταρ, μαρούλι, ντομάτα και σπιτική σος.', ing: ['Μοσχάρι','Τσένταρ','Μαρούλι','Ντομάτα','Σπιτική σος'] },
    { icon: '🥓', name: 'Bacon Lover',         price: 7.90, desc: 'Με τραγανό μπέικον, καραμελωμένο κρεμμύδι και bbq σος.', ing: ['Μπέικον','Κρεμμύδι','BBQ','Τσένταρ'] },
    { icon: '🍄', name: 'Mushroom Swiss',     price: 7.50, desc: 'Με φρέσκα μανιτάρια σοτέ και τυρί ελβετικό.', ing: ['Μανιτάρια','Τυρί ελβετικό','Μαρούλι'] },
    { icon: '🐔', name: 'Chicken Burger',      price: 6.50, desc: 'Φιλέτο κοτόπουλο πανέ, αυτόχθονη σος και ραπανάκι.', ing: ['Κοτόπουλο','Σος γιαουρτιού','Ραπανάκι','Μαρούλι'] },
    { icon: '🌱', name: 'Veggie Burger',       price: 6.00, desc: 'Μπιφτέκι λαχανικών με αβοκάντο, ντομάτα και χούμους.', ing: ['Λαχανικά','Αβοκάντο','Χούμους','Ντομάτα'] },
    { icon: '🔥', name: 'Spicy Mexican',      price: 8.50, desc: 'Διπλό μπιφτέκι, jalapeños, πικάντικη σος και guacamole.', ing: ['Διπλό μπιφτέκι','Jalapeños','Guacamole','Πικάντικη σος'] },
  ],

  sticks: [
    { icon: '🍢', name: 'Καλαμάκι χοιρινό',   price: 2.20, desc: 'Παραδοσιακό καλαμάκι από επιλεγμένο χοιρινό, μαριναρισμένο σπιτικά.', ing: ['Χοιρινό','Λεμόνι','Μπαχαρικά'] },
    { icon: '🍗', name: 'Καλαμάκι κοτόπουλο', price: 2.30, desc: 'Ζουμερό φιλέτο κοτόπουλο σε μαρινάδα γιαουρτιού.', ing: ['Κοτόπουλο','Γιαούρτι','Λεμόνι'] },
    { icon: '🥙', name: 'Πίτα καλαμάκι χοιρινό', price: 3.50, desc: 'Πίτα καλαμάκι χοιρινό με πατάτες, ντομάτα, κρεμμύδι και τζατζίκι.', ing: ['Γύρος','Πατάτες','Ντομάτα','Τζατζίκι'] },
    { icon: '🥙', name: 'Πίτα καλαμάκι κοτόπουλο', price: 3.50, desc: 'Πίτα καλαμάκι κοτόπουλο με όλα τα παραδοσιακά συνοδευτικά.', ing: ['Κοτόπουλο','Πατάτες','Ντομάτα','Τζατζίκι'] },
    { icon: '🍢', name: 'Μερίδα 4 καλαμάκια', price: 8.50, desc: 'Πιάτο με 4 καλαμάκια της επιλογής σας, πατάτες και πίτες.', ing: ['Καλαμάκια','Πατάτες','Πίτες','Σαλάτα'] },
    { icon: '🍢', name: 'Σχάρας μικτή',       price: 14.50, desc: 'Μικτή ποικιλία: καλαμάκια, μπιφτέκι, λουκάνικο και πανσέτα.', ing: ['Καλαμάκια','Μπιφτέκι','Λουκάνικο','Πανσέτα'] },
  ],

  club: [
    { icon: '🥪', name: 'Club Classic',        price: 6.50, desc: 'Τριπλό σάντουιτς με κοτόπουλο, μπέικον, μαρούλι, ντομάτα και αυγό.', ing: ['Κοτόπουλο','Μπέικον','Αυγό','Μαρούλι','Ντομάτα'] },
    { icon: '🥪', name: 'Club Tuna',           price: 6.90, desc: 'Με τόνο, αβοκάντο, μαρούλι και σπιτική μαγιονέζα.', ing: ['Τόνος','Αβοκάντο','Μαρούλι','Μαγιονέζα'] },
    { icon: '🥪', name: 'Club Vegetarian',     price: 5.90, desc: 'Με γκριλιαρισμένα λαχανικά, χαλούμι και πέστο βασιλικού.', ing: ['Λαχανικά','Χαλούμι','Πέστο'] },
    { icon: '🥪', name: 'Club Smoked Salmon',  price: 7.90, desc: 'Με καπνιστό σολομό, κρέμα τυριού και άνηθο.', ing: ['Σολομός','Κρέμα τυριού','Άνηθος'] },
    { icon: '🥖', name: 'Baguette Special',     price: 5.50, desc: 'Φρέσκια μπαγκέτα με ζαμπόν, τυρί, μαρούλι και ντομάτα.', ing: ['Ζαμπόν','Τυρί','Μαρούλι','Ντομάτα'] },
  ],

  pasta: [
    { icon: '🍝', name: 'Καρμπονάρα',          price: 7.50, desc: 'Αυθεντική ιταλική με γκουαντσιάλε, αυγό, πεκορίνο και πιπέρι.', ing: ['Γκουαντσιάλε','Αυγό','Πεκορίνο','Πιπέρι'] },
    { icon: '🍝', name: 'Μπολονέζ',            price: 7.00, desc: 'Σπιτική σάλτσα κιμά που σιγοβράζει για ώρες.', ing: ['Κιμάς','Ντομάτα','Καρότο','Σέλινο'] },
    { icon: '🍝', name: 'Πένες αραμπιάτα',     price: 6.50, desc: 'Πικάντικη σάλτσα ντομάτας με σκόρδο και κόκκινη πιπεριά.', ing: ['Ντομάτα','Σκόρδο','Καυτερή πιπεριά'] },
    { icon: '🦐', name: 'Λιγκουίνι θαλασσινών',price: 10.50, desc: 'Λιγκουίνι με γαρίδες, μύδια, καλαμάρι και λευκό κρασί.', ing: ['Γαρίδες','Μύδια','Καλαμάρι','Λευκό κρασί'] },
    { icon: '🌿', name: 'Πέστο',                price: 6.50, desc: 'Σπιτικό πέστο βασιλικού με κουκουνάρι και παρμεζάνα.', ing: ['Βασιλικός','Κουκουνάρι','Παρμεζάνα'] },
    { icon: '🧄', name: 'Aglio e Olio',          price: 5.50, desc: 'Σπαγγέτι με λάδι, σκόρδο και πεπερόνι.', ing: ['Σκόρδο','Ελαιόλαδο','Πεπερόνι'] },
  ],

  sweets: [
    { icon: '🍫', name: 'Σουφλέ σοκολάτας',     price: 4.50, desc: 'Ζεστό σουφλέ με ρευστή καρδιά σοκολάτας και βανίλια.', ing: ['Σοκολάτα','Βανίλια','Πάγωμα'] },
    { icon: '🍰', name: 'Τιραμισού',             price: 4.00, desc: 'Παραδοσιακό ιταλικό με μασκαρπόνε και espresso.', ing: ['Μασκαρπόνε','Espresso','Σαβαγιάρ'] },
    { icon: '🍮', name: 'Πανακότα',              price: 3.80, desc: 'Βελούδινη πανακότα με σος κόκκινων φρούτων.', ing: ['Κρέμα','Βανίλια','Φρούτα δάσους'] },
    { icon: '🍩', name: 'Λουκουμάδες',           price: 3.50, desc: 'Σπιτικοί λουκουμάδες με μέλι, καρύδι και κανέλα.', ing: ['Μέλι','Καρύδι','Κανέλα'] },
    { icon: '🍨', name: 'Παγωτό 3 γεύσεων',     price: 3.00, desc: 'Επιλέξτε 3 γεύσεις από τα σπιτικά μας παγωτά.', ing: ['Σοκολάτα','Βανίλια','Φράουλα','Φιστίκι'] },
    { icon: '🥧', name: 'Μηλόπιτα',               price: 3.50, desc: 'Ζεστή μηλόπιτα με κανέλα, σερβιρισμένη με παγωτό βανίλια.', ing: ['Μήλο','Κανέλα','Παγωτό βανίλια'] },
  ],

  drinks: [
    { icon: '🥤', name: 'Αναψυκτικά',            price: 2.00, desc: 'Coca-Cola, Sprite, Fanta — επιλογή σε φιάλη 330ml.', ing: ['Coca-Cola','Sprite','Fanta'] },
    { icon: '💧', name: 'Εμφιαλωμένο νερό',       price: 0.80, desc: 'Φυσικό μεταλλικό νερό 500ml ή 1L.', ing: ['Φυσικό','500ml','1L'] },
    { icon: '✨', name: 'Ανθρακούχο νερό',        price: 1.50, desc: 'Δροσιστικό ανθρακούχο με λεμόνι ή φυσικό.', ing: ['Ανθρακούχο','Λεμόνι'] },
    { icon: '🧃', name: 'Φυσικός χυμός',          price: 3.00, desc: 'Φρεσκοστυμμένος χυμός πορτοκάλι ή ανάμεικτος εποχής.', ing: ['Πορτοκάλι','Ανάμεικτος','Λεμόνι'] },
    { icon: '🍺', name: 'Μπύρα draft',             price: 3.50, desc: 'Δροσιστική μπύρα από βαρέλι 500ml — Mythos ή Fix.', ing: ['Mythos','Fix','500ml'] },
    { icon: '🍻', name: 'Μπύρα φιάλη',             price: 3.00, desc: 'Heineken, Amstel, Alfa, Vergina — επιλογή 330ml.', ing: ['Heineken','Amstel','Alfa','Vergina'] },
    { icon: '🍷', name: 'Κρασί ποτήρι',            price: 4.00, desc: 'Λευκό, ροζέ ή κόκκινο ποτήρι κρασί από επιλεγμένους Έλληνες παραγωγούς.', ing: ['Λευκό','Ροζέ','Κόκκινο'] },
    { icon: '🍾', name: 'Κρασί φιάλη 750ml',       price: 16.00, desc: 'Φιάλη επιλεγμένης ποικιλίας — ρωτήστε μας για τη λίστα κρασιών.', ing: ['Ασύρτικο','Αγιωργίτικο','Μοσχοφίλερο'] },
    { icon: '🥃', name: 'Τσίπουρο 200ml',          price: 6.50, desc: 'Παραδοσιακό τσίπουρο με ή χωρίς γλυκάνισο, σερβιρισμένο με μεζέ.', ing: ['Με γλυκάνισο','Χωρίς γλυκάνισο','Μεζές'] },
    { icon: '🍹', name: 'Cocktail',                price: 8.00, desc: 'Σπιτικά cocktails: Mojito, Aperol Spritz, Margarita, Negroni.', ing: ['Mojito','Aperol Spritz','Margarita','Negroni'] },
    { icon: '☕', name: 'Καφές ελληνικός',         price: 1.80, desc: 'Παραδοσιακός ελληνικός σε μπρίκι — σκέτος, μέτριος ή γλυκός.', ing: ['Σκέτος','Μέτριος','Γλυκός'] },
    { icon: '🧊', name: 'Φραπέ / Freddo',           price: 2.80, desc: 'Δροσιστικός φραπέ ή freddo espresso/cappuccino.', ing: ['Φραπέ','Freddo Espresso','Freddo Cappuccino'] },
  ],
};

/* ---------- Render menu ---------- */
const grid = document.getElementById('menuGrid');

function renderCategory(cat) {
  grid.innerHTML = '';
  MENU[cat].forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-item';
    btn.innerHTML = `
      <span class="icon">${item.icon}</span>
      <span class="name">${item.name}</span>
      <p class="desc">${item.desc}</p>
      <span class="price">€${item.price.toFixed(2)}</span>
      <span class="more">Πατήστε για λεπτομέρειες →</span>
    `;
    btn.addEventListener('click', () => openModal(item));
    grid.appendChild(btn);
    btn.style.opacity = 0;
    btn.style.transform = 'translateY(10px)';
    setTimeout(() => {
      btn.style.transition = 'opacity .35s, transform .35s';
      btn.style.opacity = 1;
      btn.style.transform = 'translateY(0)';
    }, idx * 40);
  });
}

/* ---------- Tabs ---------- */
const tabs = document.querySelectorAll('.tab');
tabs.forEach(t => {
  t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    renderCategory(t.dataset.cat);
  });
});

/* initial render */
renderCategory('pizza');

/* ---------- Modal ---------- */
const modal       = document.getElementById('itemModal');
const modalIcon   = document.getElementById('modalIcon');
const modalTitle  = document.getElementById('modalTitle');
const modalDesc   = document.getElementById('modalDesc');
const modalIngrs  = document.getElementById('modalIngredients');
const modalPrice  = document.getElementById('modalPrice');
const modalAdd    = document.getElementById('modalAdd');
const qtyValue    = document.getElementById('qtyValue');
const qtyMinus    = document.getElementById('qtyMinus');
const qtyPlus     = document.getElementById('qtyPlus');

const MAX_QTY = 99;
let currentItem     = null;
let currentQty      = 1;
let currentExcluded = new Set();

function updateQtyUI() {
  qtyValue.textContent = currentQty;
  qtyMinus.disabled = currentQty <= 1;
  qtyPlus.disabled  = currentQty >= MAX_QTY;
  if (currentItem) {
    modalPrice.textContent = `€${(currentItem.price * currentQty).toFixed(2)}`;
  }
}

qtyMinus.addEventListener('click', () => {
  if (currentQty > 1) { currentQty--; updateQtyUI(); }
});
qtyPlus.addEventListener('click', () => {
  if (currentQty < MAX_QTY) { currentQty++; updateQtyUI(); }
});

function openModal(item) {
  currentItem = item;
  currentQty  = 1;
  currentExcluded = new Set();
  modalIcon.textContent  = item.icon;
  modalTitle.textContent = item.name;
  modalDesc.textContent  = item.desc;
  modalIngrs.innerHTML   = item.ing
    .map(i => `<li data-ing="${i.replace(/"/g, '&quot;')}">${i}</li>`)
    .join('');
  modalIngrs.querySelectorAll('li').forEach(pill => {
    pill.addEventListener('click', () => {
      const ing = pill.dataset.ing;
      if (currentExcluded.has(ing)) {
        currentExcluded.delete(ing);
        pill.classList.remove('excluded');
      } else {
        currentExcluded.add(ing);
        pill.classList.add('excluded');
      }
    });
  });
  updateQtyUI();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

/* Add (or merge) the current item into the delivery textarea.
   Lines have the format "Nx Item name". If a line for the same item
   already exists, increment its quantity instead of adding a duplicate. */
/* ---------- Order state ---------- */
let orderItems = [];   // { name, qty, excluded: string[] }

const orderListEl = document.getElementById('orderList');

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function itemKey(name, excluded) {
  return `${name}|${[...excluded].sort().join(',')}`;
}

function renderModsHTML(it) {
  if (!it.excluded.length) return '';
  if (it.allIng) {
    const remaining = it.allIng.filter(i => !it.excluded.includes(i));
    if (remaining.length === 1) {
      return `<span class="order-mods">— ${escapeHTML(remaining[0])}</span>`;
    }
  }
  return `<span class="order-mods">— χωρίς ${it.excluded.map(escapeHTML).join(', ')}</span>`;
}

function renderOrderList() {
  if (!orderItems.length) {
    orderListEl.innerHTML = '<li class="order-empty">Η παραγγελία σας είναι κενή. Επιλέξτε ένα πιάτο από το μενού πιο πάνω.</li>';
    return;
  }
  orderListEl.innerHTML = orderItems.map((it, i) => `
    <li class="order-item">
      <span class="order-qty">${it.qty}×</span>
      <span class="order-name">${escapeHTML(it.name)}</span>
      ${renderModsHTML(it)}
      <button type="button" class="order-remove" data-idx="${i}" aria-label="Αφαίρεση ${escapeHTML(it.name)}">×</button>
    </li>
  `).join('');
  orderListEl.querySelectorAll('.order-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx, 10);
      orderItems.splice(idx, 1);
      renderOrderList();
    });
  });
}

function addToOrder(item, qty, excluded) {
  const key = itemKey(item.name, excluded);
  const existing = orderItems.find(x => itemKey(x.name, x.excluded) === key);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, MAX_QTY);
  } else {
    orderItems.push({
      name: item.name,
      qty,
      excluded: [...excluded],
      allIng: [...item.ing],
    });
  }
  renderOrderList();
}

renderOrderList();

modalAdd.addEventListener('click', () => {
  if (!currentItem) return;
  addToOrder(currentItem, currentQty, Array.from(currentExcluded));
  closeModal();
  document.getElementById('delivery').scrollIntoView({ behavior: 'smooth' });
  orderListEl.classList.add('flash');
  setTimeout(() => orderListEl.classList.remove('flash'), 800);
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

/* ---------- Mobile nav ---------- */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ---------- Forms ---------- */
function bindFormDemo(formId, statusId, msg) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById(statusId);
    status.textContent = '⏳ Αποστολή…';
    setTimeout(() => {
      status.textContent = msg;
      form.reset();
    }, 900);
  });
}
bindFormDemo('bookingForm', 'bookingStatus', '✓ Η κράτησή σας καταχωρήθηκε — θα λάβετε επιβεβαίωση εντός 30 λεπτών.');

/* Delivery form has its own logic so it can validate the order list */
const deliveryForm   = document.getElementById('deliveryForm');
const deliveryStatus = document.getElementById('deliveryStatus');
deliveryForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!orderItems.length) {
    deliveryStatus.textContent = '✗ Παρακαλώ προσθέστε τουλάχιστον ένα προϊόν στην παραγγελία.';
    orderListEl.classList.add('flash-error');
    setTimeout(() => orderListEl.classList.remove('flash-error'), 1200);
    orderListEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  deliveryStatus.textContent = '⏳ Αποστολή…';
  setTimeout(() => {
    deliveryStatus.textContent = '✓ Λάβαμε την παραγγελία σας — θα σας καλέσουμε σύντομα!';
    /*deliveryForm.reset();
    orderItems = [];*/
    renderOrderList();
  }, 900);
});

/* ---------- Why-us: selectable cards + shared detail panel ---------- */
const INFO_CONTENT = {
  wine: `
    <p>Η λίστα κρασιών μας είναι ένα <b>ταξίδι</b> στους ελληνικούς αμπελώνες: Ασύρτικο από τη Σαντορίνη, Αγιωργίτικο από τη Νεμέα, Ξινόμαυρο από τη Νάουσα, Μοσχοφίλερο από τη Μαντινεία και πολλά ακόμα. Συνεργαζόμαστε <b>αποκλειστικά</b> με μικρούς, οικογενειακούς οινοποιούς που μοιράζονται την ίδια αγάπη για <b>ποιοτικές</b> γεύσεις.</p>
    <p>Δεν ξέρετε ποιο να διαλέξετε; Ζητήστε από τον σερβιτόρο να σας προτείνει το <b>ιδανικό</b> κρασί για το πιάτο σας — έχουμε εκπαιδευτεί ακριβώς για αυτό.</p>
  `,
  eco: `
    <p>Συνεργαζόμαστε με τοπικούς παραγωγούς για να μειώνουμε το περιβαλλοντικό μας αποτύπωμα και να <b>στηρίζουμε</b> ουσιαστικά την οικονομία της περιοχής. Οι συσκευασίες delivery που χρησιμοποιούμε είναι <b>100%</b> ανακυκλώσιμες και βιοδιασπώμενες, χωρίς περιττά πλαστικά.</p>
    <p>Παράλληλα, ανακυκλώνουμε γυαλί, χαρτί και έλαια, ενώ τα οργανικά υπολείμματα της κουζίνας καταλήγουν σε κομποστοποίηση. Για εμάς, η <b>βιωσιμότητα</b> δεν είναι τάση, αλλά καθημερινή επιλογή. Κάθε επιλογή γίνεται με <b>σεβασμό</b> στη φύση, στους ανθρώπους και στο κοινό μας <b>μέλλον</b>. Μικρές κινήσεις, μεγάλη διαφορά.</p>
  `,
  team: `
    <p>Επικεφαλής της κουζίνας μας είναι η Γιωτάννα, με μεγάλη <b>εμπειρία</b> στην ελληνική και μεσογειακή κουζίνα και βαθιά γνώση παραδοσιακών τεχνικών, σύγχρονων τάσεων, εποχικών υλικών και <b>αυθεντικών</b> τοπικών συνταγών. Η ομάδα της αποτελείται από <b>παθιασμένους</b> μάγειρες που εξελίσσονται με συνέπεια.</p>
    <p>Το προσωπικό σέρβις γνωρίζει <b>άριστα</b> τα πιάτα μας και είναι πάντα έτοιμο να σας προτείνει την <b>ιδανική</b> επιλογή, να απαντήσει στις απορίες σας και να σας καλωσορίσει με ένα ζεστό, <b>αυθεντικό</b> χαμόγελο.</p>
  `,
  community: `
    <p>Συμμετέχουμε <b>ενεργά</b> σε δράσεις του δήμου, χορηγούμε τοπικές αθλητικές ομάδες και <b>προσφέρουμε</b> γεύματα σε ευπαθείς ομάδες κάθε Χριστούγεννα και Πάσχα.</p>
    <p>Πιστεύουμε πως η επιτυχία ενός μαγαζιού δεν μετριέται μόνο στα πιάτα που σερβίρει, αλλά και στο πόσο <b>επιστρέφει</b> στους ανθρώπους που το <b>στηρίζουν</b> καθημερινά. Γι’ αυτό στεκόμαστε δίπλα στην κοινότητά μας με συνέπεια, σεβασμό και αληθινό <b>ενδιαφέρον</b>. Κάθε προσφορά, μικρή ή μεγάλη, είναι για εμάς τρόπος <b>ευγνωμοσύνης</b> και σύνδεσης.</p>
  `,
};

const infoDetail = document.getElementById('infoDetail');
const infoCards  = document.querySelectorAll('#infoCards .info-card');

function selectInfoCard(card) {
  if (card.classList.contains('active')) return;
  infoCards.forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  const key = card.dataset.card;
  infoDetail.classList.add('fading');
  setTimeout(() => {
    infoDetail.innerHTML = INFO_CONTENT[key] || '';
    infoDetail.classList.remove('fading');
  }, 200);
}

infoCards.forEach(card => {
  card.addEventListener('click', () => selectInfoCard(card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectInfoCard(card);
    }
  });
});

/* initialise with the active card's content */
const initial = document.querySelector('#infoCards .info-card.active') || infoCards[0];
if (initial) infoDetail.innerHTML = INFO_CONTENT[initial.dataset.card] || '';

/* ---------- Gallery lightbox ---------- */
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxCap   = document.getElementById('lightboxCaption');
const lightboxCount = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');
let lightboxIndex = 0;

function updateLightbox() {
  const item = galleryItems[lightboxIndex];
  if (!item) return;
  const img = item.querySelector('img');
  const cap = item.querySelector('figcaption');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
  lightboxCap.textContent = cap ? cap.textContent : '';
  lightboxCount.textContent = `${lightboxIndex + 1} / ${galleryItems.length}`;
}

function openLightbox(idx) {
  lightboxIndex = idx;
  updateLightbox();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function navLightbox(delta) {
  const n = galleryItems.length;
  lightboxIndex = (lightboxIndex + delta + n) % n;
  updateLightbox();
}

galleryItems.forEach((item, idx) => {
  item.addEventListener('click', () => openLightbox(idx));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navLightbox(-1));
lightboxNext.addEventListener('click', () => navLightbox(1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   navLightbox(-1);
  if (e.key === 'ArrowRight')  navLightbox(1);
});

/* ---------- Clear delivery form ---------- */
document.getElementById('btn-clear-delivery').addEventListener('click', () => {
  if (!window.confirm('Καθαρισμός όλων των πεδίων και της παραγγελίας;')) return;
  deliveryForm.reset();
  orderItems = [];
  renderOrderList();
  deliveryStatus.textContent = '';
});

/* ---------- Clear booking form ---------- */
document.getElementById('btn-clear-booking').addEventListener('click', () => {
  if (!window.confirm('Καθαρισμός όλων των πεδίων;')) return;
  document.getElementById('bookingForm').reset();
  document.getElementById('bookingStatus').textContent = '';
});

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('btn-delivery').addEventListener('click',() => {
  // code fragment

  
  if(window.confirm("Αποστολή παραγγελίας - είστε σίγουροι?")) {

    var data = {
        service_id: 'service_p3bwchp',
        template_id: 'template_xp2dwo5',
        user_id: 'A8ztVkz9lM3l1oYlQ',
        template_params: {
            'name': $('#name').val(),
            'title': 'ΠΑΡΑΓΓΕΛΙΑ',
            'email': '-',
            'message': 'Όνομα:' + '\n' + $('#name').val() + '\n\n'
                    + 'Τηλέφωνο:' + '\n' + $('#tel').val() + '\n\n'
                    + 'Διεύθυνση:' + '\n' + $('#address').val() + '\n\n'
                    + 'Όροφος:' + '\n' + $('#floor').val() + '\n\n'
                    + 'Ώρα:' + '\n' + $('#time').val() + '\n\n'
                    + 'Πληρωμή:' + '\n' + $('#payment').val() + '\n\n'
                    + 'Λίστα:' + '\n' + $('#orderList').text() + '\n\n'
                    + 'Σημειώσεις:' + '\n' +$('#notes').val() + '\n\n',
            'time': new Date()
        }
    };

    
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function() {
        alert('H παραγγελία σας στάλθηκε επιτυχώς!');
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });
  }
  // code fragment
});

document.getElementById('btn-booktable').addEventListener('click',() => {
  // code fragment

  
  if(window.confirm("Αποστολή στοιχείων - είστε σίγουροι?")) {

    var data = {
        service_id: 'service_p3bwchp',
        template_id: 'template_xp2dwo5',
        user_id: 'A8ztVkz9lM3l1oYlQ',
        template_params: {
            'name': $('#name').val(),
            'title': 'ΚΡΑΤΗΣΗ',
            'email': '-',
            'message': 'Όνομα:' + '\n' + $('#bookname').val() + '\n\n'
                    + 'Τηλέφωνο:' + '\n' + $('#booktel').val() + '\n\n'
                    + 'Email:' + '\n' + $('#bookemail').val() + '\n\n'
                    + 'Άτομα:' + '\n' + $('#bookpeople').val() + '\n\n'
                    + 'Ημερομηνία:' + '\n' + $('#bookdate').val() + '\n\n'
                    + 'Ώρα:' + '\n' + $('#booktime').val() + '\n\n'
                    + 'Προτίμηση καθίσματος:' + '\n' +$('#bookseating').val() + '\n\n'
                    + 'Περίσταση:' + '\n' +$('#bookoccasion').val() + '\n\n'
                    + 'Σημειώσεις:' + '\n' +$('#booknotes').val() + '\n\n',
            'time': new Date()
        }
    };

    
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function() {
        alert('H κράτηση σας καταχωρήθηκε επιτυχώς!');
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });
  }
  // code fragment
});