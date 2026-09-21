import { o as __toESM } from "../_runtime.mjs";
import { t as bridgeEnv } from "./env-DZXn_v3j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mail.server-xvEHZV3X.js
async function sendBridgeMail(opts) {
	const host = bridgeEnv.smtpHost();
	const user = bridgeEnv.smtpUser();
	const pass = bridgeEnv.smtpPass();
	if (!host || !user || !pass) throw new Error("Transactional email is not configured");
	const port = Number(bridgeEnv.smtpPort() || "587");
	await (await import("../_libs/nodemailer.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).createTransport({
		host,
		port,
		secure: port === 465,
		auth: {
			user,
			pass
		}
	}).sendMail({
		from: bridgeEnv.mailFrom() || "abijithasokan@crayonspictures.com",
		to: opts.to,
		subject: opts.subject,
		text: opts.text
	});
}
//#endregion
export { sendBridgeMail };
