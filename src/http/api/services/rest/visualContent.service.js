import Service from "./service";
import { GAME_VISUAL_CONTENTS } from "../../url";
const singleton = Symbol()
const singletonEnforcer = Symbol()

const NEXT = "next"

class VisualContentService extends Service{
    constructor(enforcer){
        super();
        if(enforcer !== singletonEnforcer){
            throw new Error("Can not construct VisualContentService more then one.");
        }
    }

    static get instance(){

        if(!this[singleton]){
            this[singleton] = new VisualContentService(singletonEnforcer);
        }
        return this[singleton]
    }

    getVisualContent(payload){
        return this._api_connector.post(GAME_VISUAL_CONTENTS.uri(NEXT).url,payload);
    }

}

export default VisualContentService