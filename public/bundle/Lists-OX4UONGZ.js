import{a as o}from"./chunk-GAGWJPN6.js";import{b as y,e as a,f as e,p as c,q as r}from"./chunk-JFMQC5YL.js";import{H as n}from"./chunk-KG4LTW7V.js";import"./chunk-5VSWUCH3.js";import"./chunk-A6HHAKMW.js";import"./chunk-P35CTX2K.js";import{d as l,e as i,f as x}from"./chunk-DMDHIV6B.js";var N=l(i()),d=l(x());var v=l(y());var m,k=()=>{let{filter:p}=o(s=>s.redux),f=s=>(0,v.default)({prefix:"Rp ",thousand:"."}).to(e(s)),u=s=>`<div class="row">
         <div class="col">
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tahun Penyedotan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("kala_penyedotan",s)}</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tahun Pembangunan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("pembangunan",s)}</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Harga Penyedotan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${f(a("harga_penyedotan",s))}</span></div>
            </div>
         </div>
         <div class="col">
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tingkat Keamanan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("tingkat_keamanan",s)}</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tanggal Penyedotan Terakhir</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("tanggal_penyedotan_terakhir",s,"date")}</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tanggal Rencana Penyedotan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("tanggal_rencana_penyedotan",s,"date")}</span></div>
            </div>
         </div>
      </div>`,w=s=>`<div class="row">
         <div class="col">
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Panjang</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("panjang",s)} m2</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Lebar</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("lebar",s)} m2</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Jenis Septiktank</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("jenis_septiktank",s)}</span></div>
            </div>
         </div>
         <div class="col">
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Kedalaman</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("kedalaman",s)} m2</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Diameter</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("diameter_tabung",s)} m2</span></div>
            </div>
         </div>
      </div>`,b=s=>`<div class="row">
         <div class="fw-semibold text-muted col-sm-12">Latitude</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${e(a("latitude",s))}</span></div>
      </div>
      <div class="row">
         <div class="fw-semibold text-muted col-sm-12">Longitude</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${e(a("longitude",s))}</span></div>
      </div>`,g=s=>{let t={"":'<span class="badge badge-warning">Belum dilakukan</span>',1:'<span class="badge badge-success">Sudah dilakukan</span>',2:'<span class="badge badge-danger">Tolak</span>'};return`<div class="row">
         <div class="fw-semibold text-muted col-sm-12">Nama Lengkap</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("nama_lengkap",s)}</span></div>
      </div>
      <div class="row">
         <div class="fw-semibold text-muted col-sm-12">NIK</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${a("nik",s)}</span></div>
      </div>
      <div class="row">
         <div class="fw-semibold text-muted col-sm-12">Status Penyedotan</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${t[a("status",s)]}</span></div>
      </div>`},h=`/getdata?${r(p)}`;return m=c({show_edit_button:!1,show_delete_button:!1,url:h,order:[[3,"asc"]],columns:[{data:null,render:s=>g(s)},{data:null,render:s=>b(s)},{data:null,render:s=>w(s)},{data:null,render:s=>u(s)}],columnDefs:!1,createdRow:(s,t)=>{}}),(0,d.useLayoutEffect)(()=>(m.init(),()=>{}),[]),d.default.createElement(n,{responsive:!0,hover:!0,id:"datatable",className:"align-middle table-row-dashed fs-6",size:"sm"},d.default.createElement("thead",null,d.default.createElement("tr",{className:"text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"},d.default.createElement("th",null,"responden"),d.default.createElement("th",null,"koordinat"),d.default.createElement("th",null,"volume"),d.default.createElement("th",null,"penampungan"))),d.default.createElement("tbody",{className:"text-gray-600 fw-semibold"}))},P=k;export{P as default};
