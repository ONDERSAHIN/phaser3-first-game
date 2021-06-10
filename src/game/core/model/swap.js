
class Swap{
    from;
    to;
    constructor(from,to) {
        this.from = from;
        this.to = to;
    }
    // TODO : hashcode

    setTo(to){
        this.to = to;
    }

    hashCode(){
        return ( this.from.hashCode() * 1000 ) + this.to.hashCode();
    }


}

export default Swap;