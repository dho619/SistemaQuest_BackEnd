const { proxima_chave_Avaliacao } = require('../../utils/gerarChave')
const { executaSQL } = require('../../data/conexao')
const { schedule: obterSchedule } = require('../Query/Schedule')

module.exports = {
    async novoSchedule(_, { dados }, ctx) {
        ctx.validarUsuario()

        //pegar o ultimo id, pode gerar bug se ouver muita demanda
        const id = await executaSQL('select gen_id(GEN_SCHEDULES_ID,0) from rdb$database')

        const chave = proxima_chave_Avaliacao(id[0].GEN_ID+1)

        const params = [
            chave,
            dados.desc,
            dados.dataInicio,
            dados.dataFim,
            dados.usuario_id,
            dados.questionario_id,
        ]
        
        await executaSQL(`INSERT INTO SCHEDULES (CHAVE, DESCRICAO, DATAINICIO, DATAFIM, USUARIO_ID,
                    QUESTIONARIO_ID) VALUES (?,?,?,?,?,?)`,params)

        return obterSchedule(_,{filtro: {chave}})
    },
    async excluirSchedule(_, { filtro }, ctx) {        
        schedule = await obterSchedule(_, {filtro}, ctx)

        if (!schedule) throw new Error('Filtro informado está inválido!')

        ctx.validarUsuarioFiltro({id: schedule.USUARIO_ID})

        params = [
            new Date(),
            false,
            schedule.ID
        ]

        await executaSQL('UPDATE SCHEDULES SET UPDATED_AT = ?, ATIVO = ? WHERE ID = ?', params)

        return schedule
    },

    async alterarSchedule(_, { filtro, dados }, ctx) {
        schedule = await obterSchedule(_, {filtro}, ctx)

        if (!schedule) throw new Error('Filtro informado está inválido!')

        ctx.validarUsuarioFiltro({id: schedule.USUARIO_ID})

        const scheduleAlterado = {
            ...schedule,
            DESCRICAO: dados.desc?dados.desc:schedule.DESC,
            DATAINICIO: dados.dataInicio?data.dataInicio:schedule.DATAINICIO,
            DATAFIM: dados.dataFim?dados.dataFim:schedule.DATAFIM,
            QUESTIONARIO_ID: dados.questionario_id?dados.questionario_id:schedule.QUESTIONARIO_ID,
            UPDATED_AT: new Date()
        }

        params = [
            scheduleAlterado.DESCRICAO,
            scheduleAlterado.DATAINICIO,
            scheduleAlterado.DATAFIM,
            scheduleAlterado.QUESTIONARIO_ID,
            scheduleAlterado.UPDATED_AT,
            schedule.ID
        ]
        
        await executaSQL(`UPDATE SCHEDULES SET DESCRICAO = ?, DATAINICIO = ?, 
                          DATAFIM = ?, QUESTIONARIO_ID = ?, UPDATED_AT = ? 
                          WHERE ID = ?`, params
                        )


        return scheduleAlterado
    }
}