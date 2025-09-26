
const toggleOpacity = document.querySelectorAll('.btn__opacity');

toggleOpacity.forEach(button => {
    button.addEventListener('click', (event) => {
        const getAttribute = button.getAttribute('aria-selected');
        const setAttribute = getAttribute === 'true' ? 'false' : 'true';

        console.log(setAttribute);
        button.setAttribute('aria-selected', setAttribute);
        
    })
});


const toggleLayer = document.querySelectorAll('.btn__see');


toggleLayer.forEach(button => {
    button.addEventListener('click', (event) => {
        const getAttribute = button.getAttribute('aria-pressed');
        const setAttribute = getAttribute === 'true' ? 'false' : 'true';

        console.log(setAttribute);
        button.setAttribute('aria-pressed', setAttribute);
    })
})