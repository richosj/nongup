let sheets = document.querySelectorAll('.touch-panel');

sheets.forEach(sheet => {
    let startY;
    let currentY;
    let initialPosition = 0;

    sheet.querySelector('.touch-handel').addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        // 현재 패널의 Y 위치를 저장
        initialPosition = parseFloat(getComputedStyle(sheet).transform.split(',')[5]) || 0;
    }, false);

    sheet.querySelector('.touch-handel').addEventListener('touchmove', function(e) {
        currentY = e.touches[0].clientY;
        let change = currentY - startY;

        // 패널의 현재 위치를 터치의 이동에 맞게 업데이트
        let newPosition = initialPosition + change;

        // 패널이 화면을 넘지 않도록 제한
        if (newPosition > 0) {
            sheet.style.transform = `translateY(${newPosition}px)`;
        } else {
            sheet.style.transform = `translateY(0px)`;
        }

        e.preventDefault(); // 스크롤 방지
    }, false);

    sheet.querySelector('.touch-handel').addEventListener('touchend', function(e) {
        let threshold = sheet.clientHeight / 3;
        if (startY - currentY > threshold) {
            sheet.style.transform = `translateY(0)`; // 패널을 완전히 펼침
        } else {
            sheet.style.transform = `translateY(70%)`; // 패널을 원래 위치로 되돌림
        }
    }, false);
});