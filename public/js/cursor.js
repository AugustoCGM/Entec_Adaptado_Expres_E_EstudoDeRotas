document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // CURSOR CUSTOMIZADO (PIXEL ART)
    // ==========================================
    const customCursor = document.getElementById('custom-cursor');
    
    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });

        const clickables = document.querySelectorAll('a, button, .cursor-pointer');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('pointer'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('pointer'));
        });
    }
});