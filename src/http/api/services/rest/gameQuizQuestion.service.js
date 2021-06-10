import Service from "./service";
import { GAME_QUIZ_QUESTION_CONTENT } from "../../url";
const singleton = Symbol()
const singletonEnforcer = Symbol()

const NEXT = "next"

class GameQuizQuestionService extends Service{
    constructor(enforcer){
        super();
        if(enforcer !== singletonEnforcer){
            throw new Error("Can not construct GameQuizQuestionService more then one.");
        }
    }

    static get instance(){
        if(!this[singleton]){
            this[singleton] = new GameQuizQuestionService(singletonEnforcer);
        }
        return this[singleton]
    }

    getQuizQuestionContent(payload){
        return this._api_connector.post(GAME_QUIZ_QUESTION_CONTENT.uri(NEXT).url, payload);
    }

}

export default GameQuizQuestionService