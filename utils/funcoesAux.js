const { usuarios } = require('../data/db')

function idUsuario(filtro) {
    if(!filtro) return -1

    const { id, email } = filtro
    if(id) {
        let indice = usuarios.findIndex(u => u.id === id)
        return usuarios[indice].id
    } else if(email){
        let indice = usuarios.findIndex(u => u.email === email)
        return usuarios[indice].id
    }
    return -1
}

function formataData(data, exibirhora= true){
    let dia     = ("0" + data.getDate()).slice(-2) // 1-31 -- o slice e o 0 e pra quando ter apenas um numero 
    let mes     = ("0" + (data.getMonth()+1)).slice(-2)          // 0-11 (zero=janeiro)
    let ano4    = data.getFullYear()       // 4 dígitos
    let hora    = ("0" + data.getHours()).slice(-2)          // 0-23
    let min     = ("0" + data.getMinutes()).slice(-2)        // 0-59
    let seg     = ("0" + data.getSeconds()).slice(-2)       // 0-59
    // let ano2    = data.getYear();           // 2 dígitos
    // let dia_sem = data.getDay();            // 0-6 (zero=domingo)
    // let mseg    = data.getMilliseconds();   // 0-999
    // let tz      = data.getTimezoneOffset(); // em minutos

    // Formata a data e a hora
    let result = dia + '/' + mes + '/' + ano4
    if (exibirhora){
        result = result + ' - ' + (hora + ':' + min + ':' + seg)
    }
    return result
}

function bufferForString(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

module.exports = { idUsuario, formataData, bufferForString }