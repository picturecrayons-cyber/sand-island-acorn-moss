import { Jt as number, Qt as string, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { c as permissionForTransition, i as canReadTitle, n as assertPermission, r as assertTransition, s as nextStatus } from "./rbac-BsXGxtzc.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { i as authMiddleware, r as getSql } from "./db-4ZlIAIG9.mjs";
import { o as TITLE_STATUSES, t as writeAudit } from "./audit-DnLIsRZN.mjs";
import { t as assertNotDevUser } from "./guards-DS4_TMJW.mjs";
import { i as requireActor } from "./session-Bbw5gzIz.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/titles-mqXqf_zx.js
function asIso(v) {
	return v instanceof Date ? v.toISOString() : String(v);
}
function mapTitle(r) {
	return {
		id: r.id,
		slug: r.slug,
		name: r.name,
		nameMl: r.name_ml,
		ownerUserId: r.owner_user_id,
		ownerAccountType: r.owner_account_type,
		status: r.status,
		synopsis: r.synopsis,
		language: r.language,
		year: r.year,
		runtimeMinutes: r.runtime_minutes,
		licensingFeePaise: Number(r.licensing_fee_paise ?? 0),
		posterKey: r.poster_key,
		masterKey: r.master_key,
		createdAt: asIso(r.created_at),
		updatedAt: asIso(r.updated_at)
	};
}
function slugify(name, id) {
	return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "title"}-${id.slice(0, 6)}`;
}
async function loadTitle(id) {
	const rows = await (await getSql())`select * from bridge_titles where id = ${id} limit 1`;
	return rows[0] ? mapTitle(rows[0]) : null;
}
async function recordTransition(opts) {
	const sql = await getSql();
	await sql`
    update bridge_titles set status = ${opts.to}, updated_at = now() where id = ${opts.titleId}
  `;
	await sql`
    insert into bridge_title_events (title_id, from_status, to_status, actor_user_id, note)
    values (${opts.titleId}, ${opts.from}, ${opts.to}, ${opts.actorUserId}, ${opts.note ?? null})
  `;
}
var createTitle_createServerFn_handler = createServerRpc({
	id: "387c1a85f98cd09df81d75531a295bb02df85e0b5f5c4bcf32f3b58de1ef0d30",
	name: "createTitle",
	filename: "src/lib/bridge/titles.ts"
}, (opts) => createTitle.__executeServer(opts));
var createTitle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().min(1).max(160),
	nameMl: string().max(160).optional(),
	synopsis: string().max(4e3).optional(),
	language: string().min(2).max(40).optional(),
	year: number().int().min(1895).max(2100).optional(),
	runtimeMinutes: number().int().min(1).max(600).optional(),
	licensingFeePaise: number().int().min(0).max(5e7).optional()
})).handler(createTitle_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	assertPermission(actor, "title.create");
	const id = randomBytes(16).toString("hex");
	const slug = slugify(data.name, id);
	await (await getSql())`
      insert into bridge_titles (
        id, slug, name, name_ml, owner_user_id, owner_account_type, status,
        synopsis, language, year, runtime_minutes, licensing_fee_paise
      ) values (
        ${id}, ${slug}, ${data.name}, ${data.nameMl ?? null}, ${actor.userId}, ${actor.accountType},
        ${"DRAFT"}, ${data.synopsis ?? ""}, ${data.language ?? "Malayalam"},
        ${data.year ?? null}, ${data.runtimeMinutes ?? null}, ${data.licensingFeePaise ?? 0}
      )
    `;
	await recordTransition({
		titleId: id,
		from: null,
		to: "DRAFT",
		actorUserId: actor.userId,
		note: "created"
	});
	await writeAudit({
		actorUserId: actor.userId,
		action: "title.create",
		entityType: "bridge_title",
		entityId: id
	});
	const title = await loadTitle(id);
	if (!title) throw new Error("Title create failed");
	return { title };
});
var listTitles_createServerFn_handler = createServerRpc({
	id: "d880392499cc5710426ce40644d8f2149c8fadd1b07d6df616a17b100956086e",
	name: "listTitles",
	filename: "src/lib/bridge/titles.ts"
}, (opts) => listTitles.__executeServer(opts));
var listTitles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listTitles_createServerFn_handler, async ({ context }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	const sql = await getSql();
	let rows = [];
	if (actor.internalRole) {
		assertPermission(actor, "title.read_catalog");
		rows = await sql`select * from bridge_titles order by updated_at desc limit 200`;
	} else if (actor.accountType === "buyer") {
		assertPermission(actor, "title.read_catalog");
		rows = await sql`
        select * from bridge_titles
        where status in ('LIVE_FOR_BUYERS','IN_NEGOTIATION','LICENSED','DELIVERED')
        order by updated_at desc limit 200
      `;
	} else {
		assertPermission(actor, "title.read_own");
		rows = await sql`
        select * from bridge_titles where owner_user_id = ${actor.userId}
        order by updated_at desc limit 200
      `;
	}
	return { titles: rows.map(mapTitle) };
});
var getTitle_createServerFn_handler = createServerRpc({
	id: "f1d3127e9d0d3111d83b20f06e6c3827ca771d7b46b878293909fe1eefef8a2c",
	name: "getTitle",
	filename: "src/lib/bridge/titles.ts"
}, (opts) => getTitle.__executeServer(opts));
var getTitle = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ id: string().min(8) })).handler(getTitle_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	const title = await loadTitle(data.id);
	if (!title || !canReadTitle(actor, title)) throw new Error("Not found");
	return {
		title,
		events: (await (await getSql())`
      select from_status, to_status, actor_user_id, note, created_at
      from bridge_title_events where title_id = ${title.id} order by created_at asc
    `).map((e) => ({
			from: e.from_status,
			to: e.to_status,
			actorUserId: e.actor_user_id,
			note: e.note,
			createdAt: asIso(e.created_at)
		}))
	};
});
var updateTitle_createServerFn_handler = createServerRpc({
	id: "edb62091ac6ddc010b4c4a4e89c31344ae00c5cdaaa5e51e18cb539e7dc0b7c1",
	name: "updateTitle",
	filename: "src/lib/bridge/titles.ts"
}, (opts) => updateTitle.__executeServer(opts));
var updateTitle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string().min(8),
	name: string().min(1).max(160).optional(),
	nameMl: string().max(160).optional(),
	synopsis: string().max(4e3).optional(),
	language: string().min(2).max(40).optional(),
	year: number().int().min(1895).max(2100).nullable().optional(),
	runtimeMinutes: number().int().min(1).max(600).nullable().optional(),
	licensingFeePaise: number().int().min(0).max(5e7).optional()
})).handler(updateTitle_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	const title = await loadTitle(data.id);
	if (!title) throw new Error("Not found");
	const owns = title.ownerUserId === actor.userId;
	if (owns) assertPermission(actor, "title.update_own");
	else assertPermission(actor, "title.license");
	if (owns && title.status !== "DRAFT" && title.status !== "UPLOADING" && title.status !== "PREPARING") throw new Error("Title is locked after prepare");
	await (await getSql())`
      update bridge_titles set
        name = ${data.name ?? title.name},
        name_ml = ${data.nameMl ?? title.nameMl},
        synopsis = ${data.synopsis ?? title.synopsis},
        language = ${data.language ?? title.language},
        year = ${data.year === void 0 ? title.year : data.year},
        runtime_minutes = ${data.runtimeMinutes === void 0 ? title.runtimeMinutes : data.runtimeMinutes},
        licensing_fee_paise = ${data.licensingFeePaise ?? title.licensingFeePaise},
        updated_at = now()
      where id = ${title.id}
    `;
	await writeAudit({
		actorUserId: actor.userId,
		action: "title.update",
		entityType: "bridge_title",
		entityId: title.id
	});
	return { title: await loadTitle(title.id) };
});
var advanceTitle_createServerFn_handler = createServerRpc({
	id: "c67d17bfb72a1423ff83d7f43b35f7f8d1fea95554e9d363e262becad2f9aef1",
	name: "advanceTitle",
	filename: "src/lib/bridge/titles.ts"
}, (opts) => advanceTitle.__executeServer(opts));
var advanceTitle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string().min(8),
	to: _enum(TITLE_STATUSES),
	note: string().max(500).optional()
})).handler(advanceTitle_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	const title = await loadTitle(data.id);
	if (!title || !canReadTitle(actor, title)) throw new Error("Not found");
	if (data.to === "LICENSED") throw new Error("LICENSED is granted only after a captured Razorpay payment");
	assertTransition(title.status, data.to);
	const perm = permissionForTransition(title.status, data.to);
	if (!perm) throw new Error("Transition is not available");
	assertPermission(actor, perm);
	if (perm === "title.advance_upload" && title.ownerUserId !== actor.userId && !actor.internalRole) throw new Error("Forbidden");
	if (nextStatus(title.status) !== data.to) throw new Error("Illegal title transition");
	await recordTransition({
		titleId: title.id,
		from: title.status,
		to: data.to,
		actorUserId: actor.userId,
		note: data.note
	});
	await writeAudit({
		actorUserId: actor.userId,
		action: "title.advance",
		entityType: "bridge_title",
		entityId: title.id,
		metadata: {
			from: title.status,
			to: data.to
		}
	});
	return { title: await loadTitle(title.id) };
});
var listAuditLogs_createServerFn_handler = createServerRpc({
	id: "e49527a0504581d8fdb0cbd85bef8ee302d1af1c8b734d04001befa1840e4da5",
	name: "listAuditLogs",
	filename: "src/lib/bridge/titles.ts"
}, (opts) => listAuditLogs.__executeServer(opts));
var listAuditLogs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAuditLogs_createServerFn_handler, async ({ context }) => {
	const actor = await requireActor(context.userId);
	assertPermission(actor, "audit.read");
	return { logs: (await (await getSql())`
      select id, actor_user_id, action, entity_type, entity_id, metadata, created_at
      from bridge_audit_logs order by created_at desc limit 100
    `).map((r) => ({
		id: Number(r.id),
		actorUserId: r.actor_user_id,
		action: r.action,
		entityType: r.entity_type,
		entityId: r.entity_id,
		metadata: r.metadata,
		createdAt: asIso(r.created_at)
	})) };
});
//#endregion
export { advanceTitle_createServerFn_handler, createTitle_createServerFn_handler, getTitle_createServerFn_handler, listAuditLogs_createServerFn_handler, listTitles_createServerFn_handler, updateTitle_createServerFn_handler };
