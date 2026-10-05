import { ref, onBeforeUnmount } from 'vue';
import { listarConfiguracion, guardarConfiguracion, crearConfiguracion, eliminarConfiguracion } from '@/services/revestidosLafConfiguracion';
import { mensajeError } from '@/utils/revestidosLaf';
import { recursoConfiguracion } from '@/utils/revestidosLafConfiguracion';

export function useRevestidosLafConfiguracion() {
  const rows = ref([]), loading = ref(false), saving = ref(false), error = ref('');
  let controller;
  async function cargar(resource) {
    controller?.abort();
    const current = new AbortController();
    controller = current;
    loading.value = true;
    error.value = '';
    rows.value = [];
    try {
      const data = await listarConfiguracion(resource, current.signal);
      if (controller === current && !current.signal.aborted) rows.value = data;
    } catch (err) { if (controller === current && !current.signal.aborted) error.value = mensajeError(err); }
    finally { if (controller === current) { loading.value = false; controller = null; } }
  }
  async function guardar(resource, row, values) {
    if (saving.value) return false;
    saving.value = true;
    error.value = '';
    try {
      const updated = await guardarConfiguracion(resource, row, values);
      rows.value = rows.value.map(r => r === row ? updated : r);
      return true;
    } catch (err) { error.value = mensajeError(err); return false; }
    finally { saving.value = false; }
  }
  async function crear(resource, values) {
    if (saving.value) return false;
    saving.value = true;
    error.value = '';
    try {
      await crearConfiguracion(resource, values);
      await cargar(resource);
      return true;
    } catch (err) { error.value = mensajeError(err); return false; }
    finally { saving.value = false; }
  }
  async function eliminar(resource, row) {
    if (saving.value) return false;
    saving.value = true;
    error.value = '';
    try {
      const { key } = recursoConfiguracion(resource);
      await eliminarConfiguracion(resource, row);
      rows.value = rows.value.filter(r => String(r[key]) !== String(row[key]));
      return true;
    } catch (err) { error.value = mensajeError(err); return false; }
    finally { saving.value = false; }
  }
  onBeforeUnmount(() => controller?.abort());
  return { rows, loading, saving, error, cargar, guardar, crear, eliminar };
}
