import GameContext from "@/game/core/old/game.context";

export function DrawArrow(){
    let validMove = GameContext.gameRules.getRandomValidMove();

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,400,400);

    let col = validMove.candy.col;
    let row = validMove.candy.row;

    let candySize = 400/GameContext.gameBoard.getSize();
    let squareSize = candySize/2;

    let x = (col+1) * candySize - squareSize;
    let y = (row+1) * candySize - squareSize;

    ctx.fillStyle = "#333333";

    ctx.beginPath();
    if(validMove.direction === "up"){
        ctx.fillRect(x - (squareSize / 2), y - squareSize, squareSize, squareSize);

        ctx.moveTo(x - squareSize, y - squareSize + 1);
        ctx.lineTo(x, y - (2 * squareSize));
        ctx.lineTo(x + squareSize, y - squareSize + 1);
    }
    else if(validMove.direction === "down"){
        ctx.fillRect(x - (squareSize / 2), y, squareSize, squareSize);

        ctx.moveTo(x + squareSize, y + squareSize - 1);
        ctx.lineTo(x, y + squareSize + squareSize);
        ctx.lineTo(x - squareSize, y + squareSize - 1);
    }
    else if(validMove.direction === "left"){
        ctx.fillRect(x - squareSize, y - (squareSize / 2), squareSize, squareSize);

        ctx.moveTo(x - squareSize + 1, y - squareSize);
        ctx.lineTo(x - (2 * squareSize), y);
        ctx.lineTo(x - squareSize + 1, y + squareSize);
    }
    else if(validMove.direction === "right"){
        ctx.fillRect(x, y - (squareSize / 2), squareSize, squareSize);

        ctx.moveTo(x + squareSize - 1, y + squareSize);
        ctx.lineTo(x + (2 * squareSize), y);
        ctx.lineTo(x + squareSize - 1, y - squareSize);
    }
    ctx.closePath();
    ctx.fill();
}


export function ClearCanvas(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,400,400);
}


export function Crush(){
    setTimeout(function(){
        GameContext.gameRules.moveCandiesDown();
    }, 500);
    let allCrushes = GameContext.gameRules.getCandyCrushes();
    if(allCrushes.length > 0){
        document.dispatchEvent(new CustomEvent("crushes",{bubbles:true,detail:{allCrushes}}));
    }
    GameContext.gameRules.removeCrushes(allCrushes);
}


export function NewGame(){
    GameContext.gameBoard.clear();
    GameContext.gameBoard.resetScore();
    GameContext.gameRules.prepareNewGame();
}

export default {
    Crush,
    DrawArrow,
    ClearCanvas,
    NewGame
}
