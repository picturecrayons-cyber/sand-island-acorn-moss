import { i as getServerFnById, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { r as getSql } from "./db-4ZlIAIG9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/types-DswFTekA.js
var ACCOUNT_TYPES = [
	"independent_creator",
	"studio",
	"buyer"
];
var INTERNAL_ROLES = [
	"admin",
	"super_admin",
	"qc_reviewer",
	"legal_reviewer",
	"finance",
	"viewer"
];
var TITLE_STATUSES = [
	"DRAFT",
	"UPLOADING",
	"PREPARING",
	"QC_REVIEW",
	"RIGHTS_REVIEW",
	"LICENSING_READY",
	"LIVE_FOR_BUYERS",
	"IN_NEGOTIATION",
	"LICENSED",
	"DELIVERED"
];
var ASSET_KINDS = [
	"poster",
	"screener",
	"master",
	"subtitle"
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-D75-wYbG.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/audit-DnLIsRZN.js
async function writeAudit(opts) {
	await (await getSql())`
    insert into bridge_audit_logs (actor_user_id, action, entity_type, entity_id, metadata)
    values (
      ${opts.actorUserId},
      ${opts.action},
      ${opts.entityType},
      ${opts.entityId ?? null},
      ${JSON.stringify(opts.metadata ?? {})}
    )
  `;
}
//#endregion
export { INTERNAL_ROLES as a, ASSET_KINDS as i, createSsrRpc as n, TITLE_STATUSES as o, ACCOUNT_TYPES as r, writeAudit as t };
