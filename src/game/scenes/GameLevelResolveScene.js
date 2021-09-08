import {Scene} from "phaser";
import GameLevels from "@/game/levels/gameLevels";
import {MOVEMENT_TO_POINT_LEVEL, SPECIALITY_MATCH, VARIANT_CANDY_CRUSH_IN_MOVEMENT} from "@/game/levels/gameLevelTypes";


export default class GameLevelResolveScene extends Scene {

    gameScene;
    layer;
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

        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        let levelType = GameLevels.getGameLevelTypeByLevelNumber(this._playerSessionData.currentLevel);
        let level = null;
        let config = null;
        if (levelType === MOVEMENT_TO_POINT_LEVEL) config = this.cache.json.get('movementLevels')
        if (levelType === VARIANT_CANDY_CRUSH_IN_MOVEMENT) config = this.cache.json.get('variantLevels')
        if(levelType === SPECIALITY_MATCH ) config = this.cache.json.get('specialityLevels');
        level = GameLevels.getGameLevel(this._playerSessionData.currentLevel,this._playerSessionData.sessionScore, config);

        this.scene.start('PlayScene',{sessionData: this._playerSessionData, levelData: level});

        this.gameScene = this.scene.get('PlayScene');


    }

    update(time, delta) {
    }

    updateCamera ()
    {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;
        const zoom = this.gameScene.getZoom();
        const offset = 120 * zoom;
        this.layer.x = width / 2;
        this.layer.y = (height / 2) + offset;
        this.layer.setScale(zoom);
    }

}