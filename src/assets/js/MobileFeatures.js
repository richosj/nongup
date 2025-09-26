
const touchContent = {};

// toggle: 열려 있으면 닫고, 닫혀 있으면 여는 메서드
touchContent.toggle = (press, target, callback) => {
    const allPressButtons = document.querySelectorAll('[aria-pressed]');
    const allTargets = document.querySelectorAll('[data-drag]');
    const el = document.querySelector('[data-drag="'+target+'"]');
    const touch = document.querySelector('.touch-panel');

    // 현재 버튼이 이미 눌린 상태 (aria-pressed="true")인지 확인
    const isPressed = press.getAttribute('aria-pressed') === 'true';

    // 모든 버튼의 aria-pressed를 false로 설정
    allPressButtons.forEach(button => {
        button.setAttribute('aria-pressed', 'false');
    });

    // 모든 타겟을 숨김
    allTargets.forEach(targetEl => {
        targetEl.setAttribute('aria-hidden', true);
    });

    // 현재 버튼이 이미 true였던 경우 -> 패널을 닫고 끝냄
    if (isPressed) {
        touchContent.close(target, callback);  // 패널 닫기
        return;  // 더 이상 진행하지 않음
    }

    // 패널이 닫혀 있으면 열고, 새 타겟을 보임
    touchContent.open(press, target, callback);
};

// open: 패널을 열고, 콜백 함수를 호출하는 메서드
touchContent.open = (press, target, callback) => {
    const el = document.querySelector('[data-drag="'+target+'"]');
    const touch = document.querySelector('.touch-panel');

    // 패널이 닫혀 있으면 열기
    if(!touch.classList.contains('show')) {
        touch.classList.add('show');
    }

    press.setAttribute('aria-pressed', 'true');
    el.setAttribute('aria-hidden', false);

    // callback이 함수인 경우 실행
    if(typeof callback === 'function'){
        callback();
    }
}

// close: 패널을 닫고, 콜백 함수를 호출하는 메서드
touchContent.close = (target, callback) => {
    const allTargets = document.querySelectorAll('[data-drag]');
    const touch = document.querySelector('.touch-panel');

    // 패널 닫기
    if(touch.classList.contains('show')) {
        touch.classList.remove('show');
    }

    // 모든 타겟을 숨김
    allTargets.forEach(targetEl => {
        targetEl.setAttribute('aria-hidden', true);
    });

    // callback이 함수인 경우 실행
    if(typeof callback === 'function'){
        callback();
    }
}


touchContent.remove = ( callback ) => {
    const elAll = document.querySelectorAll('[data-drag]');
    elAll.forEach(el => {
        el.setAttribute('aria-hidden', true);
    });
    if(typeof callback === 'function'){
        callback();
    }
}

// 총 면적 토글 버튼
const totalArea = (press) => {
    const el = document.querySelector('.total-area-view');
    if(el) {
        el.classList.toggle('show');
    }
    const isPressed = press.getAttribute('aria-pressed') === 'true';
    press.setAttribute('aria-pressed',!isPressed);
}
const pressedToggle = () => {

    const MobileWidget = () => {
        const mobileButtons = document.querySelectorAll('.mobile-widget');
        mobileButtons.forEach(button => {
            button.addEventListener('click', () => {
                const isPressed = button.getAttribute('aria-pressed') === 'true';
                button.setAttribute('aria-pressed',!isPressed);
                const dataCart = button.getAttribute('data-carto');
                switch (dataCart) {
                    case 'general':
                        break;
                    case 'video':
                        break;
                    case 'farmmap': 
                        break;
                    case 'lx':
                        break;
                    default:
                        console.log(`조건값이 이상합니다.`);
                }
            });
        });
    }
    MobileWidget();

    // pressed 단일 이벤트
    const toggleElements = document.querySelectorAll('[data-pressed="only-me"]');
    toggleElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentState = this.getAttribute('aria-pressed');
            if (currentState === 'true') {
                this.setAttribute('aria-pressed', false);
            } else {
                this.setAttribute('aria-pressed', true);
            }
        });
    });



    // 탭 그룹
    const tabGroups = document.querySelectorAll('.btn-tab-group');
    tabGroups.forEach(group => {
        const tabButtons = group.querySelectorAll('button'); 
        const tabContents = group.nextElementSibling.querySelectorAll('.tab_content'); 
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
                button.setAttribute('aria-selected', 'true');
                tabContents.forEach(content => content.setAttribute('aria-hidden', 'true'));
                tabContents[index].setAttribute('aria-hidden', 'false');
            });
        });
    });

    // 툴바 각 기능
    const toolbarWidget = document.querySelectorAll('[data-mobile-widget]');
    // toolbarWidget.forEach(widget => {
    //     widget.addEventListener('click', () => {
    //         const getAttribute = widget.getAttribute('aria-pressed');
    //         const setAttribute = getAttribute === 'true'? 'false' : 'true';
    //         const getWidget = widget.getAttribute('data-mobile-widget');

    //         if(getWidget == 'zoomin' || getWidget == 'zoomout'){ // + - 기능은 제외

    //         } else {
    //             widget.setAttribute('aria-pressed', setAttribute);
    //         }
            
    //     })
    // });
}
pressedToggle()
