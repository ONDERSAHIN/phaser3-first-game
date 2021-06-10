import {Scene} from "phaser";
import EventBus from "@/bus/event.bus";

export default class GameOverScene extends Scene {

    _level = {}

    constructor() {
        super({key: 'GameOverScene'})
    }

    init(data) {
        this._level = data.levelData;
    }

    preload() {

    }

    create() {
        EventBus.$emit("show:failure-contents")
        // EventBus.$on("done:failure-contents",() =>{
        //     EventBus.$emit("show:level-retry-dialog",this._level)
        // })
        //
        // EventBus.$on("retry",() =>{
        //     // this.scene.start("GameLevelResolveScene",store.getters.getSessionId)
        //     this.scene.get("GameLevelResolveScene").scene.restart()
        //     EventBus.$off("done:failure-contents")
        //     EventBus.$off("retry")
        // })

    }

    update(time, delta) {
    }


}