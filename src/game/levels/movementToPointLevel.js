import AbstractGameLevel from "./abstractGameLevel";
import {MOVEMENT_TO_POINT_LEVEL} from "./gameLevelTypes";

const AUTO_CALCULATION_MODE_CODE = "auto";

class MovementToPointLevel extends AbstractGameLevel {
    _movementCount = 0;
    _targetPoint = 0;
    _boardConfig = null;


    constructor(currentLevel,point, config = null) {
        super(currentLevel,point, MOVEMENT_TO_POINT_LEVEL, config);
        if (this._isPresent(config)) {
            this._parseConfig(config);
        } else {
            this._initializeDefaultValues();
        }
    }

    _isPresent(obj) {
        return obj !== null && obj !== undefined;
    }

    _initializeDefaultValues() {
        this._setMovementCount(this._calculateMovementCountDefault());
        this._setTargetPoint(this._calculateTargetPointDefault());
    }

    _parseConfig(config) {
        if (!(Array.isArray(config.levels) && config.levels.length === 1)) throw new Error("MovementToPointLevel._parseConfig : Levels config expected array with length 1");
        config = config.levels[0]; // default selection no more expected for now
        this._setMovementCount(this._parseMovementCount(config));
        this._setTargetPoint(this._parseTargetPoint(config));
        this._setBoardConfig(this._parseBoardConfig(config))
    }

    _parseBoardConfig(config) {
        if (!config.board) throw new Error("MovementToPointLevel._parseBoardConfig : No \"board\" config found!");
        return config.board;
    }


    _parseTargetPoint(config) {
        if ((!config.point || config.point === "")) throw new Error("MovementToPointLevel._parseTargetPoint : Expects \"point\" field !");
        return config.point === AUTO_CALCULATION_MODE_CODE ? this._calculateTargetPointDefault() : Number.parseInt(config.point);
    }

    _parseMovementCount(config) {
        if ((!config.moves || config.moves === "")) throw new Error("MovementToPointLevel._parseMovementCount : Expects \"moves\" field !");
        return config.moves === AUTO_CALCULATION_MODE_CODE ? this._calculateMovementCountDefault() : Number.parseInt(config.moves);
    }

    _calculateTargetPointDefault() {
        return (this._movementCount * 3) + (this._level * 2)
    }

    _calculateMovementCountDefault() {
        return (this._level + 1) / 2 + 5;
    }

    _setBoardConfig(boardConfig) {
        this._boardConfig = boardConfig;
    }

    _setMovementCount(movementCount) {
        this._movementCount = movementCount;
    }

    _setTargetPoint(point) {
        this._targetPoint = point;
    }

    get boardConfig() {
        return this._boardConfig;
    }

    decreaseMovementCount() {
        if (!(this._movementCount > 0)) return 0;
        return --this._movementCount;
    }

    checkLevelCompletion() {
        // return false;
        return this._targetPoint <= this.currentPoint;
    }

    get movementCount() {
        return this._movementCount;
    }

    get targetPoint() {
        return this._targetPoint;
    }

    getLevelAimDescription(){
        return "Ürün simgelerini eşleştirerek " + this._targetPoint + " puan toplamalısın";
    }
}

export default MovementToPointLevel;