import { o as __toESM } from "../_runtime.mjs";
import "./db-Cwe07lSL.mjs";
import { t as bridgeEnv } from "./env-dg7U0SKw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mail.server-VNjZiiwB.js
async function sendBridgeMail(opts) {
	const host = bridgeEnv.smtpHost();
	const user = bridgeEnv.smtpUser();
	const pass = bridgeEnv.smtpPass();
	if (!host || !user || !pass) throw new Error("Transactional email is not configured");
	const port = Number(bridgeEnv.smtpPort() || "465");
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
