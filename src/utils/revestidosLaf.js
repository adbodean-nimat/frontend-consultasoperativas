export const ENDPOINT = "/api/gdc/revestidos-laf";
export const DEFAULT_FILTERS = Object.freeze({ months: 12, rotationDays: 120 });
export const LIMITS = Object.freeze({ months: 60, rotationDays: 3660 });

export function parametrosConsulta(filters = DEFAULT_FILTERS) {
	return Object.fromEntries(
		Object.entries(DEFAULT_FILTERS).map(([key, fallback]) => {
			const value = filters[key] === undefined ? fallback : filters[key];
			if (
				!["string", "number"].includes(typeof value) ||
				!/^\d+$/.test(String(value)) ||
				!Number.isSafeInteger(Number(value)) ||
				Number(value) < 1 ||
				Number(value) > LIMITS[key]
			) {
				throw new Error(
					`${
						key === "months" ? "Meses anteriores" : "Días para rotación"
					}: ingrese un entero entre 1 y ${LIMITS[key]}.`,
				);
			}
			return [key, Number(value)];
		}),
	);
}

export function filtrosDesdeQuery(query) {
	try {
		return parametrosConsulta({ ...DEFAULT_FILTERS, ...query });
	} catch {
		return { ...DEFAULT_FILTERS };
	}
}

export function numero(value) {
	if (
		!["string", "number"].includes(typeof value) ||
		(typeof value === "string" && !value.trim())
	)
		return null;
	const number = Number(value);
	return Number.isFinite(number) ? number : null;
}

export function formatoNumero(value, decimals = 2) {
	const number = numero(value);
	return number === null
		? "—"
		: new Intl.NumberFormat("es-AR", {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals,
		  }).format(number);
}

export function calcularPorcentaje(subtotal, total) {
	const numerator = numero(subtotal);
	const denominator = numero(total);
	return numerator === null || denominator === null || denominator === 0
		? null
		: numero(numerator / denominator);
}

export function formatoPorcentaje(value) {
	const number = numero(value);
	return number === null ? "—" : new Intl.NumberFormat("es-AR", {
		style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2,
	}).format(number);
}

export const ESTADOS = {
	OK: "Correcto",
	CODE_NOT_FOUND: "Referencia inexistente",
	INVALID_FACTOR: "Factor faltante, cero o inválido",
	MULTIPLE_FACTORS: "Factores inconsistentes",
	MULTIPLE_CLASSIFIER4: "Varios clasificadores 4 para la familia",
	NO_CONSUMPTION: "Sin consumo neto positivo: stock en días no calculable",
	INVALID_CONSUMPTION_FACTOR:
		"Stock en días no calculable: factor de consumo inválido",
	INVALID_STOCK_FACTOR: "Stock en días no calculable: factor de stock inválido",
};

export function textoAdvertencias(family) {
	const warnings = (family.warnings ?? []).map(
		(w) =>
			`${ESTADOS[w.code] ?? w.code}${w.block ? ` (${w.block})` : ""}${
				w.articleCode ? ` · ${w.articleCode}` : ""
			}${w.period ? ` · ${w.period}` : ""}`,
	);
	if (family.data?.status && family.data.status !== "OK")
		warnings.push(ESTADOS[family.data.status] ?? family.data.status);
	if (family.stock?.ton?.daysStatus && family.stock.ton.daysStatus !== "OK")
		warnings.push(
			ESTADOS[family.stock.ton.daysStatus] ?? family.stock.ton.daysStatus,
		);
	return [...new Set(warnings)].join("; ");
}

export function ordenarPeriodos(periods) {
	if (
		!Array.isArray(periods) ||
		periods.some(
			(p) => typeof p !== "string" || !/^\d{4}-(0[1-9]|1[0-2])$/.test(p),
		)
	) {
		throw new Error("La respuesta contiene períodos inválidos.");
	}
	return [...new Set(periods)].sort();
}

export function etiquetaPeriodo(period) {
	return new Intl.DateTimeFormat("es-AR", {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(`${period}-01T12:00:00Z`));
}

export function generarColumnas(periods, mainWarehouse = 973) {
	const numeric = (field, headerName, block, decimals = 2, sum = true) => ({
		field,
		headerName,
		headerTooltip: headerName,
		width: 125,
		minWidth: 105,
		headerClass: `laf-${block}`,
		cellClass: "laf-number",
		valueFormatter: (p) => {
			if (p.data?.isSeparator) return "";
			if (p.data?.isPercentage) return field.endsWith(".totalConsumptionTon")
				? formatoPorcentaje(p.value) : "";
			return (p.node?.rowPinned || p.data?.isSubtotal) && !sum
				? "" : formatoNumero(p.value, decimals);
		},
		sum,
	});
	const group = (headerName, block, children) => ({
		headerName,
		headerTooltip: headerName,
		headerClass: `laf-${block}`,
		marryChildren: true,
		children,
	});
	const warehouses = (path, title, decimals) =>
		group(title, "stock", [
			{
				...numeric(
					`${path}.mainWarehouse`,
					`Dep. ${mainWarehouse}`,
					"stock",
					decimals,
				),
				headerTooltip: `Depósito principal ${mainWarehouse} · ${title}`,
			},
			numeric(`${path}.otherWarehouses`, "Otros depósitos", "stock", decimals),
			numeric(`${path}.total`, "Total", "stock", decimals),
		]);
	return [
		{
			headerName: "",
			marryChildren: true,
			children: [
				{
					field: "classifier5",
					headerName: "Clasif. 5",
					headerTooltip: "Código de Clasificador 5",
					width: 100,
					pinned: "left",
					lockPinned: true,
				},
				{
					field: "name",
					headerName: "Familia",
					width: 240,
					pinned: "left",
					lockPinned: true,
					tooltipValueGetter: (p) =>
						[p.value, p.data?.warningText].filter(Boolean).join(" · "),
					cellRenderer: (p) => {
						const span = document.createElement("span");
						span.textContent = `${p.data?.warningText ? "⚠ " : ""}${
							p.value ?? ""
						}`;
						return span;
					},
				},
			],
		},
		group(
			"",
			"consumos",
			ordenarPeriodos(periods).map((period) =>
				({ ...group(etiquetaPeriodo(period), "consumos", [
					numeric(`${period}.productionTon`, "Producción", "consumos"),
					numeric(
						`${period}.salesRemittancesTon`,
						"Remitos ventas",
						"consumos",
					),
					{
						...numeric(`${period}.totalConsumptionTon`, "Total", "consumos"),
						headerClass: ["laf-consumos", "laf-month-end"],
						cellClass: ["laf-number", "laf-month-end"],
					},
				]), headerClass: ["laf-consumos", "laf-month-end"] }),
			),
		),
		group("", "np", [{
			...numeric("pendingSalesOrderTon", "Pendiente en NP (ton)", "np"),
			width: 185,
			minWidth: 170,
		}]),
		group("", "stock", [
			warehouses("stock.ton", "Toneladas", 2),
			{
				...numeric("stock.ton.days", "Stock en días", "stock", 2, false),
				tooltipField: "daysExplanation",
			},
			warehouses("stock.units13m", "Unidades 13 m", 2),
			warehouses("stock.units1050", "Unidades 10,50 m", 2),
			warehouses("stock.unitsHl", "Unidades HL", 2),
		]),
		group("", "oc", [group("Pendiente en OC", "oc", [
			numeric("purchaseOrders.pendingTon", "Pendiente (t)", "oc"),
			...[
				["units13m", "Unidades 13 m"],
				["units1050", "Unidades 10,50 m"],
				["unitsHl", "Unidades HL"],
			].map(([field, title]) =>
				numeric(`purchaseOrders.${field}`, title, "oc", 2),
			),
		])]),
		group(
			"",
			"datos",
			[
				group("Peso teórico kg", "datos", [
					{
						field: "data.referenceCodeKg",
						headerName: "Referencia kg",
						headerTooltip: "Referencia kg",
						headerClass: "laf-datos",
						width: 145,
					},
					numeric("data.kgPerMeterOrHl", "Kg / metro o HL", "datos", 2, false),
				]),
				numeric(
					"data.factorHomogeneousStock",
					"Factor stock homog.",
					"datos",
					2,
					false,
				),
				{
					field: "data.notes",
					headerName: "Observaciones",
					width: 260,
					tooltipField: "data.notes",
				},
				{
					field: "statusLabel",
					headerName: "Estado técnico",
					width: 260,
					tooltipField: "warningText",
					cellClass: (p) => (p.data?.warningText ? "laf-warning" : ""),
				},
			].map((c) => ({
				headerClass: "laf-datos",
				headerTooltip: c.headerName,
				...c,
			})),
		),
	];
}

export function columnasHoja(columns) {
	return columns.flatMap((c) => (c.children ? columnasHoja(c.children) : [c]));
}

export function adaptarRespuesta(response) {
	if (
		!response?.parameters ||
		!Array.isArray(response.families) ||
		!Array.isArray(response.warnings)
	) {
		throw new Error(
			"La respuesta de Chapas Revestidas y LAF no tiene el formato esperado.",
		);
	}
	const periods = ordenarPeriodos(response.periods);
	const columns = generarColumnas(periods, response.parameters.mainWarehouse);
	let previousGroup;
	const rows = response.families.map((family, index) => {
		if (
			typeof family.classifier5 !== "string" ||
			!Array.isArray(family.consumption) ||
			!family.stock?.ton ||
			!family.data ||
			!family.purchaseOrders
		) {
			throw new Error("La respuesta contiene una familia inválida.");
		}
		const groupFull =
			[family.classifier4, family.classifier4Name]
				.filter(Boolean)
				.join(" · ") || "Sin clasificador 4";
		const groupStart = groupFull !== previousGroup;
		previousGroup = groupFull;
		const warningText = textoAdvertencias(family);
		const row = {
			...family,
			originalIndex: index,
			groupFull,
			groupStart,
			groupLabel: groupStart ? groupFull : "",
			warningText,
			statusLabel: warningText
				? `⚠ ${
						family.data.status === "OK"
							? "Advertencias"
							: ESTADOS[family.data.status] ?? family.data.status
				  }`
				: "Correcto",
			daysExplanation:
				ESTADOS[family.stock.ton.daysStatus] ?? family.stock.ton.daysStatus,
		};
		columnasHoja(columns).forEach((column) => {
			if (!column.field.includes(".")) return;
			const [period, metric] = column.field.split(".");
			row[column.field] = periods.includes(period)
				? family.consumption.find((c) => c.period === period)?.[metric] ?? null
				: column.field
						.split(".")
						.reduce((value, key) => value?.[key], family) ?? null;
		});
		if (family.stock.ton.daysStatus !== "OK") row["stock.ton.days"] = null;
		return row;
	});
	const totals = calcularTotales(rows, columns);
	return {
		rows,
		displayRows: agregarSubtotales(rows, columns, totals),
		columns,
		periods,
		parameters: response.parameters,
		warnings: response.warnings,
		totals,
	};
}

// A null in an additive column makes its total unknown, never a partial sum.
export function calcularTotales(rows, columns) {
	const total = { name: "TOTAL GENERAL", groupLabel: "", warningText: "" };
	columnasHoja(columns)
		.filter((c) => c.sum)
		.forEach((c) => {
			const values = rows.map((r) => numero(r[c.field]));
			total[c.field] = values.includes(null)
				? null
				: values.reduce((a, b) => a + b, 0);
		});
	return total;
}

// Keep backend order: each contiguous classifier-4 block ends with its subtotal.
// These presentation rows never participate in the general total or family count.
export function agregarSubtotales(rows, columns, totals = calcularTotales(rows, columns)) {
	const displayRows = [];
	const percentageColumns = columnasHoja(columns).filter(c => c.field.endsWith(".totalConsumptionTon"));
	let groupRows = [];
	const closeGroup = () => {
		if (!groupRows.length) return;
		const first = groupRows[0];
		const subtotal = {
			...calcularTotales(groupRows, columns),
			isSubtotal: true,
			subtotalId: `subtotal-${first.originalIndex}`,
			groupFull: first.groupFull,
			name: `TOTAL ${first.groupFull}`,
		};
		const percentage = {
			isPercentage: true,
			presentationId: `percentage-${first.originalIndex}`,
			groupFull: first.groupFull,
			name: "% del total general",
		};
		for (const column of percentageColumns) {
			percentage[column.field] = calcularPorcentaje(subtotal[column.field], totals[column.field]);
		}
		displayRows.push(subtotal, percentage, {
			isSeparator: true,
			presentationId: `separator-${first.originalIndex}`,
		});
		groupRows = [];
	};
	for (const row of rows) {
		if (groupRows.length && row.groupStart) closeGroup();
		groupRows.push(row);
		displayRows.push(row);
	}
	closeGroup();
	return displayRows;
}

export function mensajeError(error) {
	const body = error?.response?.data;
	if (!body?.message && ["ECONNABORTED", "ETIMEDOUT"].includes(error?.code))
		return "La consulta agotó el tiempo de espera. Intente nuevamente.";
	if (!body?.message && error?.code === "ERR_NETWORK")
		return "Error de comunicación. Revise la conexión y vuelva a consultar.";
	return (
		[
			body?.message,
			...(Array.isArray(body?.errors)
				? body.errors.map((e) => `${e.field}: ${e.message}`)
				: []),
		]
			.filter(Boolean)
			.join(" · ") ||
		error?.message ||
		"No pudimos completar la consulta. Intente nuevamente."
	);
}

export async function consultarConCliente(http, filters, signal) {
	const { data } = await http.get(ENDPOINT, {
		params: parametrosConsulta(filters),
		signal,
		timeout: 330000,
	});
	return adaptarRespuesta(data);
}
