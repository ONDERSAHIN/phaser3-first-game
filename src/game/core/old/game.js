import GameContext from "@/game/core/old/game.context";
import GameCommands from "@/game/core/old/game.commands";
import "@/game/core/old/game.controller";
import EventHandler from './events-handler/index';
import Rules from './rules.class'
import Board from './board.class'

// let seedrandom = require('seedrandom');
// seedrandom(0);


const DEFAULT_BOARD_SIZE = 8;
const DEFAULT_GAME_NAME = "Candy Crush"
const GAME_VERSION = "1.0-Beta"

class Game {

    _name = DEFAULT_GAME_NAME;
    _version = GAME_VERSION;
    _commands = null;

    constructor(size = DEFAULT_BOARD_SIZE) {
        let board = new Board(size);
        let rules = new Rules(board);
        new GameContext(board, rules);
        this._commands = GameCommands;
        EventHandler.registerListeners();
    }

    setScoreIncrementStrategyFn(scoreIncrementStrategyFn) {
        GameContext.gameBoard.setScoreIncrementStrategy(scoreIncrementStrategyFn);
    }

    setScore(score){
        GameContext.gameBoard.setScore(score);
    }

    get commands() {
        return this._commands;
    }

    get name() {
        return this._name;
    }

    get version() {
        return this._version;
    }

}

export default Game;