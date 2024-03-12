import{a as j}from"./chunk-RMG5QM3Q.js";import{c as H}from"./chunk-NTYBRVPL.js";import{a as C,c as I}from"./chunk-5VCMSLSJ.js";import{c as P,d as z,e as a,f as o,h as u,q as T}from"./chunk-C2W3HSDQ.js";import{G as S,H as $,n as h,o as y}from"./chunk-OMCZQBA2.js";import"./chunk-G76L5PL2.js";import"./chunk-FVQQD5TJ.js";import"./chunk-OFEJ2A6N.js";import{d as b,e as N,f as J}from"./chunk-2N2KBSVT.js";var Z=b(N()),s=b(J());var i=null,K=()=>{let{module:w,filter:B}=C(e=>e.redux),{openPeta:d}=w,D=I(),l=(0,s.useRef)(null),[f,_]=(0,s.useState)(!0),[t,k]=(0,s.useState)([]),[g,E]=(0,s.useState)(0);(0,s.useLayoutEffect)(()=>(l.current&&E(l.current.clientHeight),()=>{}),[l]);let U=()=>{i.remove(),k([]),D(H({...w,openPeta:!1}))},x=(e=0)=>{let r={...B,page:e};P(`/getpeta?${T(r)}`).then(m=>{if(typeof m>"u")return;let{data:n}=m;if(typeof n.code<"u"&&a("code",n)!==200){z(!1,a("message",n));return}u(n)?(k(v=>v.concat(n)),x(e+1)):_(!1)})};(0,s.useLayoutEffect)(()=>(d&&x(),()=>{}),[d]);let V=e=>`<div class="row">
         <h4>Volume Septiktank [${a("nama_lengkap",e)}]</h4>
         <div class="col">
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Panjang</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("panjang",e)} m2</span></div>
            </div>
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Lebar</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("lebar",e)} m2</span></div>
            </div>
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Jenis</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("jenis_septiktank",e)}</span></div>
            </div>
         </div>
         <div class="col">
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Kedalaman</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("kedalaman",e)} m2</span></div>
            </div>
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Diameter</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("diameter_tabung",e)} m2</span></div>
            </div>
         </div>
      </div>`;(0,s.useLayoutEffect)(()=>{if(!f&&u(t)){let e=o(a("latitude",t[0])),r=o(a("longitude",t[0]));i=L.map("maps").setView([e,r],15),L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(i);let c=L.icon({iconUrl:"/bundle/marker-icon-warning.png",iconSize:[40,40]}),m=L.icon({iconUrl:"/bundle/marker-icon-success.png",iconSize:[40,40]}),n=L.icon({iconUrl:"/bundle/marker-icon-success.png",iconSize:[40,40]}),v={"":c,1:m,2:n};t.forEach(p=>{let W=o(a("latitude",p)),G=o(a("longitude",p));L.marker([W,G],{icon:v[a("status",p)]}).bindPopup(V(p)).addTo(i)})}return()=>{}},[t,f]);let F={"":s.default.createElement("span",{className:"badge badge-warning"},"Belum dilakukan"),1:s.default.createElement("span",{className:"badge badge-success"},"Sudah dilakukan"),2:s.default.createElement("span",{className:"badge badge-danger"},"Tolak")};return s.default.createElement(s.default.Fragment,null,d&&s.default.createElement("div",{className:"drawer-overlay"}),s.default.createElement("div",{className:`bg-white drawer drawer-start ${d?"drawer-on":""}`,style:{width:window.innerWidth}},s.default.createElement(h,{className:"rounded-0 w-100"},s.default.createElement(h.Header,{className:"pe-5"},s.default.createElement("div",{className:"card-title"},s.default.createElement("div",{className:"d-flex justify-content-center flex-column me-3"},s.default.createElement("span",{className:"fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1"},"Info Geografis"))),s.default.createElement("div",{className:"card-toolbar"},s.default.createElement("button",{className:"btn btn-sm btn-icon btn-active-light-primary",onClick:U},s.default.createElement("i",{className:"ki-duotone ki-cross fs-2"},s.default.createElement("span",{className:"path1"}),s.default.createElement("span",{className:"path2"}))))),s.default.createElement(h.Body,{className:"hover-scroll-overlay-y",ref:l,style:{height:g}},!f&&u(t)&&s.default.createElement(S,null,s.default.createElement(y,{id:"maps",style:{height:g}}),s.default.createElement(y,{md:4,className:"hover-scroll-overlay-y",style:{height:g}},s.default.createElement($,{responsive:!0,hover:!0,className:"align-middle table-row-dashed fs-6",size:"sm"},s.default.createElement("thead",null,s.default.createElement("tr",{className:"text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"},s.default.createElement("th",null,"nama responden"),s.default.createElement("th",null,"nik responden"),s.default.createElement("th",null,"status penyedotan"))),s.default.createElement("tbody",{className:"text-gray-600 fw-semibold"},s.default.createElement(j,{of:t,render:e=>s.default.createElement("tr",{style:{cursor:"pointer"},onClick:()=>{let r=o(a("latitude",e)),c=o(a("longitude",e));i.setView([r,c],50)}},s.default.createElement("td",null,a("nama_lengkap",e)),s.default.createElement("td",null,a("nik",e)),s.default.createElement("td",null,F[a("status",e)]))})))))))))},X=K;export{X as default};
