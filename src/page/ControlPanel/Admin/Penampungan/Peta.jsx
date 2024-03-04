import React, { useLayoutEffect, useRef, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let map = null;

const Peta = () => {
   const { module, filter } = useSelector((e) => e.redux);
   const { openPeta } = module;
   const dispatch = useDispatch();
   const cardBody = useRef(null);

   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [listContent, setListContent] = useState([]);

   // string
   const [cardHeight, setCardHeight] = useState(0);

   useLayoutEffect(() => {
      if (cardBody.current) {
         setCardHeight(cardBody.current.clientHeight);
      }
      return () => {};
   }, [cardBody]);

   const handleClose = () => {
      map.remove();
      setListContent([]);
      dispatch(setModule({ ...module, openPeta: false }));
   };

   const getPeta = (page = 0) => {
      const formData = { ...filter, page };

      const fetch = h.get(`/getpeta?${h.serialize(formData)}`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         if (h.arrLength(data)) {
            setListContent((prev) => prev.concat(data));
            getPeta(page + 1);
         } else {
            setIsLoading(false);
         }
      });
   };

   useLayoutEffect(() => {
      if (openPeta) getPeta();
      return () => {};
   }, [openPeta]);

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

         map = L.map("maps").setView([firstLat, firstLong], 15);
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
   }, [listContent, isLoading]);

   const statusPenyedotan = {
      "": <span className="badge badge-warning">Belum dilakukan</span>,
      1: <span className="badge badge-success">Sudah dilakukan</span>,
      2: <span className="badge badge-danger">Tolak</span>,
   };

   return (
      <React.Fragment>
         {openPeta && <div className="drawer-overlay" />}
         <div className={`bg-white drawer drawer-start ${openPeta ? "drawer-on" : ""}`} style={{ width: window.innerWidth }}>
            <Card className="rounded-0 w-100">
               <Card.Header className="pe-5">
                  <div className="card-title">
                     <div className="d-flex justify-content-center flex-column me-3">
                        <span className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Info Geografis</span>
                     </div>
                  </div>
                  <div className="card-toolbar">
                     <button className="btn btn-sm btn-icon btn-active-light-primary" onClick={handleClose}>
                        <i className="ki-duotone ki-cross fs-2">
                           <span className="path1" />
                           <span className="path2" />
                        </i>
                     </button>
                  </div>
               </Card.Header>
               <Card.Body className="hover-scroll-overlay-y" ref={cardBody} style={{ height: cardHeight }}>
                  {!isLoading && h.arrLength(listContent) && (
                     <Row>
                        <Col id="maps" style={{ height: cardHeight }} />
                        <Col md={4} className="hover-scroll-overlay-y" style={{ height: cardHeight }}>
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
                        </Col>
                     </Row>
                  )}
               </Card.Body>
            </Card>
         </div>
      </React.Fragment>
   );
};
export default Peta;
