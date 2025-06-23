const env = document.getElementById("a3");

const score_elem = document.getElementById('score');
const thing = document.getElementById('thing');


const INITHEIGHT = 400;
const INITWIDTH = 400;


let mouseX = -1
let mouseY = -1


let SCORE = 0
let BASE = 4;
let REMAINDER = 0;


let BLOCKS = [];


class Block {
    static Id = 0;
    constructor(check, generate, question) {
        this.check = check;
        this.generate = generate;
        this.question = question ?? this.generate();
        this.id = Block.Id++;

        this.elem = document.createElement("div");
        this.elem.setAttribute('class', 'number');
        // this.elem.setAttribute('id', `number-${this.id}`);
        this.elem.innerText = String(this.question);
        env.append(this.elem);


        this.elem.style.left =  Math.floor(Math.random() * (INITWIDTH - 20)) + 'px'; // left/initialWidth = newLeft/newWidth


        this.y = 0;
        this.elem.style.top = Math.floor(Math.random() * INITHEIGHT) * 0.2 + 'px';


        this.interval = setInterval(this.down, 10);
        this.speed = 1;
    } // 1/initialHeight = x/currentHeight


    destroy = () => {
        BLOCKS[BLOCKS.findIndex(x => (x?.id == this.id))] = null;
        this.elem.remove();
        clearInterval(this.interval);
    }
   
    down = () => {
        this.y += this.speed * INITHEIGHT/INITHEIGHT;
        this.elem.style.top = this.y + 'px';

        if (this.y > INITHEIGHT - 16) {
            this.destroy();
            SCORE -= .5;
            score_elem.innerText = 'Score: ' + SCORE;
            windows[2].win = (SCORE > 0);
        }
    }
}

class RemainderBlock extends Block {
    constructor(value) {
        const check = answer => ((this.question % REMAINDER) == answer);
        const generate = () => Math.floor(Math.random() * (10000 + 1));
        super(check, generate, null);
    }
}

class Ball {
    constructor(t) {
        this.remainder = REMAINDER;
        this.velx = Math.cos(-t);
        this.vely = Math.sin(-t);
        this.x = INITWIDTH / 2;
        this.y = .96 * INITHEIGHT;


        this.elem = document.createElement("div");
        this.elem.setAttribute("class", "ball");
        this.elem.innerText = this.remainder.toString();
        this.elem.style.left = this.x +'px';
        this.elem.style.top = this.y + 'px';
       
        env.append(this.elem);


        this.interval = setInterval(this.move, 10);
        this.speed = 3;
    }


    destroy = () => {
        this.elem.remove();
        clearInterval(this.interval);
    }
   
    move = () => {
        this.x += this.speed * this.velx;
        this.y -= this.speed * this.vely;
        this.elem.style.left = this.x + 'px';
        this.elem.style.top = this.y + 'px';
        this.collision();
    }
   
    collision = () => {
        let rect = this.elem.getBoundingClientRect();


        if ((rect.x <= 0) || (rect.x >= window.innerWidth) || (rect.y <= 0) || (rect.y >= window.innerWidth)) {
            this.destroy();
        }
   


        let corners = [[rect.x, rect.y], [rect.x + rect.width, rect.y], [rect.x + rect.width, rect.y + rect.height], [rect.x, rect.y + rect.height]];
       
        for (let block of BLOCKS) {
            if (!block) continue;
            let blockRect = block.elem.getBoundingClientRect();
            for (let corner of corners) {
                if ((blockRect.x < corner[0]) && (corner[0] < (blockRect.x + blockRect.width)) &&
                   (blockRect.y < corner[1]) && (corner[1] < (blockRect.y + blockRect.height)) )  {

                    if ((block.question % BASE) == this.remainder) {
                        block.destroy();
                        this.destroy();
                        score_elem.innerText = 'Score: ' + (++SCORE);
                        windows[2].win = (SCORE > 0);
                    } else {
                        this.destroy();
                       // block.speed++;
                        // score_elem.innerText = 'Score: ' + (--SCORE);
                    }
                   
                }
            }
        }
    }
   
}


//if (!env.hidden) for (let i = 0; i < 5; i++) BLOCKS.push(new RemainderBlock());


function spawn() {
    let earliestIdx = BLOCKS.findIndex(x => !x);
    if (earliestIdx == -1) {
        BLOCKS.push(new RemainderBlock());
    } else {
        BLOCKS[earliestIdx] = new RemainderBlock();
    }
}


function clearBlocks() {
    for (let block of BLOCKS) {
        if (!block) continue;
        block.destroy();
    }
    BLOCKS = [];
}


let spawnInt = setInterval(() => !env.hidden && spawn(), 4_000);


const keykey = "0123456789abcdefghijklmnopqrstuvwxyz".split('');


document.onkeydown = function(e) {
    if (env.hidden) return;
    let t = Math.atan2(mouseY - .96 /* see css; Thing is shifted 96 vh down */ * INITHEIGHT, mouseX - INITWIDTH/2);
    //alert((+e.key) % BASE);
    REMAINDER = (+e.key) % BASE;
    let ball = new Ball(t);
}
    

document.onmousemove = function(e) {
    mouseX = e.clientX - env.style.left.slice(0, env.style.left.length - 2);
    mouseY = e.clientY - env.style.top.slice(0, env.style.top.length - 2);
    let t = Math.atan2(mouseY - .96 /* see css; Thing is shifted 96 vh down */ * INITHEIGHT, mouseX - INITWIDTH/2) * 180 / Math.PI;
    // score_elem.innerText = t;
    thing.style.transform = `rotate(${t}deg)`;
}

env.onmousemove = document.onmousemove
windows[2].header.onmousemove = document.onmousemove

windows[2].reset = function(e) {
    // idk put stuff here    
}








