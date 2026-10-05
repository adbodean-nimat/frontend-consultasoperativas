# Chapas Revestidas y LAF

## Inspección y decisión técnica

Frontend existente: JavaScript, Vue 3.5.16 instalado (package.json declara ^3.4.8),
Vue Router 4.2.5, Vue CLI 5/Webpack, Pinia, Axios, PrimeVue 4.3.5/Lara,
Bootstrap y estilos compartidos en `src/style.css`. También hay dependencias
históricas de Vuex/Kendo. No se creó un proyecto, store global ni biblioteca nueva.
Se mantiene la separación `views`, `components`, `services`, `composables`, `utils`.

Se reutiliza AG Grid Community 35.0.0 con `themeBalham`, como
`InfoArticulosCompranCorrientemente2.vue` y `RecepcionProveedores.vue`.
Tiene encabezados multinivel, columnas fijadas, virtualización de filas y columnas,
totales fijados y exportación CSV sin Enterprise. PrimeVue proporciona los paneles,
acciones y editor de configuración. Los colores están centralizados en variables
CSS del componente de grilla; se conserva la cabecera verde del proyecto.

Se utiliza `services/api.js`: `VUE_APP_API`, token corporativo de `auth.js`,
interceptores existentes y redirecciones de autenticación. Se inspeccionaron
Router/guards de grupos AD, menú y las variables VUE_APP_API_BASE/API_LOGIN.
No se cambiaron variables ni interceptores. Las rutas nuevas exigen los mismos
roles que la consulta de Compras v2: Gerencia, Sistemas o Compras.

## Rutas y archivos

- `/gdc/revestidos-laf`: consulta automática, filtros 12/120, parámetros compartibles
  `months` y `rotationDays`, grilla y CSV. Entrada en `components/GestionCompras.vue`.
- `/gdc/revestidos-laf/configuracion`: edición de las seis configuraciones,
  activación/desactivación y códigos inmutables. Acceso desde la cabecera de consulta.
- `views/RevestidosLaf*.vue`: páginas.
- `components/revestidos-laf/*.vue`: filtros, grilla y formulario de configuración.
- `composables/useRevestidosLaf*.js`: estado local, carga, errores y cancelación.
- `services/revestidosLaf*.js`: API autenticada y contrato JSDoc.
- `utils/revestidosLaf*.js`: adaptador, columnas, totales, formatos, filtros y
  definición/validación de campos administrativos.
- `tests/revestidosLaf.test.cjs`, fixture, comprobador de sintaxis y harness visual.
- `.gitignore`: excepciones para incluir las pruebas nuevas, siguiendo las existentes.
- `package.json`: comandos de pruebas y sintaxis específicos.

## Contrato real y reglas de presentación

Se leyó `server/src/modules/gdc/README.md`, `gdc.dto.js`, controlador, rutas,
validador y servicios consolidadores del backend ubicado en el mismo árbol.
`revestidosLaf.contract.js` copia los typedefs JSDoc del backend; no se supusieron
alias de propiedades. La respuesta principal es `{parameters, periods, families,
warnings}`, sin wrapper `ok/rows` (administración sí utiliza `{ok,rows}` / `{ok,row}`).

Todas las medidas solicitadas existen: `consumption`, `pendingSalesOrderTon`,
`stock.ton`, `stock.units13m/units1050/unitsHl`, `purchaseOrders` y `data`.
Se generan tres columnas por período `YYYY-MM` ordenado cronológicamente.
`months=12` incluye trece meses. Límites reales: months 1–60 y rotationDays 1–3660.
La etiqueta del depósito principal utiliza `parameters.mainWarehouse`: habitualmente
973, editable en configuración. No se calcula stock en días en el frontend;
se respeta `daysStatus`, incluido `NO_CONSUMPTION`.

El adaptador aplana rutas de campos para la grilla, mantiene el orden recibido y
separa visualmente los cambios contiguos de Clasificador 4, sin reagrupar ni ordenar
familias. No se habilitan edición, ordenamiento ni filtros de columnas que alteren
la presentación de Compras. Los avisos se ven también en la familia fijada,
con detalles en tooltips, y en Estado técnico.

Diferencia del contrato: no hay totales generales. `calcularTotales` suma solo
toneladas y unidades; si algún valor de una columna es null/desconocido, el total
es null para evitar sumas parciales engañosas. Nunca se suman códigos, factores,
días ni textos. Un período ausente en una familia se presenta como desconocido,
sin inventar cero: el backend ya rellena movimientos ausentes con cero.

`agregarSubtotales` añade a `displayRows` una fila al cierre de cada bloque
contiguo de Clasificador 4, con las mismas reglas de suma y nulos del total general.
Cada celda de subtotal utiliza el color del bloque de columnas correspondiente
(Consumos, NP, Stock, OC y Datos); la identificación utiliza el tono neutro.
El código y nombre de Clasificador 4 se muestran en el subtotal; no hay una
columna independiente de Clasificador 4 en la grilla ni en su exportación CSV.
Se conserva `rows` únicamente con familias para el contador y el cálculo general,
evitando sumar dos veces. Los subtotales también se incluyen en CSV. Si un grupo
reaparece más adelante en la respuesta, cada bloque mantiene su propio subtotal
para respetar el orden de Compras. Después de cada subtotal se añade una fila
de participación de 24 px: subtotal / total general en la columna Total de cada
mes, con formato porcentual es-AR de dos decimales. El resto de las columnas
queda vacío. Un numerador cero con divisor válido muestra 0,00 %; divisor cero
o dato desconocido muestra —. Luego se añade un separador vacío de 12 px.
La participación se incluye en CSV y el separador decorativo se omite. Estas
filas no afectan el contador de familias ni los totales. No se calcula stock en días
para estas filas.

Todos los valores numéricos: dos decimales fijos, es-AR, también en CSV.
El redondeo se aplica al mostrar; los cálculos mantienen la precisión original.
Cero es explícito (0,00);
null/no calculable muestra —. Se usa una sola llamada consolidada por actualización,
sin llamadas por celda. Se ignoran respuestas antiguas y se aborta al desmontar.
El timeout de esta consulta es 330 s para acompañar el timeout ERP de 300 s
documentado; el timeout del cliente compartido no cambia.

Administración solo envía campos permitidos por `gdc.validator.js`, conserva ceros
iniciales de referencias y valida la pareja 10,50/13 m. Usa POST para agregar
registros en las cinco listas, PUT para editar/activar/desactivar y DELETE para
la acción Eliminar, que borra físicamente el registro y devuelve `{ok,row}` con
la fila eliminada. La fila se retira de la tabla solo después de una respuesta
exitosa, por su código; si el endpoint falla, se conserva y se muestra el error.
Se permite eliminar tanto registros activos como inactivos. Un registro inexistente
responde 404; el código eliminado puede crearse nuevamente mediante POST.
La configuración general es única: solo PUT, sin alta ni eliminación. Las acciones
de fila usan iconos con tooltip y nombre accesible. Eliminar pide confirmación y
explica que el borrado es definitivo. Desactivar conserva el registro mediante PUT
con `activo=false`. No se realizan conexiones a
PostgreSQL/SQL Server. Los cambios se aplican en la siguiente consulta.
Los valores iniciales de la consulta continúan siendo 12/120, como se solicitó.

## Verificación y reproducción

El proyecto usa node:test y no tiene ESLint ni script global de lint.
`lint:revestidos-laf` comprueba sintaxis JavaScript y templates con los parsers
Babel/Vue ya instalados; no equivale a un lint global de reglas de estilo.

```sh
npm run lint:revestidos-laf
npm run test:revestidos-laf
npm run test:rotacion
npm run build
```

En este equipo el launcher npm falla buscando npm-cli.js en AppData/Roaming.
Se ejecutaron las mismas herramientas directamente:

```sh
node tests/checkRevestidosLaf.cjs
node --test tests/revestidosLaf.test.cjs tests/rotacionGeneralProductos.test.cjs tests/rotacionProductosConfiguracion.test.cjs
node node_modules/@vue/cli-service/bin/vue-cli-service.js build
```

Resultado: 29 pruebas aprobadas (11 nuevas), 14 archivos validados y build de
producción aprobado. Webpack advierte tamaños grandes de bundles compartidos y
Browserslist desactualizado; no se actualizan dependencias ajenas a esta pantalla.
`git diff --check` aprobado.

Harness visual aislado, con 120 familias sintéticas, nulos, ceros y advertencias:

```sh
node node_modules/@vue/cli-service/bin/vue-cli-service.js serve tests/revestidosLaf.preview.js --host 127.0.0.1 --port 8082
```

Abrir `/gdc/revestidos-laf` en el puerto informado por Vue CLI. Este entry de prueba
no monta el Router de producción ni modifica sus guards; su adaptador HTTP no
contacta el backend. El banner muestra cada solicitud. months=60 simula un 503.
Se verificaron escritorio a 1366 px, columnas fijadas, encabezados, scroll horizontal,
virtualización (unas 20 filas renderizadas de 120), filtros/query (una llamada por
consulta), error/reintento y guardado/desactivación de configuración simulada.
La acción CSV se ejecutó sin errores de consola; la herramienta de navegador no
pudo confirmar el evento de descarga, por lo que la descarga final requiere revisión
en el navegador habitual del usuario.

Para la ruta directa del build se utilizó `node tests/serveRevestidosLafBuild.cjs`:
`/gdc/revestidos-laf` redirige correctamente al login con su parámetro redirect
sin sesión, conservando los guards reales. El servidor es de prueba local, no backend.

El endpoint real local devuelve 401 sin token. Pendiente: contraste de resultados
y consulta autenticada contra ERP con una sesión autorizada. No se ejecutaron
mutaciones reales ni cambios de base de datos durante la validación.
