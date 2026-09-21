import { Qt as string, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { i as authMiddleware } from "./db-4ZlIAIG9.mjs";
import { a as INTERNAL_ROLES, n as createSsrRpc, r as ACCOUNT_TYPES } from "./audit-DnLIsRZN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profiles-VoyXEJ43.js
var completeOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	displayName: string().min(1).max(80),
	accountType: _enum(ACCOUNT_TYPES),
	organizationName: string().max(120).optional(),
	inviteToken: string().optional()
})).handler(createSsrRpc("b466efb616c5fa26ee434ca166a6a895e935f5f14de0b92dc9fc2b0f2faf7e6f"));
var requestEmailVerification = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("6d31762e1a9074cbb826ec43900aa8f14d7c8b3939bd02941c35905689eddd89"));
var confirmEmailVerification = createServerFn({ method: "POST" }).validator(object({ token: string().min(16) })).handler(createSsrRpc("c0cb49ab5c06b9ae2a1d563d2cc308ae51809d8c7545dd8bc7b17aa309cc1afc"));
var requestPasswordReset = createServerFn({ method: "POST" }).validator(object({ email: string().email() })).handler(createSsrRpc("5b6b9bd0962c9759aa891f9dbdbaa38ea7a89d809fd230e0aa37035e6831be09"));
var confirmPasswordReset = createServerFn({ method: "POST" }).validator(object({
	token: string().min(16),
	password: string().min(10).max(72)
})).handler(createSsrRpc("f1ca0e1ab98a32cf654ae610e3d26962c036ea60bdb1a274ec6c1dacc7a6d140"));
var inviteInternalRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	email: string().email(),
	role: _enum(INTERNAL_ROLES)
})).handler(createSsrRpc("23d85896948109f7cb1807cb089c4549d8e41ff1c3191b92e02f50d03eded13a"));
//#endregion
export { requestEmailVerification as a, inviteInternalRole as i, confirmEmailVerification as n, requestPasswordReset as o, confirmPasswordReset as r, completeOnboarding as t };
