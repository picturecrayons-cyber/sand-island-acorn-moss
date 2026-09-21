import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as BrandMark } from "./shell-DGbQL313.mjs";
import { n as confirmEmailVerification } from "./profiles-VoyXEJ43.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-D7yuvs1_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Verify() {
	const token = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("token") ?? "" : "";
	const mut = useMutation({ mutationFn: () => confirmEmailVerification({ data: { token } }) });
	(0, import_react.useEffect)(() => {
		if (token) mut.mutate();
	}, [token]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-bg p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm space-y-5 rounded-md border border-line bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl",
					children: "Email verification"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: [
						mut.isPending && "Confirming…",
						mut.isSuccess && "Mailbox confirmed. You can open your desk.",
						mut.isError && (mut.error instanceof Error ? mut.error.message : "Link is invalid or expired."),
						!token && "Missing token."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/onboarding",
					className: "text-sm text-accent underline-offset-4 hover:underline",
					children: "Continue"
				})
			]
		})
	});
}
//#endregion
export { Verify as component };
