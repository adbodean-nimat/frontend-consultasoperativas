# Integración de configuración de rotación

La interfaz administra exclusivamente datos mediante el contrato REST definido en
`src/services/rotacionGeneralProductosConfiguracion.js`. No contiene conexiones directas a
PostgreSQL ni a SQL Server.

Base esperada: `/api/rotaciongeneralproductos/configuracion`.

Cada uno de los siete recursos usa `GET`, `POST`, `PUT /:codigo` y `DELETE /:codigo`. Mientras
esas rutas no estén expuestas por el backend, la interfaz mostrará el error seguro habitual y
puede validarse mediante el cliente HTTP inyectable y sus mocks de prueba. No se utilizan rutas
alternativas.
