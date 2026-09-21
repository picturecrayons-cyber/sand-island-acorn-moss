import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as hasPermission } from "./rbac-D3NOb62-.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BridgeShell, s as cn } from "./shell-Bt_2kNAX.mjs";
import { a as INTERNAL_ROLES } from "./audit-BmREM0Lt.mjs";
import { i as inviteInternalRole } from "./profiles-lweJ-uWB.mjs";
import { t as Button } from "./button-CWYmasbB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as RequireBridge } from "./gate-WKcoHPTz.mjs";
import { a as listTitles, i as listAuditLogs } from "./titles-DSuKDEjJ.mjs";
import { t as StatusChip } from "./status-rail-D1fP_DKt.mjs";
import { n as listFinancePayments } from "./desks-B6sDncOX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/internal-B2P5xLRd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DESKS = [
	"overview",
	"titles",
	"qc",
	"rights",
	"finance",
	"delivery",
	"audit",
	"settings"
];
function Internal() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireBridge, {
		allow: "internal",
		children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BridgeShell, {
			actor,
			title: "Operations desk",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-6 text-sm text-muted",
				children: [
					actor.internalRole?.replaceAll("_", " "),
					" · ",
					actor.email
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalBody, {
				canInvite: hasPermission(actor, "users.invite_internal"),
				canFinance: hasPermission(actor, "finance.read"),
				canAudit: hasPermission(actor, "audit.read")
			})]
		})
	});
}
function InternalBody({ canInvite, canFinance, canAudit }) {
	const [desk, setDesk] = (0, import_react.useState)("overview");
	const titles = useQuery({
		queryKey: ["bridge-titles"],
		queryFn: () => listTitles()
	}).data?.titles ?? [];
	const qcQueue = titles.filter((t) => t.status === "QC_REVIEW");
	const rightsQueue = titles.filter((t) => t.status === "RIGHTS_REVIEW");
	const deliveryQueue = titles.filter((t) => t.status === "LICENSED");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-wrap gap-1 border-b border-line pb-3 text-sm",
		children: DESKS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setDesk(d),
			className: cn("rounded-sm px-3 py-2 capitalize", desk === d ? "bg-surface text-fg" : "text-muted hover:text-fg"),
			children: d
		}, d))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8",
		children: [
			desk === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
				titles,
				qc: qcQueue.length,
				rights: rightsQueue.length,
				licensed: deliveryQueue.length
			}) : null,
			desk === "titles" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleQueue, {
				titles,
				empty: "No titles in the pipeline."
			}) : null,
			desk === "qc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleQueue, {
				titles: qcQueue,
				empty: "No titles in QC review."
			}) : null,
			desk === "rights" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleQueue, {
				titles: rightsQueue,
				empty: "No titles in rights review."
			}) : null,
			desk === "finance" ? canFinance ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceDesk, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Unauthorized."
			}) : null,
			desk === "delivery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleQueue, {
				titles: deliveryQueue,
				empty: "No licensed titles waiting on delivery."
			}) : null,
			desk === "audit" ? canAudit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditDesk, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Unauthorized."
			}) : null,
			desk === "settings" ? canInvite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteForm, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No settings for this role."
			}) : null
		]
	})] });
}
function Overview({ titles, qc, rights, licensed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
				label: "Titles",
				value: titles.length
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
				label: "QC queue",
				value: qc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
				label: "Rights queue",
				value: rights
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, {
				label: "Awaiting delivery",
				value: licensed
			})
		]
	});
}
function Count({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-sm border border-line bg-surface px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[11px] uppercase tracking-[0.18em] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl tabular-nums",
			children: value
		})]
	});
}
function TitleQueue({ titles, empty }) {
	if (!titles.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: empty
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-line rounded-sm border border-line",
		children: titles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/title/$id",
			params: { id: t.id },
			className: "flex flex-wrap items-center justify-between gap-3 px-4 py-4 hover:bg-fg/5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: t.status })]
		}) }, t.id))
	});
}
function FinanceDesk() {
	const q = useQuery({
		queryKey: ["bridge-finance"],
		queryFn: () => listFinancePayments()
	});
	const payments = q.data?.payments ?? [];
	if (q.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading payments…"
	});
	if (!payments.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No captured payments."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-line rounded-sm border border-line font-mono text-xs",
		children: payments.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				p.status,
				" · ",
				p.id.slice(0, 8),
				" · title ",
				p.titleId?.slice(0, 8) ?? "—"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", (p.amountPaise / 100).toFixed(0)] })]
		}, p.id))
	});
}
function AuditDesk() {
	const logs = useQuery({
		queryKey: ["bridge-audit"],
		queryFn: () => listAuditLogs()
	}).data?.logs ?? [];
	if (!logs.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No audit events yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2 font-mono text-xs text-muted",
		children: logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-sm border border-line px-3 py-2",
			children: [
				l.createdAt,
				" · ",
				l.action,
				l.previousState ? ` · ${l.previousState}→${l.newState}` : "",
				l.reason ? ` · ${l.reason}` : "",
				" · ",
				l.entityId
			]
		}, l.id))
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
