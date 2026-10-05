const family = (classifier5, name, changes = {}) => ({
  classifier4: '01', classifier4Name: 'Chapas revestidas', classifier5, name,
  consumption: ['2026-09', '2026-10'].map(period => ({ period, productionTon: 1.125, salesRemittancesTon: 0, totalConsumptionTon: 1.125 })),
  pendingSalesOrderTon: 0,
  stock: {
    ton: { mainWarehouse: 3, otherWarehouses: 1, total: 4, days: 80, daysStatus: 'OK' },
    units13m: { referenceCode: '0000013', mainWarehouse: 20, otherWarehouses: 2, total: 22 },
    units1050: { referenceCode: '0000010', mainWarehouse: 10, otherWarehouses: 0, total: 10 },
    unitsHl: { referenceCode: '0000001', mainWarehouse: 12, otherWarehouses: 4, total: 16 },
  },
  purchaseOrders: { pendingTon: 2.45, units13m: 10, units1050: 0, unitsHl: 0 },
  data: { referenceCodeKg: '0000013', factorHomogeneousStock: 250, kgPerMeterOrHl: 4, notes: null, status: 'OK' },
  warnings: [], ...changes,
});
const response = () => ({
  parameters: { months: 12, rotationDays: 120, mainWarehouse: 973, purchaseOrderSupplier: null,
    dateFrom: '2025-10-01', dateToExclusive: '2026-11-01', rotationDateFrom: '2026-06-04', rotationDateToExclusive: '2026-10-02' },
  periods: Array.from({ length: 13 }, (_, i) => { const d = new Date(Date.UTC(2025, 9 + i, 1)); return d.toISOString().slice(0, 7); }),
  families: [family('0027', 'Chapa galvanizada'), family('0025', 'Chapa prepintada'), family('0080', 'LAF', { classifier4: '02', classifier4Name: 'Laminados' })],
  warnings: [],
});
module.exports = { family, response };
