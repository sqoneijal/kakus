import{a as l}from"./chunk-RMG5QM3Q.js";import{a as o}from"./chunk-5VCMSLSJ.js";import{a as g,e as r}from"./chunk-C2W3HSDQ.js";import{H as i,n as d}from"./chunk-OMCZQBA2.js";import"./chunk-G76L5PL2.js";import"./chunk-FVQQD5TJ.js";import"./chunk-OFEJ2A6N.js";import{d as t,e as m,f as b}from"./chunk-2N2KBSVT.js";var C=t(m()),a=t(g()),s=t(b());a.default.locale("id");var f=()=>{let{module:n}=o(e=>e.redux),{loginSessions:h}=n,p=e=>e===200?"badge-light-success":"badge-light-danger";return s.default.createElement(d,{className:"mb-5 mb-lg-10"},s.default.createElement(d.Header,null,s.default.createElement(d.Title,null,s.default.createElement("h3",null,"Login Sessions"))),s.default.createElement(d.Body,{className:"p-0"},s.default.createElement(i,{className:"align-middle table-row-bordered table-row-solid gy-4 gs-9",responsive:!0},s.default.createElement("thead",{className:"border-gray-200 fs-5 fw-semibold bg-lighten"},s.default.createElement("tr",null,s.default.createElement("th",{className:"min-w-250px"},"Location"),s.default.createElement("th",{className:"min-w-100px"},"Status"),s.default.createElement("th",{className:"min-w-150px"},"Device"),s.default.createElement("th",{className:"min-w-150px"},"IP Address"),s.default.createElement("th",{className:"min-w-150px"},"Time"))),s.default.createElement("tbody",{className:"fw-6 fw-semibold text-gray-600"},s.default.createElement(l,{of:h,render:e=>s.default.createElement("tr",null,s.default.createElement("td",null,r("city",e)," - ",r("countryName",e)),s.default.createElement("td",null,s.default.createElement("span",{className:`badge ${p(r("status",e))} fs-7 fw-bold`},r("status",e))),s.default.createElement("td",null,r("device",e)),s.default.createElement("td",null,r("request",e)),s.default.createElement("td",null,(0,a.default)(r("time",e)).fromNow()))})))))},w=f;export{w as default};