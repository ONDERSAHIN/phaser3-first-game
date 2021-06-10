
class Movement{
    _movementInRow = 0;
    _movementInColumn = 0;

    constructor(movementInRow,movementInColumn) {
        this._movementInRow = movementInRow;
        this._movementInColumn = movementInColumn;
    }

    get movementInRow(){
        return this._movementInRow;
    }

    get movementInColumn(){
        return this._movementInColumn;
    }
}

export default Movement;