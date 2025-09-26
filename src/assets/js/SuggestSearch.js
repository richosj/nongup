const autokeyword = () => {
    const input = document.getElementById('keyword');
    const suggest = document.querySelector('.suggest');
    const suggestList = document.querySelector('ul.suggest__list');
    const items = suggestList.querySelectorAll('li > a');

    let currentIndex = -1;

    // mobile 지원 안함
    if (!document.querySelector('.mobile-layout')) {
        input.addEventListener('input', () => {
            if (input.value.trim() === '') {
                suggest.classList.remove('on');
            } else {
                suggest.classList.add('on');
            }
        });        
        items.forEach(item => {
            item.addEventListener('focus', () => {
                item.parentElement.classList.add('on');
            });
            item.addEventListener('blur', () => {
                item.parentElement.classList.remove('on');
            });
        });
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                suggest.classList.remove('on');
            }
        });
    }
}
autokeyword()