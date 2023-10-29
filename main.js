import Sudoku from './sudoku.js';

const emojiMapping = {
    1: "🎃",
    2: "👻",
    3: "🧹",
    4: "🧛‍♂️",
    5: "🧟‍♂️",
    6: "🦇",
    7: "🪦",
    8: "🌙",
    9: "🍬"
};
let mistakes_counter = 0;
let difficulty = 'easy';
const boardSize = 9;
let selectedOption = null;

// Instantiate the sudoku object before using it
let sudoku = new Sudoku(difficulty);

let partiallySolved = getPartiallySolvedBoard();
let completelySolved = getCompletelySolvedBoard(partiallySolved);

function getPartiallySolvedBoard(difficulty) {
    return sudoku.generate_sudoku_optimized(difficulty);
}

function getCompletelySolvedBoard(partialBoard) {
    sudoku.board = JSON.parse(JSON.stringify(partialBoard));
    sudoku.solve_sudoku();
    return sudoku.board;
}

function checkCorrectness(row, col) {
    if (emojiMapping[selectedOption] === unicodeSolved[row][col]) {
        return true;
    } else {
        return false;
    }
}


let unicodePartiallySolved = partiallySolved.map(row => row.map(num => emojiMapping[num]));
let unicodeSolved;
// Initialize the board
function initBoard(difficulty) {
    document.getElementById('Mistakes2').textContent = mistakes_counter;
    const sudokuBoard = document.getElementById('sudoku-board');
    console.log('difficulty is', difficulty);
    partiallySolved = getPartiallySolvedBoard(difficulty);


    completelySolved = getCompletelySolvedBoard(partiallySolved);
    unicodePartiallySolved = partiallySolved.map(row => row.map(num => emojiMapping[num]));

    
    unicodeSolved = completelySolved.map(row => row.map(num => emojiMapping[num]));

    if (difficulty == 'easy') {
        document.getElementById('easyBtn').style.backgroundColor = 'green';
        document.getElementById('mediumBtn').style.backgroundColor = 'black';
        document.getElementById('hardBtn').style.backgroundColor = 'black';
    } else if (difficulty == 'medium') {
        document.getElementById('easyBtn').style.backgroundColor = 'black';
        document.getElementById('mediumBtn').style.backgroundColor = 'yellow';
        document.getElementById('hardBtn').style.backgroundColor = 'black';
    } else if (difficulty == 'hard') {
        document.getElementById('easyBtn').style.backgroundColor = 'black';
        document.getElementById('mediumBtn').style.backgroundColor = 'black';
        document.getElementById('hardBtn').style.backgroundColor = 'red';
    }
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
        // console.log('correct')
        cell.classList.add('correct');
        setTimeout(() => cell.classList.remove('correct'), 1000);  // Remove the class after animation duration (1s)
        partiallySolved[row][col] = parseInt(selectedOption, 10);
        cell.textContent = emojiMapping[selectedOption];
    } else {
        document.getElementById('Mistakes2').textContent = ++mistakes_counter;
        if (mistakes_counter == 3) {
        mistakes_counter = 0;
        document.getElementById('Mistakes2').textContent = mistakes_counter;

        
        clearBoard();
        initBoard(difficulty);
        }
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
            initBoard(difficulty);
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
    initBoard(difficulty);
});

document.getElementById('easyBtn').addEventListener('click', () => {
    if (difficulty == 'medium' || difficulty == 'hard') {
        clearBoard();
        difficulty = 'easy';
        initBoard(difficulty);
    } else {
        clearBoard();
        initBoard(difficulty);
    }
});
document.getElementById('mediumBtn').addEventListener('click', () => {
    if (difficulty == 'easy' || difficulty == 'hard') {
        clearBoard();
        difficulty = 'medium';
        initBoard(difficulty);
    } else {
        clearBoard();
        initBoard(difficulty);
    }
});
document.getElementById('hardBtn').addEventListener('click', () => {
    if (difficulty == 'medium' || difficulty == 'easy') {
        clearBoard();
        difficulty = 'hard';
        initBoard(difficulty);
    } else {
        clearBoard();
        initBoard(difficulty);
    }
});
// Initialize the board
initBoard(difficulty);

