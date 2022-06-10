const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config')
require('dotenv').config();

// Crear el servidor/aplicacion de express
const app = express();

// Conexion a la base de datos
dbConnection();

// Lectura y parseo del body
app.use(express.json());

// Directorio publico

app.use(express.static('public'));

// Configuracion de CORS
app.use(cors());

// Configuracion de rutas

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/favorites', require('./routes/media.routes'));

// Menejar demas rutas

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
});


app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});