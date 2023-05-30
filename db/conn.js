const { Sequelize} = require('sequelize')

const sequelize = new Sequelize('toughts2','root','32410358',{
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')

}catch(err){
    console.log(err)
}
module.exports = sequelize