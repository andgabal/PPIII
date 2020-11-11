const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) => {
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONECCION CON LA BASE DE DATOS FUE CERRADA');
        } 
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONECCIONES');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('LA CONECCION A LA BASE DE DATOS FUE RECHAZADA');
        }
    }
    if (connection) connection.release();
    console.log('la base de Datos esta conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;