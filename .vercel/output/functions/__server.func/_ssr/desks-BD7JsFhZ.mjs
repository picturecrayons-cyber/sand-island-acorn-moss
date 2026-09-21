import { Qt as string, Vt as _enum, Wt as boolean, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { i as canReadTitle, n as assertPermission } from "./rbac-D3NOb62-.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { r as getSql, s as authMiddleware } from "./db-Cwe07lSL.mjs";
import { t as writeAudit } from "./audit-BmREM0Lt.mjs";
import { t as assertNotDevUser } from "./guards-DS4_TMJW.mjs";
import { i as requireActor } from "./session-vHWwjwFP.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { o as loadTitle, s as recordTransition } from "./titles-DSuKDEjJ.mjs";
import { n as rightsAreEvidenced } from "./blockers-BzaaSzBi.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/desks-BD7JsFhZ.js
var QC_DECISIONS = [
	"pass",
	"fail",
	"request_changes"
];
var submitQcReview_createServerFn_handler = createServerRpc({
	id: "3c55755988dfac3f336b41f5fe88321edd0c4b88893d7d08e24d18a98720aad9",
	name: "submitQcReview",
	filename: "src/lib/bridge/desks.ts"
}, (opts) => submitQcReview.__executeServer(opts));
var submitQcReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	decision: _enum(QC_DECISIONS),
	notes: string().max(2e3).optional(),
	picture: boolean(),
	sound: boolean(),
	text: boolean()
})).handler(submitQcReview_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	assertPermission(actor, "title.qc_review");
	const title = await loadTitle(data.titleId);
	if (!title || !canReadTitle(actor, title)) throw new Error("Not found");
	if (title.status !== "QC_REVIEW") throw new Error("Title is not in QC review");
	if (data.decision !== "pass" && !(data.notes ?? "").trim()) throw new Error("QC fail and change requests need a reason");
	if (data.decision === "pass" && !(data.picture && data.sound && data.text)) throw new Error("QC pass requires the checklist");
	const id = randomBytes(16).toString("hex");
	await (await getSql())`
      insert into bridge_qc_reviews (id, title_id, decision, checklist, notes, actor_user_id)
      values (
        ${id}, ${title.id}, ${data.decision},
        ${JSON.stringify({
		picture: data.picture,
		sound: data.sound,
		text: data.text
	})},
        ${data.notes ?? ""}, ${actor.userId}
      )
    `;
	if (data.decision === "pass") await recordTransition({
		titleId: title.id,
		from: "QC_REVIEW",
		to: "RIGHTS_REVIEW",
		actorUserId: actor.userId,
		note: data.notes ?? "QC pass"
	});
	await writeAudit({
		actorUserId: actor.userId,
		actorRole: actor.internalRole,
		action: data.decision === "pass" ? "QC_APPROVED" : data.decision === "fail" ? "QC_REJECTED" : "QC_SUBMITTED",
		entityType: "bridge_title",
		entityId: title.id,
		previousState: "QC_REVIEW",
		newState: data.decision === "pass" ? "RIGHTS_REVIEW" : "QC_REVIEW",
		reason: data.notes ?? null
	});
	return { title: await loadTitle(title.id) };
});
var saveTitleRights_createServerFn_handler = createServerRpc({
	id: "e269977dd4ada281ae987f302b1893b3ee716d4883210c639eb11204416800bd",
	name: "saveTitleRights",
	filename: "src/lib/bridge/desks.ts"
}, (opts) => saveTitleRights.__executeServer(opts));
var saveTitleRights = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	territories: string().min(2).max(400),
	rightsType: string().min(2).max(80),
	mediaType: string().min(2).max(80),
	startDate: string().optional(),
	endDate: string().optional(),
	exclusive: boolean(),
	exclusions: string().max(1e3).optional(),
	chainOfTitleStatus: _enum([
		"unverified",
		"partial",
		"verified"
	]),
	evidenceNote: string().min(8).max(2e3),
	approve: boolean().optional()
})).handler(saveTitleRights_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	assertPermission(actor, "title.rights_review");
	const title = await loadTitle(data.titleId);
	if (!title || !canReadTitle(actor, title)) throw new Error("Not found");
	if (title.status !== "RIGHTS_REVIEW" && title.status !== "LICENSING_READY") throw new Error("Title is not in rights review");
	const snapshot = {
		approvedAt: data.approve ? (/* @__PURE__ */ new Date()).toISOString() : null,
		chainOfTitleStatus: data.chainOfTitleStatus,
		endDate: data.endDate ?? null,
		territories: data.territories,
		rightsType: data.rightsType,
		mediaType: data.mediaType,
		evidenceNote: data.evidenceNote
	};
	if (data.approve && !rightsAreEvidenced(snapshot)) throw new Error("Rights approved requires evidence, not a cosmetic toggle");
	await (await getSql())`
      insert into bridge_title_rights (
        title_id, territories, rights_type, media_type, start_date, end_date,
        exclusive, exclusions, chain_of_title_status, evidence_note, approved_by, approved_at, updated_at
      ) values (
        ${title.id}, ${data.territories}, ${data.rightsType}, ${data.mediaType},
        ${data.startDate || null}, ${data.endDate || null}, ${data.exclusive},
        ${data.exclusions ?? ""}, ${data.chainOfTitleStatus}, ${data.evidenceNote},
        ${data.approve ? actor.userId : null}, ${data.approve ? (/* @__PURE__ */ new Date()).toISOString() : null}, now()
      )
      on conflict (title_id) do update set
        territories = excluded.territories,
        rights_type = excluded.rights_type,
        media_type = excluded.media_type,
        start_date = excluded.start_date,
        end_date = excluded.end_date,
        exclusive = excluded.exclusive,
        exclusions = excluded.exclusions,
        chain_of_title_status = excluded.chain_of_title_status,
        evidence_note = excluded.evidence_note,
        approved_by = excluded.approved_by,
        approved_at = excluded.approved_at,
        updated_at = now()
    `;
	if (data.approve && title.status === "RIGHTS_REVIEW") await recordTransition({
		titleId: title.id,
		from: "RIGHTS_REVIEW",
		to: "LICENSING_READY",
		actorUserId: actor.userId,
		note: "rights approved"
	});
	await writeAudit({
		actorUserId: actor.userId,
		actorRole: actor.internalRole,
		action: data.approve ? "RIGHTS_APPROVED" : "RIGHTS_SUBMITTED",
		entityType: "bridge_title",
		entityId: title.id,
		previousState: title.status,
		newState: data.approve ? "LICENSING_READY" : title.status,
		reason: data.evidenceNote
	});
	return { title: await loadTitle(title.id) };
});
var listFinancePayments_createServerFn_handler = createServerRpc({
	id: "2fd08f4ab635b72f3b92eb10ec1ba1b07ec697906c14ce6aefc06fe212c66dd7",
	name: "listFinancePayments",
	filename: "src/lib/bridge/desks.ts"
}, (opts) => listFinancePayments.__executeServer(opts));
var listFinancePayments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listFinancePayments_createServerFn_handler, async ({ context }) => {
	const actor = await requireActor(context.userId);
	assertPermission(actor, "finance.read");
	return { payments: (await (await getSql())`
      select id, title_id, user_id, amount_paise, status, provider_order_id, provider_payment_id, created_at
      from bridge_payments order by created_at desc limit 100
    `).map((r) => ({
		id: r.id,
		titleId: r.title_id,
		userId: r.user_id,
		amountPaise: r.amount_paise,
		status: r.status,
		orderId: r.provider_order_id,
		paymentId: r.provider_payment_id,
		createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at)
	})) };
});
var authorizeDelivery_createServerFn_handler = createServerRpc({
	id: "2079420f362a491ad9c046445626deafc4d844c22f071ff3008a80a98fc308ac",
	name: "authorizeDelivery",
	filename: "src/lib/bridge/desks.ts"
}, (opts) => authorizeDelivery.__executeServer(opts));
var authorizeDelivery = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	recipientUserId: string().min(4)
})).handler(authorizeDelivery_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	assertPermission(actor, "title.deliver");
	const title = await loadTitle(data.titleId);
	if (!title) throw new Error("Not found");
	if (title.status !== "LICENSED") throw new Error("Delivery requires a valid license");
	const sql = await getSql();
	const paymentId = (await sql`
      select payment_id from bridge_entitlements
      where user_id = ${data.recipientUserId} and title_id = ${title.id} and access_type = 'license'
      limit 1
    `)[0]?.payment_id;
	if (!paymentId) throw new Error("License entitlement required");
	if ((await sql`
      select status from bridge_payments where id = ${paymentId} limit 1
    `)[0]?.status !== "captured") throw new Error("Payment not captured");
	const id = randomBytes(16).toString("hex");
	await sql`
      insert into bridge_deliveries (
        id, title_id, payment_id, recipient_user_id, method, status, actor_user_id, started_at
      ) values (
        ${id}, ${title.id}, ${paymentId}, ${data.recipientUserId}, ${"s3_signed"}, ${"started"},
        ${actor.userId}, now()
      )
      on conflict (title_id, payment_id) do nothing
    `;
	await recordTransition({
		titleId: title.id,
		from: "LICENSED",
		to: "DELIVERED",
		actorUserId: actor.userId,
		note: "delivery authorized"
	});
	await writeAudit({
		actorUserId: actor.userId,
		actorRole: actor.internalRole,
		action: "DELIVERY_STARTED",
		entityType: "bridge_delivery",
		entityId: id,
		previousState: "LICENSED",
		newState: "DELIVERED",
		reason: "server-authorized delivery after captured payment"
	});
	return {
		deliveryId: id,
		title: await loadTitle(title.id)
	};
});
//#endregion
export { authorizeDelivery_createServerFn_handler, listFinancePayments_createServerFn_handler, saveTitleRights_createServerFn_handler, submitQcReview_createServerFn_handler };
