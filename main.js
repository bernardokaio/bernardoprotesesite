// Essa porra aqui previne que você seja direcionado pra merda do formspree e mostra um alerta bonitinho  

const form = document.getElementById('contact-form');

function showToast(message, type) {
  const toast = document.getElementById('form-porra');
  const msg = document.getElementById('form-msg');
  toast.className = type;
  msg.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 4000);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });
  if (response.ok) {
    showToast('Mensagem enviada! Retornaremos em breve.', 'success');
    form.reset();
  } else {
    showToast('Erro ao enviar. Verifique se os campos foram preenchidos corretamente e tente pelo WhatsApp!', 'error');
  }
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });