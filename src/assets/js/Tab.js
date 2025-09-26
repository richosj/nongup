const tabs = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab,index) => {
    tab.addEventListener('click', (event) => {
        
        const current = event.target;
        const currentParent = current.parentNode;
        const siblings = Array.from(currentParent.children);

        const currentPanel = current.getAttribute('aria-controls');
        
        siblings.forEach(sibling => {
            sibling.classList.remove('active');
            sibling.setAttribute('aria-selected', 'false');
        })
        current.classList.add('active');
        current.setAttribute('aria-selected', 'true');

        const pannel = document.getElementById(currentPanel);
        const pannelSiblings = Array.from(pannel.parentNode.children);
        
        
        pannelSiblings.forEach(sibling => {
            if (sibling !== pannel) {
                sibling.setAttribute('aria-hidden', 'true');
            }
        })
        pannel.setAttribute('aria-hidden' , 'false');
    })
})