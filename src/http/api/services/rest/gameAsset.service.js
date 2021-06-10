import Service from "./service";
import { GAMES } from "../../url";
const singleton = Symbol()
const singletonEnforcer = Symbol()


class GameAssetService extends Service{
    constructor(enforcer){
        super();
        if(enforcer !== singletonEnforcer){
            throw new Error("Can not construct GameAssetService more then one.");
        }
    }

    static get instance(){
        if(!this[singleton]){
            this[singleton] = new GameAssetService(singletonEnforcer);
        }
        return this[singleton]
    }


}

export default GameAssetService