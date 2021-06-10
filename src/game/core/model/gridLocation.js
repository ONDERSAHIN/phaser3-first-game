
class GridLocation{
    _rowLocation;
    _columnLocation;

    constructor(rowLocation,columnLocation) {
        this._rowLocation = rowLocation;
        this._columnLocation = columnLocation;
    }

    get row(){
        return this._rowLocation;
    }

    get column(){
        return this._columnLocation;
    }

    set row(newRowLocation){
        this._rowLocation = newRowLocation;
    }

    set column(newColumnLocation){
        this._columnLocation = newColumnLocation
    }

    isSameAs(otherGridLocation){
        return otherGridLocation.row === this._rowLocation && otherGridLocation.column === this._columnLocation
    }

    getLocation(){
        return {
            row : this._rowLocation,
            column: this._columnLocation
        }
    }

    toString(){
        return `${this._rowLocation}|${this._columnLocation}`
    }

    hashCode(){
        return (this._rowLocation * 9) + this._columnLocation;
    }

}

export default GridLocation;