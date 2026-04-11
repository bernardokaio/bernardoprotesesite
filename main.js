// pra que serve isso? acho que é pra fazer o js executar só depois de carregar a página mas num sei tmj
// provavelmente eu vou esquecer de adicionar isso no commit do github e vai dar merda, então vou deixar um comentário aqui pra lembrar de colocar isso no futuro
document.addEventListener('DOMContentLoaded', () => {

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
    showToast('Erro ao enviar. Verifique se os campos foram preenchidos corretamente ou tente pelo WhatsApp!', 'error');
  }
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

// lightbox simples
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.portfolio-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

document.getElementById('lightbox-overlay').addEventListener('click', () => {
  lightbox.style.display = 'none';
});

//zoom na imagem do lightbox, tambem chamado de magnifier por aqueles mais boiolas
//sistema antigo era depredado, então eu refiz do zero, agora tá mais fluida e tem suporte a scroll pra aumentar e diminuir a magnificação, além de ser mais fácil de entender o código (mentira)
//ps: eu nem dei commit no sistema antigo então não me pergunte como era porque eu apaguei tudo e refiz, então não tem como comparar o código antigo com o novo, só tem o código novo mesmo
//ps: to com fome

let isPressed = false;
let magnification = 2;
let mouseX = 0;
let mouseY = 0;

function updateLens() {
  console.log('isPressed:', isPressed, 'magnification:', magnification);
  if (!isPressed) return;
  
  const lens = document.getElementById('lens');
  const rect = lightboxImg.getBoundingClientRect();
  
  const x = mouseX - rect.left;
  const y = mouseY - rect.top;
  
  lens.style.left = (mouseX - 60) + 'px';
  lens.style.top = (mouseY - 60) + 'px';
  lens.style.display = 'block';
  
  const bgX = (x / rect.width) * 100;
  const bgY = (y / rect.height) * 100;
  
  lens.style.backgroundImage = `url(${lightboxImg.src})`;
  lens.style.backgroundPosition = `${bgX}% ${bgY}%`;
  lens.style.backgroundSize = `${rect.width * magnification}px ${rect.height * magnification}px`;
}

lightboxImg.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  updateLens();
});

lightboxImg.addEventListener('wheel', (e) => {
  e.preventDefault();
  magnification += e.deltaY * -0.005;
  magnification = Math.min(Math.max(1.5, magnification), 5);
  updateLens();
});

lightboxImg.addEventListener('mouseleave', () => {
  isPressed = false;
  document.getElementById('lens').style.display = 'none';
});

lightboxImg.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isPressed = true;
});

lightboxImg.addEventListener('mouseup', (e) => {
  isPressed = false;
  document.getElementById('lens').style.display = 'none';
});

});
//agora que parei pra pensar talvez esse updatelens poderia ser otimizado pra não ser chamado toda vez que o mouse se move e só quando a posição do mouse 
//muda o suficiente pra justificar uma atualização, mas isso é um detalhe menor e provavelmente não vai causar problemas de performance, então vou deixar assim mesmo :)

//volta nicole eu ainda te amo desculpa eu errei :(