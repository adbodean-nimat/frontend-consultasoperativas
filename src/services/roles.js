import { getToken } from "@/services/auth";
import { decodeJwt } from "@/services/jwt";

function extractCN(dn) {
	const m = /^CN=([^,]+)(,|$)/i.exec(String(dn));
	return m ? m[1].trim() : null;
}

export function getUserRoles() {
	const token = getToken();
	if (!token) return [];

	const payload = decodeJwt(token);
	const memberOf = payload?.user?.memberOf ?? [];

	return (Array.isArray(memberOf) ? memberOf : [memberOf])
		.map(extractCN)
		.filter(Boolean);
}

export function hasRole(requiredRoles = []) {
	const userRoles = getUserRoles();

	return requiredRoles.some((r) => userRoles.includes(r));
}
