import { createHmac, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/razorpay-crypto-nOcQvt57.js
function razorpaySignature(secret, body) {
	return createHmac("sha256", secret).update(body).digest("hex");
}
function verifyRazorpaySignature(opts) {
	if (!opts.signature) return false;
	const expected = razorpaySignature(opts.secret, opts.body);
	const a = Buffer.from(expected, "utf8");
	const b = Buffer.from(opts.signature, "utf8");
	if (a.length !== b.length) return false;
	return timingSafeEqual(a, b);
}
function paymentVerifyBody(orderId, paymentId) {
	return `${orderId}|${paymentId}`;
}
//#endregion
export { verifyRazorpaySignature as n, paymentVerifyBody as t };
