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
    //TODO: figure if to hard code "gameSquare"
    let gameSquare = document.createElement("div")
    gameSquare.setAttribute("class", "gameSquare")
    return gameSquare
}

//function scrollThroughBoard() {
function initializeBoard() { 
    //TODO: figure out how to prevent it from running early
    let gameRows = gameBoardDiv.getElementsByClassName("gameRow")
    for (gameRow of gameRows) {
        let gameSquareArr = gameRow.getElementsByClassName("gameSquare")
        
        if (gameSquareArr.length < 6) {
            let gameSquare = createGameSquare()
            while (gameSquareArr.length < 5) {
                let clone = gameSquare.cloneNode(false) //false = no children
                gameRow.appendChild(clone)
            }
            gameRow.appendChild(gameSquare)
        }
    }
}
initializeBoard()


function invertImage() {

}

const piecesList = document.getElementById("piecesList")
let selectedPiece = null
piecesList.addEventListener("click", e => {
    let images = piecesList.querySelectorAll("img")
    for (image of images) {
        if (image == e.target) {
            if (e.target.hasAttribute("style")) {
                selectedPiece = null
                e.target.removeAttribute("style")  
            } else {
                selectedPiece = e.target
                e.target.setAttribute(
                    "style", "border:var(--gamePieceBorder)"
                )
            }
        } else {
            image.removeAttribute("style")
        }
    }
})