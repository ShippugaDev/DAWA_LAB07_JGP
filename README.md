# Express Mongo Auth - API con JWT

Proyecto desarrollado para el laboratorio de **Desarrollo de Aplicaciones Web Avanzado**.  
La aplicación implementa autenticación de usuarios usando **Node.js, Express, MongoDB Atlas y JWT**. Además, permite diferenciar usuarios mediante roles y cuenta con vistas dinámicas usando EJS.

## Descripción del proyecto

Este proyecto permite registrar usuarios, iniciar sesión y acceder a paneles según el rol asignado. La autenticación se realiza mediante JSON Web Token, lo cual permite proteger rutas y controlar el acceso a secciones privadas del sistema.

El proyecto fue desplegado en la nube usando **Render** y conectado a una base de datos en **MongoDB Atlas**.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token
- Bcrypt
- EJS
- CSS
- GitHub
- GitHub Actions
- Render

## Funcionalidades principales

- Registro de usuarios.
- Inicio de sesión.
- Autenticación con JWT.
- Encriptación de contraseñas con Bcrypt.
- Gestión de roles de usuario.
- Panel de usuario.
- Panel de administrador.
- Conexión a MongoDB Atlas.
- Despliegue en Render.
- Automatización del despliegue con GitHub Actions.

## Estructura del proyecto

```txt
express-mongo-auth/
│── src/
│   ├── models/
│   │   ├── User.js
│   │   └── Role.js
│   ├── public/
│   │   ├── css/
│   │   └── js/
│   ├── repositories/
│   │   ├── RoleRepository.js
│   │   └── UserRepository.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   └── web.routes.js
│   ├── services/
│   │   ├── AuthService.js
│   │   └── UserService.js
│   ├── utils/
│   │   ├── seedRoles.js
│   │   └── seedUsers.js
│   ├── views/
│   │   ├── 403.ejs
│   │   ├── 404.ejs
│   │   ├── dashboard-admin.ejs
│   │   ├── dashboard-user.ejs
│   │   ├── profile.ejs
│   │   └── signin.ejs
│   └── server.js
│
│── .github/
│   └── workflows/
│       └── deploy.yml
│
│── .env
│── .gitignore
│── package.json
│── package-lock.json
│── README.md