
let matriz = [[0,0,0],[0,0,0],[0,0,0]]
let moves = 0

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
        let element = el.target   
    
        setMove(element, player)    
        checkRowCol() 
        checkDiagonal()

        player = changePlayer(player)
    })
    
}

/*
window.addEventListener('click', (el)=>{
    console.log(el.target);
    if(el.target.id == undefined){
        console.log('eita')
    }
    let element = el.target   
    
    setMove(element, player)    
    checkRowCol() 
    checkDiagonal()

    player = changePlayer(player)
});

*/

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
        console.log(typeof(matriz[el.id[0]][el.id[1]]))
        console.log('Escolha outro local!')
        return false
    }
}

const checkRowCol = ()=>{
    let i = 0
    let j = 0
    let match = 0
    let win = false

    if(moves > 4){
        for(i = 0; i<=2; i++){
            for(j=0; j<=2;j++){                
                if(matriz[i][0] == matriz[i][j]){                    
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
            console.log(player.string +' ganhou!!')
            alert('ganhou')
        }
    }
}

const checkDiagonal = ()=>{
    if(moves > 4){
        if((matriz[0][0] == matriz[1][1] && matriz[0][0] == matriz[2][2]) || (matriz[2][0] == matriz[1][1] && matriz[2][0] == matriz[0][2])){
            console.log('ganhou')
            alert('ganhou')
        }
    }
}


