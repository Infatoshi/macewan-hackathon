import Sudoku from './sudoku.js';

const emojiMapping = {
    1: "🎃",
    2: "👻",
    3: "🧙‍♀️",
    4: "🧛‍♂️",
    5: "🧟‍♂️",
    6: "🦇",
    7: "🕸️",
    8: "🌙",
    9: "🍬"
};

const boardSize = 9;
let selectedOption = null;

// Instantiate the sudoku object before using it
const sudoku = new Sudoku();

let partiallySolved = getPartiallySolvedBoard();
let completelySolved = getCompletelySolvedBoard(partiallySolved);

function getPartiallySolvedBoard() {
    return sudoku.generate_sudoku_optimized();
}

function getCompletelySolvedBoard(partialBoard) {
    sudoku.board = JSON.parse(JSON.stringify(partialBoard));
    sudoku.solve_sudoku();
    return sudoku.board;
}





function checkCorrectness(row, col) {
    const sudokuBoard = document.getElementById('sudoku-board');
    const cellIndex = row * boardSize + col;
    const cell = sudokuBoard.childNodes[cellIndex];

    if (cell.textContent === unicodeSolved[row][col]) {
        return true;
    } else {
        return false;
    }
}




// Initialize the board
function initBoard() {
    const sudokuBoard = document.getElementById('sudoku-board');
    partiallySolved = getPartiallySolvedBoard();
    // console.log('partially_solved:', partiallySolved);

    completelySolved = getCompletelySolvedBoard(partiallySolved);
    let unicodePartiallySolved = partiallySolved.map(row => row.map(num => emojiMapping[num]));
    console.log('partially_solved:', unicodePartiallySolved);
    
    let unicodeSolved = completelySolved.map(row => row.map(num => emojiMapping[num]));
    console.log('completely_solved:', unicodeSolved);



    let cellIndex = 0;  // Assuming boardSize is 9
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => placeEmoji(i, j));
            sudokuBoard.appendChild(cell);
            cellIndex = i * 9 + j; 
            cell.textContent = emojiMapping[partiallySolved[i][j]];
        }
    }
}

function placeEmoji(row, col) {
    if (!selectedOption) return;

    const sudokuBoard = document.getElementById('sudoku-board');
    const cellIndex = row * 9 + col;  // Assuming boardSize is 9
    const cell = sudokuBoard.childNodes[cellIndex];

    if (checkCorrectness(row, col) == true) {
        console.log('correct')
        cell.classList.add('correct');
        setTimeout(() => cell.classList.remove('correct'), 1000);  // Remove the class after animation duration (1s)
        partiallySolved[row][col] = parseInt(selectedOption, 10);
        cell.textContent = emojiMapping[selectedOption];
        console.log('partially_solved:', partiallySolved);
    } else {
        console.log('incorrect')
        cell.classList.add('incorrect');
        cell.textContent = ''
        setTimeout(() => cell.classList.remove('incorrect'), 1000);  // Remove the class after animation duration (1s)  

    }
}


// Event listener for options
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        selectedOption = Object.keys(emojiMapping).find(key => emojiMapping[key] === this.textContent.trim());
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        if (partiallySolved === completelySolved) {
            alert('You won!');
            initBoard();
        }

    });
});

function clearBoard() {
    const sudokuBoard = document.getElementById('sudoku-board');
    while (sudokuBoard.firstChild) {
        sudokuBoard.removeChild(sudokuBoard.firstChild);
    }
}


document.getElementById('shuffleBtn').addEventListener('click', () => { 
    clearBoard();
    initBoard();
});


// Initialize the board
initBoard();

