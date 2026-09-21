import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BridgeShell } from "./shell-Bt_2kNAX.mjs";
import { t as Button } from "./button-CWYmasbB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as RequireBridge } from "./gate-WKcoHPTz.mjs";
import { a as listTitles } from "./titles-DSuKDEjJ.mjs";
import { t as StatusChip } from "./status-rail-D1fP_DKt.mjs";
import { a as verifyLicensePayment, i as listOwnEntitlements, r as createLicenseOrder } from "./router-Cn6O2SV2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buyer-CRtJl3ah.js
var import_jsx_runtime = require_jsx_runtime();
function loadRazorpay() {
	return new Promise((resolve, reject) => {
		const w = window;
		if (w.Razorpay) {
			resolve(w.Razorpay);
			return;
		}
		const s = document.createElement("script");
		s.src = "https://checkout.razorpay.com/v1/checkout.js";
		s.onload = () => {
			const ctor = window.Razorpay;
			if (ctor) resolve(ctor);
			else reject(/* @__PURE__ */ new Error("Razorpay checkout missing"));
		};
		s.onerror = () => reject(/* @__PURE__ */ new Error("Razorpay checkout failed to load"));
		document.head.appendChild(s);
	});
}
function Buyer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireBridge, {
		allow: "buyer",
		children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BridgeShell, {
			actor,
			title: "Buyer catalog",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Only titles at LIVE FOR BUYERS appear here. A license is an entitlement after captured payment."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyerBody, {})]
		})
	});
}
function BuyerBody() {
	const qc = useQueryClient();
	const titlesQ = useQuery({
		queryKey: ["bridge-titles"],
		queryFn: () => listTitles()
	});
	const entQ = useQuery({
		queryKey: ["bridge-entitlements"],
		queryFn: () => listOwnEntitlements()
	});
	const entitled = new Set(entQ.data?.entitlements.map((e) => e.titleId));
	const order = useMutation({
		mutationFn: async (titleId) => {
			const created = await createLicenseOrder({ data: {
				titleId,
				idempotencyKey: `lic-${titleId}`
			} });
			const Razorpay = await loadRazorpay();
			await new Promise((resolve, reject) => {
				new Razorpay({
					key: created.keyId,
					amount: created.amountPaise,
					currency: created.currency,
					order_id: created.orderId,
					handler: (res) => {
						verifyLicensePayment({ data: {
							orderId: res.razorpay_order_id,
							paymentId: res.razorpay_payment_id,
							signature: res.razorpay_signature
						} }).then(() => resolve()).catch(reject);
					}
				}).open();
			});
		},
		onSuccess: () => {
			toast("Payment captured — entitlement recorded");
			qc.invalidateQueries({ queryKey: ["bridge-titles"] });
			qc.invalidateQueries({ queryKey: ["bridge-entitlements"] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Payment did not complete")
	});
	const titles = titlesQ.data?.titles ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: !titles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "No live titles yet. Nothing is for sale until rights clear and the title is published for buyers."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-line rounded-sm border border-line",
			children: titles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center justify-between gap-3 px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/title/$id",
					params: { id: t.id },
					className: "font-medium hover:text-accent",
					children: t.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [t.language, t.licensingFeePaise > 0 ? ` · ₹${(t.licensingFeePaise / 100).toFixed(0)}` : " · fee unset"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: t.status }), entitled.has(t.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-ok",
						children: "Licensed"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						disabled: order.isPending || t.licensingFeePaise <= 0,
						onClick: () => order.mutate(t.id),
						children: "License"
					})]
				})]
			}, t.id))
		})
	});
}
//#endregion
export { Buyer as component };
