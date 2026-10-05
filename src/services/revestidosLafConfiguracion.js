import api from '@/services/api';
import { CONFIG_BASE, recursoConfiguracion, payloadConfiguracion, payloadCreacion, campoCodigo } from '@/utils/revestidosLafConfiguracion';

export async function listarConfiguracion(resource, signal) {
  recursoConfiguracion(resource);
  const { data } = await api.get(`${CONFIG_BASE}/${resource}`, { signal });
  if (!data?.ok || !Array.isArray(data.rows)) throw new Error('Respuesta de configuración inválida.');
  return data.rows;
}

export async function guardarConfiguracion(resource, row, values) {
  const definition = recursoConfiguracion(resource);
  const payload = payloadConfiguracion(resource, values);
  const base = `${CONFIG_BASE}/${resource}`;
  const url = resource === 'general' ? base : `${base}/${encodeURIComponent(row[definition.key])}`;
  const { data } = await api.put(url, payload);
  if (!data?.ok || !data.row) throw new Error('Respuesta de actualización inválida.');
  return data.row;
}

export async function crearConfiguracion(resource, values) {
  const { data } = await api.post(`${CONFIG_BASE}/${resource}`, payloadCreacion(resource, values));
  if (!data?.ok || !data.row) throw new Error('Respuesta de creación inválida.');
  return data.row;
}

export async function eliminarConfiguracion(resource, row) {
  const field = campoCodigo(resource);
  const { data } = await api.delete(`${CONFIG_BASE}/${resource}/${encodeURIComponent(row[field.key])}`);
  if (!data?.ok || !data.row) throw new Error('Respuesta de eliminación inválida.');
  return data.row;
}
