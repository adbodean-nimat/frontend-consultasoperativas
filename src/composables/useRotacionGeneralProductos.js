import { onBeforeUnmount, readonly, ref } from "vue";
import axios from "axios";
import {
  normalizarProductos,
  obtenerClasificacionRotacion,
  obtenerCompradoresRotacion,
  obtenerRotacionGeneralProductos,
} from "@/services/rotacionGeneralProductos";
import {
  crearClaveFiltrosRotacion,
  mensajeErrorRotacion,
  normalizarFiltrosRotacion,
  resolverCatalogoProductos,
} from "@/services/rotacionGeneralProductosFiltros";

export function useRotacionGeneralProductos() {
  const respuestaOriginal = ref(null);
  const productos = ref([]);
  const catalogoProductos = ref([]);
  const compradores = ref([]);
  const clasificaciones = ref({
    clasificacion4: [],
    clasificacion5: [],
    clasificacion6: [],
    clasificacion8: [],
  });
  const totalGeneral = ref(0);
  const cargando = ref(false);
  const error = ref("");
  const errorCompradores = ref("");
  const cargandoCompradores = ref(false);
  const errorClasificaciones = ref("");
  const cargandoClasificaciones = ref(false);
  const ultimaActualizacion = ref(null);
  let controller = null;
  let compradoresController = null;
  let clasificacionesController = null;
  const cache = new Map();

  async function cargarCompradores() {
    compradoresController?.abort();
    const currentController = new AbortController();
    compradoresController = currentController;
    cargandoCompradores.value = true;
    errorCompradores.value = "";
    try {
      compradores.value = await obtenerCompradoresRotacion({ signal: currentController.signal });
    } catch (err) {
      if (!axios.isCancel(err) && err?.name !== "CanceledError") {
        errorCompradores.value = "No pudimos cargar el catálogo de compradores.";
      }
    } finally {
      if (compradoresController === currentController) {
        cargandoCompradores.value = false;
        compradoresController = null;
      }
    }
  }

  async function cargarClasificaciones() {
    clasificacionesController?.abort();
    const currentController = new AbortController();
    clasificacionesController = currentController;
    cargandoClasificaciones.value = true;
    errorClasificaciones.value = "";
    const numbers = [4, 5, 6, 8];

    try {
      const results = await Promise.allSettled(
        numbers.map((number) => obtenerClasificacionRotacion(number, {
          signal: currentController.signal,
        })),
      );
      if (clasificacionesController !== currentController) return;

      const next = { ...clasificaciones.value };
      let failed = false;
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          next[`clasificacion${numbers[index]}`] = result.value;
        } else if (!axios.isCancel(result.reason) && result.reason?.name !== "CanceledError") {
          failed = true;
        }
      });
      clasificaciones.value = next;
      if (failed) {
        errorClasificaciones.value = "No pudimos cargar uno o más catálogos de clasificación.";
      }
    } finally {
      if (clasificacionesController === currentController) {
        cargandoClasificaciones.value = false;
        clasificacionesController = null;
      }
    }
  }

  async function cargar({ filtros = {}, forzar = false } = {}) {
    controller?.abort();
    controller = null;

    const params = normalizarFiltrosRotacion(filtros);
    const cacheKey = crearClaveFiltrosRotacion(params);
    const cached = cache.get(cacheKey);
    if (cached && !forzar) {
      respuestaOriginal.value = cached.respuesta;
      productos.value = cached.productos;
      catalogoProductos.value = resolverCatalogoProductos(
        catalogoProductos.value,
        cached.productos,
        params,
      );
      totalGeneral.value = cached.totalGeneral;
      ultimaActualizacion.value = cached.ultimaActualizacion;
      error.value = "";
      cargando.value = false;
      return;
    }

    const currentController = new AbortController();
    controller = currentController;
    cargando.value = true;
    error.value = "";

    try {
      const respuesta = await obtenerRotacionGeneralProductos({
        filtros: params,
        signal: currentController.signal,
      });
      const productosNormalizados = normalizarProductos(respuesta.rows);
      const fechaRespuesta = new Date();
      respuestaOriginal.value = respuesta;
      productos.value = productosNormalizados;
      catalogoProductos.value = resolverCatalogoProductos(
        catalogoProductos.value,
        productosNormalizados,
        params,
      );
      totalGeneral.value = Number(respuesta.total) || respuesta.rows.length;
      ultimaActualizacion.value = fechaRespuesta;
      cache.set(cacheKey, {
        respuesta,
        productos: productosNormalizados,
        totalGeneral: totalGeneral.value,
        ultimaActualizacion: fechaRespuesta,
      });
    } catch (err) {
      if (!axios.isCancel(err) && err?.name !== "CanceledError") {
        error.value = mensajeErrorRotacion(err);
      }
    } finally {
      if (controller === currentController) {
        cargando.value = false;
        controller = null;
      }
    }
  }

  function cancelar() {
    controller?.abort();
    compradoresController?.abort();
    clasificacionesController?.abort();
  }

  onBeforeUnmount(cancelar);

  return {
    respuestaOriginal: readonly(respuestaOriginal),
    productos: readonly(productos),
    catalogoProductos: readonly(catalogoProductos),
    compradores: readonly(compradores),
    clasificaciones: readonly(clasificaciones),
    totalGeneral: readonly(totalGeneral),
    cargando: readonly(cargando),
    error: readonly(error),
    errorCompradores: readonly(errorCompradores),
    cargandoCompradores: readonly(cargandoCompradores),
    errorClasificaciones: readonly(errorClasificaciones),
    cargandoClasificaciones: readonly(cargandoClasificaciones),
    ultimaActualizacion: readonly(ultimaActualizacion),
    cargar,
    cargarCompradores,
    cargarClasificaciones,
  };
}
