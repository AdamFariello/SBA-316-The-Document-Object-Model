import { updateOpacity } from "./script.js";
import { chessPieces, cars } from "./global.js";
let chessPiecesUsed = [] //TODO: highlight in obsidian that this was 
                        //       treated as a constant


//init
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


function createGameSquare() {
    //TODO: figure if to hard code "gameSquare"
    let gameSquare = document.createElement("div")
    gameSquare.setAttribute("class", "gameSquare")
    return gameSquare
}
function initializeBoard() { 
    //TODO: figure out how to prevent it from running early
    let gameBoardDiv = document.getElementById("gameScreen")
    let gameRows = gameBoardDiv.getElementsByClassName("gameRow")
    for (let gameRow of gameRows) {
        let gameSquareArr = gameRow.getElementsByClassName("gameSquare")
        
        let gameSquare = createGameSquare()
        for (let i = 0; i < 5; i++) {
            let clone = gameSquare.cloneNode(false) //false = no children
            clone.setAttribute("column", i)
            gameRow.appendChild(clone)
        }
        gameSquare.setAttribute("column", 5)
        gameRow.appendChild(gameSquare)
    }
}
initializeBoard()


function chooseCSS() {
    const url = window.location.href
    const param = url.split("?")[1]

    //TODO: use variables instead (running out of time lol)
    let style = document.createElement("style")
    if (param == "dorfic") {
        style.innerHTML = `
        #gameScreen {background-color: #2ec4b6;} 
        .gameSquare {background-color: #ffdd00;}
        #piecesList {background-color: #2ec4b6;}
        `
    } else if (param == "hexatron") {
        style.innerHTML = `
        #gameScreen {background-color: #81171b;} 
        .gameSquare {background-color: #d6c6aa;}
        #piecesList {background-color: #4ea8de;}
        `
    } else {
        return
    }
    
    document.getElementsByTagName("head")[0]
            .appendChild(style)
}
chooseCSS()





//rest
function generateChessElement(chessPiece) {
    let img = document.createElement("img")
    img.setAttribute("src", chessPiece)
    img.setAttribute("class", "chessPieceImg")
    return img
}

function randomChessArrNum() {
    return Math.floor(Math.random() * chessPieces.length)
}




const piecesList = document.getElementById("piecesList")
let selectedPiece = null
piecesList.addEventListener("click", e => {
    //TODO: figure out if swapping div with img is good idea
    let images = piecesList.querySelectorAll("img")
    for (let image of images) {
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
    let chessPieceIndex = chessPieces.indexOf(splitedStr)
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
function generateEnemy(gameSquare) {
    let enemy = generateEnemyElement()
    const oldImg = enemy.src
    enemy.setAttribute("src", "/images/sparkles.gif")
    gameSquare.appendChild(enemy)
    setTimeout(e => {
        enemy.setAttribute("src", oldImg)
    }, 2000);
}


function moveEnemyDown() {
    //TODO: replace uneeded lets with const
    let enemies = document.querySelectorAll("img[name='enemy']")
    for (let enemy of enemies) {
        enemy.parentNode.parentNode
        let row = parseInt(enemy.parentNode.parentNode.id[3])
        let newRowS = `row${row+1}`
        let newRow = document.getElementById(newRowS)
        
        if (newRow != null) {
            let col = parseInt(enemy.parentNode.getAttribute("column")) 
            let div = newRow.childNodes[col]
            
            if (div.childNodes.length == 0) { 
                enemy.classList.add("enemyAnimation")
                //duration shorter to avoid animation ending early
                var animationDuration = 3000; 
                setTimeout(e => {
                    enemy.classList.remove("enemyAnimation")
                    div.appendChild(enemy)
                }, animationDuration);
            } else {
                //enemy destroyed
                div.childNodes[0].remove()
                enemy.setAttribute("delete", "true")
            }
        } else {
            //THIS IS WHERE YOU TAKE DAMAGE
            enemy.setAttribute("src", "/images/explosion.gif")
            setTimeout(e => {
                enemy.remove()
                updateOpacity()
            }, 1000);
        }        
    }

    //TODO: remove elements to simulate elements getting cleared
    let toBeDeleted = document.querySelectorAll("img[delete]")
    /*
    if (toBeDeleted.length > 0) {
        console.log(toBeDeleted)
        toBeDeleted[0].innerHTML = ""
        console.log(toBeDeleted)
        //while (toBeDeleted.length > 0) {
        //    toBeDeleted[0].remove()
        //}
    }
    */


}

function gameLoop() {
    let row1 = document.getElementById("row1")
    
    //Step 0: check if game lost or won

    //Step 1: Move already existing enemies down
    moveEnemyDown()

    //Step 2: scroll through row 1 to spawn new enemies
    let gameSquares = row1.children
    for (let gameSquare of gameSquares) {
        let spawnEnemy = Math.round(Math.random())
        let isOccupied = gameSquare.children.length 
        if (spawnEnemy == 0 && isOccupied == 0) {
            generateEnemy(gameSquare)
        }
    }
}
//window.setInterval(gameLoop(), 2000)

//TODO: REMOVE
/*
let row2 = document.getElementById("row2")
let gameSquares = row2.children
for (let gameSquare of gameSquares) {
    let chess = generateChessElement(chessPieces[0])
    gameSquare.appendChild(chess)
}
*/
gameLoop()
gameLoop()