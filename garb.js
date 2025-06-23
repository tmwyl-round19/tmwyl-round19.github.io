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

class GameWindow {
    constructor(id, maxTime /* in 1/10 seconds*/, name, dialog) {
        this.id = 'a'+  id;
        this.element = document.getElementById(this.id.toString());
        this.intervals = [];
        this.maxTime = maxTime;
        this.time = maxTime;
        this.header = document.getElementById('header' + this.id);
        this.name = name;
        this.header.innerHTML = name + ` (${(this.time/10).toFixed(1)})`;
        this.win = false;
        this.wins = 0;
        this.dialog = dialog;
    }
    resetTime() {
        this.time = this.maxTime;
        this.wins++;
        if (this.wins == 1) {
            level++;
            open(windows[level - 1]);
        }
        this.win = false;
        this.reset();
    }
    decrTime() {
        this.time -= 1;
        this.header.innerHTML = this.name + ` (${(this.time/10).toFixed(1)})`;
        if (this.time <= 0) {
            if (this.win) {
                this.resetTime(); // GAME LOST
            } else {
                windows.forEach((e, i)=>e.intervals.forEach(clearInterval));
                alert("btw you lost reload the page to try again");
            }
        }
    }
}

////

let level =1;
let dialog = document.getElementsByTagName('dialog')[0];
let dialogChild = dialog.children[0];
let dialogButton = dialog.children[1];

dialogChild.innerHTML = "Welcome to The Game! This game consists of several tasks that have to be completed simultaneously. Each task has a repeating timer, and in order to continue, the task must be in its completed state when the timer reaches zero. Click OK to begin.";
dialog.show();
var windows = [
    new GameWindow(1, 350, '8 Puzzle', "Your first task: Solve the 8 Puzzle in 35 seconds. Click on any number adjacent to the empty space to move it there. When solved, the numbers should be in ascending order from left to right, then top to bottom, followed by the empty space. Your first completion of a task will unlock the next one.<br/><br/><i>(You can move a window around by dragging its blue top bar.)</i>"),
    new GameWindow(2, 150, 'Unique Word', `Enter a word into the box in 15 seconds. You automatically fail if you use any words you have previously entered.`),
    new GameWindow(3, 500, 'Modulo Shooter', "Move the mouse to aim and press a number key to shoot a ball with that number.<br /><br/>Balls with the number <i>n</i> will destroy a falling block with the number <i>d</i> only if <i>d</i> <b>divided by 4</b> leaves a <b>remainder</b> of <i>n</i>; for example, 362 divided by 4 leaves a remainder of 2, so to destroy that block, you would aim at it and press the 2 key.<br /><br />Each block destroyed adds a point, and each block that leaves the window boundaries subtracts half a point. Keep your score greater than 0 in 50 seconds."),
    new GameWindow(4, 300, 'Button', "Click the button exactly the number of specified times in 30 seconds."),
    new GameWindow(5, 200, 'Quick Math', "Write the solution to the given arithmetic problem in 20 seconds. The solution will always be an integer; do not add any decimal signs or unnecessary symbols."),
    new GameWindow(6, 300, 'Reverse Type', "Type the given word in reverse order, case-sensitive, in 30 seconds.")
];

function open(win) { 
    if (!win) return alert("you won");
    win.element.hidden = false;
    win.element.style.top = Math.random() * (window.innerHeight - 400) + 'px';
    win.element.style.left = Math.random() * (window.innerWidth - 400) + 'px';
    dragElement(win.element);
    dialogChild.innerHTML = win.dialog;

    dialog.show();
    win.intervals.push(setInterval(() => win.decrTime(), 100))
}


let runningtime = document.querySelector('h1');
let time = 0;
let rti = setInterval(() => {
    time += 1; 
    let seconds = ((time % 600) / 10).toFixed(1).padStart(4, '0');
    let minutes = Math.floor(time / 600);
    runningtime.innerHTML = `Time elapsed: ${minutes}:${seconds}`


}, 100);

dialogButton.onclick = () => {
  dialog.close();
  open(windows[level-1]);
  dialogButton.onclick = () => dialog.close();
}
