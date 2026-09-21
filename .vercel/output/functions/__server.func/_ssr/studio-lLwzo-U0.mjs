import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as BridgeShell } from "./shell-DGbQL313.mjs";
import { t as RequireBridge } from "./gate-BEBMKdvC.mjs";
import { n as TitleList, t as CreateTitleForm } from "./title-desk-bFvpzpWx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-lLwzo-U0.js
var import_jsx_runtime = require_jsx_runtime();
function Studio() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireBridge, {
		allow: "studio",
		children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BridgeShell, {
			actor,
			title: actor.organizationName ?? "Studio desk",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-6 max-w-2xl text-sm leading-relaxed text-muted",
					children: "Studio slate uses the same title record and lifecycle as independent creators."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateTitleForm, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-10 font-display text-2xl",
					children: "Slate"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleList, { empty: "No titles on this slate yet." })
				})
			]
		})
	});
}
//#endregion
export { Studio as component };
