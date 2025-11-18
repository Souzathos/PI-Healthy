const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // seu usuário
    password: '',      // sua senha
    database: 'healthly' // nome do banco
});

db.connect((err) => {
    if (err) {
        console.error('Erro de conexão:', err);
        return;
    }
    console.log('Conectado ao MySQL!');
});

module.exports = db;