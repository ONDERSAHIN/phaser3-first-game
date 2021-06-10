import {Scene} from "phaser";
import {serviceContext} from "@/http/api/services/serviceContext"
import store from '@/store'


export default class SessionLoadScene extends Scene {
    constructor() {
        super({key: 'SessionLoadScene'})
    }

    preload() {

    }


    create() {
        //var logo = this.add.image(400, 300, 'logo');
        let gameData= store.getters.getCurrentGame
        let playerSessionData = {}
        serviceContext.gameService.startGameSession(gameData.id).then(({data: {data, error}}) => {
            this.isGameSessionLoading = false;
            if (!error) {
                store.dispatch("setSessionId", data);
                playerSessionData.sessionId = data.id || null; // TODO
                playerSessionData.currentLevel = data.currentLevel || 1;
                playerSessionData.sessionScore = data.sessionScore || 0;
                playerSessionData.monthlyScore = data.monthlyScore || 0;

                store.dispatch("setSessionScore",playerSessionData.sessionScore)
                store.dispatch("setMonthlyScore",playerSessionData.monthlyScore)

                // this.scene.stop('GameLevelResolveScene');
                this.scene.start('GameLevelResolveScene', playerSessionData)
            }

        }).catch(error => {
            this.isGameSessionLoading = false;
        });

    }

    update(time, delta) {
        // Constant running loop
        // console.log("SessionLoadScene update");
    }

}