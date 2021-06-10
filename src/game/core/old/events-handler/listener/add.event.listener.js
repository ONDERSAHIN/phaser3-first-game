import GameContext from "@/game/core/old/game.context";
import {Crush} from "@/game/core/old/game.commands"

// let $ = require('jquery')
function addEventListener(e){
    let candy = e.detail.candy;
    let img = document.createElement("img");

    // $("#gameBoard").append(img);
    // img.src = "/graphics/" + candy.toString() + "-candy.png";
    // $(img).data("candy", candy);
    // $(img).attr("id", "candy-id-" + candy.id);
    // $(img).attr("data-position", candy.col + "-" + candy.row);
    //
    // let candySize = 400/GameContext.gameBoard.getSize();
    //
    // let top = candy.row * candySize;
    // let left = candy.col * candySize;
    //
    // let startTop = 0 - ((GameContext.gameBoard.getSize() - (top/candySize)) * candySize);
    //
    // $(img).css({"width" : candySize,
    //     "height" : candySize,
    //     "top" : startTop,
    //     "left" : left});
    //
    // $(img).animate({"top" : top}, function(){
    //     Crush();
    // });
}

export default addEventListener;