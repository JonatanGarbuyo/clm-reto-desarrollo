# reto-desarrollo

**MovieNode Challenge!**

Construir a través de NodeJS un microservicio con 2 endpoints que cumplan las siguientes especificaciones:

1. Buscador de películas:

**Método GET**

- El valor a buscar debe ir en la URL de la API
- Adicionalmente puede ir un header opcional que contenga el año de la película.
- Almacenar en una BD Mongo, la siguiente info:

  Title
  Year
  Released
  Genre
  Director
  Actors
  Plot
  Ratings

- El registro de la película solo debe estar una vez en la BD.
- Devolver la información almacenada en la BD.

2. Obtener todas las películas:

**Método GET**

- Se deben devolver todas las películas que se han guardado en la BD.
- Si hay más de 5 películas guardadas en BD, se deben paginar los resultados de 5 en 5
- El número de página debe ir por header.

3. Buscar y reemplazar:

**Método POST**

- Un método POST que reciba en el BODY un object como: P.E: {movie: star wars, find: jedi, replace: CLM Dev }
- Buscar dentro de la BD y obtener el campo PLOT del registro
- Al string del plot obtenido buscar la palabra enviada en el Body (find) y reemplazar todas sus ocurrencias por el campo enviado en el body (replace)
- Devolver el string con las modificaciones del punto anterior

**REGLAS:**

- Usar Koa como servidor.
- Validar los contratos de entrada y/o headers para los endpoints antes de realizar la lógica.
- Usar Mongoose como ORM.
- Subir el código respuesta del ejercicio a gitlab, y enviarnos la url con la solución del ejercicio.
- Para más info con respecto a la api de películas: http://www.omdbapi.com/
- Para generar el apiKey: http://www.omdbapi.com/apikey.aspx

**DESEABLES:**

- Uso de Joi para validación de contratos/headers
- Uso de Docker/Swarm para levantar todos los servicios.
- Uso de Middleware para validación de contratos y manejo de errores.
- Uso de Logs para manejo de errores.
- Documentación del ejercicio en swagger.
