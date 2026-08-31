import api from "@/services/api";
import {
  crearClienteConfiguracion,
  ROTACION_CONFIG_BASE,
  ROTACION_CONFIG_POR_RECURSO,
  ROTACION_CONFIG_RECURSOS,
} from "@/services/rotacionGeneralProductosConfiguracionCore";

const cliente = crearClienteConfiguracion(api);

export { ROTACION_CONFIG_BASE, ROTACION_CONFIG_POR_RECURSO, ROTACION_CONFIG_RECURSOS };
export const listarConfiguracionRotacion = cliente.listar;
export const crearConfiguracionRotacion = cliente.crear;
export const actualizarConfiguracionRotacion = cliente.actualizar;
export const eliminarConfiguracionRotacion = cliente.eliminar;
