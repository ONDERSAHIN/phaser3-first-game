/**
 * Purpose
 *
 */

class Aim{

    _tileType;
    _value = 0;
    _targetValue = 0;
    _completed = false;
    _valueTextReference = null

    constructor(tileType,targetValue) {
        //TODO random tileType
        this._tileType = tileType;
        this._targetValue = targetValue;

    }

    setValueTextReference(ref){
        this._valueTextReference = ref;
    }

    getValueTextReference(){
        return this._valueTextReference;
    }

    get tileType(){
        return this._tileType;
    }

    get value(){
        return this._value;
    }

    get targetValue(){
        return this._targetValue;

    }

    decreaseTargetValue(value){
        this._targetValue -= value;
        if(this._targetValue <= 0){
            this._completed = true;
            this._targetValue = 0;
        }
    }

    increase(value){
        this._value += value;
        if(this._value >= this._targetValue){
            this._completed = true;
        }
    }

    isCompleted(){
       return this._completed;
    }

}

export default Aim;