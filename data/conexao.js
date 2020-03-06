var Firebird = require('node-firebird')

const config = {
    host:       process.env.db_host,
    port:       process.env.db_port,
    database:   process.env.db_database,
    user:       process.env.db_user,
    password:   process.env.db_password,
    lowercase_keys: false,
    role: null,            
    pageSize: 4096,

}
    
const attach = () => {
    return new Promise((resolve, reject) => {
      Firebird.attach(config, (err, db) => {
        if (err) reject(err)
        else resolve(db)
      });
    });
};
  
const query = (db, sql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      });
    });
};

const executaSQL = async(sql, params = []) => {       
  try {
    const db = await attach()
    const result = await query(db, sql, params)
    db.detach();//fechar o banco
    return(result)
  } catch (error) {
      throw new Error(error.message)
  }
}

module.exports = {executaSQL}