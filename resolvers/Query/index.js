const Usuario = require('./Usuario')
const Perfil = require('./Perfil')
const Questionario = require('./Questionario')
const Plano = require('./Plano')
const Schedule = require('./Schedule')
const Pesquisado = require('./Pesquisado')
const Pesquisa = require('./Pesquisa')

module.exports = {
    ...Usuario,
    ...Perfil,
    ...Questionario,
    ...Plano,
    ...Schedule,
    ...Pesquisado,
    ...Pesquisa,
}