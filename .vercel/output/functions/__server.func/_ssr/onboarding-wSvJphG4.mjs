import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useCurrentUserState, r as RedirectToSignIn, t as BrandMark } from "./shell-DGbQL313.mjs";
import { r as ACCOUNT_TYPES } from "./audit-DnLIsRZN.mjs";
import { t as completeOnboarding } from "./profiles-VoyXEJ43.mjs";
import { t as Button } from "./button-COoECf27.mjs";
import { n as getBridgeSession } from "./session-Bbw5gzIz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-wSvJphG4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	independent_creator: "Independent creator",
	studio: "Studio",
	buyer: "Buyer"
};
function goHome(home, navigate) {
	if (home === "/creator" || home === "/studio" || home === "/buyer" || home === "/internal") navigate({ to: home });
	else navigate({ to: "/onboarding" });
}
function Onboarding() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const sessionQ = useQuery({
		queryKey: ["bridge-session"],
		queryFn: () => getBridgeSession(),
		enabled: Boolean(user),
		retry: false
	});
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [accountType, setAccountType] = (0, import_react.useState)("independent_creator");
	const [organizationName, setOrganizationName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending || user && sessionQ.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-bg p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Loading session…"
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (sessionQ.data?.profile) goHome(sessionQ.data.home, navigate);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		let inviteToken;
		try {
			inviteToken = sessionStorage.getItem("bridge-invite") ?? void 0;
		} catch {
			inviteToken = void 0;
		}
		try {
			const res = await completeOnboarding({ data: {
				displayName,
				accountType,
				organizationName: organizationName || void 0,
				inviteToken
			} });
			try {
				sessionStorage.removeItem("bridge-invite");
			} catch {}
			goHome(res.home, navigate);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not complete onboarding");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-bg p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => void onSubmit(e),
			className: "w-full max-w-md space-y-5 rounded-md border border-line bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Choose your desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: "This becomes your account type. Internal roles only attach when the invite mailbox matches."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: ["Display name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: displayName,
						onChange: (e) => setDisplayName(e.target.value),
						className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm",
						children: "Account type"
					}), ACCOUNT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-3 rounded-sm border border-line px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "accountType",
							checked: accountType === t,
							onChange: () => setAccountType(t)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: LABELS[t] })]
					}, t))]
				}),
				accountType !== "independent_creator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: ["Organization", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: organizationName,
						onChange: (e) => setOrganizationName(e.target.value),
						className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
					})]
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-accent",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					className: "w-full",
					children: busy ? "Saving…" : "Enter Bridge"
				})
			]
		})
	});
}
//#endregion
export { Onboarding as component };
