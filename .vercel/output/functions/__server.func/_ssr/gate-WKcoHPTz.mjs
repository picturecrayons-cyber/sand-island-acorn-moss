import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useCurrentUserState, r as RedirectToSignIn, t as BrandMark } from "./shell-Bt_2kNAX.mjs";
import { a as requestEmailVerification } from "./profiles-lweJ-uWB.mjs";
import { t as Button } from "./button-CWYmasbB.mjs";
import { n as getBridgeSession } from "./session-vHWwjwFP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gate-WKcoHPTz.js
var import_jsx_runtime = require_jsx_runtime();
function Frame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-bg p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-4 rounded-md border border-line bg-surface p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), children]
		})
	});
}
function RequireBridge({ children, allow }) {
	const { user, isPending } = useCurrentUserState();
	const sessionQ = useQuery({
		queryKey: ["bridge-session"],
		queryFn: () => getBridgeSession(),
		enabled: Boolean(user),
		retry: false
	});
	if (isPending || user && sessionQ.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Opening your desk…"
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (sessionQ.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const profile = sessionQ.data?.profile ?? null;
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	if (allow === "internal" && !profile.internalRole) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: sessionQ.data?.home ?? "/" });
	if (allow && allow !== "internal" && (profile.internalRole || profile.accountType !== (allow === "creator" ? "independent_creator" : allow))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: sessionQ.data?.home ?? "/" });
	if (!profile.emailVerified) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "Verify your email"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm leading-relaxed text-muted",
			children: [
				"Bridge operations require a verified mailbox. A Hostinger message is sent to ",
				profile.email,
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			onClick: () => {
				requestEmailVerification().then(() => toast("Verification mail sent")).catch((err) => toast(err instanceof Error ? err.message : "Transactional email is not configured"));
			},
			children: "Send verification"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/account",
			className: "block text-sm text-accent underline-offset-4 hover:underline",
			children: "Account"
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children(profile) });
}
//#endregion
export { RequireBridge as t };
