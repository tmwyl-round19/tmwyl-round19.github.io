function generateQuestion() {
    const op = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    if (op == '*') {
        let a = Math.floor(Math.random() * 13);
        let b = Math.floor(Math.random() * 13);
        return [`${a} * ${b}`, a*b];
    } else if (op == '+') {
        let a = Math.floor(Math.random() * 101) - 50;
        let b = Math.floor(Math.random() * 101) - 50;
        return [`${a} + ${b}`, a+b];
    } else if (op == '-') {
        let a = Math.floor(Math.random() * 101) - 50;
        let b = Math.floor(Math.random() * 101) - 50;
        return [`${a} - ${b}`, a-b];
    }
}

let q5 = document.getElementById('q5');
let a5input = document.getElementById('a5input');
let question = generateQuestion();
q5.textContent = question[0];

a5input.addEventListener('input', function(e) {
    windows[4].win = (Number(e.target.value) == question[1]);
});

windows[4].reset = () => {
    question = generateQuestion();
    q5.textContent = question[0];
}