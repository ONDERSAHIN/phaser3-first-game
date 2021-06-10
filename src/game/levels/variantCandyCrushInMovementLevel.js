import AbstractGameLevel from "./abstractGameLevel";
import {VARIANT_CANDY_CRUSH_IN_MOVEMENT} from "./gameLevelTypes";
import Tiles from "@/game/core/util/Tiles";
import Aim from "@/game/core/model/aim";
import {AFTER_LAST_NORMAL_TILE, ALL_TILES, BEFORE_FIRST_NORMAL_TILE} from "@/game/core/model/tile.type";

const AUTO_CALCULATION_MODE_CODE = "auto";
const RANDOM_TILE_TYPE_SELECTION = "any";

class VariantCandyCrushInMovementLevel extends AbstractGameLevel {
    _movementCount = 0;
    _aims = [];
    _boardConfig = null;
    _tileTypes = [];

    constructor(currentLevel, point, config) {
        super(currentLevel, point, VARIANT_CANDY_CRUSH_IN_MOVEMENT, config);
        this._tileTypes = [...ALL_TILES];
        if (!this._isPresent(config)) throw new Error("VariantCandyCrushInMovementLevel.constructor : config is necessary");
        this._parseConfig(config);
    }

    _isPresent(obj) {
        return obj !== null && obj !== undefined;
    }

    _parseConfig(config) {
        if (!(config.levels && Array.isArray(config.levels) && config.levels.length >= 10)) throw new Error("VariantCandyCrushInMovementLevel._parseConfig : Levels config expected array with length 10 at least");
        let index = ((this._level / 2 - 1) % 10);
        config = config.levels[index];
        this._setMovementCount(this._parseMovementCount(config));
        this._setAims(this._parseAims(config));
        this._setBoardConfig(this._parseBoardConfig(config));
    }

    _parseMovementCount(config) {
        if ((!config.moves || config.moves === "")) throw new Error("VariantCandyCrushInMovementLevel._parseMovementCount : Expects \"moves\" field !");
        return config.moves === AUTO_CALCULATION_MODE_CODE ? this._calculateMovementCountDefault() : Number.parseInt(config.moves);
    }

    _parseAims(config) {
        if (!(config.aims && Array.isArray(config.aims) && config.aims.length)) throw new Error("VariantCandyCrushInMovementLevel._parseTargetPoint : Expects \"aims\" field as array !");
        let aims = [];
        for (let i = 0; i < config.aims.length; i++) {
            let parsedAimToken = config.aims[i].split(";");
            let targetValue = Number.parseInt(parsedAimToken[0]);
            let tileType = parsedAimToken[1] === RANDOM_TILE_TYPE_SELECTION ? this._calculateTileTypeRandom() : String(parsedAimToken[1]);
            let aim = new Aim(tileType, targetValue);
            aims.push(aim);
        }
        return aims;
    }

    _parseBoardConfig(config) {
        if (!config.board) throw new Error("VariantCandyCrushInMovementLevel._parseBoardConfig : No \"board\" config found!");
        return config.board;
    }

    _calculateTileTypeRandom() {
        let min = BEFORE_FIRST_NORMAL_TILE + 1;
        let max = this._tileTypes.length - 1;
        let index = Math.floor((Math.random() * (max - min)) + min)
        let tileType = this._tileTypes[index];
        this._tileTypes.splice(index,1);
        return tileType;
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

    _setAims(aims) {
        this._aims = aims;
    }

    get boardConfig() {
        return this._boardConfig;
    }

    getAims() {
        return this._aims;
    }

    decreaseMovementCount() {
        if (!(this._movementCount > 0)) return 0;
        return --this._movementCount;
    }

    checkLevelCompletion() {
        for (let i = 0; i < this._aims.length; i++) {
            let aim = this._aims[i];
            if (aim.targetValue > aim.value) {
                return false;
            }
        }
        return true;
    }

    get movementCount() {
        return this._movementCount;
    }

    getLevelAimDescription(){
        return "Belirtilen ürün simgelerini amaçlanan sayı kadar eşleştirmelisin";
    }
}

export default VariantCandyCrushInMovementLevel;