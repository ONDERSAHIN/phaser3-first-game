// let $ = require('jquery')
function removeEventListener(e){
    let img = document.getElementById("candy-id-" + e.detail.candy.id);
    //shrink in
    /*
    var candySize = 400/board.boardSize;
    var top = info.fromRow * candySize;
    var left = info.fromCol * candySize;

    $(img).animate({"width" : 0,
                    "height" : 0,
                    "top" : top + candySize/2,
                    "left" : left + candySize/2}, function(){
                        img.parentNode.removeChild(img);
                    });
    */
    //fade out
    // $(img).animate({"opacity" : 0}, function(){
    //     img.parentNode.removeChild(img);
    // });
}

export default removeEventListener;