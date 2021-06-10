import GameBaseObject from "@/game/core/object/GameBaseObject";
import {EMPTY, FORBIDDEN, WALL} from "@/game/core/model/tile.type";
import TileType from "@/game/core/model/tileType";
import GridLocation from "@/game/core/model/gridLocation";

class Tile extends GameBaseObject {

    _type;
    _gridLocation = null;
    _visible = true;
    _gameVisualObjectRef = null;


    // TODO : make type safety
    constructor(type, gridLocation = null) {
        super();
        this.setType(type);
        if (gridLocation) this.setGridLocation(gridLocation)
    }

    setGameObjectReference(gameObjectReference) {
        this._gameVisualObjectRef = gameObjectReference;
    }

    getGameObjectReference(){
        return this._gameVisualObjectRef;
    }

    setGridLocation(gridLocation) {
        if (!(gridLocation instanceof GridLocation)) throw new Error("GridLocation is not legal !");
        this._gridLocation = gridLocation;
    }

    getGridLocation() {
        return this._gridLocation;
    }

    hashCode() {
        return this._gridLocation !== null ? this._gridLocation.hashCode() : null;
    }

    toString() {
        return `Tile@${this._gridLocation.toString()} type:${this._type.getName()}`
    }

    hasSameTypeWith(tile) {
        return this._type === tile.type;
    }

    setVisible(visible) {
        this._visible = visible;
    }


    static isNormal(tile) {
        return !!tile && tile.type !== EMPTY && tile.type !== FORBIDDEN && tile.type !== WALL
    }

    clone() {
        return new Tile(this._type);
    }

    canBePlayed() {
        return this._type !== FORBIDDEN && this._type !== WALL;
    }

    setType(newType){
        if (!(newType instanceof TileType)) throw new Error("TileType is not legal! ");
        this._type = newType;
    }

    get type() {
        return this._type;
    }
}

export default Tile;