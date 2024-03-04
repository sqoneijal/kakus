import React, { useLayoutEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { Each } from "~/Each";
import * as h from "~/Helpers";

let map = null;

const DaftarPenampungan = () => {
   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [listContent, setListContent] = useState([]);

   const statusPenyedotan = {
      "": <span className="badge badge-warning">Belum dilakukan</span>,
      1: <span className="badge badge-success">Sudah dilakukan</span>,
      2: <span className="badge badge-danger">Tolak</span>,
   };

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
      if (!isLoading && h.arrLength(listContent)) {
         const firstLat = h.toInt(h.parse("latitude", listContent[0]));
         const firstLong = h.toInt(h.parse("longitude", listContent[0]));

         map = L.map("maps").setView([firstLat, firstLong], 3);
         L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

         const markerWarning = L.icon({
            iconUrl: "/bundle/marker-icon-warning.png",
            iconSize: [40, 40],
         });

         const markerSuccess = L.icon({
            iconUrl: "/bundle/marker-icon-success.png",
            iconSize: [40, 40],
         });

         const markerDanger = L.icon({
            iconUrl: "/bundle/marker-icon-success.png",
            iconSize: [40, 40],
         });

         const icon = {
            "": markerWarning,
            1: markerSuccess,
            2: markerDanger,
         };

         listContent.forEach((row) => {
            const latitude = h.toInt(h.parse("latitude", row));
            const longitude = h.toInt(h.parse("longitude", row));

            L.marker([latitude, longitude], { icon: icon[h.parse("status", row)] })
               .bindPopup(renderTooltip(row))
               .addTo(map);
         });
      }
      return () => {};
   }, [isLoading, listContent]);

   const getDaftarPenampungan = (page, cari = "") => {
      setIsLoading(true);
      const fetch = h.get(`/getdaftarpenampungan?page=${page}&cari=${cari}`, {}, true);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         if (h.arrLength(data)) {
            if (cari) {
               setListContent(data);
            } else {
               setListContent((prev) => prev.concat(data));
            }
            getDaftarPenampungan(page + 1, cari);
         } else {
            setIsLoading(false);
         }
      });
   };

   useLayoutEffect(() => {
      getDaftarPenampungan(0);
      return () => {};
   }, []);

   return (
      !isLoading && (
         <Card className="shadow-sm">
            <Card.Body>
               <Row>
                  <Col id="maps" />
                  <Col md={4}>
                     {h.form_text(`Cari Responden`, `cari`, {
                        onKeyDown: (e) => {
                           if (e.target.value && e.code === "Enter") {
                              map.remove();
                              getDaftarPenampungan(0, e.target.value);
                           }
                        },
                     })}
                     <div style={{ maxHeight: 600, overflow: "auto", minHeight: 600 }}>
                        <Table responsive hover className="align-middle table-row-dashed fs-6" size="sm">
                           <thead>
                              <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                 <th>nama responden</th>
                                 <th>nik responden</th>
                                 <th>status penyedotan</th>
                              </tr>
                           </thead>
                           <tbody className="text-gray-600 fw-semibold">
                              <Each
                                 of={listContent}
                                 render={(row) => (
                                    <tr
                                       style={{ cursor: "pointer" }}
                                       onClick={() => {
                                          const latitude = h.toInt(h.parse("latitude", row));
                                          const longitude = h.toInt(h.parse("longitude", row));

                                          map.setView([latitude, longitude], 50);
                                       }}>
                                       <td>{h.parse("nama_lengkap", row)}</td>
                                       <td>{h.parse("nik", row)}</td>
                                       <td>{statusPenyedotan[h.parse("status", row)]}</td>
                                    </tr>
                                 )}
                              />
                           </tbody>
                        </Table>
                     </div>
                  </Col>
               </Row>
            </Card.Body>
         </Card>
      )
   );
};
export default DaftarPenampungan;
