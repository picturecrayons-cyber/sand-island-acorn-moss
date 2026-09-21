import { Qt as string, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { l as workspaceHome, n as assertPermission } from "./rbac-D3NOb62-.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { r as getSql, s as authMiddleware } from "./db-Cwe07lSL.mjs";
import { a as INTERNAL_ROLES, r as ACCOUNT_TYPES, t as writeAudit } from "./audit-BmREM0Lt.mjs";
import { t as assertNotDevUser } from "./guards-DS4_TMJW.mjs";
import { r as loadActor } from "./session-vHWwjwFP.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { t as bridgeEnv } from "./env-dg7U0SKw.mjs";
import { createHash, randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/profiles-DhOEa3DR.js
function tokenPair() {
	const token = randomBytes(32).toString("hex");
	return {
		token,
		hash: createHash("sha256").update(token).digest("hex")
	};
}
async function mail(opts) {
	const { sendBridgeMail } = await import("./mail.server-VNjZiiwB.mjs");
	return sendBridgeMail(opts);
}
var completeOnboarding_createServerFn_handler = createServerRpc({
	id: "b466efb616c5fa26ee434ca166a6a895e935f5f14de0b92dc9fc2b0f2faf7e6f",
	name: "completeOnboarding",
	filename: "src/lib/bridge/profiles.ts"
}, (opts) => completeOnboarding.__executeServer(opts));
var completeOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	displayName: string().min(1).max(80),
	accountType: _enum(ACCOUNT_TYPES),
	organizationName: string().max(120).optional(),
	inviteToken: string().optional()
})).handler(completeOnboarding_createServerFn_handler, async ({ context, data }) => {
	assertNotDevUser(context.userId);
	const sql = await getSql();
	const existing = await loadActor(context.userId);
	if (existing) return {
		home: workspaceHome(existing),
		profile: existing
	};
	const emailRows = await sql`
      select email, "emailVerified", name from "user" where id = ${context.userId} limit 1
    `;
	const email = emailRows[0]?.email;
	if (!email) throw new Error("Account email is required");
	const verified = !!emailRows[0]?.emailVerified;
	let internalRole = null;
	let invitedBy = null;
	if (data.inviteToken) {
		const inv = (await sql`
        select id, email, internal_role, invited_by, expires_at, accepted_at
        from bridge_invites where token_hash = ${createHash("sha256").update(data.inviteToken).digest("hex")} limit 1
      `)[0];
		if (!inv || inv.accepted_at || new Date(inv.expires_at) < /* @__PURE__ */ new Date()) throw new Error("Invite is invalid or expired");
		if (inv.email.toLowerCase() !== email.toLowerCase()) throw new Error("Invite email does not match this account");
		internalRole = inv.internal_role;
		invitedBy = inv.invited_by;
		await sql`update bridge_invites set accepted_at = now() where id = ${inv.id}`;
	}
	const org = data.accountType === "independent_creator" ? null : (data.organizationName ?? "").trim() || null;
	if (data.accountType !== "independent_creator" && !org) throw new Error("Organization name is required");
	let organizationId = null;
	if (org) {
		organizationId = randomBytes(16).toString("hex");
		const kind = data.accountType === "buyer" ? "buyer" : data.accountType === "studio" ? "studio" : "internal";
		await sql`
        insert into bridge_organizations (id, name, kind, created_by)
        values (${organizationId}, ${org}, ${kind}, ${context.userId})
      `;
		await sql`
        insert into bridge_organization_members (organization_id, user_id, member_role)
        values (${organizationId}, ${context.userId}, ${"owner"})
      `;
	}
	await sql`
      insert into bridge_profiles (
        user_id, email, display_name, account_type, organization_name, organization_id, internal_role, email_verified, invited_by
      ) values (
        ${context.userId}, ${email}, ${data.displayName}, ${data.accountType}, ${org}, ${organizationId},
        ${internalRole}, ${verified}, ${invitedBy}
      )
    `;
	await writeAudit({
		actorUserId: context.userId,
		action: "profile.onboard",
		entityType: "bridge_profile",
		entityId: context.userId,
		metadata: {
			accountType: data.accountType,
			internalRole: internalRole ?? null
		}
	});
	const actor = await loadActor(context.userId);
	if (!actor) throw new Error("Profile create failed");
	return {
		home: workspaceHome(actor),
		profile: actor
	};
});
var requestEmailVerification_createServerFn_handler = createServerRpc({
	id: "6d31762e1a9074cbb826ec43900aa8f14d7c8b3939bd02941c35905689eddd89",
	name: "requestEmailVerification",
	filename: "src/lib/bridge/profiles.ts"
}, (opts) => requestEmailVerification.__executeServer(opts));
var requestEmailVerification = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(requestEmailVerification_createServerFn_handler, async ({ context }) => {
	assertNotDevUser(context.userId);
	const actor = await loadActor(context.userId);
	const sql = await getSql();
	const emailRows = await sql`select email from "user" where id = ${context.userId} limit 1`;
	const email = actor?.email || emailRows[0]?.email;
	if (!email) throw new Error("No email on account");
	const { token, hash } = tokenPair();
	await sql`
      insert into bridge_email_challenges (id, user_id, email, purpose, token_hash, expires_at)
      values (${randomBytes(16).toString("hex")}, ${context.userId}, ${email}, ${"verify"}, ${hash}, ${new Date(Date.now() + 864e5).toISOString()})
    `;
	await mail({
		to: email,
		subject: "Verify your Crayons Bridge email",
		text: `Confirm this email for Crayons Bridge (StreamVista OPC Pvt Ltd):\n\n${`${bridgeEnv.appUrl()}/verify-email?token=${token}`}\n\nThis link expires in 24 hours.`
	});
	await writeAudit({
		actorUserId: context.userId,
		action: "email.verification_requested",
		entityType: "bridge_profile",
		entityId: context.userId
	});
	return { sent: true };
});
var confirmEmailVerification_createServerFn_handler = createServerRpc({
	id: "c0cb49ab5c06b9ae2a1d563d2cc308ae51809d8c7545dd8bc7b17aa309cc1afc",
	name: "confirmEmailVerification",
	filename: "src/lib/bridge/profiles.ts"
}, (opts) => confirmEmailVerification.__executeServer(opts));
var confirmEmailVerification = createServerFn({ method: "POST" }).validator(object({ token: string().min(16) })).handler(confirmEmailVerification_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const row = (await sql`
      select id, user_id, expires_at, consumed_at from bridge_email_challenges
      where token_hash = ${createHash("sha256").update(data.token).digest("hex")} and purpose = 'verify' limit 1
    `)[0];
	if (!row || row.consumed_at || !row.user_id || new Date(row.expires_at) < /* @__PURE__ */ new Date()) throw new Error("Verification link is invalid or expired");
	await sql`update bridge_email_challenges set consumed_at = now() where id = ${row.id}`;
	await sql`update bridge_profiles set email_verified = true, updated_at = now() where user_id = ${row.user_id}`;
	await sql`update "user" set "emailVerified" = true, "updatedAt" = now() where id = ${row.user_id}`;
	await writeAudit({
		actorUserId: row.user_id,
		action: "email.verified",
		entityType: "bridge_profile",
		entityId: row.user_id
	});
	return { ok: true };
});
var requestPasswordReset_createServerFn_handler = createServerRpc({
	id: "5b6b9bd0962c9759aa891f9dbdbaa38ea7a89d809fd230e0aa37035e6831be09",
	name: "requestPasswordReset",
	filename: "src/lib/bridge/profiles.ts"
}, (opts) => requestPasswordReset.__executeServer(opts));
var requestPasswordReset = createServerFn({ method: "POST" }).validator(object({ email: string().email() })).handler(requestPasswordReset_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const users = await sql`
      select id, email from "user" where lower(email) = ${data.email.toLowerCase()} limit 1
    `;
	if (users[0]) {
		const { token, hash } = tokenPair();
		await sql`
        insert into bridge_email_challenges (id, user_id, email, purpose, token_hash, expires_at)
        values (${randomBytes(16).toString("hex")}, ${users[0].id}, ${users[0].email}, ${"reset"}, ${hash}, ${new Date(Date.now() + 72e5).toISOString()})
      `;
		const url = `${bridgeEnv.appUrl()}/reset-password?token=${token}`;
		await mail({
			to: users[0].email,
			subject: "Reset your Crayons Bridge password",
			text: `Reset your password:\n\n${url}\n\nThis link expires in 2 hours. If you did not request it, ignore this email.`
		});
	}
	return { sent: true };
});
var confirmPasswordReset_createServerFn_handler = createServerRpc({
	id: "f1ca0e1ab98a32cf654ae610e3d26962c036ea60bdb1a274ec6c1dacc7a6d140",
	name: "confirmPasswordReset",
	filename: "src/lib/bridge/profiles.ts"
}, (opts) => confirmPasswordReset.__executeServer(opts));
var confirmPasswordReset = createServerFn({ method: "POST" }).validator(object({
	token: string().min(16),
	password: string().min(10).max(72)
})).handler(confirmPasswordReset_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const row = (await sql`
      select id, user_id, expires_at, consumed_at from bridge_email_challenges
      where token_hash = ${createHash("sha256").update(data.token).digest("hex")} and purpose = 'reset' limit 1
    `)[0];
	if (!row || row.consumed_at || !row.user_id || new Date(row.expires_at) < /* @__PURE__ */ new Date()) throw new Error("Reset link is invalid or expired");
	const { hashPassword } = await import("./crypto-QVkT-fgq.mjs").then((n) => n.t).then((n) => n.t);
	await sql`
      update account set password = ${await hashPassword(data.password)}, "updatedAt" = now()
      where "userId" = ${row.user_id} and "providerId" = 'credential'
    `;
	await sql`update bridge_email_challenges set consumed_at = now() where id = ${row.id}`;
	await writeAudit({
		actorUserId: row.user_id,
		action: "password.reset",
		entityType: "bridge_profile",
		entityId: row.user_id
	});
	return { ok: true };
});
var inviteInternalRole_createServerFn_handler = createServerRpc({
	id: "23d85896948109f7cb1807cb089c4549d8e41ff1c3191b92e02f50d03eded13a",
	name: "inviteInternalRole",
	filename: "src/lib/bridge/profiles.ts"
}, (opts) => inviteInternalRole.__executeServer(opts));
var inviteInternalRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	email: string().email(),
	role: _enum(INTERNAL_ROLES)
})).handler(inviteInternalRole_createServerFn_handler, async ({ context, data }) => {
	const actor = await loadActor(context.userId);
	if (!actor) throw new Error("Profile required");
	assertPermission(actor, "users.invite_internal");
	const sql = await getSql();
	const { token, hash } = tokenPair();
	const id = randomBytes(16).toString("hex");
	await sql`
      insert into bridge_invites (id, email, internal_role, invited_by, token_hash, expires_at)
      values (${id}, ${data.email.toLowerCase()}, ${data.role}, ${context.userId}, ${hash}, ${new Date(Date.now() + 6048e5).toISOString()})
    `;
	const url = `${bridgeEnv.appUrl()}/signup?invite=${token}`;
	await mail({
		to: data.email,
		subject: "Crayons Bridge internal invite",
		text: `You were invited as ${data.role}. Accept:\n\n${url}\n`
	});
	await writeAudit({
		actorUserId: context.userId,
		action: "users.invite_internal",
		entityType: "bridge_invite",
		entityId: id,
		metadata: { role: data.role }
	});
	return { sent: true };
});
//#endregion
export { completeOnboarding_createServerFn_handler, confirmEmailVerification_createServerFn_handler, confirmPasswordReset_createServerFn_handler, inviteInternalRole_createServerFn_handler, requestEmailVerification_createServerFn_handler, requestPasswordReset_createServerFn_handler };
