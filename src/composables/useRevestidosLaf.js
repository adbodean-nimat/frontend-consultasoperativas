import { onBeforeUnmount, ref } from 'vue';
import { obtenerRevestidosLaf } from '@/services/revestidosLaf';
import { mensajeError, parametrosConsulta } from '@/utils/revestidosLaf';

export function useRevestidosLaf() {
  const resultado = ref(null);
  const cargando = ref(false);
  const error = ref('');
  const ultimaActualizacion = ref(null);
  let controller;
  let activeKey;
  async function cargar(filters) {
    const params = parametrosConsulta(filters);
    const key = JSON.stringify(params);
    if (cargando.value && key === activeKey) return;
    controller?.abort();
    const current = new AbortController();
    controller = current;
    activeKey = key;
    cargando.value = true;
    error.value = '';
    resultado.value = null;
    try {
      const data = await obtenerRevestidosLaf(params, current.signal);
      if (controller !== current || current.signal.aborted) return;
      resultado.value = data;
      ultimaActualizacion.value = new Date();
    } catch (err) {
      if (controller === current && !current.signal.aborted) error.value = mensajeError(err);
    } finally {
      if (controller === current) { cargando.value = false; controller = null; }
    }
  }
  onBeforeUnmount(() => controller?.abort());
  return { resultado, cargando, error, ultimaActualizacion, cargar };
}
