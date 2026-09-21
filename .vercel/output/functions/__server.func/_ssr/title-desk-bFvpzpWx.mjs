import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-COoECf27.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as listTitles, n as createTitle } from "./titles-BVmOUiXv.mjs";
import { t as StatusChip } from "./status-rail-BDn2UAZh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/title-desk-bFvpzpWx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TitleList({ empty }) {
	const titlesQ = useQuery({
		queryKey: ["bridge-titles"],
		queryFn: () => listTitles()
	});
	const titles = titlesQ.data?.titles ?? [];
	if (titlesQ.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading titles…"
	});
	if (!titles.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: empty
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-line rounded-sm border border-line",
		children: titles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/title/$id",
			params: { id: t.id },
			className: "flex flex-wrap items-center justify-between gap-3 px-4 py-4 hover:bg-fg/5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: t.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [t.language, t.year ? ` · ${t.year}` : ""]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: t.status })]
		}) }, t.id))
	});
}
function CreateTitleForm() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [nameMl, setNameMl] = (0, import_react.useState)("");
	const [synopsis, setSynopsis] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("");
	const [fee, setFee] = (0, import_react.useState)("");
	const mut = useMutation({
		mutationFn: () => createTitle({ data: {
			name,
			nameMl: nameMl || void 0,
			synopsis: synopsis || void 0,
			year: year ? Number(year) : void 0,
			licensingFeePaise: fee ? Math.round(Number(fee) * 100) : void 0
		} }),
		onSuccess: (res) => {
			toast("Title opened as DRAFT");
			qc.invalidateQueries({ queryKey: ["bridge-titles"] });
			if (res.title) navigate({
				to: "/title/$id",
				params: { id: res.title.id }
			});
		},
		onError: (err) => toast(err instanceof Error ? err.message : "Could not create title")
	});
	function onSubmit(e) {
		e.preventDefault();
		mut.mutate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "grid gap-3 rounded-sm border border-line bg-surface p-4 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm sm:col-span-2",
				children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: name,
					onChange: (e) => setName(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Malayalam title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: nameMl,
					onChange: (e) => setNameMl(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Year", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					inputMode: "numeric",
					value: year,
					onChange: (e) => setYear(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm sm:col-span-2",
				children: ["Synopsis", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: synopsis,
					onChange: (e) => setSynopsis(e.target.value),
					rows: 3,
					className: "mt-1 w-full rounded-sm border border-line-strong bg-elevated px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["License fee (INR)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					inputMode: "decimal",
					value: fee,
					onChange: (e) => setFee(e.target.value),
					className: "mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: mut.isPending,
					className: "w-full",
					children: mut.isPending ? "Opening…" : "Open draft"
				})
			})
		]
	});
}
//#endregion
export { TitleList as n, CreateTitleForm as t };
