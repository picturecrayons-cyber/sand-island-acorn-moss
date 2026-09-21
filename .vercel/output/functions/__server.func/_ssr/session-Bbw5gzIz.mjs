import { n as createServerFn } from "./ssr.mjs";
import { i as authMiddleware, r as getSql } from "./db-4ZlIAIG9.mjs";
import { n as createSsrRpc } from "./audit-DnLIsRZN.mjs";
import { t as assertNotDevUser } from "./guards-DS4_TMJW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session-Bbw5gzIz.js
function mapRow(r) {
	return {
		userId: r.user_id,
		email: r.email,
		displayName: r.display_name,
		accountType: r.account_type,
		organizationName: r.organization_name,
		internalRole: r.internal_role ?? null,
		emailVerified: !!r.email_verified
	};
}
async function loadActor(userId) {
	assertNotDevUser(userId);
	const rows = await (await getSql())`
    select user_id, email, display_name, account_type, organization_name, internal_role, email_verified
    from bridge_profiles where user_id = ${userId} limit 1
  `;
	return rows[0] ? mapRow(rows[0]) : null;
}
async function requireActor(userId) {
	const actor = await loadActor(userId);
	if (!actor) throw new Error("Profile required");
	return actor;
}
var getBridgeSession = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b6f32c1c519e3d0e221b90227448e89245f065269aa3c6f8b62fc3df97ae7900"));
var getBridgePublicStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("19cefdb6affb8f5c68c29961dff28605759e7ce613b7dff4cc4ace4b3b7d3d66"));
//#endregion
export { requireActor as i, getBridgeSession as n, loadActor as r, getBridgePublicStatus as t };
