import GameContext from "@/game/core/old/game.context";
import {Crush} from "@/game/core/old/game.commands"

// let $ = require('jquery')

function moveEventListener(e){

    let img = document.getElementById("candy-id-" + e.detail.candy.id);
    // $(img).attr("data-position", e.detail.toCol + "-" + e.detail.toRow);
    // let candySize = 400/GameContext.gameBoard.getSize();
    // let top = e.detail.toRow * candySize;
    // let left = e.detail.toCol * candySize;
    // $(img).animate({"top" : top,
    //     "left" : left}, function(){
    //     Crush();
    // });
}

export default moveEventListener;