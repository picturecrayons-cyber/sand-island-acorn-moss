import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as hasPermission } from "./rbac-BsXGxtzc.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BridgeShell } from "./shell-DGbQL313.mjs";
import { a as INTERNAL_ROLES } from "./audit-DnLIsRZN.mjs";
import { i as inviteInternalRole } from "./profiles-VoyXEJ43.mjs";
import { t as Button } from "./button-COoECf27.mjs";
import { t as RequireBridge } from "./gate-BEBMKdvC.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as listTitles, i as listAuditLogs } from "./titles-BVmOUiXv.mjs";
import { t as StatusChip } from "./status-rail-BDn2UAZh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/internal-9Ud-WS-U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Internal() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireBridge, {
		allow: "internal",
		children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BridgeShell, {
			actor,
			title: "Internal desk",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-6 text-sm text-muted",
				children: [
					actor.internalRole?.replaceAll("_", " "),
					" · ",
					actor.email
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalBody, { canInvite: hasPermission(actor, "users.invite_internal") })]
		})
	});
}
function InternalBody({ canInvite }) {
	const titlesQ = useQuery({
		queryKey: ["bridge-titles"],
		queryFn: () => listTitles()
	});
	const logsQ = useQuery({
		queryKey: ["bridge-audit"],
		queryFn: () => listAuditLogs()
	});
	const titles = titlesQ.data?.titles ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10",
		children: [
			canInvite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteForm, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Titles"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line rounded-sm border border-line",
				children: titles.length ? titles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/title/$id",
					params: { id: t.id },
					className: "flex flex-wrap items-center justify-between gap-3 px-4 py-4 hover:bg-fg/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: t.status })]
				}) }, t.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-6 text-sm text-muted",
					children: "No titles in the pipeline."
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Audit"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2 font-mono text-xs text-muted",
				children: (logsQ.data?.logs ?? []).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-sm border border-line px-3 py-2",
					children: [
						l.createdAt,
						" · ",
						l.action,
						" · ",
						l.entityType,
						" · ",
						l.entityId
					]
				}, l.id))
			})] })
		]
	});
}
function InviteForm() {
	const qc = useQueryClient();
	const [email, setEmail] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("viewer");
	const mut = useMutation({
		mutationFn: () => inviteInternalRole({ data: {
			email,
			role
		} }),
		onSuccess: () => {
			toast("Invite sent");
			qc.invalidateQueries({ queryKey: ["bridge-audit"] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Invite failed")
	});
	function onSubmit(e) {
		e.preventDefault();
		mut.mutate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "grid gap-3 rounded-sm border border-line bg-surface p-4 sm:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm sm:col-span-2",
				children: ["Invite email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Role", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: role,
					onChange: (e) => setRole(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3",
					children: INTERNAL_ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: r,
						children: r.replaceAll("_", " ")
					}, r))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: mut.isPending,
				children: "Send invite"
			})
		]
	});
}
//#endregion
export { Internal as component };
