import {serviceContext} from "@/http/api/services/serviceContext";
import store from "@/store";


class GameAssets {

    static assets = []

    static async fetch() {
        if (!store.getters.getCurrentGame) return Promise.reject([]);
        return serviceContext.gameService.getAssets(store.getters.getCurrentGame.id)
    }


    static async get() {
        if (!GameAssets.assets.length) {
            await GameAssets.fetch();
            console.log("assets fetched")
        }
        return GameAssets.assets
    }


}

export default GameAssets;