let button5 = document.getElementById('buta5');
let clicks = 0;

button5.addEventListener('click', (e) => {
    clicks++;
    windows[4].win = (clicks == 15);
});

windows[4].reset = () => {
    clicks = 0;
}