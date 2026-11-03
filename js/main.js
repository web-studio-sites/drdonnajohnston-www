import { initConsent } from './modules/consent.js';
import { initHeader } from './modules/header.js';
import { initTestimonials } from './modules/testimonials.js';
import { initReflections } from './modules/reflections.js';
import { initContactForm } from './modules/contact-form.js';

function drawIcons() {
  if (window.lucide && window.lucide.createIcons) {
    try { window.lucide.createIcons(); } catch (err) { /* icon font not ready yet */ }
  }
}

// Header/footer are composed at build time by Astro now, no runtime fetch
// step needed before these can safely query the DOM.
initConsent();
initHeader();
initTestimonials();
initReflections();
initContactForm();
drawIcons();
