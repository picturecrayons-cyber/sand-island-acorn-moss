import { l as workspaceHome } from "./rbac-BsXGxtzc.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { i as authMiddleware, r as getSql } from "./db-4ZlIAIG9.mjs";
import { t as assertNotDevUser } from "./guards-DS4_TMJW.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { n as integrationStatus } from "./env-DZXn_v3j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/canonical-B7pQGs3M.js
var PRODUCT_NAME = "Crayons Bridge";
var LEGAL_OWNER = "StreamVista OPC Pvt Ltd";
var PRODUCTION_DOMAIN = "bridge.crayonspictures.com";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/session-BltnLmDw.js
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
var getBridgeSession_createServerFn_handler = createServerRpc({
	id: "b6f32c1c519e3d0e221b90227448e89245f065269aa3c6f8b62fc3df97ae7900",
	name: "getBridgeSession",
	filename: "src/lib/bridge/session.ts"
}, (opts) => getBridgeSession.__executeServer(opts));
var getBridgeSession = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getBridgeSession_createServerFn_handler, async ({ context }) => {
	assertNotDevUser(context.userId);
	const actor = await loadActor(context.userId);
	if (!actor) return {
		userId: context.userId,
		profile: null,
		home: "/onboarding"
	};
	return {
		userId: context.userId,
		profile: actor,
		home: workspaceHome(actor)
	};
});
var getBridgePublicStatus_createServerFn_handler = createServerRpc({
	id: "19cefdb6affb8f5c68c29961dff28605759e7ce613b7dff4cc4ace4b3b7d3d66",
	name: "getBridgePublicStatus",
	filename: "src/lib/bridge/session.ts"
}, (opts) => getBridgePublicStatus.__executeServer(opts));
var getBridgePublicStatus = createServerFn({ method: "GET" }).handler(getBridgePublicStatus_createServerFn_handler, async () => {
	return {
		product: PRODUCT_NAME,
		owner: LEGAL_OWNER,
		domain: PRODUCTION_DOMAIN,
		integrations: integrationStatus()
	};
});
//#endregion
export { getBridgePublicStatus_createServerFn_handler, getBridgeSession_createServerFn_handler };
