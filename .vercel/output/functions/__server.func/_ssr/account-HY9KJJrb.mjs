import { a as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BridgeShell, o as UserButton } from "./shell-Bt_2kNAX.mjs";
import { a as requestEmailVerification } from "./profiles-lweJ-uWB.mjs";
import { t as Button } from "./button-CWYmasbB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as RequireBridge } from "./gate-WKcoHPTz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-HY9KJJrb.js
var import_jsx_runtime = require_jsx_runtime();
function Account() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireBridge, { children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BridgeShell, {
		actor,
		title: "Account",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "grid gap-4 text-sm sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-line p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Mailbox"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: actor.email
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-line p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: actor.accountType.replaceAll("_", " ")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-line p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Organization"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: actor.organizationName ?? "—"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-line p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Internal role"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: actor.internalRole?.replaceAll("_", " ") ?? "none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm border border-line p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted",
						children: "Email verified"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: actor.emailVerified ? "yes" : "no"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResendVerify, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-accent underline-offset-4 hover:underline",
					children: "Public landing"
				})
			]
		})]
	}) });
}
function ResendVerify() {
	const mut = useMutation({
		mutationFn: () => requestEmailVerification(),
		onSuccess: () => toast("Verification mail requested"),
		onError: (err) => toast(err instanceof Error ? err.message : "Mail is not configured")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "outline",
		disabled: mut.isPending,
		onClick: () => mut.mutate(),
		children: "Send verification mail"
	});
}
//#endregion
export { Account as component };
