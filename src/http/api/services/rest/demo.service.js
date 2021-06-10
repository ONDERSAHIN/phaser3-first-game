import Service from "./service";
import { DEMO } from "../../url";
const singleton = Symbol()
const singletonEnforcer = Symbol()


class DemoService extends Service{
    constructor(enforcer){
        super();
        if(enforcer !== singletonEnforcer){
            throw new Error("Can not construct DemoService more then one.");
        }
    }

    static get instance(){
        if(!this[singleton]){
            this[singleton] = new DemoService(singletonEnforcer);
        }
        return this[singleton]
    }

    getMessage(){
        return this._api_connector.post(DEMO.url);
    }
}

export default DemoService