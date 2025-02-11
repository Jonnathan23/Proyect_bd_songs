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

## Controlador principal para los ``Reportes``
El controlador de canciones [``SongsController``](https://github.com/Jonnathan23/Proyect_bd_songs/blob/main/src/controllers/Songs.controller.ts) se encarga de manejar las solicitudes relacionadas con las canciones. Este controlador ofrece las siguientes funcionalidades:

* *Obtener* canciones estrenadas en un periodo de tiempo: Esta función permite obtener las canciones que fueron estrenadas en un periodo de tiempo específico. La consulta se realiza utilizando el campo son_release_date de la base de datos. [Ver codigo](https://github.com/Jonnathan23/Proyect_bd_songs/blob/main/src/controllers/Songs.controller.ts#L48)
* *Obtener* canciones con mayor recaudación: Esta función permite obtener las canciones que tienen mayor recaudación. La consulta se realiza utilizando el campo son_month_sales de la base de datos. [Ver codigo](https://github.com/Jonnathan23/Proyect_bd_songs/blob/main/src/controllers/Songs.controller.ts#L100)
* *Obtener* canciones por artista: Esta función permite obtener las canciones de un artista específico. La consulta se realiza utilizando el campo son_singer de la base de datos. [Ver codigo](https://github.com/Jonnathan23/Proyect_bd_songs/blob/main/src/controllers/Songs.controller.ts#L83)
* *Obtener* canciones por género: Esta función permite obtener las canciones de un género específico. La consulta se realiza utilizando el campo son_genre de la base de datos. [Ver codigo](https://github.com/Jonnathan23/Proyect_bd_songs/blob/main/src/controllers/Songs.controller.ts#L31)
