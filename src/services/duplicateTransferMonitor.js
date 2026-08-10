import api from "./api";

const base = "/api/admin/duplicate-transfers";

export const duplicateTransferMonitorApi = {
  getConfig: () => api.get(`${base}/config`),
  updateConfig: (data) => api.put(`${base}/config`, data),
  getStatus: () => api.get(`${base}/status`),
  preview: (data) => api.post(`${base}/preview`, data),
  run: (data = {}) => api.post(`${base}/run`, data),
  getRuns: (params) => api.get(`${base}/runs`, { params }),
  getRun: (id) => api.get(`${base}/runs/${id}`),
  getDetections: (params) => api.get(`${base}/detections`, { params }),
  review: (params) => api.get(`${base}/review`, { params }),
};
