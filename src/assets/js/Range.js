const zoomRange = document.getElementById('range');

// 페이지 로딩 시 value 값에 맞춰 그라디언트 설정
document.addEventListener('DOMContentLoaded', () => {
    const value = zoomRange.value;
    const percentage = ((value - zoomRange.min) / (zoomRange.max - zoomRange.min)) * 100;
    changeGradient(percentage, zoomRange);
});

// input 이벤트 핸들러로 그라디언트 업데이트
zoomRange.addEventListener('input', (event) => {
    const value = zoomRange.value;
    const percentage = ((value - zoomRange.min) / (zoomRange.max - zoomRange.min)) * 100;
    changeGradient(percentage, event.target);
});

function changeGradient(newValue, el) {
    // Ensure the value is between 0 and 100
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;

    // Calculate the percentage for the second color stop
    let firstColorStop = newValue;
    let secondColorStop = newValue;

    // Update the background style
    const element = el;
    element.style.background = `linear-gradient(to right, rgb(255, 82, 0, 1) 0%, rgb(255, 82, 0, 1) ${firstColorStop}%, rgb(221, 221, 221) ${secondColorStop}%, rgb(221, 221, 221) 100%)`;
}