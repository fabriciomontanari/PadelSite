require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const bookingController = require('./controllers/bookingController');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


async function connectToDatabase() {
    try {
        const connection = await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING
        });

        console.log('Conexión exitosa a la base de datos');
        return connection;
    } catch (err) {
        console.error('Error al conectarse a la base de datos:', err);
        return null;
    }
}


connectToDatabase().then(connection => {
    if (connection) {
        
        app.get('/', (req, res) => bookingController.home(req, res, connection));
        app.post('/book', (req, res) => bookingController.book(req, res, connection));

        app.get('/galeria', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'galeria.html'));
        });

    } else {
        console.error('No se pudo conectar a la base de datos. La aplicación no se iniciará.');
        process.exit(1);
    }
});


app.listen(3000, () => {
  console.log('Server iniciado en el puerto 3000');
});