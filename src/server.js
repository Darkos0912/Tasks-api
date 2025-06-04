// Cargar variables de entorno
require('dotenv').config();

// Importar dependencias
const express = require('express');
const cors = require('cors');
const db = require("./db");

// Crear instancia de la app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors()); // Permite solicitudes desde otros orígenes (útil para frontend separado)
app.use(express.json()); // Permite leer JSON en las peticiones

// Importar rutas (las agregaremos luego)
const userRoutes = require('./routes/users-routes');
const taskRoutes = require('./routes/task-routes');


// Montar rutas con prefijos
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Todo funcionando 🚀');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});