# Conversaciones del chatbot: integración con servidor

Este repositorio es una SPA Vue 3 (Vue CLI). El backend complementario en
`C:/Users/abodean/restapi-nodejs/server` implementa el proxy privado en
`src/modules/chatbot-history`, montado desde `api.js`. La interfaz está en
`/co/chatbot/conversaciones`, accesible desde una tarjeta **Chatbot** en Tablero y
Consultas Operativas para **Gerencia, Ventas y Sistemas**. No modifica el chat
interactivo existente en `/chatbot`.

## Rutas del servidor

El backend interno configurado actualmente mediante `VUE_APP_API` implementa
un proxy autenticado de historial con estas dos rutas GET:

| Ruta interna | Destino fijo en el chatbot |
| --- | --- |
| `/api/chatbot/chats?page=1&limit=25&q=texto` | `{NIMAT_CHATBOT_URL}/api/h/chats?page=1&limit=25&q=texto` |
| `/api/chatbot/chats/:id?limit=100&before=cursor` | `{NIMAT_CHATBOT_URL}/api/h/chats/{id}?limit=100&before=cursor` |

Conservar exactamente los contratos `items/total/page/limit/hasMore` y
`id/createdAt/updatedAt/messageCount/messages/products/hasMore/nextBefore` pedidos.
El listado debe ordenarse en el servidor por última actividad descendente **antes
de paginar**. La SPA además ordena cada página recibida. `q` busca mensajes,
nombre de producto o SKU en el servidor. El resumen `products` de detalle debe
incluir toda la conversación, agrupada por SKU, aunque los mensajes estén
paginados. `nextBefore` es un cursor opaco (string o número); la primera página
trae los últimos 100 mensajes, en orden cronológico.

Controles del proxy (ver también el README del módulo en el backend):

1. Reutilizar el middleware real de autenticación interna: verificar firma,
   vencimiento y pertenencia a los grupos AD Gerencia, Ventas o Sistemas. Sin
   sesión: HTTP 401; autenticado sin sector autorizado: HTTP 403. El control de
   Vue es de navegación y no sustituye la autorización del servidor.
2. Configurar **solo en el entorno privado del backend** `NIMAT_CHATBOT_URL` y
   `NIMAT_CHATBOT_HISTORY_KEY`. Nunca usar prefijos públicos (`VUE_APP_`, etc.),
   valores literales en código, archivos versionados ni logs. No se necesitan
   nuevas variables en esta SPA.
3. Validar la URL de configuración en el servidor: origen HTTPS de confianza,
   sin credenciales, query ni fragmento. Construir únicamente los paths fijos
   `/api/h/chats` y `/api/h/chats/{id}`. Rechazar redirecciones del upstream
   para que la autorización nunca llegue a otro destino. No aceptar destinos,
   rutas, headers o URLs provistos por el navegador.
4. Permitir exclusivamente `page`, `limit`, `q` en listado y `limit`, `before`
   en detalle; rechazar valores duplicados, arrays, objetos y parámetros extra.
   `page` entero positivo seguro, `limit` entero entre 1 y 100 (defaults 25 y
   100, respectivamente); `q` string hasta 500 caracteres. Este cliente admite
   IDs de 1–200 caracteres alfanuméricos, guion o guion bajo. Validar el mismo
   formato en servidor y codificar el segmento. `before`: string o número
   serializado de 1–1000 caracteres sin controles; usar un serializador de query.
5. Crear una solicitud nueva al upstream con solo `Accept: application/json` y
   `Authorization: Bearer <NIMAT_CHATBOT_HISTORY_KEY>`. No copiar headers del
   navegador: especialmente cookies, Origin ni su Authorization interno.
6. Aplicar timeout de 10 segundos (el cliente espera hasta 15 segundos). No
   cachear en servidor, CDN ni navegador; devolver `Cache-Control: no-store,
   private` tanto en éxitos como errores y excluir estas rutas de caches del
  proxy de despliegue. El cliente solicita `Cache-Control: no-cache, no-store`.
7. Validar la respuesta JSON; no devolver headers, cuerpos de error ni detalles
   de conexión del upstream. Usar errores locales genéricos: 502 para error de
   upstream, 504 para timeout y 503 para configuración ausente. No registrar
   credenciales ni contenido del historial. No persistir las respuestas.

## Comportamiento de la interfaz

Se utiliza el cliente HTTP existente que adjunta el token **interno del sitio**.
Las únicas solicitudes nuevas son a `/api/chatbot/chats` y su detalle dentro
del backend interno configurado. Nunca se llama a `/api/h/chats` desde el
navegador. La interfaz muestra un error recuperable si falta el proxy.

Los mensajes se renderizan con interpolación Vue, sin HTML ejecutable. Solo se
habilitan enlaces HTTPS sin credenciales, puerto estándar y host exacto
`nimat.com.ar` o `www.nimat.com.ar`; las imágenes externas no se cargan.
Los precios ausentes se muestran como “Precio no informado” y las fechas nulas
como “Fecha no disponible”. Todas las fechas usan `America/Argentina/Buenos_Aires`.
Las páginas anteriores se anteponen, se ordenan por `seq` y se deduplican por
`id`; cambiar de chat o búsqueda cancela las consultas obsoletas.

## Validación

`npm run test:chatbot` verifica navegación sin sesión, vencimiento y sectores,
listado, búsqueda por SKU, parámetros, detalle, seguridad de enlaces, precios,
fechas, paginación, errores y solicitudes del cliente con un backend simulado.
`npm run build` verifica la compilación de producción. En el backend,
`npm run test:chatbot-history` prueba las rutas HTTP con el middleware JWT real,
los tres sectores autorizados, validación, no caché, reemplazo de credenciales,
errores, timeout y respuestas upstream controladas. Está incluido en `npm test`.

La prueba de integración real requiere configurar las variables privadas en el
backend y una sesión interna. Verificar en ese entorno:

- Sin token: ambas rutas API responden 401; otro sector: 403. Probar cada uno
  de los tres sectores autorizados y navegación directa a la vista.
- Buscar un SKU conocido, recorrer páginas, abrir productos y cargar más de
  100 mensajes; confirmar orden, ausencia de duplicados y resumen completo.
- Cortar la conexión al chatbot y provocar timeout: errores seguros y Reintentar.
- Revisar Network: solicitudes solo al backend interno, con token interno;
  ninguna solicitud al chatbot ni uso de su clave. La credencial debe existir
  únicamente en la solicitud servidor a servidor.
- Con una clave sintética de prueba configurada **solo en el servidor**,
  buscar su valor en los assets de producción y solicitudes del navegador;
  debe estar ausente. Inspeccionar además logs y cabeceras de respuesta.
- Confirmar `Cache-Control: no-store, private` en ambas rutas (incluso errores)
  y ausencia de redirecciones o reenvío de headers del navegador al upstream.

La autorización HTTP del proxy se prueba con JWT firmados y solicitudes HTTP
locales. El transporte upstream se simula: la conexión real al chatbot y la
revisión de Network con una sesión real quedan como validación de despliegue.
