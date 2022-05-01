
let matriz = [[0,0,0],[0,0,0],[0,0,0]]
let moves = 0
let winner = false
let filled = []

const MSG = {
    WINNER: 'Já temos um vencedor!',
    TIE: 'Deu velha, sem ganhadores!',
    TAKEN: 'Escolha outro local!'
}

const player1 = {
    id: 1,
    string: 'X',    
    class: 'x',
    score: 0
}
const player2 = {
    id: 2,
    string: 'O',
    class: 'o',
    score: 0
}

const setUiPlayer = (currentPlayer)=>{
    document.getElementById('current').innerHTML = currentPlayer.string    
}

const getPlayer = ()=>{
    let id = Math.floor(Math.random() * (2)) + 1;
    let p

    if(id == 1){
        p = player1
    }else{
        p = player2
    }

    setUiPlayer(p)

    return p
}

const resetGame = ()=>{
    matriz = [[0,0,0],[0,0,0],[0,0,0]]
    winner = false
    filled = []
    moves = 0

    let elements = document.getElementsByClassName('row')
    for (let item of elements) {       
        item.innerHTML = ''
        item.classList.remove('winner')
    }

    player = getPlayer()

    logger(undefined, 'Jogo resetado!')
}

let player = getPlayer()

let board = document.getElementById('reset')
board.addEventListener('click', (e)=>{
    resetGame()
})

let elements = document.getElementsByClassName('row')
for (let item of elements) { 

    item.addEventListener('click', (el)=>{

        if(winner == true){
            logger(undefined, MSG.WINNER)
            return
        }        

        let element = el.target   
    
        if(setMove(element, player)){
            checkRow() 
            checkCol()
            checkDiagonal()

            player = changePlayer(player)
        }

        if(moves == 9 && winner == false){
            logger(undefined, MSG.TIE)
            return
        }
    })
    
}

const changePlayer = (cplayer)=>{
    
    if (cplayer.id == 1){
        setUiPlayer(player2)
        return player2
    }else{
        setUiPlayer(player1)
        return player1
    }
}

const setMove = (el, player)=>{

    if(el.id == ""){
        logger(undefined, MSG.TAKEN)
        return false
    }


    if(matriz[el.id[0]][el.id[1]] == 0){
        
        el.innerHTML = setElClass(player)
        matriz[el.id[0]][el.id[1]] = player.id
        moves++        
    }else{
        logger(undefined, MSG.TAKEN)
        return false
    }

    logger(el)
    return true
}

const checkRow = ()=>{
    let i = 0
    let j = 0
    let match = 0
    let win = false

    if(moves > 4){
        for(i = 0; i<=2; i++){
            for(j=0; j<=2;j++){                
                if(matriz[i][0] == matriz[i][j] && matriz[i][j] != 0 && j>0){
                    match++
                    if(filled.length <= 2){                        
                        filled[j] = [i,j].join('')
                    }                     
                }           
            }
            if(match == 2){
                win = true                
                filled[0] = [filled[1][0],0].join('')
                match = 0

                setUiWinner()                
            }else{
                match = 0
                filled = []                
            }
        } 
        if(win){
            winner = true            
            logger(undefined, `O jogador ${player.string} Ganhou na linha`)
            
        }
    }
}

const checkCol = ()=>{
    let i = 0
    let j = 0
    let match = 0
    let win = false

    if(moves > 4){
        for(i = 0; i<=2; i++){
            for(j=0; j<=2;j++){                
                if(matriz[0][i] == matriz[j][i] && matriz[j][i] != 0 && j>0){
                    match++
                    if(filled.length <= 2){                        
                        filled[j] = [j,i].join('')
                    }     
                }  
            }    
            if(match == 2){
                win = true                
                filled[0] = [0,filled[1][1]].join('')
                match = 0
                
                setUiWinner()
            }else{
                match = 0
                filled = []   
            }       
        } 
        if(win){
            winner = true
            logger(undefined, `O jogador ${player.string} Ganhou na coluna`)
        }
        
    }
}

const checkDiagonal = ()=>{
    if(moves > 4){
        if((matriz[0][0] == matriz[1][1] && matriz[0][0] == matriz[2][2]) && matriz[0][0] != 0 || (matriz[2][0] == matriz[1][1] && matriz[2][0] == matriz[0][2] & matriz[2][0] != 0)){
            if(matriz[0][0] == matriz[2][2] && matriz[0][0] != 0){
                filled = ['00','11','22']
            }else{
                filled = ['20','11','02']
            }           
            winner = true
            setUiWinner()

            logger(undefined, `${player.string} Ganhou na diagonal`)
        }
    }
}

const setElClass = (cplayer) =>{    
    return `<p class="${cplayer.class}">${cplayer.string}</p>`
}

const setUiWinner = ()=>{
    for (let item of elements) {
        for(let f of filled){
            if(f == item.id){
                item.classList.add('winner')
            }
        }        
    }

    setScore()
}

const setScore = ()=>{
    player.score++   
    
    document.getElementById('xscore').innerHTML = player1.score
    document.getElementById('oscore').innerHTML = player2.score

    logger(undefined, 'mostrando os pontos!')
}

const logger = (el, msg) =>{
    if(msg == undefined){
        console.log(`O jogador ${player.string} jogou na posição ${el.id}`)
    }else{
        console.log(`${msg}`)
    }
}







