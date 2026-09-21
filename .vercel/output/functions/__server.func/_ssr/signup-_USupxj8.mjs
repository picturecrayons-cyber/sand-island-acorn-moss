import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as signIn, t as authClient } from "./client-CVqXY6bk.mjs";
import { i as GROK_PROVIDERS } from "./server-BRmYrdoW.mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as BrandMark } from "./shell-DGbQL313.mjs";
import { t as Button } from "./button-COoECf27.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-_USupxj8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Signup() {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		const invite = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("invite") : null;
		if (invite) try {
			sessionStorage.setItem("bridge-invite", invite);
		} catch {}
		const res = await authClient.signUp.email({
			email,
			password,
			name,
			callbackURL: "/onboarding"
		});
		setBusy(false);
		if (res.error) {
			setError(res.error.message ?? "Sign-up failed");
			return;
		}
		navigate({ to: "/onboarding" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-bg p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm space-y-5 rounded-md border border-line bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Create an account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Independent creator, studio, or buyer — chosen after email. Internal desks require an invite."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3",
					onSubmit: (e) => void onSubmit(e),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
							})]
						}),
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
							disabled: busy,
							className: "w-full",
							children: busy ? "Creating…" : "Create account"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(p.providerId, { callbackURL: "/onboarding" }),
						className: "h-11 w-full rounded-sm border border-line-strong text-sm hover:bg-fg/8",
						children: ["Continue with ", p.label]
					}, p.providerId))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "block text-sm text-accent underline-offset-4 hover:underline",
					children: "Already have an account"
				})
			]
		})
	});
}
//#endregion
export { Signup as component };
