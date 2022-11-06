import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'storage',
});


connection.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Connected ... ');
    }
})


export default connection;