import{a as x}from"./chunk-E7VUNIGX.js";import{c as g}from"./chunk-YCGA7KWN.js";import{a as c}from"./chunk-J5JJKQT5.js";import{a as d,c as m}from"./chunk-GAGWJPN6.js";import{d as h,e as r,n as y}from"./chunk-JFMQC5YL.js";import"./chunk-KG4LTW7V.js";import"./chunk-5VSWUCH3.js";import"./chunk-A6HHAKMW.js";import"./chunk-P35CTX2K.js";import{d as s,e as u,f as w}from"./chunk-DMDHIV6B.js";var N=s(u()),t=s(w());var e=s(x());var k=t.default.lazy(()=>import("./Navbar-DN24C7DO.js")),L=t.default.lazy(()=>import("./Overview-LXKNZ42R.js")),z=t.default.lazy(()=>import("./Context-DSQ2K2NS.js")),A=()=>{let{module:a,init:b}=d(i=>i.redux),{tabAktif:n}=a,S=m(),[v,f]=(0,t.useState)(!0),C=()=>{let i={id:r("id",b)};f(!0);let p=y("/init",i);p.then(l=>{if(typeof l>"u")return;let{data:o}=l;if(typeof o.code<"u"&&r("code",o)!==200){h(!1,r("message",o));return}S(g({...a,...o,tabAktif:1}))}),p.finally(()=>{f(!1)})};return(0,t.useLayoutEffect)(()=>(C(),()=>{}),[]),!v&&t.default.createElement(t.default.Suspense,{fallback:t.default.createElement(c,{visible:!0,color:"#4fa94d",radius:"9",wrapperStyle:{alignItems:"center",display:"flex",justifyContent:"center"},wrapperClass:"page-loader flex-column bg-dark bg-opacity-25"})},t.default.createElement(k,null),n&&t.default.createElement(e.default,{condition:n},t.default.createElement(e.Case,{value:1},t.default.createElement(L,null)),t.default.createElement(e.Case,{value:2},t.default.createElement(z,null))))},E=A;export{E as default};
