import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as TITLE_STATUS_ORDER } from "./rbac-D3NOb62-.mjs";
import { s as cn } from "./shell-Bt_2kNAX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-rail-D1fP_DKt.js
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	DRAFT: "Draft",
	UPLOADING: "Uploading",
	PREPARING: "Preparing",
	QC_REVIEW: "QC",
	RIGHTS_REVIEW: "Rights",
	LICENSING_READY: "Ready",
	LIVE_FOR_BUYERS: "Live",
	IN_NEGOTIATION: "Deal",
	LICENSED: "Licensed",
	DELIVERED: "Delivered"
};
function StatusRail({ status }) {
	const idx = TITLE_STATUS_ORDER.indexOf(status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid grid-cols-5 gap-1 sm:grid-cols-10",
		children: TITLE_STATUS_ORDER.map((step, i) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("rounded-sm border px-1 py-2 text-center", i === idx ? "border-accent bg-accent/15 text-fg" : i <= idx ? "border-line-strong text-fg" : "border-line text-faint"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-mono text-[10px] tabular-nums tracking-wider",
					children: String(i + 1).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-[10px] uppercase tracking-[0.12em]",
					children: LABELS[step]
				})]
			}, step);
		})
	});
}
function StatusChip({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center rounded-sm border border-line-strong px-2 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent",
		children: status.replaceAll("_", " ")
	});
}
//#endregion
export { StatusRail as n, StatusChip as t };
