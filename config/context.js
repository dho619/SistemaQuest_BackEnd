const jwt = require('jwt-simple')

module.exports = async ({req}) => {
    //Em desenvolvimento para simular usuario logado
    //await require('./simularUsuarioLogado')(req)
    const auth = req.headers.authorization
    const token = auth && auth.substring(7)
    let usuario = null
    let admin = false

    if(token){
        try {
            let conteudoToken= jwt.decode(token,
                process.env.APP_AUTH_SECRET)
            //Verificar se ja ta expirado o token, ta pra expirar em 3 dias
            if (new Date(conteudoToken.exp * 1000) > new Date()){
                usuario = conteudoToken
            }
        }catch(e){
            //token invalido
        }
    }

    //se entrar no if, o usuario esta ok e o token ainda nao expirou
    if(usuario && usuario.perfis){
        admin = usuario.perfis.includes('admin')
    }

    const err = new Error('Acesso Negado')

    return {
        usuario,
        admin,
        validarUsuario(){
            //usuario nao setado
            if(!usuario) throw err
        },
        validarAdmin(){
            //se nao e admin
            if(!admin) throw err
        },
        validarUsuarioFiltro(filtro){
            //se for admin ok
            if(admin) return
            //se nao tiver setado o usuario
            if(!usuario) throw err
            //se o filtro nao estiver setado
            if(!filtro) throw err
            const { id, email } = filtro
            //se no filtro nao tem id  e nem email
            if(!id && !email) throw err
            //se id setado, mas diferente do logado
            if(id && id !== usuario.ID) throw err
            //se email setado, mas diferente do logado
            if(email && email !== usuario.EMAIL) throw err
        }
    }
}