document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // ANIMAÇÃO DO BOTÃO FLUTUANTE (FAB)
    // ==========================================
    const fabBtn = document.getElementById('fab-btn');
    const fabMenu = document.getElementById('fab-menu');

    if (fabBtn && fabMenu) {
        fabBtn.addEventListener('click', () => {
            fabBtn.classList.toggle('is-open');
            
            if (fabBtn.classList.contains('is-open')) {
                fabMenu.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none');
                fabMenu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            } else {
                fabMenu.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none');
                fabMenu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            }
        });
    }
});