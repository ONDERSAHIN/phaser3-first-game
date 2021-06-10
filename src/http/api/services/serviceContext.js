import DemoService from "./rest/demo.service";
import GameService from "./rest/game.service";
import VisualContentService from "./rest/visualContent.service";
import GameQuizQuestionService from "@/http/api/services/rest/gameQuizQuestion.service";
import PlayerService from "@/http/api/services/rest/player.service";

const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * @author  onder sahin <onder.sahin@meyer.com.tr>
 * @description SERVICE CONTEXT IS SINGLETON ACCESSOR TO NOONIE SERVICE INSTANCES
 */
class ServiceContext {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct RestService Facade more than one');
        }
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new ServiceContext(singletonEnforcer);
        }
        return this[singleton];
    }

    get demoService(){
        return DemoService.instance
    }

    get gameService(){
        return GameService.instance
    }

    get visualContentService(){
        return VisualContentService.instance
    }

    get gameQuizQuestionService(){
        return GameQuizQuestionService.instance;
    }

    get playerService(){
        return PlayerService.instance;
    }
}

export const serviceContext = ServiceContext.instance;

export default ({Vue}) => {
    Vue.prototype.$serviceContext = ServiceContext.instance;
}