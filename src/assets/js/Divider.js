(function(){
const draggable = document.querySelector('.screen_control .draggable');
const container = document.querySelector('.screen_control');
const partition1 = document.querySelector('.partition-1');
const partition2 = document.querySelector('.partition-2');
const splitButton = document.querySelector('.split-button'); // 분할 버튼

let isDragging = false;
let startX;
let startLeft;


if(draggable){
    draggable.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startLeft = container.offsetLeft;
        document.body.style.userSelect = 'none'; // 드래그 중 텍스트 선택 방지
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const containerWidth = container.offsetWidth;
        const screenWidth = window.innerWidth;

        // 새로운 left 계산
        const newLeft = startLeft + deltaX;
        
        // 0%와 100% 사이로 위치 제한
        const percentageLeft = Math.min(Math.max((newLeft / screenWidth) * 100, 0), 100);

        container.style.left = `${percentageLeft}%`;

        // partition-1과 partition-2의 너비 설정
        partition1.style.width = `${percentageLeft}%`;
        partition2.style.width = `${100 - percentageLeft}%`;
       // partitionO.style.transform = `translateX(-${percentageLeft}%)`;
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = ''; // 드래그가 끝나면 텍스트 선택 가능
        }
    });
}
})()


// // 분할 화면 드래그 기능
// const draggable = document.querySelector('.screen_control .draggable');
// const container = document.querySelector('.screen_control');
// const partition = document.querySelector('.partition-2')
// const partitionO = document.querySelector('.partition-2 .original');

// let isDragging = false;
// let startX;
// let startLeft;

// if(draggable){

// draggable.addEventListener('mousedown', function(e) {
//     isDragging = true;
//     startX = e.clientX;
//     startLeft = container.offsetLeft;
//     document.body.style.userSelect = 'none'; // 드래그 중 텍스트 선택 방지
// });

// document.addEventListener('mousemove', function(e) {
//     if (!isDragging) return;

//     const deltaX = e.clientX - startX;
//     const containerWidth = container.offsetWidth;
//     const screenWidth = window.innerWidth;

//     // 새로운 left 계산
//     const newLeft = startLeft + deltaX;
    
//     // 0%와 100% 사이로 위치 제한
//     const percentageLeft = Math.min(Math.max((newLeft / screenWidth) * 100, 0), 100);

//     container.style.left = `${percentageLeft}%`;
//     //draggable.style.left = `${percentageLeft}%`;

//     // partition-2의 너비 설정 (draggable의 위치에 따라)
//     partition.style.width = `${100 - percentageLeft}%`;
//     partitionO.style.transform = `translateX(-${percentageLeft}%)`;
// });

// document.addEventListener('mouseup', function() {
//     if (isDragging) {
//         isDragging = false;
//         document.body.style.userSelect = ''; // 드래그가 끝나면 텍스트 선택 가능
//     }
// });
// }