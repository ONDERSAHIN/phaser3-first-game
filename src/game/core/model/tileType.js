
class TileType{
    _id = 0x0000;
    _name = "EMPTY";
    _value = null;

    constructor(id,name,value = null) {
        this._id = id;
        this._name = name;
        this._value = value;
    }

    getId(){
        return this._id;
    }

    getName(){
        return this._name;
    }

    get value(){
        return this._value;
    }

}

export default TileType;