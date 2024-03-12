import{a as N}from"./chunk-RMG5QM3Q.js";import{c as C,d as $,e as a,f as o,h as v,k as I}from"./chunk-C2W3HSDQ.js";import{G as y,H as x,n as g,o as f}from"./chunk-OMCZQBA2.js";import"./chunk-G76L5PL2.js";import"./chunk-FVQQD5TJ.js";import"./chunk-OFEJ2A6N.js";import{d as h,e as w,f as P}from"./chunk-2N2KBSVT.js";var H=h(w()),s=h(P());var i=null,_=()=>{let[c,b]=(0,s.useState)(!0),[d,k]=(0,s.useState)([]),S={"":s.default.createElement("span",{className:"badge badge-warning"},"Belum dilakukan"),1:s.default.createElement("span",{className:"badge badge-success"},"Sudah dilakukan"),2:s.default.createElement("span",{className:"badge badge-danger"},"Tolak")},T=e=>`<div class="row">
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
      </div>`;(0,s.useLayoutEffect)(()=>{if(!c&&v(d)){let e=o(a("latitude",d[0])),n=o(a("longitude",d[0]));i=L.map("maps").setView([e,n],3),L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(i);let r=L.icon({iconUrl:"/bundle/marker-icon-warning.png",iconSize:[40,40]}),l=L.icon({iconUrl:"/bundle/marker-icon-success.png",iconSize:[40,40]}),t=L.icon({iconUrl:"/bundle/marker-icon-success.png",iconSize:[40,40]}),u={"":r,1:l,2:t};d.forEach(m=>{let z=o(a("latitude",m)),D=o(a("longitude",m));L.marker([z,D],{icon:u[a("status",m)]}).bindPopup(T(m)).addTo(i)})}return()=>{}},[c,d]);let p=(e,n="")=>{b(!0),C(`/getdaftarpenampungan?page=${e}&cari=${n}`,{},!0).then(l=>{if(typeof l>"u")return;let{data:t}=l;if(typeof t.code<"u"&&a("code",t)!==200){$(!1,a("message",t));return}v(t)?(k(n?t:u=>u.concat(t)),p(e+1,n)):b(!1)})};return(0,s.useLayoutEffect)(()=>(p(0),()=>{}),[]),!c&&s.default.createElement(g,{className:"shadow-sm"},s.default.createElement(g.Body,null,s.default.createElement(y,null,s.default.createElement(f,{id:"maps"}),s.default.createElement(f,{md:4},I("Cari Responden","cari",{onKeyDown:e=>{e.target.value&&e.code==="Enter"&&(i.remove(),p(0,e.target.value))}}),s.default.createElement("div",{style:{maxHeight:600,overflow:"auto",minHeight:600}},s.default.createElement(x,{responsive:!0,hover:!0,className:"align-middle table-row-dashed fs-6",size:"sm"},s.default.createElement("thead",null,s.default.createElement("tr",{className:"text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"},s.default.createElement("th",null,"nama responden"),s.default.createElement("th",null,"nik responden"),s.default.createElement("th",null,"status penyedotan"))),s.default.createElement("tbody",{className:"text-gray-600 fw-semibold"},s.default.createElement(N,{of:d,render:e=>s.default.createElement("tr",{style:{cursor:"pointer"},onClick:()=>{let n=o(a("latitude",e)),r=o(a("longitude",e));i.setView([n,r],50)}},s.default.createElement("td",null,a("nama_lengkap",e)),s.default.createElement("td",null,a("nik",e)),s.default.createElement("td",null,S[a("status",e)]))}))))))))},U=_;export{U as default};
