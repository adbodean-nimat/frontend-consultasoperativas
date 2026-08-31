const MULTI_VALUE_FIELDS = [
	"compradores",
	"clasificacion4",
	"clasificacion5",
	"clasificacion6",
	"clasificacion8",
];

const EMPTY_LABELS = new Set(["todos", "todas"]);
const STOCK_VALUES = new Set(["positivo", "cero", "negativo"]);
const EXHIBITION_VALUES = new Set(["con", "sin"]);

export function crearFiltrosRotacionIniciales() {
	return {
		busqueda: "",
		compradores: [],
		clasificacion4: [],
		clasificacion5: [],
		clasificacion6: [],
		clasificacion8: [],
		stock: null,
		exhibicion: null,
		diasDesde: null,
		diasHasta: null,
	};
}

function limpiarMultivalor(value) {
	if (!Array.isArray(value)) return [];
	return [
		...new Set(
			value
				.filter((item) => item !== null && item !== undefined)
				.map((item) => String(item).trim())
				.filter(
					(item) => item && !EMPTY_LABELS.has(item.toLocaleLowerCase("es")),
				),
		),
	];
}

function enteroNoNegativo(value) {
	if (value === null || value === undefined || value === "") return null;
	const number = Number(value);
	return Number.isInteger(number) && number >= 0 ? number : null;
}

export function normalizarFiltrosRotacion(filtros = {}) {
	const params = {};

	MULTI_VALUE_FIELDS.forEach((field) => {
		const values = limpiarMultivalor(filtros[field]);
		if (values.length) params[field] = values;
	});

	if (STOCK_VALUES.has(filtros.stock)) params.stock = filtros.stock;
	if (EXHIBITION_VALUES.has(filtros.exhibicion))
		params.exhibicion = filtros.exhibicion;

	const diasDesde = enteroNoNegativo(filtros.diasDesde);
	const diasHasta = enteroNoNegativo(filtros.diasHasta);
	if (diasDesde !== null) params.diasDesde = diasDesde;
	if (diasHasta !== null) params.diasHasta = diasHasta;

	return params;
}

export function crearClaveFiltrosRotacion(params = {}) {
	const normalized = {};
	Object.keys(params)
		.sort()
		.forEach((key) => {
			normalized[key] = Array.isArray(params[key])
				? [...params[key]].sort((a, b) =>
						String(a).localeCompare(String(b), "es"),
				  )
				: params[key];
		});
	return JSON.stringify(normalized);
}

export function resolverCatalogoProductos(
	catalogoActual,
	productos,
	params = {},
) {
	if (Object.keys(params).length === 0) return productos;
	return catalogoActual.length ? catalogoActual : productos;
}

export function mensajeErrorRotacion(error) {
	if (
		error?.response?.status === 400 &&
		typeof error?.response?.data?.message === "string"
	) {
		return error.response.data.message;
	}
	return "No pudimos cargar la rotación de productos. Verificá tu conexión e intentá nuevamente.";
}

export function normalizarCompradoresRotacion(rows = []) {
	return rows
		.filter(
			(row) =>
				row?.nombre_comprador !== null && row?.nombre_comprador !== undefined,
		)
		.map((row) => {
			const codigo = String(row.codigo_comprador ?? "").trim();
			const nombre = String(row.nombre_comprador).trim();
			return {
				codigoComprador: codigo,
				nombreComprador: nombre,
				activo: row.activo !== false,
				actualizadoEn: row.actualizado_en,
				label: codigo ? `${codigo} - ${nombre}` : nombre,
				value: nombre || codigo,
				disabled: row.activo === false,
			};
		})
		.filter((comprador) => comprador.value)
		.sort((a, b) =>
			a.nombreComprador.localeCompare(b.nombreComprador, "es", {
				sensitivity: "base",
			}),
		);
}

export function normalizarClasificacionRotacion(rows = [], numero) {
	const number = Number(numero);
	if (![4, 5, 6, 8].includes(number)) return [];
	const prefix = `CA${String(number).padStart(2, "0")}`;
	const codeKey = `${prefix}_CLASIF_${number}`;
	const nameKey = `${prefix}_NOMBRE`;
	const usableKey = `${prefix}_UTILIZABLE`;

	return rows
		.filter((row) => row?.[nameKey] !== null && row?.[nameKey] !== undefined)
		.map((row) => {
			const codigo = String(row[codeKey] ?? "").trim();
			const nombre = String(row[nameKey]).trim();
			return {
				codigoClasificacion: codigo,
				nombreClasificacion: nombre,
				utilizable: Number(row[usableKey]) === 1,
				label: codigo ? `${codigo} - ${nombre}` : nombre,
				value: nombre || codigo,
				disabled: Number(row[usableKey]) !== 1,
			};
		})
		.filter((item) => item.value)
		.sort((a, b) =>
			a.nombreClasificacion.localeCompare(b.nombreClasificacion, "es", {
				sensitivity: "base",
				numeric: true,
			}),
		);
}
