import { Qt as string, Vt as _enum, Wt as boolean, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { s as authMiddleware } from "./db-Cwe07lSL.mjs";
import { n as createSsrRpc } from "./audit-BmREM0Lt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desks-B6sDncOX.js
var submitQcReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	decision: _enum([
		"pass",
		"fail",
		"request_changes"
	]),
	notes: string().max(2e3).optional(),
	picture: boolean(),
	sound: boolean(),
	text: boolean()
})).handler(createSsrRpc("3c55755988dfac3f336b41f5fe88321edd0c4b88893d7d08e24d18a98720aad9"));
var saveTitleRights = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	territories: string().min(2).max(400),
	rightsType: string().min(2).max(80),
	mediaType: string().min(2).max(80),
	startDate: string().optional(),
	endDate: string().optional(),
	exclusive: boolean(),
	exclusions: string().max(1e3).optional(),
	chainOfTitleStatus: _enum([
		"unverified",
		"partial",
		"verified"
	]),
	evidenceNote: string().min(8).max(2e3),
	approve: boolean().optional()
})).handler(createSsrRpc("e269977dd4ada281ae987f302b1893b3ee716d4883210c639eb11204416800bd"));
var listFinancePayments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2fd08f4ab635b72f3b92eb10ec1ba1b07ec697906c14ce6aefc06fe212c66dd7"));
var authorizeDelivery = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	recipientUserId: string().min(4)
})).handler(createSsrRpc("2079420f362a491ad9c046445626deafc4d844c22f071ff3008a80a98fc308ac"));
//#endregion
export { submitQcReview as i, listFinancePayments as n, saveTitleRights as r, authorizeDelivery as t };
