document.querySelectorAll('.btn__collapse').forEach(button => {
    button.addEventListener('click', () => {
        const layoutId = button.getAttribute('aria-controls');
        const isSelected = button.getAttribute('aria-selected') === 'true';
        let layoutElement;

        if(button.classList.contains('unusual')){
            layoutElement = document.querySelector(`.${layoutId}`);
            console.log(layoutElement)
        } else {
            layoutElement = document.getElementById(layoutId);
        }

        button.setAttribute('aria-selected', !isSelected);
        button.setAttribute('title', '검색 목록 확장');
        if (layoutElement) {
            layoutElement.setAttribute('aria-hidden', isSelected);
        }
    })
})