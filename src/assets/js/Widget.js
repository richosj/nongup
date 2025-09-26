document.querySelectorAll('.carto__item').forEach(button => {
    button.addEventListener('click', () => {
        const isPressed = button.getAttribute('aria-pressed') === 'true';
        button.setAttribute('aria-pressed', !isPressed);
        const dataCart = button.getAttribute('data-carto');
        switch (dataCart) {
            case 'video':
                break;
            case 'general':
                break;
            case '':
                break;
            case 'layer':
                PanelOpen('layer')
                break;
            case 'farmmap': 
                break;
            case 'menu':
                break;
            default:
                console.log(`조건값이 이상합니다.`);
        }
    });
});

document.querySelectorAll('button[data-widget]').forEach(button => {
    button.addEventListener('click', () => {
        const widgetType = button.getAttribute('data-widget');

        if (button.hasAttribute('aria-pressed')) {
            const isPressed = button.getAttribute('aria-pressed') === 'true';
            button.setAttribute('aria-pressed', !isPressed);
            console.log(`pressed`);
        }

        if (button.hasAttribute('aria-selected')) {
            const isSelected = button.getAttribute('aria-selected') === 'true';
            button.setAttribute('aria-selected', !isSelected);

            const controlsId = button.getAttribute('aria-controls');
            const controlledElement = document.getElementById(controlsId);

            if (controlledElement) {
                controlledElement.setAttribute('aria-hidden', isSelected);
                const firstChild = controlledElement.firstElementChild;
                if (firstChild) {
                    firstChild.focus();
                }
            }
        }
        // 초기화 버튼
        if (widgetType === 'drawReset' || widgetType === 'spatialReset' || widgetType === 'measureReset') {
            const siblingButtons = button.parentNode.querySelectorAll('button');
            siblingButtons.forEach(sibling => {
                if (sibling !== button && sibling.hasAttribute('aria-pressed')) {
                    sibling.setAttribute('aria-pressed', 'false');
                    console.log(`초기화`);
                }
            });
        }

        else {
            // 초기화 버튼 제외한 나머지
            switch (widgetType) {
                case 'zoomin':
                    console.log(`zoomin`);
                    break;
                case 'zoomout':
                    console.log(`zoomout`);
                    break;
                case 'legend':
                    document.querySelector('.legend').classList.toggle('show');
                    break;
                case 'division':
                    if(document.body.classList.contains('_division')){
                        // 분할 제거
                        document.querySelector('.partition-1').setAttribute('style', '');
                        document.querySelector('.partition-2').setAttribute('style', '');
                        document.querySelector('.screen_control').style.left = '50%';
                        document.body.classList.remove('_division');    
                    } else {
                        document.body.classList.add('_division');    
                    }
                    
                    break;
                    
                case 'index':
                    document.querySelector('.index').classList.toggle('show');
                    break;
            }
        }
    });
});

// 독립적인 기능 버튼
document.querySelectorAll('[data-standalone]').forEach((btn) => {
    btn.addEventListener('click' , () => {
        const getType = btn.getAttribute('data-standalone');
        const getTarget = btn.getAttribute('data-standalone-target');
        if(getType === 'close'){
            const attributeName = getTarget.split('/')[0];
            const attributeValue = getTarget.split('/')[1];

            const target = document.querySelector(`[${attributeName}='${attributeValue}']`);
            
            for(let attr of target.attributes){
                if(attr.name.startsWith('aria-')){
                    target.setAttribute(attr.name, false)
                }
            }
            
            document.querySelector(`.${target.getAttribute('data-widget')}`).classList.remove('show');
        }
    })
})
