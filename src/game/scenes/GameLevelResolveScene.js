import {Scene} from "phaser";
import GameLevels from "@/game/levels/gameLevels";
import {MOVEMENT_TO_POINT_LEVEL, SPECIALITY_MATCH, VARIANT_CANDY_CRUSH_IN_MOVEMENT} from "@/game/levels/gameLevelTypes";


export default class GameLevelResolveScene extends Scene {

    _playerSessionData = null;

    constructor() {
        super({key: 'GameLevelResolveScene'})
    }

    init(data) {
        this._playerSessionData = data;
    }

    preload() {

    }

    create() {
        let levelType = GameLevels.getGameLevelTypeByLevelNumber(this._playerSessionData.currentLevel);
        let level = null;
        let config = null;
        if (levelType === MOVEMENT_TO_POINT_LEVEL) config = this.cache.json.get('movementLevels')
        if (levelType === VARIANT_CANDY_CRUSH_IN_MOVEMENT) config = this.cache.json.get('variantLevels')
        if(levelType === SPECIALITY_MATCH ) config = this.cache.json.get('specialityLevels');
        level = GameLevels.getGameLevel(this._playerSessionData.currentLevel,this._playerSessionData.sessionScore, config);


        //level = new SpecialityMatchLevel(this._playerSessionData.currentLevel,this._playerSessionData.sessionScore, config)

        // if(levelType === SPECIALITY_MATCH){
        //     this.scene.get('PlaySpecialityScene').scene.restart( {sessionData: this._playerSessionData, levelData: level})
        // }else{
        //     this.scene.get("PlayScene").scene.restart({sessionData : this._playerSessionData, levelData : level})
        // }
        // this.scene.stop("PlayScene");
        // this.scene.get("PlayScene").scene.restart({sessionData : this._playerSessionData, levelData : level})
        this.scene.start('PlayScene', {sessionData: this._playerSessionData, levelData: level})

    }

    update(time, delta) {
        // Constant running loop
        // console.log("SessionLoadScene update");
    }

}