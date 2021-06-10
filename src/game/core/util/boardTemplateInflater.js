import Tiles from "@/game/core/util/Tiles";
import Tile from "@/game/core/model/tile";
import GridLocation from "@/game/core/model/gridLocation";
import {EMPTY, FORBIDDEN, WALL} from "@/game/core/model/tile.type";
import Board from "@/game/core/model/board";

const TILE_SIGN = "1";
const WALL_SIGN = "W";
const FORBIDDEN_SIGN = "X";


class BoardTemplateInflater {

    _board = null;
    _gridTemplate = null;

    constructor(gridTemplate) {
        this._gridTemplate = gridTemplate;
        this._board = new Board(gridTemplate.length, gridTemplate[0].length, new Tile(EMPTY));
    }

    inflate() {
        let boardSize = this._board?.getSize();
        let tileType

        for (let row = 0; row < boardSize.rowSize; row++) {
            for (let column = 0; column < boardSize.colSize; column++) {
                let tile = null;
                if (this._gridTemplate[row][column] === TILE_SIGN) {
                    do {
                        tileType = Tiles.generateTileType();
                    } while (
                        (column > 1 && this._board.getTileAt(row, column - 1).type === tileType
                            && this._board.getTileAt(row, column - 2).type === tileType)
                        ||
                        (row > 1 && this._board.getTileAt(row - 1, column).type === tileType
                            && this._board.getTileAt(row - 2, column).type === tileType)
                        );
                    tile = new Tile(tileType);
                }
                if (this._gridTemplate[row][column] === WALL_SIGN) {
                    tile = new Tile(WALL);
                }
                if (this._gridTemplate[row][column] === FORBIDDEN_SIGN) {
                    tile = new Tile(FORBIDDEN);
                    tile.setVisible(false);
                }
                this._board.putTileToLocationIfEmpty(tile, row, column);
            }
        }

        return this._board;
    }

}

export default BoardTemplateInflater;