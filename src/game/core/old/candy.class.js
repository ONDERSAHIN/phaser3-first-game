class Candy {
    row = null;
    col = null;

    constructor(color, id) {
        Object.defineProperty(this, 'color', {value: color, writable: false});
        Object.defineProperty(this, 'id', {value: id, writable: false});
    }

    toString() {
        return this.color;
    }
}

export default Candy;