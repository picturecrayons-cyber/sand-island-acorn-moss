import { Qt as string, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { i as canReadTitle, n as assertPermission } from "./rbac-BsXGxtzc.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { i as authMiddleware, r as getSql } from "./db-4ZlIAIG9.mjs";
import { i as ASSET_KINDS, t as writeAudit } from "./audit-DnLIsRZN.mjs";
import { t as assertNotDevUser } from "./guards-DS4_TMJW.mjs";
import { i as requireActor } from "./session-Bbw5gzIz.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { o as loadTitle } from "./titles-BVmOUiXv.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/assets-UYFdqMGm.js
var UPLOADABLE = /* @__PURE__ */ new Set([
	"DRAFT",
	"UPLOADING",
	"PREPARING"
]);
async function hasLicenseEntitlement(userId, titleId) {
	const rows = await (await getSql())`
    select count(*)::int as n from bridge_entitlements
    where user_id = ${userId} and title_id = ${titleId} and access_type = 'license'
  `;
	return Number(rows[0]?.n ?? 0) > 0;
}
var requestAssetUpload_createServerFn_handler = createServerRpc({
	id: "562a1fa65ed30258c5ee60952bb600a8d63faf5247a385bc1fe84e1bbc58905e",
	name: "requestAssetUpload",
	filename: "src/lib/bridge/assets.ts"
}, (opts) => requestAssetUpload.__executeServer(opts));
var requestAssetUpload = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	kind: _enum(ASSET_KINDS),
	filename: string().min(1).max(120),
	contentType: string().min(3).max(120)
})).handler(requestAssetUpload_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	assertPermission(actor, "asset.sign_upload");
	const title = await loadTitle(data.titleId);
	if (!title) throw new Error("Not found");
	if (title.ownerUserId !== actor.userId && !actor.internalRole) throw new Error("Forbidden");
	if (!UPLOADABLE.has(title.status)) throw new Error("Uploads are closed for this status");
	const { signUpload, titleAssetKey } = await import("./s3.server-DtFyprUr.mjs");
	const key = titleAssetKey({
		ownerUserId: title.ownerUserId,
		titleId: title.id,
		kind: data.kind,
		filename: data.filename
	});
	const signed = await signUpload({
		key,
		contentType: data.contentType
	});
	const id = randomBytes(16).toString("hex");
	const sql = await getSql();
	await sql`
      insert into bridge_assets (id, title_id, kind, s3_key, content_type, created_by)
      values (${id}, ${title.id}, ${data.kind}, ${key}, ${data.contentType}, ${actor.userId})
    `;
	if (data.kind === "poster") await sql`update bridge_titles set poster_key = ${key}, updated_at = now() where id = ${title.id}`;
	if (data.kind === "master") await sql`update bridge_titles set master_key = ${key}, updated_at = now() where id = ${title.id}`;
	await writeAudit({
		actorUserId: actor.userId,
		action: "asset.upload_signed",
		entityType: "bridge_asset",
		entityId: id,
		metadata: {
			titleId: title.id,
			kind: data.kind
		}
	});
	return {
		assetId: id,
		...signed
	};
});
var requestAssetDownload_createServerFn_handler = createServerRpc({
	id: "8c8191541bbf66a50cfa30f7466bdc39f187b81edb9d5e7e9e9f7c2476d804e5",
	name: "requestAssetDownload",
	filename: "src/lib/bridge/assets.ts"
}, (opts) => requestAssetDownload.__executeServer(opts));
var requestAssetDownload = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ assetId: string().min(8) })).handler(requestAssetDownload_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	assertPermission(actor, "asset.sign_download");
	const asset = (await (await getSql())`
      select id, title_id, kind, s3_key from bridge_assets where id = ${data.assetId} limit 1
    `)[0];
	if (!asset) throw new Error("Not found");
	const title = await loadTitle(asset.title_id);
	if (!title || !canReadTitle(actor, title)) throw new Error("Not found");
	const isOwner = title.ownerUserId === actor.userId;
	const isInternal = Boolean(actor.internalRole);
	if (!isOwner && !isInternal) {
		if (asset.kind !== "poster") {
			if (!await hasLicenseEntitlement(actor.userId, title.id)) throw new Error("License entitlement required");
		}
	}
	const { signDownload } = await import("./s3.server-DtFyprUr.mjs");
	const signed = await signDownload({ key: asset.s3_key });
	await writeAudit({
		actorUserId: actor.userId,
		action: "asset.download_signed",
		entityType: "bridge_asset",
		entityId: asset.id
	});
	return signed;
});
var listTitleAssets_createServerFn_handler = createServerRpc({
	id: "8e1e8cc840fcf6b747e9e25c7151f0f1767e173b0bc636e67cf453a9167fa43e",
	name: "listTitleAssets",
	filename: "src/lib/bridge/assets.ts"
}, (opts) => listTitleAssets.__executeServer(opts));
var listTitleAssets = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ titleId: string().min(8) })).handler(listTitleAssets_createServerFn_handler, async ({ context, data }) => {
	const actor = await requireActor(context.userId);
	const title = await loadTitle(data.titleId);
	if (!title || !canReadTitle(actor, title)) throw new Error("Not found");
	return { assets: (await (await getSql())`
      select id, kind, s3_key, content_type, created_at
      from bridge_assets where title_id = ${title.id} order by created_at desc
    `).map((r) => ({
		id: r.id,
		kind: r.kind,
		key: r.s3_key,
		contentType: r.content_type,
		createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at)
	})) };
});
//#endregion
export { listTitleAssets_createServerFn_handler, requestAssetDownload_createServerFn_handler, requestAssetUpload_createServerFn_handler };
