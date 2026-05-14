/* ============================================================
   Webpack entry point — Το μεράκι της Γιωτάννας
   Wires up styles, jQuery, and the main interactive script.
============================================================ */

// jQuery is also exposed as a global via ProvidePlugin in webpack.config.js,
// so legacy `$` references in script.js continue to work without imports.
import 'jquery';

// Stylesheets
import '../css/fonts.css';
import '../css/styles.css';

// Main interactive logic (menu, modal, forms, lightbox, quiz, etc.)
import '../js/email.js';
import '../js/script.js';

// Register the service worker — kept here so the bundled JS owns it.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .catch(err => console.warn('Service worker registration failed:', err));
  });
}
