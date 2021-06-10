import {
    MOVEMENT_TO_POINT_LEVEL,
    CRUSH_IN_TIME_LEVEL,
    VARIANT_CANDY_CRUSH_IN_MOVEMENT,
    SPECIALITY_MATCH
} from "./gameLevelTypes";
import VariantCandyCrushInMovementLevel from "@/game/levels/variantCandyCrushInMovementLevel";
import MovementToPointLevel from "@/game/levels/movementToPointLevel";
import SpecialityMatchLevel from "@/game/levels/specialityMatchLevel";

const NONE_LEVEL_TYPE = null;

class GameLevels{

    static getGameLevel(levelNumber,point,config){
        let level = null;
        // if(levelNumber % 5 === 0){
        //    level = new SpecialityMatchLevel(levelNumber,point,config);
        // } else if(!this.isLevelNumberEven(levelNumber)){
        //     level = new MovementToPointLevel(levelNumber,point,config);
        // }else{
        //     level = new VariantCandyCrushInMovementLevel(levelNumber,point,config);
        // }

        if(!this.isLevelNumberEven(levelNumber)){
            level = new MovementToPointLevel(levelNumber,point,config);
        }else{
            level = new VariantCandyCrushInMovementLevel(levelNumber,point,config);
        }
        return level;
    }

    static getGameLevelTypeByLevelNumber(levelNumber){
        let levelType = NONE_LEVEL_TYPE;
        // if(levelNumber % 5 === 0){
        //     levelType = SPECIALITY_MATCH
        // } else if(!this.isLevelNumberEven(levelNumber)){
        //     levelType = MOVEMENT_TO_POINT_LEVEL;
        // } else{
        //     levelType = VARIANT_CANDY_CRUSH_IN_MOVEMENT;
        // }

        if(!this.isLevelNumberEven(levelNumber)){
            levelType = MOVEMENT_TO_POINT_LEVEL;
        } else{
            levelType = VARIANT_CANDY_CRUSH_IN_MOVEMENT;
        }
        return levelType;
    }

    static isLevelNumberEven(levelNumber){
        return levelNumber % 2 === 0;
    }

    static isLevelNumberPrime(){

    }

}

export default GameLevels;