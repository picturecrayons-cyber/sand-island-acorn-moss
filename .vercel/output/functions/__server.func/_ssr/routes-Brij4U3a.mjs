import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SignedOut, i as SignedIn, o as UserButton, t as BrandMark } from "./shell-Bt_2kNAX.mjs";
import { t as Button } from "./button-CWYmasbB.mjs";
import { t as getBridgePublicStatus } from "./session-vHWwjwFP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Brij4U3a.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const integrations = useQuery({
		queryKey: ["bridge-public"],
		queryFn: () => getBridgePublicStatus()
	}).data?.integrations;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-svh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedOut, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "px-3 py-2 text-muted hover:text-fg",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Create an account" })
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedIn, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/onboarding",
						className: "text-sm text-accent",
						children: "Open desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})] })]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			id: "main",
			className: "mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.28em] text-accent",
					children: "StreamVista OPC Pvt Ltd"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-5xl",
					children: "Crayons Bridge"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-lg text-muted",
					children: "Licensing OS for independent creators, studios and buyers."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-sm leading-relaxed text-muted",
					children: "One title record. Rights before money. Delivery after capture."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Create an account" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							children: "Sign in"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 max-w-xl text-sm leading-relaxed text-faint",
					children: "Private control plane — not a public catalog. Invite-only QC, legal, and finance desks. Licensed only after a captured Razorpay payment."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-12 grid grid-cols-2 gap-2 text-sm sm:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvChip, {
							label: "Postgres",
							ok: integrations?.postgres
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvChip, {
							label: "S3",
							ok: integrations?.s3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvChip, {
							label: "Razorpay",
							ok: integrations?.razorpay
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvChip, {
							label: "Mail",
							ok: integrations?.mail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvChip, {
							label: "Supabase pin",
							ok: integrations?.supabase
						})
					]
				})
			]
		})]
	});
}
function EnvChip({ label, ok }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center justify-between rounded-sm border border-line px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: ok ? "text-ok" : "text-faint",
			children: ok ? "configured" : "unset"
		})]
	});
}
//#endregion
export { Home as component };
