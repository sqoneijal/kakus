import{a as t}from"./chunk-2Q72WOZC.js";import{a as h}from"./chunk-3Q2MNHB3.js";import{a as _,e as u}from"./chunk-CPGRC7KA.js";import{c as v,d as N,f as y,g as A,h as L}from"./chunk-YCGA7KWN.js";import{c as b}from"./chunk-GAGWJPN6.js";import{e as a}from"./chunk-JFMQC5YL.js";import{i as k,j as m}from"./chunk-KG4LTW7V.js";import"./chunk-5VSWUCH3.js";import"./chunk-A6HHAKMW.js";import"./chunk-P35CTX2K.js";import{d as r,e as f,f as B}from"./chunk-DMDHIV6B.js";var T=r(f()),e=r(B());var o=[{label:"Dashboard",icon:"ki-outline ki-element-11 fs-2",pathname:"/",sub:!1},{label:"Referensi",icon:"ki-outline ki-data fs-2",pathname:"/referensi",sub:!0,child:[{label:"Jenis Septiktank",pathname:"/referensi/jenisseptiktank",sub:!1}]},{label:"Responden",icon:"ki-outline ki-people fs-2",pathname:"/responden",sub:!1},{label:"Penampungan",icon:"ki-outline ki-basket-ok fs-2",pathname:"/penampungan",sub:!1}];var K=()=>{let p=b(),i=_(),[g,c]=(0,e.useState)(0);(0,e.useLayoutEffect)(()=>{let n=0;return o.map((l,s)=>{l.sub&&l.child.map(S=>{a("pathname",i)===a("pathname",S)&&(n=s)})}),c(n),()=>{}},[i,o]);let d=(n={})=>{a("pathname",n)!==a("currentLocation",n)&&(p(N([])),p(y({})),p(v({})),p(A(!1)),p(L({})))};return e.default.createElement("div",{className:"app-sidebar-menu overflow-hidden flex-column-fluid"},e.default.createElement("div",{id:"kt_app_sidebar_menu_wrapper",className:"app-sidebar-wrapper"},e.default.createElement("div",{id:"kt_app_sidebar_menu_scroll",className:"scroll-y my-5 mx-3",style:{height:window.innerHeight-100}},e.default.createElement(m,{bsPrefix:"menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6",defaultActiveKey:0,activeKey:g},e.default.createElement(h,{of:o,render:(n,l)=>e.default.createElement(t,null,e.default.createElement(t.When,{isTrue:n.sub},e.default.createElement(m.Item,{className:"menu-item",eventKey:l},e.default.createElement(k,{as:"span",bsPrefix:`menu-link ${a("child",n)&&n.child.find(s=>a("pathname",s)===a("pathname",i))?"active":""}`,onClick:()=>c(l)},e.default.createElement("span",{className:"menu-icon"},e.default.createElement("i",{className:a("icon",n)})),e.default.createElement("span",{className:"menu-title"},a("label",n)),e.default.createElement("span",{className:"menu-arrow"})),e.default.createElement(m.Body,{className:"menu-sub menu-sub-accordion"},e.default.createElement(h,{of:n.child,render:s=>e.default.createElement("div",{className:"menu-item"},e.default.createElement(u,{className:`menu-link ${a("pathname",i)===a("pathname",s)?"active":""}`,to:a("pathname",s),onClick:()=>{d({pathname:a("pathname",s),currentLocation:a("pathname",i)}),document.title=a("label",s)}},e.default.createElement("span",{className:"menu-bullet"},e.default.createElement("span",{className:"bullet bullet-dot"})),e.default.createElement("span",{className:"menu-title"},a("label",s))))})))),e.default.createElement(t.Else,null,e.default.createElement("div",{className:"menu-item"},e.default.createElement(u,{to:a("pathname",n),className:`menu-link ${a("pathname",i)===a("pathname",n)?"active":""}`,onClick:()=>{d({pathname:a("pathname",n),currentLocation:a("pathname",i)}),document.title=a("label",n)}},e.default.createElement("span",{className:"menu-icon"},e.default.createElement("i",{className:a("icon",n)})),e.default.createElement("span",{className:"menu-title"},a("label",n))))))})))))},H=K;export{H as default};
