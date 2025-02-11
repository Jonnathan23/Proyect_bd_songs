# Detalles del proyecto
Este proyecto es un servidor de backend desarrollado con Node.js y Express, que utiliza Mongoose como ODM para interactuar con una base de datos MongoDB. El proyecto cuenta con las siguientes características:

* **Rutas:** El servidor cuenta con varias rutas definidas en el archivo src/router.ts, que permiten realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los datos almacenados en la base de datos.

* **Modelos:** El proyecto utiliza modelos Mongoose para definir la estructura de los datos almacenados en la base de datos. Los modelos se encuentran en la carpeta src/models.

* **Controladores:** Los controladores se encargan de manejar las solicitudes y respuestas del servidor. Se encuentran en la carpeta src/controllers.
## Arranque del proyecto
Instalacion de dependencias

```bash
npm i
```

Arranque del servidor sin postman o Thunder Client

```bash
npm run dev
```

Arranque para acceder a la api con Postman o Thunder Client con MongoDB Atlas

```bash
npm run dev:api
```

Arranque para acceder a la api con Postman o Thunderc Client con MongoDB de forma local

```bash
npm run dev:api:local
```
