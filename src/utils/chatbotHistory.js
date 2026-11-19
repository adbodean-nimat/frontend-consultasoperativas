export const CHATBOT_ROLES = ["Gerencia", "Sistemas"];

function integer(value, name, max = Number.MAX_SAFE_INTEGER) {
	if (
		!["string", "number"].includes(typeof value) ||
		!/^[1-9]\d*$/.test(String(value)) ||
		!Number.isSafeInteger(Number(value)) ||
		Number(value) > max
	) {
		throw new Error(`${name} inválido`);
	}
	return Number(value);
}

export function listParams({ page = 1, limit = 25, q = "" } = {}) {
	if (typeof q !== "string" || q.length > 500)
		throw new Error("Búsqueda inválida");
	return {
		page: integer(page, "Página"),
		limit: integer(limit, "Límite", 100),
		q: q.trim(),
	};
}

export function chatId(id) {
	if (typeof id !== "string" || !/^[a-zA-Z0-9_-]{1,200}$/.test(id))
		throw new Error("Conversación inválida");
	return id;
}

export function detailParams(before) {
	const params = { limit: 100 };
	if (before !== undefined && before !== null) {
		// Cursor opaco: se codifica como query, nunca como parte de la URL.
		if (
			!["string", "number"].includes(typeof before) ||
			!String(before).length ||
			String(before).length > 1000 ||
			/[\x00-\x1f\x7f]/.test(String(before))
		) {
			throw new Error("Cursor inválido");
		}
		params.before = String(before);
	}
	return params;
}

export function nimatLink(value) {
	if (typeof value !== "string") return null;
	try {
		const url = new URL(value);
		return url.protocol === "https:" &&
			["nimat.com.ar", "www.nimat.com.ar"].includes(url.hostname) &&
			!url.username &&
			!url.password &&
			(!url.port || url.port === "443")
			? url.href
			: null;
	} catch {
		return null;
	}
}

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
	timeZone: "America/Argentina/Buenos_Aires",
	dateStyle: "short",
	timeStyle: "short",
	hourCycle: "h23",
});
export function argentinaDate(value) {
	if (value === null || value === undefined || value === "")
		return "Fecha no disponible";
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? "Fecha no disponible"
		: dateFormatter.format(date);
}

export function historicalPrice(value) {
	if (
		value === null ||
		value === undefined ||
		(typeof value === "string" && !value.trim()) ||
		!["string", "number"].includes(typeof value) ||
		!Number.isFinite(Number(value))
	)
		return "Precio no informado";
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	}).format(Number(value));
}

export function mergeMessages(older, current) {
	const seen = new Set();
	return [...older, ...current]
		.filter((message) => {
			if (seen.has(message.id)) return false;
			seen.add(message.id);
			return true;
		})
		.sort((a, b) => a.seq - b.seq);
}

export function sortChats(items) {
	return [...items].sort(
		(a, b) =>
			(Date.parse(b.updatedAt || b.createdAt) || 0) -
			(Date.parse(a.updatedAt || a.createdAt) || 0),
	);
}

export function historyError(error) {
	const status = error?.response?.status;
	if (status === 401) return "La sesión venció. Volvé a ingresar.";
	if (status === 403)
		return "Tu sector no tiene permiso para consultar conversaciones.";
	if (status === 404)
		return "No se encontró la conversación o el servicio todavía no está disponible.";
	return "No se pudieron cargar las conversaciones. Intentá nuevamente en unos instantes.";
}

export function validateList(data) {
	if (
		!data ||
		!Array.isArray(data.items) ||
		!Number.isSafeInteger(data.total) ||
		data.total < 0 ||
		!Number.isSafeInteger(data.page) ||
		data.page < 1 ||
		!Number.isSafeInteger(data.limit) ||
		data.limit < 1 ||
		data.limit > 100 ||
		typeof data.hasMore !== "boolean" ||
		data.items.some((item) => !item || typeof item.id !== "string")
	)
		throw new Error("Respuesta inválida");
	return { ...data, items: sortChats(data.items) };
}

export function validateDetail(data, id) {
	if (
		!data ||
		data.id !== id ||
		!Array.isArray(data.messages) ||
		!Array.isArray(data.products) ||
		typeof data.hasMore !== "boolean" ||
		data.messages.some(
			(message) =>
				!message ||
				typeof message.id !== "string" ||
				!Number.isSafeInteger(message.seq) ||
				!Array.isArray(message.products) ||
				message.products.some((p) => !p || typeof p !== "object"),
		) ||
		data.products.some((p) => !p || typeof p !== "object")
	)
		throw new Error("Respuesta inválida");
	if (data.hasMore) {
		if (data.nextBefore === null || data.nextBefore === undefined)
			throw new Error("Cursor faltante");
		detailParams(data.nextBefore);
	}
	return { ...data, messages: mergeMessages([], data.messages) };
}
