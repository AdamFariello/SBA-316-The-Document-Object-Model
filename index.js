const chessImgDir = "./images/chess/"
let chessPieces = [
    {name:"bishop",src: chessImgDir + "bishop.png"},
    {name:"king",src: chessImgDir + "king.png"},
    {name:"knight",src: chessImgDir + "knight.png"},
    {name:"pawn",src: chessImgDir + "pawn.png"},
    {name:"queen",src: chessImgDir + "queen.png"},
    {name:"rook",src: chessImgDir + "rook.png"},
    
]

let gameBoardDiv = document.getElementById("gameScreen")

function generateRandomPiece() { 
    let clone = JSON.parse(JSON.stringify(chessPieces));
    
    while (clone.length > 3) {
        const index = Math.floor(Math.random() * clone.length)
        const toRemove = chessPieces[index].name
        clone = clone.filter(function(e) {
            return e.name != toRemove
        })
    }

    return clone
}

let topImg = document.getElementById("topImg")
function updateOpacity () {
    //topImg.setAttribute("opacity", 0.1)]
    let topImgStyles = window.getComputedStyle(topImg);
    const opacity = topImgStyles.getPropertyValue("opacity")
    console.log(opacity)
    topImg.style.opacity = opacity - 0.25
}

function selectChessPiece() {
    let pieces = generateRandomPiece()
    for (piece of pieces) {
        const pieceDiv = document.createElement("div")
    }
}


function createGameSquare() {

}

function scrollThroughBoard() {
    //TODO: figure out how to prevent it from running early
    let gameRows = gameBoardDiv.getElementsByClassName("gameRow")
    for (gameRow of gameRows) {
        let gameSquares = gameRow.getElementsByClassName("gameSquare")
        for (gameSquare of gameSquares) {
            console.log(gameSquare)
        }
    }
    console.log(gameRows[0].childNodes)

}
//scrollThroughBoard()