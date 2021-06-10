import Service from "./service";
import { PLAYERS } from "../../url";
const singleton = Symbol()
const singletonEnforcer = Symbol()

const GAMES = "games"
const POINT = "point"
const MONTHLY = "monthly"

class PlayerService extends Service{
    constructor(enforcer){
        super();
        if(enforcer !== singletonEnforcer){
            throw new Error("Can not construct PlayerService more then one.");
        }
    }

    static get instance(){
        if(!this[singleton]){
            this[singleton] = new PlayerService(singletonEnforcer);
        }
        return this[singleton]
    }

    getMonthlyPointForGame(gameId){
        return this._api_connector.get(PLAYERS.uri(GAMES).uri(gameId).uri(POINT).uri(MONTHLY).url);
    }

}

export default PlayerService