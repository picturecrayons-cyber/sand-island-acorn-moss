import { Jt as number, Qt as string, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { i as authMiddleware, r as getSql } from "./db-4ZlIAIG9.mjs";
import { n as createSsrRpc, o as TITLE_STATUSES } from "./audit-DnLIsRZN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/titles-BVmOUiXv.js
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
var createTitle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().min(1).max(160),
	nameMl: string().max(160).optional(),
	synopsis: string().max(4e3).optional(),
	language: string().min(2).max(40).optional(),
	year: number().int().min(1895).max(2100).optional(),
	runtimeMinutes: number().int().min(1).max(600).optional(),
	licensingFeePaise: number().int().min(0).max(5e7).optional()
})).handler(createSsrRpc("387c1a85f98cd09df81d75531a295bb02df85e0b5f5c4bcf32f3b58de1ef0d30"));
var listTitles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d880392499cc5710426ce40644d8f2149c8fadd1b07d6df616a17b100956086e"));
var getTitle = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ id: string().min(8) })).handler(createSsrRpc("f1d3127e9d0d3111d83b20f06e6c3827ca771d7b46b878293909fe1eefef8a2c"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string().min(8),
	name: string().min(1).max(160).optional(),
	nameMl: string().max(160).optional(),
	synopsis: string().max(4e3).optional(),
	language: string().min(2).max(40).optional(),
	year: number().int().min(1895).max(2100).nullable().optional(),
	runtimeMinutes: number().int().min(1).max(600).nullable().optional(),
	licensingFeePaise: number().int().min(0).max(5e7).optional()
})).handler(createSsrRpc("edb62091ac6ddc010b4c4a4e89c31344ae00c5cdaaa5e51e18cb539e7dc0b7c1"));
var advanceTitle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: string().min(8),
	to: _enum(TITLE_STATUSES),
	note: string().max(500).optional()
})).handler(createSsrRpc("c67d17bfb72a1423ff83d7f43b35f7f8d1fea95554e9d363e262becad2f9aef1"));
var listAuditLogs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e49527a0504581d8fdb0cbd85bef8ee302d1af1c8b734d04001befa1840e4da5"));
//#endregion
export { listTitles as a, listAuditLogs as i, createTitle as n, loadTitle as o, getTitle as r, recordTransition as s, advanceTitle as t };
