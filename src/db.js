const { Pool } = require('pg'); //Importa el módulo pg, que es el cliente oficial de PostgreSQL para Node.js.

require('dotenv').config(); // Carga las variables del archivo .env a process.env. Esto permite acceder a valores como tu usuario, contraseña, puerto, etc. sin hardcodearlos (una buena práctica de seguridad).

const pool = new Pool({ //Crea una instancia de Pool usando los valores de .env
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.connect() //Prueba una conexión inicial: SI se conecta correctamente, o si hay algún error
  .then(() => console.log('📦 Conectado a PostgreSQL'))
  .catch(err => console.error('❌ Error al conectar a la DB:', err));

module.exports = pool; //Exporta la instancia de pool. para que puedas usar esta conexión en cualquier archivo del proyecto.