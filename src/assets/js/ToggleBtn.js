(function(){
    document.querySelectorAll('.active-toggle').forEach((toggle) => {
        toggle.addEventListener('click', () => {
            toggle.closest('li').classList.toggle('active');
        });
    });
})()