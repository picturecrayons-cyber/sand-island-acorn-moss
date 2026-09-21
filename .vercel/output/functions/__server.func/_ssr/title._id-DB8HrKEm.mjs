import { o as __toESM } from "../_runtime.mjs";
import { Qt as string, Vt as _enum, Yt as object } from "../_libs/@better-auth/core+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as hasPermission, c as permissionForTransition, s as nextStatus } from "./rbac-D3NOb62-.mjs";
import { n as BridgeShell } from "./shell-Bt_2kNAX.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { s as authMiddleware } from "./db-Cwe07lSL.mjs";
import { i as ASSET_KINDS, n as createSsrRpc, o as TITLE_STATUSES } from "./audit-BmREM0Lt.mjs";
import { t as Button } from "./button-CWYmasbB.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as RequireBridge } from "./gate-WKcoHPTz.mjs";
import { c as reverseTitle, r as getTitle, t as advanceTitle } from "./titles-DSuKDEjJ.mjs";
import { n as StatusRail } from "./status-rail-D1fP_DKt.mjs";
import { i as submitQcReview, r as saveTitleRights, t as authorizeDelivery } from "./desks-B6sDncOX.mjs";
import { n as Route } from "./router-Cn6O2SV2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/title._id-DB8HrKEm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var requestAssetUpload = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	titleId: string().min(8),
	kind: _enum(ASSET_KINDS),
	filename: string().min(1).max(120),
	contentType: string().min(3).max(120)
})).handler(createSsrRpc("562a1fa65ed30258c5ee60952bb600a8d63faf5247a385bc1fe84e1bbc58905e"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ assetId: string().min(8) })).handler(createSsrRpc("8c8191541bbf66a50cfa30f7466bdc39f187b81edb9d5e7e9e9f7c2476d804e5"));
var listTitleAssets = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ titleId: string().min(8) })).handler(createSsrRpc("8e1e8cc840fcf6b747e9e25c7151f0f1767e173b0bc636e67cf453a9167fa43e"));
function TitlePage() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireBridge, { children: (actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BridgeShell, {
		actor,
		title: "Title record",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBody, {
			id,
			actor
		})
	}) });
}
function TitleBody({ id, actor }) {
	const qc = useQueryClient();
	const titleQ = useQuery({
		queryKey: ["bridge-title", id],
		queryFn: () => getTitle({ data: { id } })
	});
	const assetsQ = useQuery({
		queryKey: ["bridge-assets", id],
		queryFn: () => listTitleAssets({ data: { titleId: id } })
	});
	const title = titleQ.data?.title;
	const nxt = title ? nextStatus(title.status) : null;
	const perm = title && nxt ? permissionForTransition(title.status, nxt) : null;
	const canAdvance = Boolean(title && nxt && nxt !== "LICENSED" && perm && hasPermission(actor, perm));
	const canUpload = title && hasPermission(actor, "asset.sign_upload") && (title.ownerUserId === actor.userId || Boolean(actor.internalRole)) && (title.status === "DRAFT" || title.status === "UPLOADING" || title.status === "PREPARING");
	const canQc = title?.status === "QC_REVIEW" && hasPermission(actor, "title.qc_review");
	const canRights = (title?.status === "RIGHTS_REVIEW" || title?.status === "LICENSING_READY") && hasPermission(actor, "title.rights_review");
	const canDeliver = title?.status === "LICENSED" && hasPermission(actor, "title.deliver");
	const canReverse = hasPermission(actor, "title.reverse");
	const advance = useMutation({
		mutationFn: () => {
			if (!title || !nxt) throw new Error("No forward step");
			return advanceTitle({ data: {
				id: title.id,
				to: nxt
			} });
		},
		onSuccess: () => {
			toast("Lifecycle advanced");
			qc.invalidateQueries({ queryKey: ["bridge-title", id] });
			qc.invalidateQueries({ queryKey: ["bridge-titles"] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Advance failed")
	});
	if (titleQ.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading title…"
	});
	if (!title) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Title not found."
	});
	const blockers = titleQ.data?.blockers ?? [];
	const live = titleQ.data?.liveForBuyers;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: title.name
					}),
					title.nameMl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: title.nameMl
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							title.language,
							title.year ? ` · ${title.year}` : "",
							title.runtimeMinutes ? ` · ${title.runtimeMinutes} min` : "",
							title.licensingFeePaise > 0 ? ` · ₹${(title.licensingFeePaise / 100).toFixed(0)}` : ""
						]
					}),
					!live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-sm border border-line-strong bg-surface px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Not live for buyers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 list-disc space-y-1 pl-5 text-sm text-muted",
							children: blockers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: b }, b))
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRail, { status: title.status }),
			title.synopsis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-sm leading-relaxed text-muted",
				children: title.synopsis
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Overview"
			}), canAdvance ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-4",
				type: "button",
				disabled: advance.isPending,
				onClick: () => advance.mutate(),
				children: ["Advance to ", nxt?.replaceAll("_", " ")]
			}) : nxt === "LICENSED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Licensed is granted only after a captured Razorpay payment."
			}) : null] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Assets"
				}),
				canUpload ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadPanel, { titleId: title.id }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: (assetsQ.data?.assets ?? []).length ? (assetsQ.data?.assets ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-sm border border-line px-3 py-2 font-mono text-xs",
						children: [
							a.kind,
							" · ",
							a.id
						]
					}, a.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-muted",
						children: "No private objects yet."
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "QC"
				}),
				canQc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QcForm, { titleId: title.id }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted",
					children: (titleQ.data?.qc ?? []).length ? (titleQ.data?.qc ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-sm border border-line px-3 py-2",
						children: [
							r.decision,
							" · ",
							r.notes || "no note"
						]
					}, r.createdAt)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No QC reviews yet." })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Rights"
				}),
				canRights ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightsForm, { titleId: title.id }) : null,
				titleQ.data?.rights ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						titleQ.data.rights.territories,
						" · ",
						titleQ.data.rights.rightsType,
						" · ",
						titleQ.data.rights.mediaType,
						" · chain",
						" ",
						titleQ.data.rights.chainOfTitleStatus,
						titleQ.data.rights.approvedAt ? " · approved" : " · not approved"
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No rights record yet."
				})
			] }),
			canDeliver ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Delivery"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeliveryForm, { titleId: title.id })] }) : null,
			canReverse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Administrative reverse"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Exceptional only. Requires a written reason and an immutable audit row. Cannot mint LICENSED."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReverseForm, { titleId: title.id })
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Audit"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-2 font-mono text-xs text-muted",
				children: (titleQ.data?.events ?? []).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					e.createdAt,
					" · ",
					e.from ?? "—",
					" → ",
					e.to,
					e.note ? ` · ${e.note}` : ""
				] }, `${e.createdAt}-${i}`))
			})] })
		]
	});
}
function UploadPanel({ titleId }) {
	const qc = useQueryClient();
	const mut = useMutation({
		mutationFn: async (file) => {
			const signed = await requestAssetUpload({ data: {
				titleId,
				kind: file.type.startsWith("image/") ? "poster" : "master",
				filename: file.name,
				contentType: file.type || "application/octet-stream"
			} });
			if (!(await fetch(signed.url, {
				method: signed.method,
				headers: { "Content-Type": file.type || "application/octet-stream" },
				body: file
			})).ok) throw new Error("S3 upload failed");
		},
		onSuccess: () => {
			toast("Object stored");
			qc.invalidateQueries({ queryKey: ["bridge-assets", titleId] });
			qc.invalidateQueries({ queryKey: ["bridge-title", titleId] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Upload failed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-3 block rounded-sm border border-dashed border-line-strong p-4 text-sm",
		children: ["Upload poster or master", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "file",
			className: "mt-2 block w-full text-sm",
			onChange: (e) => {
				const file = e.target.files?.[0];
				if (file) mut.mutate(file);
			}
		})]
	});
}
function QcForm({ titleId }) {
	const qc = useQueryClient();
	const [notes, setNotes] = (0, import_react.useState)("");
	const [picture, setPicture] = (0, import_react.useState)(false);
	const [sound, setSound] = (0, import_react.useState)(false);
	const [text, setText] = (0, import_react.useState)(false);
	const mut = useMutation({
		mutationFn: (decision) => submitQcReview({ data: {
			titleId,
			decision,
			notes,
			picture,
			sound,
			text
		} }),
		onSuccess: () => {
			toast("QC recorded");
			qc.invalidateQueries({ queryKey: ["bridge-title", titleId] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "QC failed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 space-y-3 rounded-sm border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: picture,
					onChange: (e) => setPicture(e.target.checked)
				}), "Picture"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: sound,
					onChange: (e) => setSound(e.target.checked)
				}), "Sound"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: text,
					onChange: (e) => setText(e.target.checked)
				}), "Text / subs"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: notes,
				onChange: (e) => setNotes(e.target.value),
				rows: 3,
				placeholder: "Reason (required for fail / changes)",
				className: "w-full rounded-sm border border-line-strong bg-elevated px-3 py-2 text-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						disabled: mut.isPending,
						onClick: () => mut.mutate("pass"),
						children: "Pass"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						disabled: mut.isPending,
						onClick: () => mut.mutate("fail"),
						children: "Fail"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						disabled: mut.isPending,
						onClick: () => mut.mutate("request_changes"),
						children: "Request changes"
					})
				]
			})
		]
	});
}
function RightsForm({ titleId }) {
	const qc = useQueryClient();
	const [territories, setTerritories] = (0, import_react.useState)("");
	const [rightsType, setRightsType] = (0, import_react.useState)("");
	const [mediaType, setMediaType] = (0, import_react.useState)("");
	const [evidenceNote, setEvidenceNote] = (0, import_react.useState)("");
	const [chain, setChain] = (0, import_react.useState)("unverified");
	const [exclusive, setExclusive] = (0, import_react.useState)(false);
	const mut = useMutation({
		mutationFn: (approve) => saveTitleRights({ data: {
			titleId,
			territories,
			rightsType,
			mediaType,
			exclusive,
			chainOfTitleStatus: chain,
			evidenceNote,
			approve
		} }),
		onSuccess: () => {
			toast("Rights record saved");
			qc.invalidateQueries({ queryKey: ["bridge-title", titleId] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Rights save failed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 grid gap-3 rounded-sm border border-line bg-surface p-4 sm:grid-cols-2",
		onSubmit: (e) => {
			e.preventDefault();
			mut.mutate(false);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Territories", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: territories,
					onChange: (e) => setTerritories(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Rights type", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: rightsType,
					onChange: (e) => setRightsType(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Media type", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: mediaType,
					onChange: (e) => setMediaType(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Chain of title", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: chain,
					onChange: (e) => setChain(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "unverified",
							children: "unverified"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "partial",
							children: "partial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "verified",
							children: "verified"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm sm:col-span-2",
				children: ["Evidence", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					required: true,
					minLength: 8,
					value: evidenceNote,
					onChange: (e) => setEvidenceNote(e.target.value),
					rows: 3,
					className: "mt-1 w-full rounded-sm border border-line-strong bg-elevated px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: exclusive,
					onChange: (e) => setExclusive(e.target.checked)
				}), "Exclusive"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				variant: "outline",
				disabled: mut.isPending,
				children: "Save record"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: mut.isPending,
				onClick: () => mut.mutate(true),
				children: "Approve rights"
			})
		]
	});
}
function DeliveryForm({ titleId }) {
	const qc = useQueryClient();
	const [recipient, setRecipient] = (0, import_react.useState)("");
	const mut = useMutation({
		mutationFn: () => authorizeDelivery({ data: {
			titleId,
			recipientUserId: recipient
		} }),
		onSuccess: () => {
			toast("Delivery authorized");
			qc.invalidateQueries({ queryKey: ["bridge-title", titleId] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Delivery denied")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 flex flex-wrap gap-3",
		onSubmit: (e) => {
			e.preventDefault();
			mut.mutate();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			required: true,
			value: recipient,
			onChange: (e) => setRecipient(e.target.value),
			placeholder: "Recipient user id",
			className: "h-11 min-w-56 flex-1 rounded-sm border border-line-strong bg-elevated px-3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "submit",
			disabled: mut.isPending,
			children: "Authorize delivery"
		})]
	});
}
function ReverseForm({ titleId }) {
	const qc = useQueryClient();
	const [to, setTo] = (0, import_react.useState)("DRAFT");
	const [reason, setReason] = (0, import_react.useState)("");
	const mut = useMutation({
		mutationFn: () => reverseTitle({ data: {
			id: titleId,
			to,
			reason
		} }),
		onSuccess: () => {
			toast("Reverse recorded");
			qc.invalidateQueries({ queryKey: ["bridge-title", titleId] });
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Reverse denied")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 grid gap-3 sm:grid-cols-2",
		onSubmit: (e) => {
			e.preventDefault();
			mut.mutate();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Target status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: to,
					onChange: (e) => setTo(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3",
					children: TITLE_STATUSES.filter((s) => s !== "LICENSED").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s,
						children: s
					}, s))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm sm:col-span-2",
				children: ["Reason", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					required: true,
					minLength: 12,
					value: reason,
					onChange: (e) => setReason(e.target.value),
					rows: 3,
					className: "mt-1 w-full rounded-sm border border-line-strong bg-elevated px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				variant: "outline",
				disabled: mut.isPending,
				children: "Record reverse"
			})
		]
	});
}
//#endregion
export { TitlePage as component };
