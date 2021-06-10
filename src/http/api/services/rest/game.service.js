import Service from "./service";
import { GAMES, GAME_QUIZ_QUESTIONS, GAME_SESSIONS } from "../../url";
const singleton = Symbol()
const singletonEnforcer = Symbol()

const START_GAME_SESSION_URI = "start-session"
const GAME_ASSETS = "assets"
const GAME_QUESTION_URI = "questions"
const GAME_ANSWER_URI = "answer"
const CURRENT = "current"
const UPDATE = "update"
const RESET = "reset"


class GameService extends Service{
    constructor(enforcer){
        super();
        if(enforcer !== singletonEnforcer){
            throw new Error("Can not construct GameService more then one.");
        }
    }

    static get instance(){
        if(!this[singleton]){
            this[singleton] = new GameService(singletonEnforcer);
        }
        return this[singleton]
    }

    getGames(){
        return this._api_connector.get(GAMES.url);
    }

    startGameSession(gameId){        
        return this._api_connector.post(GAMES.uri(gameId).uri(START_GAME_SESSION_URI).url);
    }

    getAssets(gameId){
        return this._api_connector.get(GAMES.uri(gameId).uri(GAME_ASSETS).url);
    }

    getPlayerLeaderBoardForGame(gameId){
        return this._api_connector.get(GAMES.uri(gameId).uri("player").uri("leaderboard").url);

    }

    // getQuestion(quizId,questionNo){
    //     return this._api_connector.get(GAME_QUIZS.uri(quizId).uri(GAME_QUESTION_URI).uri(questionNo).url);
    // }

    getConfirmAnswer(questionId,answerId){
        return this._api_connector.post(GAME_QUIZ_QUESTIONS.uri(GAME_QUESTION_URI).uri(questionId).uri(GAME_ANSWER_URI).uri(answerId).url);
    }

    putGameSession(payload){
        return this._api_connector.put(GAME_SESSIONS.uri(CURRENT).uri(UPDATE).url, payload);
    }

    resetGameSession(sessionId){
        return this._api_connector.put(GAME_SESSIONS.uri(sessionId).uri(RESET).url);
    }

}

export default GameService