import React, { useLayoutEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

let map = null;

const MapResponden = () => {
   const { module } = useSelector((e) => e.redux);
   const { daftarResponden } = module;

   const renderTooltip = (data) => {
      return `<div class="row">
         <h4>Volume Septiktank [${h.parse("nama_lengkap", data)}]</h4>
         <div class="col">
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Panjang</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("panjang", data)} m2</span></div>
            </div>
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Lebar</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("lebar", data)} m2</span></div>
            </div>
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Jenis</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("jenis_septiktank", data)}</span></div>
            </div>
         </div>
         <div class="col">
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Kedalaman</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("kedalaman", data)} m2</span></div>
            </div>
            <div class="mb-2 row">
               <div class="fw-semibold text-muted col-sm-12">Diameter</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("diameter_tabung", data)} m2</span></div>
            </div>
         </div>
      </div>`;
   };

   useLayoutEffect(() => {
      if (h.arrLength(daftarResponden)) {
         const firstLat = h.toInt(h.parse("latitude", daftarResponden[0]));
         const firstLong = h.toInt(h.parse("longitude", daftarResponden[0]));

         map = L.map("maps").setView([firstLat, firstLong], 13);
         L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

         daftarResponden.forEach((row) => {
            const lat = h.toInt(h.parse("latitude", row));
            const long = h.toInt(h.parse("longitude", row));
            L.marker([lat, long]).bindPopup(renderTooltip(row)).addTo(map);
         });
      }
      return () => {};
   }, [daftarResponden]);

   return (
      <Card className="shadow-sm">
         <Card.Body style={{ height: document.querySelector("#kt_app_content").clientHeight }} id="maps" />
      </Card>
   );
};
export default MapResponden;
