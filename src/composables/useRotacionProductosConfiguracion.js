import { computed, onBeforeUnmount, reactive, readonly, ref } from "vue";
import axios from "axios";
import {
  actualizarConfiguracionRotacion,
  crearConfiguracionRotacion,
  eliminarConfiguracionRotacion,
  listarConfiguracionRotacion,
  ROTACION_CONFIG_RECURSOS,
} from "@/services/rotacionGeneralProductosConfiguracion";
import {
  crearPayloadConfiguracion,
  ejecutarYRecargar,
  mensajeErrorConfiguracion,
  normalizarFilaConfiguracion,
  obtenerDefinicionConfiguracion,
} from "@/services/rotacionGeneralProductosConfiguracionCore";

export function useRotacionProductosConfiguracion() {
  const recursoActivo = ref(ROTACION_CONFIG_RECURSOS[0].resource);
  const filasPorRecurso = reactive({});
  const cargados = reactive({});
  const cargando = ref(false);
  const operando = ref(false);
  const error = ref("");
  let controller = null;

  const definicionActiva = computed(() => obtenerDefinicionConfiguracion(recursoActivo.value));
  const filas = computed(() => filasPorRecurso[recursoActivo.value] || []);

  async function cargar(resource = recursoActivo.value, { forzar = false } = {}) {
    recursoActivo.value = resource;
    if (cargados[resource] && !forzar) return;
    controller?.abort();
    const currentController = new AbortController();
    controller = currentController;
    cargando.value = true;
    error.value = "";
    try {
      const definition = obtenerDefinicionConfiguracion(resource);
      const response = await listarConfiguracionRotacion(resource, { signal: currentController.signal });
      if (controller !== currentController) return;
      filasPorRecurso[resource] = response.rows.map((row) => normalizarFilaConfiguracion(row, definition));
      cargados[resource] = true;
    } catch (err) {
      if (!axios.isCancel(err) && err?.name !== "CanceledError") {
        error.value = mensajeErrorConfiguracion(err);
      }
    } finally {
      if (controller === currentController) {
        cargando.value = false;
        controller = null;
      }
    }
  }

  async function seleccionar(resource) {
    recursoActivo.value = resource;
    error.value = "";
    await cargar(resource);
  }

  async function ejecutarMutacion(callback, mensajeExito) {
    if (operando.value) return false;
    operando.value = true;
    error.value = "";
    try {
      await ejecutarYRecargar(callback, () => cargar(recursoActivo.value, { forzar: true }));
      return mensajeExito;
    } catch (err) {
      error.value = mensajeErrorConfiguracion(err);
      return false;
    } finally {
      operando.value = false;
    }
  }

  function guardar(registro, editando) {
    const resource = recursoActivo.value;
    const definition = definicionActiva.value;
    const payload = crearPayloadConfiguracion(registro, definition, { editando });
    if (editando) {
      return ejecutarMutacion(
        () => actualizarConfiguracionRotacion(resource, registro.codigo, payload),
        "Registro actualizado.",
      );
    }
    return ejecutarMutacion(
      () => crearConfiguracionRotacion(resource, payload),
      "Registro creado.",
    );
  }

  function cambiarEstado(registro) {
    const resource = recursoActivo.value;
    const payload = crearPayloadConfiguracion(
      { ...registro, activo: !registro.activo },
      definicionActiva.value,
      { editando: true },
    );
    return ejecutarMutacion(
      () => actualizarConfiguracionRotacion(resource, registro.codigo, payload),
      registro.activo ? "Registro desactivado." : "Registro activado.",
    );
  }

  function eliminar(registro) {
    const resource = recursoActivo.value;
    return ejecutarMutacion(
      () => eliminarConfiguracionRotacion(resource, registro.codigo),
      "Registro eliminado.",
    );
  }

  onBeforeUnmount(() => controller?.abort());

  return {
    recursos: ROTACION_CONFIG_RECURSOS,
    recursoActivo,
    definicionActiva,
    filas,
    cargando: readonly(cargando),
    operando: readonly(operando),
    error: readonly(error),
    cargar,
    seleccionar,
    guardar,
    cambiarEstado,
    eliminar,
  };
}
