import {ClearCanvas} from './game.commands'
import GameContext from "@/game/core/old/game.context";
// let $ = require('jquery')

// $(document).on("mousedown touchstart", "#canvas", function(evt){
//     //ClearCanvas();
//     document.dispatchEvent(new CustomEvent("movementIntent",{bubbles:true,detail:{}}));
//     if(!GameContext.canPlay) return;
//     if ($("img").is(':animated') === false){
//         let candySize = 400/GameContext.gameBoard.getSize();
//         let xCoord, yCoord;
//
//         if (evt.type === "mousedown"){
//             xCoord = evt.offsetX;
//             yCoord = evt.offsetY;
//         }
//         else {
//             xCoord = parseInt(evt.touches[0].clientX) - ( parseInt(evt.target.offsetLeft) + parseInt(evt.target.offsetParent.offsetLeft) );
//             yCoord = parseInt(evt.touches[0].clientY) - ( parseInt(evt.target.offsetTop) + parseInt(evt.target.offsetParent.offsetTop) );
//         }
//
//         let col = Math.floor(xCoord/candySize);
//         let row = Math.floor(yCoord/candySize);
//
//         let img = document.querySelectorAll("[data-position='" + col + "-" + row + "']").item(0);
//
//         if (img != null){
//             $(img).css("z-index", 2);
//
//             let top = parseInt($(img).css("top"));
//             let left = parseInt($(img).css("left"));
//
//             GameContext.dragDropInfo = {candyImg : img,
//                 initCol : col,
//                 initRow : row,
//                 initTop : top,
//                 initLeft : left,
//                 initXCoord : xCoord,
//                 initYCoord : yCoord};
//         }
//     }
// });
//
//
// $(document).on("mousemove touchmove", "#canvas", function(evt){
//     if(!GameContext.canPlay) return;
//     if (GameContext.dragDropInfo != null && $("img").is(':animated') === false){
//         let xCoord, yCoord;
//
//         if (evt.type === "mousemove"){
//             xCoord = evt.offsetX;
//             yCoord = evt.offsetY;
//         }
//         else {
//             xCoord = parseInt(evt.touches[0].clientX) - ( parseInt(evt.target.offsetLeft) + parseInt(evt.target.offsetParent.offsetLeft) );
//             yCoord = parseInt(evt.touches[0].clientY) - ( parseInt(evt.target.offsetTop) + parseInt(evt.target.offsetParent.offsetTop) );
//         }
//
//         //console.log(dragDropInfo.originalTop, dragDropInfo.originalLeft, (dragDropInfo.originalTop + evt.offsetX - dragDropInfo.mouseX), (dragDropInfo.originalLeft + evt.offsetY - dragDropInfo.mouseY));
//         let top = GameContext.dragDropInfo.initTop + yCoord - GameContext.dragDropInfo.initYCoord;
//         let left = GameContext.dragDropInfo.initLeft + xCoord - GameContext.dragDropInfo.initXCoord;
//
//         $(GameContext.dragDropInfo.candyImg).css({"top" : top,
//             "left" : left});
//     }
// });
//
//
// $(document).on("mouseup touchend", function(evt){
//     if(!GameContext.canPlay) return;
//     if (GameContext.dragDropInfo != null){
//         ClearCanvas();
//
//         let candySize = 400/GameContext.gameBoard.getSize();
//         let xCoord, yCoord;
//
//         if (evt.type === "mouseup"){
//             xCoord = evt.offsetX;
//             yCoord = evt.offsetY;
//         }
//         else {
//             xCoord = parseInt(evt.changedTouches[0].clientX) - ( parseInt(evt.target.offsetLeft) + parseInt(evt.target.offsetParent.offsetLeft) );
//             yCoord = parseInt(evt.changedTouches[0].clientY) - ( parseInt(evt.target.offsetTop) + parseInt(evt.target.offsetParent.offsetTop) );
//         }
//
//         let col = Math.floor(xCoord/candySize);
//         let row = Math.floor(yCoord/candySize);
//
//         let candy = $(GameContext.dragDropInfo.candyImg).data("candy");
//
//         let movementCount = 0;
//
//         //up
//         if (GameContext.dragDropInfo.initCol === col && GameContext.dragDropInfo.initRow-1 === row){
//             if (GameContext.gameRules.isMoveTypeValid(candy, "up")){
//                 GameContext.gameBoard.flipCandies(candy, GameContext.gameBoard.getCandyInDirection(candy, "up"));
//                 movementCount ++;
//             }
//         }
//         //down
//         else if (GameContext.dragDropInfo.initCol === col && GameContext.dragDropInfo.initRow+1 === row){
//             if (GameContext.gameRules.isMoveTypeValid(candy, "down")){
//                 GameContext.gameBoard.flipCandies(candy, GameContext.gameBoard.getCandyInDirection(candy, "down"));
//                 movementCount ++;
//             }
//         }
//         //left
//         else if (GameContext.dragDropInfo.initCol-1 === col && GameContext.dragDropInfo.initRow === row){
//             if (GameContext.gameRules.isMoveTypeValid(candy, "left")){
//                 GameContext.gameBoard.flipCandies(candy, GameContext.gameBoard.getCandyInDirection(candy, "left"));
//                 movementCount ++;
//             }
//         }
//         //right
//         else if (GameContext.dragDropInfo.initCol+1 === col && GameContext.dragDropInfo.initRow === row){
//             if (GameContext.gameRules.isMoveTypeValid(candy, "right")){
//                 GameContext.gameBoard.flipCandies(candy, GameContext.gameBoard.getCandyInDirection(candy, "right"));
//                 movementCount ++;
//             }
//         }
//
//         if(movementCount>0){
//             document.dispatchEvent(new CustomEvent("movement",{bubbles:true,detail:{movementCount}}));
//         }
//
//         $(GameContext.dragDropInfo.candyImg).css({"z-index": 1,
//             "top" : GameContext.dragDropInfo.initTop,
//             "left" : GameContext.dragDropInfo.initLeft});
//
//         GameContext.dragDropInfo = null;
//     }
// });