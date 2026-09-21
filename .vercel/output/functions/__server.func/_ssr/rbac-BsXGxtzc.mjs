//#region node_modules/.nitro/vite/services/ssr/assets/rbac-BsXGxtzc.js
var FORWARD = {
	DRAFT: "UPLOADING",
	UPLOADING: "PREPARING",
	PREPARING: "QC_REVIEW",
	QC_REVIEW: "RIGHTS_REVIEW",
	RIGHTS_REVIEW: "LICENSING_READY",
	LICENSING_READY: "LIVE_FOR_BUYERS",
	LIVE_FOR_BUYERS: "IN_NEGOTIATION",
	IN_NEGOTIATION: "LICENSED",
	LICENSED: "DELIVERED",
	DELIVERED: null
};
var TITLE_STATUS_ORDER = [
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
function nextStatus(current) {
	return FORWARD[current];
}
function canTransition(from, to) {
	return FORWARD[from] === to;
}
function assertTransition(from, to) {
	if (!canTransition(from, to)) throw new Error(`Illegal title transition ${from} → ${to}`);
}
function isBuyerVisible(status) {
	return status === "LIVE_FOR_BUYERS" || status === "IN_NEGOTIATION" || status === "LICENSED" || status === "DELIVERED";
}
var INTERNAL_PERMISSIONS = {
	viewer: ["title.read_catalog", "audit.read"],
	qc_reviewer: [
		"title.read_catalog",
		"title.qc_review",
		"asset.sign_download",
		"audit.read"
	],
	legal_reviewer: [
		"title.read_catalog",
		"title.rights_review",
		"asset.sign_download",
		"audit.read"
	],
	finance: [
		"title.read_catalog",
		"finance.read",
		"entitlement.read_own",
		"audit.read"
	],
	admin: [
		"title.read_catalog",
		"title.qc_review",
		"title.rights_review",
		"title.license",
		"title.negotiate",
		"title.deliver",
		"asset.sign_download",
		"finance.read",
		"users.invite_internal",
		"audit.read"
	],
	super_admin: [
		"title.create",
		"title.read_own",
		"title.read_catalog",
		"title.update_own",
		"title.advance_upload",
		"title.qc_review",
		"title.rights_review",
		"title.license",
		"title.negotiate",
		"title.deliver",
		"asset.sign_upload",
		"asset.sign_download",
		"payment.create_order",
		"entitlement.read_own",
		"finance.read",
		"users.invite_internal",
		"audit.read"
	]
};
var ACCOUNT_PERMISSIONS = {
	independent_creator: [
		"title.create",
		"title.read_own",
		"title.update_own",
		"title.advance_upload",
		"asset.sign_upload",
		"asset.sign_download",
		"entitlement.read_own"
	],
	studio: [
		"title.create",
		"title.read_own",
		"title.update_own",
		"title.advance_upload",
		"asset.sign_upload",
		"asset.sign_download",
		"entitlement.read_own"
	],
	buyer: [
		"title.read_catalog",
		"payment.create_order",
		"entitlement.read_own",
		"asset.sign_download"
	]
};
var TRANSITION_PERMISSION = {
	"DRAFT->UPLOADING": "title.advance_upload",
	"UPLOADING->PREPARING": "title.advance_upload",
	"PREPARING->QC_REVIEW": "title.advance_upload",
	"QC_REVIEW->RIGHTS_REVIEW": "title.qc_review",
	"RIGHTS_REVIEW->LICENSING_READY": "title.rights_review",
	"LICENSING_READY->LIVE_FOR_BUYERS": "title.license",
	"LIVE_FOR_BUYERS->IN_NEGOTIATION": "title.negotiate",
	"LICENSED->DELIVERED": "title.deliver"
};
function permissionForTransition(from, to) {
	return TRANSITION_PERMISSION[`${from}->${to}`] ?? null;
}
function permissionsFor(actor) {
	const set = new Set(ACCOUNT_PERMISSIONS[actor.accountType]);
	if (actor.internalRole) for (const p of INTERNAL_PERMISSIONS[actor.internalRole]) set.add(p);
	return set;
}
function hasPermission(actor, permission) {
	if (!actor.emailVerified) return false;
	return permissionsFor(actor).has(permission);
}
function assertPermission(actor, permission) {
	if (!actor.emailVerified) throw new Error("Email verification required");
	if (!hasPermission(actor, permission)) throw new Error("Forbidden");
}
function canReadTitle(actor, title) {
	if (!actor.emailVerified) return false;
	if (title.ownerUserId === actor.userId) return hasPermission(actor, "title.read_own");
	if (actor.internalRole) return hasPermission(actor, "title.read_catalog");
	if (actor.accountType === "buyer") return hasPermission(actor, "title.read_catalog") && isBuyerVisible(title.status);
	return false;
}
function workspaceHome(actor) {
	if (actor.internalRole) return "/internal";
	if (actor.accountType === "buyer") return "/buyer";
	if (actor.accountType === "studio") return "/studio";
	return "/creator";
}
//#endregion
export { hasPermission as a, permissionForTransition as c, canReadTitle as i, workspaceHome as l, assertPermission as n, isBuyerVisible as o, assertTransition as r, nextStatus as s, TITLE_STATUS_ORDER as t };
