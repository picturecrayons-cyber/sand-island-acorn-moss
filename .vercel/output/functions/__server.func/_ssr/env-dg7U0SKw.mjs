import "./db-Cwe07lSL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/env-dg7U0SKw.js
function read(key) {
	return (typeof process === "undefined" ? void 0 : process.env[key]?.trim()) || void 0;
}
var bridgeEnv = {
	supabaseUrl: () => read("SUPABASE_URL") || read("VITE_SUPABASE_URL"),
	supabaseAnon: () => read("VITE_SUPABASE_PUBLISHABLE_KEY") || read("VITE_SUPABASE_ANON_KEY"),
	supabaseService: () => read("SUPABASE_SERVICE_ROLE_KEY"),
	razorpayKeyId: () => read("RAZORPAY_KEY_ID"),
	razorpayKeySecret: () => read("RAZORPAY_KEY_SECRET"),
	razorpayWebhookSecret: () => read("RAZORPAY_WEBHOOK_SECRET"),
	awsRegion: () => read("AWS_REGION") || read("S3_REGION"),
	awsAccessKey: () => read("AWS_ACCESS_KEY_ID"),
	awsSecretKey: () => read("AWS_SECRET_ACCESS_KEY"),
	s3Bucket: () => read("S3_BUCKET"),
	smtpHost: () => read("SMTP_HOST") || read("HOSTINGER_SMTP_HOST") || "smtp.hostinger.com",
	smtpPort: () => read("SMTP_PORT") || "465",
	smtpUser: () => read("SMTP_USER") || read("HOSTINGER_SMTP_USER") || "abijithasokan@crayonspictures.com",
	smtpPass: () => read("SMTP_PASS") || read("HOSTINGER_SMTP_PASS"),
	mailFrom: () => read("MAIL_FROM") || "abijithasokan@crayonspictures.com",
	appUrl: () => read("BETTER_AUTH_URL") || read("APP_URL") || "https://bridge.crayonspictures.com",
	databaseUrl: () => read("DATABASE_URL")
};
function integrationStatus() {
	return {
		postgres: Boolean(bridgeEnv.databaseUrl()),
		supabase: Boolean(bridgeEnv.supabaseUrl() && (bridgeEnv.supabaseAnon() || bridgeEnv.supabaseService())),
		razorpay: Boolean(bridgeEnv.razorpayKeyId() && bridgeEnv.razorpayKeySecret()),
		razorpayWebhook: Boolean(bridgeEnv.razorpayWebhookSecret()),
		s3: Boolean(bridgeEnv.s3Bucket() && bridgeEnv.awsAccessKey() && bridgeEnv.awsSecretKey()),
		mail: Boolean(bridgeEnv.smtpHost() && bridgeEnv.smtpUser() && bridgeEnv.smtpPass())
	};
}
//#endregion
export { integrationStatus as n, bridgeEnv as t };
