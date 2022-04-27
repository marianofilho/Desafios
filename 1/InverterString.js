const inverteNome = (str) =>{
    let size = j = str.length
    let arr = str.split('')
    let newStr = Array()    
    
    for(let i = 0; i <= Math.ceil(size/2); i++){
        newStr[i] = arr[j-1]
        newStr[j-1] = arr[i]       
        j--
    }
    return newStr.join('')
}
    
console.log(inverteNome('inverter'))