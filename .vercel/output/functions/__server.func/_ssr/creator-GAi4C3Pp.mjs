import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as BridgeShell } from "./shell-Bt_2kNAX.mjs";
import { t as RequireBridge } from "./gate-WKcoHPTz.mjs";
import { n as TitleList, t as CreateTitleForm } from "./title-desk-B4unySbF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/creator-GAi4C3Pp.js
var import_jsx_runtime = require_jsx_runtime();
function Creator() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireBridge, {
		allow: "creator",
		children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BridgeShell, {
			actor,
			title: "Creator desk",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-6 max-w-2xl text-sm leading-relaxed text-muted",
					children: "Each film is one title record. Upload stays on private S3. Buyers cannot see drafts."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateTitleForm, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-10 font-display text-2xl",
					children: "Your titles"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleList, { empty: "No titles yet. Open a draft to begin the chain." })
				})
			]
		})
	});
}
//#endregion
export { Creator as component };
