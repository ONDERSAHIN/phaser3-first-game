class AbstractGameLevel{

    _isLevelCompleted = false;
    _level = 1;
    _currentPoint = 0;
    _levelPoint = 0;
    _levelType = null;
    _config = null;

    constructor(level,point,type,config = null){
        this._level = level;
        this._currentPoint = point;
        this._levelType = type;
        this._config = config;
    }

    get isLevelCompleted(){
        return this._isLevelCompleted;
    }


    get levelType(){
        return this._levelType;
    }

    addPoint(point){
        this._levelPoint += point;
        this._currentPoint += point;
    }

    get levelPoint(){
        return this._levelPoint;
    }

    get currentLevel(){
        return this._level;
    }

    get currentPoint(){
        return this._currentPoint;
    }

    get config(){
        return this._config;
    }

}

export default AbstractGameLevel;