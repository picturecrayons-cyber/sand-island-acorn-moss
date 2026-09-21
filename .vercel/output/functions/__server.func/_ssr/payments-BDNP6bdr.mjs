import { Qt as string, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { i as canReadTitle, n as assertPermission, o as isBuyerVisible } from "./rbac-BsXGxtzc.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { i as authMiddleware, r as getSql } from "./db-4ZlIAIG9.mjs";
import { t as writeAudit } from "./audit-DnLIsRZN.mjs";
import { t as assertNotDevUser } from "./guards-DS4_TMJW.mjs";
import { i as requireActor, r as loadActor } from "./session-Bbw5gzIz.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { o as loadTitle, s as recordTransition } from "./titles-BVmOUiXv.mjs";
import { t as bridgeEnv } from "./env-DZXn_v3j.mjs";
import { n as verifyRazorpaySignature, t as paymentVerifyBody } from "./razorpay-crypto-nOcQvt57.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-BDNP6bdr.js
function requireRazorpayKeys() {
	const keyId = bridgeEnv.razorpayKeyId();
	const keySecret = bridgeEnv.razorpayKeySecret();
	if (!keyId || !keySecret) throw new Error("Razorpay is not configured");
	return {
		keyId,
		keySecret
	};
}
async function razorpayFetch(path, init = {}) {
	const { keyId, keySecret } = requireRazorpayKeys();
	const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
	const res = await fetch(`https://api.razorpay.com/v1${path}`, {
		...init,
		headers: {
			Authorization: `Basic ${auth}`,
			"Content-Type": "application/json",
			...init.headers ?? {}
		}
	});
	if (!res.ok) throw new Error("Razorpay request failed");
	return await res.json();
}
async function grantFromCapturedPayment(opts) {
	const captured = await razorpayFetch(`/payments/${opts.paymentId}`);
	if (captured.status !== "captured") throw new Error("Payment is not captured");
	if (captured.order_id !== opts.orderId) throw new Error("Payment does not match order");
	const sql = await getSql();
	const payment = (await sql`
    select id, user_id, title_id, amount_paise, status
    from bridge_payments where provider_order_id = ${opts.orderId} limit 1
  `)[0];
	if (!payment) throw new Error("Unknown order");
	if (captured.amount !== payment.amount_paise) throw new Error("Amount mismatch");
	await sql`
    update bridge_payments
    set status = ${"captured"},
        provider_payment_id = ${opts.paymentId},
        verified_at = now()
    where id = ${payment.id} and status <> 'captured'
  `;
	if (!payment.title_id) return {
		paymentId: payment.id,
		entitled: false
	};
	await sql`
    insert into bridge_entitlements (user_id, title_id, payment_id, access_type)
    values (${payment.user_id}, ${payment.title_id}, ${payment.id}, ${"license"})
    on conflict (user_id, title_id, access_type) do nothing
  `;
	const title = await loadTitle(payment.title_id);
	if (title && (title.status === "LIVE_FOR_BUYERS" || title.status === "IN_NEGOTIATION")) await recordTransition({
		titleId: title.id,
		from: title.status,
		to: "LICENSED",
		actorUserId: opts.actorUserId ?? payment.user_id,
		note: "razorpay captured"
	});
	await writeAudit({
		actorUserId: opts.actorUserId ?? payment.user_id,
		action: "payment.captured",
		entityType: "bridge_payment",
		entityId: payment.id,
		metadata: { titleId: payment.title_id }
	});
	return {
		paymentId: payment.id,
		entitled: true,
		titleId: payment.title_id
	};
}
var getCheckoutConfig_createServerFn_handler = createServerRpc({
	id: "ef121c3f8e7f21087760620523c7718f05e899800ebbb26a3897e16608a5fbb0",
	name: "getCheckoutConfig",
	filename: "src/lib/bridge/payments.ts"
}, (opts) => getCheckoutConfig.__executeServer(opts));
var getCheckoutConfig = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getCheckoutConfig_createServerFn_handler, async ({ context }) => {
	assertNotDevUser(context.userId);
	const { keyId } = requireRazorpayKeys();
	return { keyId };
});
var createLicenseOrder_createServerFn_handler = createServerRpc({
	id: "f9cceeccb0d173d1876db848593126d72b8664d38825d97a99b6499d2372cf1f",
	name: "createLicenseOrder",
	filename: "src/lib/bridge/payments.ts"
}, (opts) => createLicenseOrder.__executeServer(opts));
var createLicenseOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	idempotencyKey: string().min(8).max(80)
})).handler(createLicenseOrder_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await requireActor(context.userId);
	assertPermission(actor, "payment.create_order");
	const title = await loadTitle(data.titleId);
	if (!title || !canReadTitle(actor, title)) throw new Error("Not found");
	if (!isBuyerVisible(title.status) && title.status !== "LIVE_FOR_BUYERS") throw new Error("Title is not available for licensing");
	if (title.status !== "LIVE_FOR_BUYERS" && title.status !== "IN_NEGOTIATION") throw new Error("Title is not open for a new license order");
	if (title.licensingFeePaise <= 0) throw new Error("Licensing fee is not set");
	const { keyId } = requireRazorpayKeys();
	const sql = await getSql();
	const existing = await sql`
      select id, provider_order_id, amount_paise, status
      from bridge_payments
      where user_id = ${actor.userId} and purpose = ${"title_license"} and idempotency_key = ${data.idempotencyKey}
      limit 1
    `;
	if (existing[0]?.provider_order_id) return {
		orderId: existing[0].provider_order_id,
		amountPaise: existing[0].amount_paise,
		currency: "INR",
		keyId,
		paymentRecordId: existing[0].id
	};
	const rz = await razorpayFetch("/orders", {
		method: "POST",
		body: JSON.stringify({
			amount: title.licensingFeePaise,
			currency: "INR",
			receipt: data.idempotencyKey.slice(0, 40),
			notes: {
				titleId: title.id,
				userId: actor.userId
			}
		})
	});
	const id = randomBytes(16).toString("hex");
	await sql`
      insert into bridge_payments (
        id, user_id, title_id, purpose, provider_order_id, amount_paise, currency, status, idempotency_key
      ) values (
        ${id}, ${actor.userId}, ${title.id}, ${"title_license"}, ${rz.id},
        ${title.licensingFeePaise}, ${"INR"}, ${"created"}, ${data.idempotencyKey}
      )
      on conflict (user_id, purpose, idempotency_key) do nothing
    `;
	if (title.status === "LIVE_FOR_BUYERS") await recordTransition({
		titleId: title.id,
		from: "LIVE_FOR_BUYERS",
		to: "IN_NEGOTIATION",
		actorUserId: actor.userId,
		note: "license order opened"
	});
	await writeAudit({
		actorUserId: actor.userId,
		action: "payment.order_created",
		entityType: "bridge_payment",
		entityId: id,
		metadata: { titleId: title.id }
	});
	return {
		orderId: rz.id,
		amountPaise: title.licensingFeePaise,
		currency: "INR",
		keyId,
		paymentRecordId: id
	};
});
var verifyLicensePayment_createServerFn_handler = createServerRpc({
	id: "6815e9544ea80ff437e0e6e041e34697285cc94831b94f5e76a7c3e74a0e06ad",
	name: "verifyLicensePayment",
	filename: "src/lib/bridge/payments.ts"
}, (opts) => verifyLicensePayment.__executeServer(opts));
var verifyLicensePayment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	orderId: string().min(4),
	paymentId: string().min(4),
	signature: string().min(8)
})).handler(verifyLicensePayment_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const actor = await loadActor(context.userId);
	if (!actor) throw new Error("Profile required");
	const { keySecret } = requireRazorpayKeys();
	if (!verifyRazorpaySignature({
		secret: keySecret,
		body: paymentVerifyBody(data.orderId, data.paymentId),
		signature: data.signature
	})) throw new Error("Invalid payment signature");
	return grantFromCapturedPayment({
		orderId: data.orderId,
		paymentId: data.paymentId,
		actorUserId: actor.userId
	});
});
var listOwnEntitlements_createServerFn_handler = createServerRpc({
	id: "8ce729b570f422e0b295e10aad5a15cb7303f7e12a85a3cc693a49878a959f1c",
	name: "listOwnEntitlements",
	filename: "src/lib/bridge/payments.ts"
}, (opts) => listOwnEntitlements.__executeServer(opts));
var listOwnEntitlements = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listOwnEntitlements_createServerFn_handler, async ({ context }) => {
	const actor = await requireActor(context.userId);
	assertPermission(actor, "entitlement.read_own");
	return { entitlements: (await (await getSql())`
      select title_id, payment_id, access_type, created_at
      from bridge_entitlements where user_id = ${actor.userId}
      order by created_at desc
    `).map((r) => ({
		titleId: r.title_id,
		paymentId: r.payment_id,
		accessType: r.access_type,
		createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at)
	})) };
});
//#endregion
export { createLicenseOrder_createServerFn_handler, getCheckoutConfig_createServerFn_handler, listOwnEntitlements_createServerFn_handler, verifyLicensePayment_createServerFn_handler };
