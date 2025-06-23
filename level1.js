let l1board = windows[0].element.children[1].children[0].children;

let grid = [1,2,3,4,5,6,7,8,0];
let gridStart = [...grid];
let zero = grid.findIndex(e => !e);
let zeroX = zero % 3, zeroY = Math.floor(zero / 3);
let a1data = document.getElementById('a1data');
let a1moves = 0;

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

            let thingVal = grid[idx];
            grid[zero] = thingVal;
            grid[idx] = 0;

            document.getElementById('g' + (thingVal)).style.top = zeroY * 100 + 'px';
            document.getElementById('g' + (thingVal)).style.left = zeroX * 100 + 'px';
            a1moves++;
            a1data.innerHTML = `Moves: ${a1moves}`;
            windows[0].win = grid.every((e, i) => e == gridStart[i]);
        }
    })
}

function randomMove(grid) {
    zero = grid.findIndex(e => !e);
    zeroX = zero % 3, zeroY = Math.floor(zero / 3);
    let orthogonals = [[zeroX + 1, zeroY], [zeroX - 1, zeroY], [zeroX, zeroY - 1], [zeroX, zeroY + 1]]
                    .filter(e => (e[0] < 3 && e[0] > -1 && e[1] < 3 && e[1] > -1));
    let [moveX, moveY] = orthogonals[Math.floor(Math.random() * orthogonals.length)];
    let thing = moveY * 3 + moveX;
    let thingVal = grid[thing]
    grid[zero] = thingVal;
    grid[thing] = 0;

    document.getElementById('g' + (thingVal)).style.top = zeroY * 100 + 'px';
    document.getElementById('g' + (thingVal)).style.left = zeroX * 100 + 'px';
}

windows[0].reset = () => {for (let i = 1; i<=50; i++) randomMove(grid);}
windows[0].reset();
