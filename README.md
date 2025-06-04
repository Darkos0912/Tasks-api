# 📝 API REST - Tareas con JWT y PostgreSQL

Este proyecto es una API Back-end construida con Node.js, Express y PostgreSQL, que permite a los usuarios registrarse, iniciar sesión y gestionar sus tareas personales de forma segura mediante autenticación con JWT.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL
- JSON Web Tokens (JWT)
- Bcrypt.js
- Dotenv

---

## 🔐 Funcionalidades principales

- Registro de usuarios (`POST /api/users/register`)
- Login y generación de token JWT (`POST /api/users/login`)
- Acceso a perfil autenticado (`GET /api/users/profile`)
- CRUD de tareas por usuario:
  - Crear (`POST /api/tasks`)
  - Listar (`GET /api/tasks`)
  - Actualizar (`PUT /api/tasks/:id`)
  - Eliminar (`DELETE /api/tasks/:id`)
- Middleware de autenticación (`auth.middleware.js`)

---

## ⚙️ Instalación

```bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
cd nombre-del-repo
npm install