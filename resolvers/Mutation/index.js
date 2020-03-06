const Usuario = require('./Usuario')
const Perfil = require('./Perfil')
const Plano = require('./Plano')
const Schedule = require('./Schedule')
const Pesquisado = require('./Pesquisado')
const Pesquisa = require('./Pesquisa')
const Resposta = require('./Resposta')

module.exports = {
    ...Usuario,
    ...Perfil,
    ...Plano,
    ...Schedule,
    ...Pesquisado,
    ...Pesquisa,
    ...Resposta
}