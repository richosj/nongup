class ResponsiveLayoutManager {
    constructor() {
        this.layoutElement = document.body;
        this.mobileClass = 'mobile-layout';
        this.desktopClass = 'desktop-layout';
        this.allPanel = document.querySelectorAll('[data-panel]');
        this.pushed = document.querySelectorAll('[aria-pressed]');
        this.selctor = document.querySelectorAll('[aria-selected]');
        this.optionslist = document.querySelectorAll('[aria-hidden]');

        this.isFirstLoad = true;  // 플래그 변수 추가


        this.handleResize = this.debounce(this.checkLayout.bind(this), 200);
        this.checkLayout();
        this.addResizeListener();  // 화면 크기 변경 감지
    }

    debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    checkLayout() {
        const isMobile = window.innerWidth <= 768; 
        console.log('Current layout is:', isMobile ? 'Mobile' : 'Desktop'); // 현재 레이아웃 확인

        if (isMobile) {
            this.layoutElement.classList.add(this.mobileClass);
            this.layoutElement.classList.remove(this.desktopClass);
        } else {
            this.layoutElement.classList.add(this.desktopClass);
            this.layoutElement.classList.remove(this.mobileClass);
        }
        // 첫 로드가 아닐 때만 resizeExtendRemove 호출
        if (!this.isFirstLoad) {
            this.resizeExtendRemove();
        }

        this.isFirstLoad = false;  // 첫 번째 로드 이후에는 플래그를 false로 설정
    }

    resizeExtendRemove() {
        // 화면 리사이징시 전체 이벤트 복귀
        this.allPanel.forEach(panel => {
            panel.setAttribute('aria-hidden', 'true');
        });
        this.pushed.forEach(btn => {
            btn.setAttribute('aria-pressed', 'false');
        });
        this.selctor.forEach(btn => {
            btn.setAttribute('aria-selected', 'false');
        });
        this.optionslist.forEach(list => {
            list.setAttribute('aria-hidden', 'true');
        });

        document.querySelector('.index').classList.remove('show')
        document.querySelector('.legend').classList.remove('show')
        
    }

    addResizeListener() {
        window.addEventListener('resize', this.handleResize);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    //new ResponsiveLayoutManager();
});
