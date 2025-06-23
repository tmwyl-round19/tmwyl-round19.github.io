"use strict";

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("header" + elmnt.id)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("header" + elmnt.id).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let level = 1;

class Window {
    constructor(id, maxTime /* in 1/10 seconds*/, name) {
        this.id = 'a'+  id;
        this.element = document.getElementById(this.id.toString());
        this.intervals = [];
        this.maxTime = maxTime;
        this.time = maxTime;
        console.log(id);
        this.header = document.getElementById('header' + this.id);
        console.log(this.header)
        this.name = name;
        this.header.innerHTML = name + ` (${(this.time/10).toFixed(1)})`;
        this.win = false;
    }
}

function resetTime(win) {
    win.time = win.maxTime;
    win.reset();
}

function decrTime(win) {
    win.time -= 1;
    win.header.innerHTML = win.name + ` (${(win.time/10).toFixed(1)})`;
    if (win.time <= 0) {
        if (!win.win) {
            win.intervals.forEach(clearInterval); // GAME LOST
        }
        else resetTime(win);
    }
}

function open(win) { 
    win.element.hidden = false;
    win.element.style.top = Math.random() * (window.innerHeight - 400) + 'px';
    win.element.style.left = Math.random() * (window.innerWidth - 400) + 'px';
    dragElement(win.element);
    win.intervals.push(setInterval(decrTime, 100, win))
}

const windows = [
    new Window(1, 600, '8 Puzzle'),
    new Window(2, 150, 'Unique Word')
];

// LEVEL 1

let l1board = windows[0].element.children[1].children[0].children;

let grid = [1,2,3,4,5,6,7,8,0];
let zero = grid.findIndex(e => !e);
let zeroX = zero % 3, zeroY = Math.floor(zero / 3);

for (let i = 0; i < l1board.length; i++) {
    l1board[i].style.top = Math.floor(i / 3) * 100 + 'px';
    l1board[i].style.left = 100 * (i % 3) + 'px';
    l1board[i].addEventListener('click', function (e) {
        let sq = e.target.style;
        let x = +(sq.left.slice(0, sq.left.length - 2)) / 100;
        let y = +(sq.top.slice(0, sq.top.length - 2)) / 100;

        let idx = y * 3 + x;

        zero = grid.findIndex(e => !e);
        zeroX = zero % 3, zeroY = Math.floor(zero / 3);

        if ((Math.abs(x - zeroX) == 1 && y == zeroY)
            || (x == zeroX && Math.abs(y - zeroY) == 1)) {
            let thingVal = grid[idx]
            grid[zero] = thingVal;
            grid[idx] = 0;

            document.getElementById('g' + (thingVal)).style.top = zeroY * 100 + 'px';
            document.getElementById('g' + (thingVal)).style.left = zeroX * 100 + 'px';

            windows[1].win = grid.every((e, i) => e == [1,2,3,4,5,6,7,8,0][i]);
        }
    })
}


function randomMove(grid) {
    zero = grid.findIndex(e => !e);
    zeroX = zero % 3, zeroY = Math.floor(zero / 3);
    let orthogonals = [[zeroX + 1, zeroY], [zeroX - 1, zeroY], [zeroX, zeroY - 1], [zeroX, zeroY + 1]]
                    .filter(e => (e[0] < 3 && e[0] > -1 && e[1] < 3 && e[1] > -1));
    let [moveX, moveY] = orthogonals[Math.floor(Math.random() * orthogonals.length)];
    console.log(moveX, moveY);
    let thing = moveY * 3 + moveX;
    let thingVal = grid[thing]
    grid[zero] = thingVal;
    grid[thing] = 0;

    document.getElementById('g' + (thingVal)).style.top = zeroY * 100 + 'px';
    document.getElementById('g' + (thingVal)).style.left = zeroX * 100 + 'px';
}

windows[0].reset = () => {for (let i = 1; i<=50; i++) randomMove(grid);}
windows[0].reset();
///

// LEVEL 2

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
    a2input.value = '';
    windows[1].win = false;
    a2data.textContent = `Words entered: ${usedWords.length}`;
};
/// DONE

// LEVEL 3



let runningtime = document.querySelector('h1');
let time = 0;
let rti = setInterval(() => {
    time += 1; 
    let seconds = ((time % 600) / 10).toFixed(1).padStart(4, '0');
    let minutes = Math.floor(time / 600);
    runningtime.innerHTML = `Time elapsed: ${minutes}:${seconds}`


}, 100);
open(windows[0]);
