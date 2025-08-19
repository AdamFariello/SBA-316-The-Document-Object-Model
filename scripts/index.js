import { updateOpacity } from "./script.js";
import { chessPieces, chessPiecesUsed, cars } from "./global.js";





let gameBoardDiv = document.getElementById("gameScreen")

function generateChessElement(chessPiece) {
    let img = document.createElement("img")
    img.setAttribute("src", chessPiece)
    img.setAttribute("class", "chessPieceImg")
    return img
}

function randomChessArrNum() {
    return Math.floor(Math.random() * chessPieces.length)
}

function generateFirst3pieces() {
     let piecesList = document.getElementById("piecesList")
     let chessPieceDivs = piecesList.querySelectorAll("div")
     for (let chessPieceDiv of chessPieceDivs) {
        let chessPieceNum = null
        do {
            chessPieceNum = randomChessArrNum()
        } while(chessPiecesUsed.includes(chessPieceNum))

        chessPiecesUsed.push(chessPieceNum)
        chessPieceDiv.appendChild(
            generateChessElement(chessPieces[chessPieceNum])
        )
     }
}
generateFirst3pieces()





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


function createGameSquare() {
    //TODO: figure if to hard code "gameSquare"
    let gameSquare = document.createElement("div")
    gameSquare.setAttribute("class", "gameSquare")
    return gameSquare
}

function initializeBoard() { 
    //TODO: figure out how to prevent it from running early
    let gameRows = gameBoardDiv.getElementsByClassName("gameRow")
    for (let gameRow of gameRows) {
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



const piecesList = document.getElementById("piecesList")
let selectedPiece = null
piecesList.addEventListener("click", e => {
    //TODO: figure out if swapping div with img is good idea
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


gameScreen.addEventListener("click", e => {    
    //TODO: make this easier to read
    if (e.target.id == "gameScreen" || e.target.classList[0] == "gameRow" || 
        e.target.tagName == "IMG" || selectedPiece == null ||
        e.target.tagName == "HR" || e.target.tagName == "undefined") { 
        return
    }

    //TODO?: swap out hard coded numbers
    const row = parseInt(e.target.parentNode.id[3])
    if (row < 4) return

    selectedPiece.style.width = "60px"
    selectedPiece.style.height = "60px"
    e.target.appendChild(selectedPiece)
    
    //TODO: remove this comlicated and fragile verfication.
    //      replace with chess pieces being an obj, and you can
    //      get them from somewhere else
    //      (don't know what to input into the array...)
    let splitStr = 'http://127.0.0.1:5500'
    let splitedStr = selectedPiece.src.split(splitStr)[1]
    const chessPieceIndex = chessPieces.indexOf(splitedStr)
    chessPiecesUsed = chessPiecesUsed.filter(e => {return e != chessPieceIndex})
    selectedPiece = null 

    //TODO: make seperate function
    //      probably also put the function (and connection) in seperate script
    //TODO: figure javascript importing
    let piecesList = document.getElementById("piecesList")
    let chessPieceDivs = piecesList.querySelectorAll("div")
    let noImgDiv = [...chessPieceDivs].filter(e => {
        return e.childNodes.length == 0
    })[0]
    let chessPieceNum = null
    do {
        chessPieceNum = randomChessArrNum()
    } while(chessPiecesUsed.includes(chessPieceNum))

    chessPiecesUsed.push(chessPieceNum)
    noImgDiv.appendChild(
        generateChessElement(chessPieces[chessPieceNum])
    )
})


function generateEnemyElement() {
    const randomNum = Math.floor(Math.random() * cars.length)

    let img = document.createElement("img")
    img.setAttribute("src", cars[randomNum])
    //TODO: make a seperate class for enemy images
    img.setAttribute("class", "chessPieceImg")
    img.setAttribute("name", "enemy")

    return img
}
function generateEnemy() {
    let row1 = document.getElementById("row1")
    let testSquare = row1.childNodes[0]
    //testSquare.innerText = "example"
    //console.log(testSquare)
    testSquare.appendChild(generateEnemyElement())
}
generateEnemy()


function moveEnemyDown() {
    //TODO: replace uneeded lets with const
    let enemies = document.querySelectorAll("img[name='enemy']")
    console.log(enemies)
    for (let enemy of enemies) {
        //let row = parseInt(enemy.parentNode.parentNode.id[3])
        let row = 1
        let newRowS = `row${row+1}`
        let newRow = document.getElementById(newRowS)
        
        if (newRow != null) {
            let div = newRow.childNodes[0]
            enemy.classList.add("enemyAnimation")
            
            //duration shorter to avoid animation ending early
            var animationDuration = 3000; 
            setTimeout(e => {
                enemy.classList.remove("enemyAnimation")
                div.appendChild(enemy)
            }, animationDuration);
        } else {
            //TODO: THIS IS WHERE YOU TAKE DAMAGE
            enemy.setAttribute("src", "images/explosion.gif")
            setTimeout(e => {
                enemy.remove()
                updateOpacity()
                
            }, 1000);
        }        
    }
}
moveEnemyDown()