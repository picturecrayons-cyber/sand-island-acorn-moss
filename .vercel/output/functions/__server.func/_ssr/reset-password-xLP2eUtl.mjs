import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as BrandMark } from "./shell-DGbQL313.mjs";
import { r as confirmPasswordReset } from "./profiles-VoyXEJ43.mjs";
import { t as Button } from "./button-COoECf27.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-xLP2eUtl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reset() {
	const navigate = useNavigate();
	const token = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("token") ?? "" : "";
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			await confirmPasswordReset({ data: {
				token,
				password
			} });
			navigate({ to: "/login" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Reset failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-bg p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm space-y-5 rounded-md border border-line bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "New password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3",
					onSubmit: (e) => void onSubmit(e),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "password",
								minLength: 10,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-accent",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy || !token,
							className: "w-full",
							children: busy ? "Saving…" : "Update password"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "block text-sm text-accent underline-offset-4 hover:underline",
					children: "Back to sign in"
				})
			]
		})
	});
}
//#endregion
export { Reset as component };
