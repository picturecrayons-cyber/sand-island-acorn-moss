import { t as bridgeEnv } from "./env-DZXn_v3j.mjs";
import { n as GetObjectCommand, r as S3Client, t as PutObjectCommand } from "../_libs/@aws-sdk/client-s3+[...].mjs";
import { t as getSignedUrl } from "../_libs/aws-sdk__s3-request-presigner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s3.server-DtFyprUr.js
function client() {
	const region = bridgeEnv.awsRegion();
	const access = bridgeEnv.awsAccessKey();
	const secret = bridgeEnv.awsSecretKey();
	const bucket = bridgeEnv.s3Bucket();
	if (!region || !access || !secret || !bucket) throw new Error("Private S3 is not configured");
	return {
		bucket,
		s3: new S3Client({
			region,
			credentials: {
				accessKeyId: access,
				secretAccessKey: secret
			}
		})
	};
}
async function signUpload(opts) {
	const { s3, bucket } = client();
	const command = new PutObjectCommand({
		Bucket: bucket,
		Key: opts.key,
		ContentType: opts.contentType
	});
	return {
		url: await getSignedUrl(s3, command, { expiresIn: opts.expiresIn ?? 900 }),
		key: opts.key,
		bucket,
		method: "PUT"
	};
}
async function signDownload(opts) {
	const { s3, bucket } = client();
	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: opts.key
	});
	return {
		url: await getSignedUrl(s3, command, { expiresIn: opts.expiresIn ?? 300 }),
		key: opts.key,
		bucket,
		method: "GET"
	};
}
function titleAssetKey(opts) {
	const safe = opts.filename.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80);
	return `bridge/${opts.ownerUserId}/${opts.titleId}/${opts.kind}/${Date.now()}-${safe}`;
}
//#endregion
export { signDownload, signUpload, titleAssetKey };
