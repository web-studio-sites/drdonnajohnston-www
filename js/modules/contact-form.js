// Sends the footer contact form through Web3Forms without leaving the page.
// Without JavaScript the form still posts and Web3Forms shows its own
// confirmation page.
export function initContactForm() {
  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('button[type="submit"]');
    const say = (msg) => { if (status) status.textContent = msg; };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.access_key || !form.access_key.value) {
        say('Sorry, the form is not set up yet. Please email instead.');
        return;
      }
      if (button) button.disabled = true;
      say('Sending…');
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success !== false) {
          form.reset();
          say('Thank you, your message has been sent.');
        } else {
          say('Sorry, something went wrong. Please try again or email instead.');
        }
      } catch (err) {
        say('Sorry, the message could not be sent. Please email instead.');
      } finally {
        if (button) button.disabled = false;
      }
    });
  });
}
