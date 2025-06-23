let usedWords = [];
let previousInput = "";
let requiredRegex = /^[a-zA-Z]+$/;
let a2input = document.getElementById('a2input');
let a2data = document.getElementById('a2data');
a2input.addEventListener('input', function(e) {
    let value = e.target.value;
    if (value.match(requiredRegex) || value == '') { 
        previousInput = value;
        a2input.value = value.toLowerCase();
    } else {
        a2input.value = previousInput;
    }
    windows[1].win = a2input.value && !usedWords.includes(a2input.value);
});

windows[1].reset = () => {
    usedWords.push(a2input.value);
    a2data.textContent = `Words entered: ${usedWords.length}`;
    a2input.value = '';
};