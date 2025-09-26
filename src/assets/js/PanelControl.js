// 패널 열기 함수 (aria-hidden="false"로 설정)
const PanelOpen = (panel) => {
    const target = document.querySelector(`[data-panel="${panel}"]`);
    
    if (target) {
        target.setAttribute('aria-hidden', 'false');
    }

};
// 패널 닫기 함수 (aria-hidden="true"로 설정)
const PanelClose = (panel) => {
    const target = document.querySelector(`[data-panel="${panel}"]`);

    if (target) {
        target.setAttribute('aria-hidden', 'true');
    }
    
};


const CartoBtnActiveRemove = (btn) => {
    const target = document.querySelector(`[data-carto="${btn}"]`);
    if(target){
        target.setAttribute('aria-pressed', 'false')
    }
}