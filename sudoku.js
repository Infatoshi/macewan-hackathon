export default class Sudoku {
    constructor() {
        this.board = [];
    }

    is_valid(row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (this.board[row][i] === num || this.board[i][col] === num) {
                return false;
            }
        }

        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i + startRow][j + startCol] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    solve_sudoku() {
        const empty = this.find_empty();
        if (!empty) {
            return true;
        } else {
            var [row, col] = empty;
        }

        for (let i = 1; i <= 9; i++) {
            if (this.is_valid(row, col, i)) {
                this.board[row][col] = i;
                if (this.solve_sudoku()) {
                    return true;
                }
                this.board[row][col] = 0;
            }
        }

        return false;
    }

    find_empty() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return null;
    }

    fill_board() {
        const empty = this.find_empty();
        if (!empty) {
            return true;
        } else {
            var [row, col] = empty;
        }

        let nums = Array.from({ length: 9 }, (_, i) => i + 1);
        nums = this.shuffle(nums);
        for (let num of nums) {
            if (this.is_valid(row, col, num)) {
                this.board[row][col] = num;
                if (this.fill_board()) {
                    return true;
                }
                this.board[row][col] = 0;
            }
        }
        return false;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    random_int(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generate_sudoku_optimized(difficulty = "hard") {
        this.board = Array(9).fill().map(() => Array(9).fill(0));
        this.fill_board();

        let num_remove = 0;
        if (difficulty === "obvious") {
            num_remove = this.random_int(0, 5);
        } else if (difficulty === "easy") {
            num_remove = this.random_int(20, 30);
        } else if (difficulty === "hard") {
            num_remove = this.random_int(40, 50);
        } else { // medium
            num_remove = this.random_int(30, 40);
        }

        while (num_remove > 0) {
            let row = this.random_int(0, 8);
            let col = this.random_int(0, 8);
            while (this.board[row][col] === 0) {
                row = this.random_int(0, 8);
                col = this.random_int(0, 8);
            }
            this.board[row][col] = 0;
            num_remove -= 1;
        }

        return JSON.parse(JSON.stringify(this.board));
        }
    }
    
const sudoku = new Sudoku();

const partially_solved = sudoku.generate_sudoku_optimized();
const completely_solved = JSON.parse(JSON.stringify(partially_solved));
sudoku.board = completely_solved;
sudoku.solve_sudoku();


    


