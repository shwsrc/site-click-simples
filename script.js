document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('video');
    const audioElement = document.getElementById('backgroundAudio');
    const overlay = document.getElementById('overlay');
    const revealBtn = document.getElementById('revealBtn');
    const cardContainer = document.getElementById('cardContainer');
  
    // Força o vídeo a rodar assim que a página carregar
    videoElement.play().catch((error) => {
      console.log('Autoplay falhou: ', error);
      // Tente reproduzir quando o botão for clicado (fallback)
    });
  
    // Lógica de revelação ao clicar no botão
    revealBtn.addEventListener('click', () => {
      // Inicia o áudio
      if (audioElement) {
        audioElement.volume = 0.4;
        audioElement.play();
      }
  
      // Revela o vídeo e o card
      videoElement.classList.remove('hidden-video');
      videoElement.play();
  
      cardContainer.classList.remove('hidden');
      overlay.style.display = 'none';
    });
  
    // Aumenta o efeito de 3D no card ao passar o mouse
    const card = document.querySelector('.card');
    const texts = card.querySelectorAll('h2, .about-me, .skill-icon, .connection-btn span');
  
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
  
      // Aumenta o efeito de rotação
      card.style.transform = `rotateY(${x / 8}deg) rotateX(${-y / 8}deg)`;
  
      // Efeito de sombra nos textos
      texts.forEach((text) => {
        const shadowX = (x / rect.width) * 30; // Maior intensidade
        const shadowY = (y / rect.height) * 30; // Maior intensidade
  
        text.style.textShadow = `
          ${shadowX}px ${shadowY}px 15px rgba(0, 0, 0, 0.5),
          ${-shadowX}px ${-shadowY}px 15px rgba(0, 0, 0, 0.2)
        `;
      });
    });
  
    card.addEventListener('mouseleave', () => {
      // Reseta a rotação e as sombras
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
      texts.forEach((text) => {
        text.style.textShadow = '0px 0px 0px rgba(0, 0, 0, 0)';
      });
    });
  });
  // Bloquear o botão direito do mouse (para evitar o menu de contexto)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Bloquear a seleção de texto
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Bloquear F12 (inspecionar com DevTools)
document.addEventListener('keydown', function(e) {
    // Bloqueia F12
    if (e.keyCode === 123) {
        e.preventDefault();
    }
    // Bloqueia Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
    }
    // Bloqueia Ctrl+U (view-source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
    }
});

// Bloquear Ctrl+C, Ctrl+V e Ctrl+X (cortar, copiar, colar)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 88 || e.keyCode === 86)) {
        e.preventDefault();
    }
});
