const CROSS = 'x';
const ZERO = '0';

let player1 = document.querySelector('#player1');
let player2 = document.querySelector('#player2');
let counter = document.querySelector('#count');
let message = document.querySelector('#message');
let consoleItem = document.querySelector('.console');
let count = 0;
let winner = undefined;


let arr = [0, 1, 2,
           3, 4, 5,
           6, 7, 8];

let arrGridItems = [];
for(let i=0; i<=8; i++){
    arrGridItems[i] = document.querySelector('.grid-item.game:nth-child(' + (i+1) + ')');
}

let gridItems = document.querySelectorAll('.grid-item.game');
gridItems.forEach((gridItem) => {
    gridItem.addEventListener('click', () => {
        count++;
        counter.innerHTML = count;
        gridItem.setAttribute('disabled', 'disabled');

        if ( even(count)) {
            toggleTurn(gridItem, ZERO);
        } else {
            toggleTurn(gridItem, CROSS);
        }
        checkCombinations(arr, gridItem);

        if (count === 9 && winner === undefined){
            drawWinner();
        }
    });
});


function toggleTurn(gridItem,innerHtml) {
    player2.classList.toggle('turn');
    player1.classList.toggle('turn');
    gridItem.innerHTML = innerHtml;
}

function check(arg1, arg2, arg3, value) {
    if (arr[arg1] === value
    && arr[arg2] === value
    && arr[arg3] === value) {
        addClassWinner();
        arrGridItems[arg1].classList.add('won');
        arrGridItems[arg2].classList.add('won');
        arrGridItems[arg3].classList.add('won');
        return true;
    }
    return false;
}

function checkCombinations(arr, gridItem) {
    let res = gridItem.textContent;
    let index = gridItem.getAttribute('data-num');

    arr.splice(index,1, res);

    [CROSS, ZERO].forEach((value) =>{
        check(0,1,2, value);
        check(3,4,5, value);
        check(6,7,8, value);
        check(0,3,6, value);
        check(1,4,7, value);
        check(2,5,8, value);
        check(0,4,8, value);
        check(2,4,6, value);
    })

}

function addClassWinner() {
    gridItems.forEach((gridItem) =>{
        gridItem.setAttribute('disabled', 'disabled');
    });
    player2.classList.remove('turn');
    player1.classList.remove('turn');

    if (even(count)){
        winner = 'PLayer2';
    } else {
        winner = 'PLayer1';
    }

    drawWinner(winner);

}
function even(n) {
    return !(n % 2);
}

function drawWinner(winner) {
    message.classList.add('visible');
    if (winner === undefined){
        consoleItem.classList.add('draw');
        message.innerHTML = 'Its a draw!';
    } else {
        consoleItem.classList.add('won');
        message.innerHTML = winner + ' won!';
    }
}