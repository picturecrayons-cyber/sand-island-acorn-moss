import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as TITLE_STATUS_ORDER } from "./rbac-BsXGxtzc.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SignedOut, i as SignedIn, o as UserButton, t as BrandMark } from "./shell-DGbQL313.mjs";
import { t as Button } from "./button-COoECf27.mjs";
import { t as getBridgePublicStatus } from "./session-Bbw5gzIz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BcIbZjy4.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const integrations = useQuery({
		queryKey: ["bridge-public"],
		queryFn: () => getBridgePublicStatus()
	}).data?.integrations;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedOut, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "px-3 py-2 text-muted hover:text-fg",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Request desk" })
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedIn, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/onboarding",
						className: "text-sm text-accent",
						children: "Open desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})] })]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "lab-grid border-b border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.28em] text-accent",
							children: "StreamVista OPC Pvt Ltd"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-6xl",
							children: "One title record. Rights before money. Delivery after capture."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base leading-relaxed text-muted",
							children: "Crayons Bridge is the licensing OS for independent creators, studios, and buyers. Invite-only internal desks handle QC, legal, and finance. Nothing is live for buyers until the record is ready."
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
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-14 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Lifecycle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
						children: "Forward-only. Licensed is granted only after a captured Razorpay payment — never by a toggle."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5",
						children: TITLE_STATUS_ORDER.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-sm border border-line bg-surface px-3 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] text-accent tabular-nums",
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: step.replaceAll("_", " ")
							})]
						}, step))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskCard, {
							kicker: "Independent creator",
							title: "Your titles",
							body: "Draft, upload masters to private S3, submit for QC. No catalog storefront."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskCard, {
							kicker: "Studio",
							title: "Slate control",
							body: "Same title record, organization on the profile. Rights review before buyers see a frame."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskCard, {
							kicker: "Buyer",
							title: "Live catalog only",
							body: "Orders are server-signed. Entitlement appears after capture, not after a client callback."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.22em] text-muted",
							children: "Environment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4",
							children: [
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs leading-relaxed text-faint",
							children: "Missing integrations fail closed. This desk does not mint fake revenue, mock sessions, or grant licenses from localStorage."
						})
					]
				})
			})
		] })]
	});
}
function DeskCard({ kicker, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-sm border border-line bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.18em] text-accent",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-display text-xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: body
			})
		]
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
