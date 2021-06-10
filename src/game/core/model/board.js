import GridLocation from "@/game/core/model/gridLocation";
import {EMPTY} from "@/game/core/model/tile.type";
import Movement from "@/game/core/model/movement";
import Tile from "@/game/core/model/tile";
import Tiles from "@/game/core/util/Tiles";

class Board {
    _rowSize = 0;
    _colSize = 0;
    _grid = [];
    _spawnTiles = new Map();

    constructor(rowSize, colSize, defaultTile = null) {
        this._rowSize = rowSize;
        this._colSize = colSize;
        this.initializeBoard()
        if (defaultTile) this.initializeBoardWithDefaultValue(defaultTile)
    }

    initializeBoard() {
        this._grid = new Array(this._rowSize);
        for (let i = 0; i <= this._rowSize; i++) {
            this._grid[i] = new Array(this._colSize);
        }
    }

    initializeBoardWithDefaultValue(defaultTile) {
        for (let r = 0; r <= this._rowSize; r++) {
            for (let c = 0; c <= this._colSize; c++) {
                this.setTileToGridLocation(defaultTile, new GridLocation(r, c));
            }
        }
    }

    isValidLocation(row, col) {
        return (row >= 0 && col >= 0 &&
            row <= this._rowSize && col <= this._colSize &&
            row === Math.round(row) && col === Math.round(col));
    }

    isEmptyLocation(row, col) {
        return this.getTileAt(row, col).type === EMPTY;
    }

    getSize() {
        return {
            rowSize: this._rowSize,
            colSize: this._colSize
        };
    }

    getTileAtLocation(gridLocation) {
        if (!(gridLocation instanceof GridLocation)) return;
        return this.getTileAt(gridLocation.row, gridLocation.column);
    }

    getTileAt(row, col) {
        if (!this.isValidLocation(row, col)) return null;
        return this._grid[row][col];
    }

    setTileToGridLocation(tile, gridLocation) {
        if (!(gridLocation instanceof GridLocation) || !(tile instanceof Tile)) return;
        tile.setGridLocation(gridLocation);
        this._grid[gridLocation.row][gridLocation.column] = tile;
    }

    getAllTiles() {
        let results = [];
        for (let r in this._grid) {
            for (let c in this._grid[r]) {
                if (this._grid[r][c]) {
                    results.push(this._grid[r][c]);
                }
            }
        }
        return results;
    }


    putTileToLocationIfEmpty(tile, row, col) {
        if (!this.isEmptyLocation(row, col)) return;
        this.setTileToGridLocation(tile, new GridLocation(row, col))
    }

    /**
     * Adds a tile of random color at row, col.
     */
    spawnTileForLocation(row, col, spawnRow, spawnCol) {
        let tile = Tiles.createRandomTile();
        this.putTileToLocationIfEmpty(tile, row, col, spawnRow, spawnCol);
        this._spawnTiles.set(tile.hashCode(), tile);
    }

    /**
     * Adds a tile of random color at row, col.
     */
    spawnSpecialityTileForLocation(row, col, spawnRow, spawnCol) {
        let tile = Tiles.createRandomSpecialityTile();
        this.putTileToLocationIfEmpty(tile, row, col, spawnRow, spawnCol);
        this._spawnTiles.set(tile.hashCode(), tile);
    }

    getSpawnTiles() {
        return Array.from(this._spawnTiles.values());
    }

    flushSpawnTiles() {
        let spawnTiles = this.getSpawnTiles();
        this._spawnTiles.clear();
        return spawnTiles;
    }

    resetTileLocationOnGrid(tile) {
        if (!(tile instanceof Tile)) return;
        this.setTileToGridLocation(tile, tile.getGridLocation())
    }

    moveTo(tile, toRow, toCol) {
        if (!this.isEmptyLocation(toRow, toCol)) return;
        this.setTileToGridLocation(new Tile(EMPTY), tile.getGridLocation())
        this.setTileToGridLocation(tile, new GridLocation(toRow, toCol))
    }

    remove(tile) {
        this.setTileToGridLocation(new Tile(EMPTY), tile.getGridLocation())
    }

    removeAt(row, col) {
        if (!this.isEmptyLocation(row, col)) {
            this.remove(this._grid[row][col]);
        }
    }


    clear() {
        for (let r in this._grid) {
            for (let c in this._grid[r]) {
                if (this._grid[r][c]) {
                    this.removeAt(r, c); // TODO
                }
            }
        }
    }

    /*
    Returns the candy immediately in the direction specified by direction
    ['up', 'down', 'left', 'right'] from the candy passed as fromCandy
    */
    getTileInDirection(fromTile, direction) {
        if(!(fromTile instanceof Tile)) throw new Error("getTileInDirection : tile is not legal");
        if (!(direction instanceof Movement)) throw new Error("Direction is not legal movement type")
        let currentLocation = fromTile.getGridLocation();
        let destRow = currentLocation.row + direction.movementInRow;
        let destCol = currentLocation.column + direction.movementInColumn;
        return this.getTileAt(destRow, destCol)
    }

    doSwap(swap) {
        this.flipTiles(swap.from, swap.to);
    }

    flipTiles(from, to) {
        let tempLoc = from.getGridLocation();
        from.setGridLocation(to.getGridLocation());
        to.setGridLocation(tempLoc);
        this.resetTileLocationOnGrid(from);
        this.resetTileLocationOnGrid(to);
    }

    isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    /**
     * Get a string representation for the board as a multiline matrix.
     */
    toString() {
        let result = "";
        for (let r = 0; r < this._rowSize; ++r) {
            for (let c = 0; c < this._colSize; ++c) {
                let tile = this._grid[r][c];
                if (tile) {
                    result += tile.type.getId() + " ";
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