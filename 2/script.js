
let matriz = [[0,0,0],[0,0,0],[0,0,0]]
let moves = 0
let winner = false

const player1 = {
    string: 'X',
    id: 1
}
const player2 = {
    string: 'O',
    id: 2
}

const getPlayer = ()=>{
    let id = Math.floor(Math.random() * (2)) + 1;
    if(id == 1){
        return player1
    }
    return player2
}

let player = getPlayer()

let teste = document.getElementsByClassName('row')
for (let item of teste) { 
    item.addEventListener('click', (el)=>{

        if(winner == true){
            console.log('Já temos um vencedor!')
            return
        }

        let element = el.target   
    
        if(setMove(element, player)){
            checkRow() 
            checkCol()
            checkDiagonal()

            player = changePlayer(player)
        }
    })
    
}

const changePlayer = (player)=>{
    if (player.id == 1){
        return player2
    }else{
        return player1
    }
}

const setMove = (el, player)=>{
    if(matriz[el.id[0]][el.id[1]] == 0){
        el.innerHTML = player.string
        matriz[el.id[0]][el.id[1]] = player.id
        moves++        
    }else{
        console.log('Escolha outro local!')
        return false
    }
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
                if(matriz[i][0] == matriz[i][j] && matriz[i][j] != 0){                    
                    match++
                }   
                             
            }
            if(match == 3){
                win = true
            }else{
                match = 0
            }
            
        } 
        if(win){
            winner = true
            console.log(player.string +' ganhou!! [r]')
            alert(player.string +' ganhou [r]')
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
                if(matriz[0][i] == matriz[j][i] && matriz[j][i] != 0){
                    match++
                }              
            } 
            if(match == 3){
                win = true
            }else{
                match = 0
            }       
        } 
        if(win){
            winner = true
            console.log(player.string +' ganhou!! [c]')
            alert(player.string +' ganhou [c]')
        }
        
    }
}

const checkDiagonal = ()=>{
    if(moves > 4){
        if((matriz[0][0] == matriz[1][1] && matriz[0][0] == matriz[2][2]) || (matriz[2][0] == matriz[1][1] && matriz[2][0] == matriz[0][2])){
            winner = true
            console.log(player.string +' Ganhou na diagonal')
            alert(player.string +' Ganhou [d]')
        }
    }
}


