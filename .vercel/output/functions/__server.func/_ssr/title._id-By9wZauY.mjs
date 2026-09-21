import { Qt as string, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as hasPermission, c as permissionForTransition, s as nextStatus } from "./rbac-BsXGxtzc.mjs";
import { n as BridgeShell } from "./shell-DGbQL313.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { i as authMiddleware } from "./db-4ZlIAIG9.mjs";
import { i as ASSET_KINDS, n as createSsrRpc } from "./audit-DnLIsRZN.mjs";
import { t as Button } from "./button-COoECf27.mjs";
import { t as RequireBridge } from "./gate-BEBMKdvC.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as getTitle, t as advanceTitle } from "./titles-BVmOUiXv.mjs";
import { n as StatusRail } from "./status-rail-BDn2UAZh.mjs";
import { n as Route } from "./router-CiZIptLm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/title._id-By9wZauY.js
var import_jsx_runtime = require_jsx_runtime();
var requestAssetUpload = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	kind: _enum(ASSET_KINDS),
	filename: string().min(1).max(120),
	contentType: string().min(3).max(120)
})).handler(createSsrRpc("562a1fa65ed30258c5ee60952bb600a8d63faf5247a385bc1fe84e1bbc58905e"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ assetId: string().min(8) })).handler(createSsrRpc("8c8191541bbf66a50cfa30f7466bdc39f187b81edb9d5e7e9e9f7c2476d804e5"));
var listTitleAssets = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ titleId: string().min(8) })).handler(createSsrRpc("8e1e8cc840fcf6b747e9e25c7151f0f1767e173b0bc636e67cf453a9167fa43e"));
function TitlePage() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireBridge, { children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BridgeShell, {
		actor,
		title: "Title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBody, {
			id,
			actor
		})
	}) });
}
function TitleBody({ id, actor }) {
	const qc = useQueryClient();
	const titleQ = useQuery({
		queryKey: ["bridge-title", id],
		queryFn: () => getTitle({ data: { id } })
	});
	const assetsQ = useQuery({
		queryKey: ["bridge-assets", id],
		queryFn: () => listTitleAssets({ data: { titleId: id } })
	});
	const title = titleQ.data?.title;
	const nxt = title ? nextStatus(title.status) : null;
	const perm = title && nxt ? permissionForTransition(title.status, nxt) : null;
	const canAdvance = Boolean(title && nxt && nxt !== "LICENSED" && perm && hasPermission(actor, perm));
	const canUpload = title && hasPermission(actor, "asset.sign_upload") && (title.ownerUserId === actor.userId || Boolean(actor.internalRole)) && (title.status === "DRAFT" || title.status === "UPLOADING" || title.status === "PREPARING");
	const advance = useMutation({
		mutationFn: () => {
			if (!title || !nxt) throw new Error("No forward step");
			return advanceTitle({ data: {
				id: title.id,
				to: nxt
			} });
		},
		onSuccess: () => {
			toast("Lifecycle advanced");
			qc.invalidateQueries({ queryKey: ["bridge-title", id] });
			qc.invalidateQueries({ queryKey: ["bridge-titles"] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Advance failed")
	});
	if (titleQ.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading title…"
	});
	if (!title) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Title not found."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: title.name
				}),
				title.nameMl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: title.nameMl
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						title.language,
						title.year ? ` · ${title.year}` : "",
						title.runtimeMinutes ? ` · ${title.runtimeMinutes} min` : "",
						title.licensingFeePaise > 0 ? ` · ₹${(title.licensingFeePaise / 100).toFixed(0)}` : ""
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRail, { status: title.status }),
			title.synopsis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-sm leading-relaxed text-muted",
				children: title.synopsis
			}) : null,
			canAdvance ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				disabled: advance.isPending,
				onClick: () => advance.mutate(),
				children: ["Advance to ", nxt?.replaceAll("_", " ")]
			}) : nxt === "LICENSED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Licensed is granted only after a captured Razorpay payment."
			}) : null,
			canUpload ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadPanel, { titleId: title.id }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Assets"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2 text-sm",
				children: (assetsQ.data?.assets ?? []).length ? (assetsQ.data?.assets ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-sm border border-line px-3 py-2 font-mono text-xs",
					children: [
						a.kind,
						" · ",
						a.id
					]
				}, a.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-muted",
					children: "No private objects yet."
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Events"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-2 font-mono text-xs text-muted",
				children: (titleQ.data?.events ?? []).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					e.createdAt,
					" · ",
					e.from ?? "—",
					" → ",
					e.to
				] }, `${e.createdAt}-${i}`))
			})] })
		]
	});
}
function UploadPanel({ titleId }) {
	const qc = useQueryClient();
	const mut = useMutation({
		mutationFn: async (file) => {
			const signed = await requestAssetUpload({ data: {
				titleId,
				kind: file.type.startsWith("image/") ? "poster" : "master",
				filename: file.name,
				contentType: file.type || "application/octet-stream"
			} });
			if (!(await fetch(signed.url, {
				method: signed.method,
				headers: { "Content-Type": file.type || "application/octet-stream" },
				body: file
			})).ok) throw new Error("S3 upload failed");
		},
		onSuccess: () => {
			toast("Object stored");
			qc.invalidateQueries({ queryKey: ["bridge-assets", titleId] });
			qc.invalidateQueries({ queryKey: ["bridge-title", titleId] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Upload failed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block rounded-sm border border-dashed border-line-strong p-4 text-sm",
		children: ["Upload poster or master", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "file",
			className: "mt-2 block w-full text-sm",
			onChange: (e) => {
				const file = e.target.files?.[0];
				if (file) mut.mutate(file);
			}
		})]
	});
}
//#endregion
export { TitlePage as component };
