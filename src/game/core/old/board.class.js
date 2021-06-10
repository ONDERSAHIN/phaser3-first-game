import Candy from './candy.class'
import CandyColors from './candy.colors'

class Board {
    candyCounter = 0;
    score = 0;
    boardSize = 0;
    square = [];
    _scoreIncrementStrategyFn = null;

    constructor(size, scoreIncrementStrategyFn = null) {
        this.boardSize = size;
        this.square = new Array(size);
        this._scoreIncrementStrategyFn = scoreIncrementStrategyFn;
        this.initializeCandyBoard();
    }

    initializeCandyBoard() {
        for (let i = 0; i <= this.boardSize; i++) {
            this.square[i] = [];
        }
    }

    isValidLocation(row, col) {
        return (row >= 0 && col >= 0 &&
            row <= this.boardSize && col <= this.boardSize &&
            row === Math.round(row) && col === Math.round(col));
    }

    isEmptyLocation(row, col) {
        return !this.getCandyAt(row, col);
    }

    // doAutoMove() {
    //     let move = rules.getRandomValidMove();
    //     let toCandy = board.getCandyInDirection(move.candy, move.direction);
    //     this.flipCandies(move.candy, toCandy);
    // }

    getSize() {
        return this.boardSize;
    }

    getCandyAt(row, col) {
        if (this.isValidLocation(row, col)) {
            return this.square[row][col];
        }
        return null;
    }

    getLocationOf(candy) {
        return {row: candy.row, col: candy.col};
    }

    getAllCandies() {
        let results = [];
        for (let r in this.square) {
            for (let c in this.square[r]) {
                if (this.square[r][c]) {
                    results.push(this.square[r][c]);
                }
            }
        }
        return results;
    }

    add(candy, row, col, spawnRow, spawnCol) {
        if (this.isEmptyLocation(row, col)) {
            let details = {
                candy: candy,
                toRow: row,
                toCol: col,
                fromRow: spawnRow,
                fromCol: spawnCol
            };
            candy.row = row;
            candy.col = col;
            this.square[row][col] = candy;
            this.emitEvent('add', details);
        } else {
            // console.log("add already found a candy at " + row + "," + col);
        }
    }


    moveTo(candy, toRow, toCol) {
        if (this.isEmptyLocation(toRow, toCol)) {
            let details = {
                candy: candy,
                toRow: toRow,
                toCol: toCol,
                fromRow: candy.row,
                fromCol: candy.col
            };

            delete this.square[candy.row][candy.col];
            this.square[toRow][toCol] = candy;
            candy.row = toRow;
            candy.col = toCol;
            this.emitEvent('move', details);
        }
    }

    remove(candy) {
        let details = {
            candy: candy,
            fromRow: candy.row,
            fromCol: candy.col
        };
        delete this.square[candy.row][candy.col];
        candy.row = candy.col = null;
        this.emitEvent('remove', details);
    }

    removeAt(row, col) {
        if (!this.isEmptyLocation(row, col)) {
            this.remove(this.square[row][col]);
        }
    }


    clear() {
        for (let r in this.square) {
            for (let c in this.square[r]) {
                if (this.square[r][c]) {
                    this.removeAt(r, c);
                }
            }
        }
    }


    addCandy(color, row, col, spawnRow, spawnCol) {
        let candy = new Candy(color, this.candyCounter++);
        this.add(candy, row, col, spawnRow, spawnCol);
    }

    /**
     * Adds a candy of random color at row, col.
     */
    addRandomCandy(row, col, spawnRow, spawnCol) {
        let random_color = Math.floor(Math.random() * CandyColors.length);
        let candy = new Candy(CandyColors[random_color], this.candyCounter++);
        this.add(candy, row, col, spawnRow, spawnCol);
    }

    /*
    Returns the candy immediately in the direction specified by direction
    ['up', 'down', 'left', 'right'] from the candy passed as fromCandy
    */
    getCandyInDirection(fromCandy, direction) {
        switch (direction) {
            case "up": {
                return this.getCandyAt(fromCandy.row - 1, fromCandy.col);
            }
            case "down": {
                return this.getCandyAt(fromCandy.row + 1, fromCandy.col);
            }
            case "left": {
                return this.getCandyAt(fromCandy.row, fromCandy.col - 1);
            }
            case "right": {
                return this.getCandyAt(fromCandy.row, fromCandy.col + 1);
            }
        }
    }


    /* Flip candy1 with candy2 in one step, firing two move events.
     * Does not verify the validity of the flip. Does not crush candies
     * produced by flip. */
    flipCandies(candy1, candy2) {
        // Swap the two candies simultaneously.
        let details1 = {
            candy: candy1,
            toRow: candy2.row,
            toCol: candy2.col,
            fromRow: candy1.row,
            fromCol: candy1.col
        };
        let details2 = {
            candy: candy2,
            toRow: candy1.row,
            toCol: candy1.col,
            fromRow: candy2.row,
            fromCol: candy2.col
        };
        candy1.row = details1.toRow;
        candy1.col = details1.toCol;
        this.square[details1.toRow][details1.toCol] = candy1;
        candy2.row = details2.toRow;
        candy2.col = details2.toCol;
        this.square[details2.toRow][details2.toCol] = candy2;

        // Trigger two move events.
        this.emitEvent('move', details1);
        this.emitEvent('move', details2);
    }

    /*
    * Resets the score
    */
    resetScore() {
        this.score = 0;
        this.emitEvent('scoreUpdate', {score: 0})
    }

    setScoreIncrementStrategy(scoreIncrementStrategyFn) {
        this._scoreIncrementStrategyFn = scoreIncrementStrategyFn;
    }

    setScore(scoreValue) {
        if(scoreValue < 0 ) return;
        this.score = scoreValue;
    }

    /*
     * Adds some score.
     */
    incrementScore(candy, row, col) {
        if (this.isFunction(this._scoreIncrementStrategyFn)) {
            this.score = this._scoreIncrementStrategyFn(candy,row,col,this.score);
        } else {
            // default
            this.score += 1;
        }

        this.emitEvent("scoreUpdate", {
            score: this.score,
            candy: candy,
            row: row,
            col: col
        });
    }

    isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    /*
     * Gets the current score
     */
    getScore() {
        return this.score;
    }


    /**
     * Get a string representation for the board as a multiline matrix.
     */
    toString() {
        let result = "";
        for (let r = 0; r < this.boardSize; ++r) {
            for (let c = 0; c < this.boardSize; ++c) {
                let candy = this.square[r][c];
                if (candy) {
                    result += candy.toString().charAt(0) + " ";
                } else {
                    result += "_ ";
                }
            }
            result += "<br/>";
        }
        return result.toString();
    }


    // emits events helper
    emitEvent(eventName, payload = {}) {
        document.dispatchEvent(new CustomEvent(eventName, {bubbles: true, detail: payload}));
    }

}

export default Board;
