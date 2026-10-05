import api from '@/services/api';
import { consultarConCliente } from '@/utils/revestidosLaf';

/** Fetches the documented GdcResponse (see revestidosLaf.contract.js) and adapts it for the grid. */
export const obtenerRevestidosLaf = (filters, signal) => consultarConCliente(api, filters, signal);
