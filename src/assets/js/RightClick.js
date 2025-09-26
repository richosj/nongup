

// const contextMenuOpen = (x,y) => {
//     const contextMenu = document.querySelector('#contextMenu');
//     contextMenu.style.display = 'block';  // 메뉴 보이기
//     contextMenu.style.left = `${x}px`;  // 메뉴의 위치 설정
//     contextMenu.style.top = `${y}px`;
// }

// const contextMenuClose = () => {
//     const contextMenu = document.querySelector('#contextMenu');
//     contextMenu.style.display = 'none';
// }

// (function(){    
//     document.addEventListener('contextmenu', function(event) {
//         event.preventDefault(); 
//         contextMenuOpen(event.pageX,event.pageY)
//     });
    
//     // 닫힘
//     document.addEventListener('click', function(event) {
//         if (!contextMenu.contains(event.target)) {
//             contextMenu.style.display = 'none';
//         }
//     });
// })()