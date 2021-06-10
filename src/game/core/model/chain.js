
class Chain {

    _tiles = new Map();
   // _tiles = [];
    _type = null;

    constructor(type) {
        this._type = type;
    }

    addTile(tile){
        // TODO : check tile type
        //this._tiles.push(tile);
        this._tiles.set(tile.hashCode(),tile);
    }

    get type(){
        return this._type;
    }

    get tiles(){
        return Array.from(this._tiles.values());
    }

    get length(){
        return this._tiles.size;
    }

    containsTile(tile){
        // return this._tiles.filter(t => t.hashCode() === tile.hashCode()).length > 0
        return this._tiles.has(tile.hashCode());
    }
}

export default Chain;