const { executaSQL } = require('../data/conexao')

// Schedule funcoes de auxilio
const array = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] 

function proximoId9_String(id) {
    let num = "000" + id
    let tam = num.length
    return num.substring(tam-3, tam)
}
function letraAleatoria() {
    var indice_atual = array.length, valor_temporario, indice_aleatorio;
    
    while (0 !== indice_atual) {
        
        indice_aleatorio = Math.floor(Math.random() * indice_atual);
        indice_atual -= 1;
        
        valor_temporario = array[indice_atual];
        array[indice_atual] = array[indice_aleatorio];
        array[indice_aleatorio] = valor_temporario;
    }
    
    return array[0];
}
function proxima_chave_Avaliacao(id){
    var id_String =  proximoId9_String(id)
    var existe = []
    do {//enquanto a chave exister, cria uma nova
        chave = letraAleatoria() + letraAleatoria() + id_String
        existe = executaSQL('select * from schedules where chave = ?',[chave])
    } while(existe && existe.length)
    return chave
}

module.exports = { proxima_chave_Avaliacao }
