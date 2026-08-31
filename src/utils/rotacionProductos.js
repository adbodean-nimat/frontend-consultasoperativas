const esValorVacio = (value) => value === null || value === undefined || value === "";

export function aNumero(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (esValorVacio(value)) return null;
  const normalized = String(value).trim().replace(/\s/g, "").replace(/\.(?=\d{3}(?:\D|$))/g, "").replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

export function formatNumber(value) {
  const number = aNumero(value);
  return number === null
    ? "—"
    : new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 }).format(number);
}

export function formatCurrency(value) {
  const number = aNumero(value);
  return number === null
    ? "—"
    : new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 2,
      }).format(number);
}

export function formatDate(value) {
  if (esValorVacio(value)) return "—";
  const dateOnly = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateOnly) return `${dateOnly[3]}/${dateOnly[2]}/${dateOnly[1]}`;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
}

export function formatDateTime(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(value);
}

export function tieneExhibicion(value) {
  if (typeof value === "boolean") return value;
  const number = aNumero(value);
  if (number !== null) return number > 0;
  return ["si", "sí", "true", "s"].includes(String(value ?? "").trim().toLocaleLowerCase("es"));
}

const CSV_COLUMNS = [
  ["Código", "codigoArticulo"], ["Artículo", "nombreArticulo"],
  ["Stock", "stockUnidades"], ["Stock disponible", "stockDisponible"],
  ["Exhibido", "exhibido"], ["Última venta", "ultimaVenta"],
  ["Días sin venta", "diasSinVenta"], ["Última entrada proveedor", "ultimaEntradaProveedor"],
  ["Cantidad última entrada", "cantidadUltimaEntrada"], ["Días último movimiento", "diasUltimoMovimiento"],
  ["Ventas último año", "ventasUltimoAnio"], ["Costo unitario sin IVA", "costoUnitarioSinIva"],
  ["Costo total sin IVA", "costoTotalSinIva"], ["Venta contado con IVA", "ventaContadoConIva"],
  ["Comprador", "nombreComprador"], ["Clasif. 4", "clasificacion4"],
  ["Clasif. 5", "clasificacion5"], ["Clasif. 6", "clasificacion6"],
  ["Clasif. 8", "clasificacion8"],
];

const DATE_FIELDS = new Set(["ultimaVenta", "ultimaEntradaProveedor"]);
const CURRENCY_FIELDS = new Set(["costoUnitarioSinIva", "costoTotalSinIva", "ventaContadoConIva"]);
const NUMBER_FIELDS = new Set([
  "stockUnidades", "stockDisponible", "diasSinVenta", "cantidadUltimaEntrada",
  "diasUltimoMovimiento", "ventasUltimoAnio",
]);

function csvCell(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export function exportarProductosCsv(productos) {
  const lines = [CSV_COLUMNS.map(([header]) => csvCell(header)).join(",")];
  productos.forEach((producto) => {
    lines.push(CSV_COLUMNS.map(([, field]) => {
      const value = field === "codigoArticulo"
        ? `="${String(producto[field] ?? "").replace(/"/g, '""')}"`
        : producto[field];
      return csvCell(value);
    }).join(","));
  });

  const blob = new Blob(["\uFEFF", lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `rotacion-general-productos-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function clipboardCell(field, value) {
  if (value === null || value === undefined || value === "") return "";
  let formatted = value;
  if (field === "codigoArticulo") {
    formatted = `="${String(value).replace(/"/g, '""')}"`;
  } else if (DATE_FIELDS.has(field)) {
    formatted = formatDate(value);
  } else if (CURRENCY_FIELDS.has(field)) {
    formatted = formatCurrency(value);
  } else if (NUMBER_FIELDS.has(field)) {
    formatted = formatNumber(value);
  } else if (field === "exhibido") {
    formatted = tieneExhibicion(value) ? "Sí" : "No";
  }
  return String(formatted).replace(/\t/g, " ").replace(/\r?\n/g, " ");
}

export function crearTextoGrillaProductos(productos) {
  const lines = [CSV_COLUMNS.map(([header]) => header).join("\t")];
  productos.forEach((producto) => {
    lines.push(CSV_COLUMNS.map(([, field]) => clipboardCell(field, producto[field])).join("\t"));
  });
  return lines.join("\n");
}

export async function copiarProductosAlPortapapeles(productos) {
  if (!globalThis.navigator?.clipboard?.writeText) {
    throw new Error("El portapapeles no está disponible en este navegador.");
  }
  await globalThis.navigator.clipboard.writeText(crearTextoGrillaProductos(productos));
  return productos.length;
}
