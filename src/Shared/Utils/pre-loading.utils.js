window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // Redireciona para o home caso esteja na página de splash (index.html)
                if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
                    window.location.href = 'home.html';
                }
            }, 600); 
        }, 2500); 
    }
});
