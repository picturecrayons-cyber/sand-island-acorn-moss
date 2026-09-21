import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as cn } from "./shell-Bt_2kNAX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CWYmasbB.js
var import_jsx_runtime = require_jsx_runtime();
var styles = {
	primary: "bg-accent text-accent-fg hover:brightness-110",
	ghost: "bg-fg/8 text-fg hover:bg-fg/14",
	outline: "border border-line-strong text-fg hover:bg-fg/8",
	danger: "border border-line-strong text-fg hover:bg-fg/10"
};
function Button({ variant = "primary", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex h-11 min-h-11 items-center justify-center gap-2 rounded-sm px-4 text-sm font-medium transition-[transform,background-color,filter] duration-150 active:scale-[0.98] disabled:opacity-50", styles[variant], className),
		...props
	});
}
//#endregion
export { Button as t };
