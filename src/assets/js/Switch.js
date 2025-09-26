Array.from(document.querySelectorAll('button[role^=switch]')).forEach(
    (element) => {
        //console.log(element.className);
        element.addEventListener('click', (event) => {
            if (element.getAttribute('aria-checked') === 'true') {
                element.setAttribute('aria-checked', 'false');
                element.setAttribute('title', '꺼짐');
            } else {
                element.setAttribute('aria-checked', 'true');
                element.setAttribute('title', '켜짐');
            }
        })
    }
);