let button5 = document.getElementById('buta5');
let b4 = document.getElementById('b4');
let clicks = 0;
let clicksRequired = Math.floor(Math.random() * 30) + 1;
b4.textContent = 'Clicks required: ' + clicksRequired;

button5.addEventListener('click', (e) => {
    clicks++;
    windows[3].win = (clicks == clicksRequired);
});

windows[3].reset = () => {
    clicks = 0;clicksRequired = Math.floor(Math.random() * 50) + 1;
b4.textContent = 'Clicks required: ' + clicksRequired;
}