const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config')
require('dotenv').config();

// Crear el servidor/aplicacion de express
const app = express();

// Conexion a la base de datos
dbConnection();

// Lectura y parseo del body
app.use(express.json());

// Configuracion de CORS
app.use(cors());

// Configuracion de rutas

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/favorites', require('./routes/media.routes'));


app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});