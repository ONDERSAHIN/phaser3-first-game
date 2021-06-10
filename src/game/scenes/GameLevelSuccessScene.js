import {Scene} from "phaser";
import store from "@/store";
import {serviceContext} from "@/http/api/services/serviceContext";
import EventBus from "@/bus/event.bus";

export default class GameLevelSuccessScene extends Scene{

    _level = {}

    constructor() {
        super({key: 'GameLevelSuccessScene'})
    }

    init(data) {
        this._level = data.levelData;
    }

    preload() {

    }

    create() {

        EventBus.$emit("show:success-dialog",this._level)

        store.getters.getEventEmitter.on("next-level",()=>{
            let point = this._level.levelPoint;
            let payload = {
                "gameSession": store.getters.getSessionId.id,
                "actualPlayedTime": 0,
                "score": point,
                "extraGainedPoint": 0,
                "currentLevel": this._level.currentLevel,
                "gameSessionCheckPointType": "GAME_NEXT_LEVEL"
            }
            serviceContext.gameService.putGameSession(payload).then(({status, data: {data, error}}) => {
                if (status === 201) {
                    // this.currentLevel = data.level;
                    // this.sessionScore = data.sessionScore
                    // this.monthlyScore = data.monthlyScore;
                    // this.gameLevel = GameLevels.getGameLevelByLevelNumber(this.currentLevel);
                    // GameContext.currentGameLevel = this.gameLevel;
                    store.dispatch("setSessionScore",data.sessionScore)
                    store.dispatch("setMonthlyScore",data.monthlyScore)
                    // this.scene.stop("SessionLoadScene");
                    this.scene.start("SessionLoadScene");

                } else {
                }
            });
            // EventBus.$off("next-level")
            // EventBus.$off("retry")
        },this)

        store.getters.getEventEmitter.on("retry",() =>{
            // this.scene.start("GameLevelResolveScene",store.getters.getSessionId)
            // this.scene.stop("PlayScene");
            this.onRestart()
            // this.scene.get("SessionLoadScene").scene.start()
            // EventBus.$off("next-level")
            // EventBus.$off("retry")
        })

    }

    onRestart(){
        this.scene.start("SessionLoadScene");
    }

    onNextLevel() {

    }

    update(time, delta) {
    }
}