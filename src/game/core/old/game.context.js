class GameContext{

    static #_board = null;
    static #_rules = null;
    static #_dragDropInfo = null;
    static #_canPlay = false;
    static #_currentLevel = {};

    constructor(board,rules) {
        GameContext.#_board = board;
        GameContext.#_rules = rules;
    }

    static get gameBoard(){
        return GameContext.#_board;
    }

    static get gameRules(){
        return GameContext.#_rules;
    }

    static set dragDropInfo(info){
        GameContext.#_dragDropInfo = info
    }

    static get dragDropInfo(){
        return GameContext.#_dragDropInfo;
    }

    static togglePlay(canPlay){
        GameContext.#_canPlay = canPlay;
    }

    static get canPlay(){
        return GameContext.#_canPlay;
    }

    static set currentGameLevel(level){
        GameContext.#_currentLevel = level;
    }

    static get currentGameLevel(){
        return GameContext.#_currentLevel;
    }
}

export default GameContext;