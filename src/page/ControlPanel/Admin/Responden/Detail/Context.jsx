import React, { useLayoutEffect, useRef, useState } from "react";
import { ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const BiodataResponden = React.lazy(() => import("./BiodataResponden"));
const Koordinat = React.lazy(() => import("./Koordinat"));
const KepemilikanRumah = React.lazy(() => import("./KepemilikanRumah"));
const FormsPenampunganTinja = React.lazy(() => import("./FormsPenampunganTinja"));
const FormsVolumeSeptiktank = React.lazy(() => import("./FormsVolumeSeptiktank"));
const VolumeSeptiktank = React.lazy(() => import("./VolumeSeptiktank"));
const PenampunganTinja = React.lazy(() => import("./PenampunganTinja"));

let map = null;

const Context = ({ daftarKepemilikanRumah }) => {
   const { module } = useSelector((e) => e.redux);
   const { openDetail, detailContent, volumeSeptiktank } = module;
   const dispatch = useDispatch();
   const cardBody = useRef(null);

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const handleClose = () => {
      map.remove();
      dispatch(setModule({ ...module, openDetail: false, detailContent: {} }));
   };

   const getData = (id_responden) => {
      const formData = { id_responden };

      setIsLoading(true);
      const fetch = h.post(`/getdetail`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, ...data }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      if (openDetail && h.objLength(detailContent)) {
         getData(h.parse("id", detailContent));

         const latitude = h.toInt(h.parse("latitude", detailContent));
         const longitude = h.toInt(h.parse("longitude", detailContent));

         map = L.map("maps-detail-responden").setView([latitude, longitude], 100);

         L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

         L.marker([latitude, longitude]).addTo(map).bindPopup(h.parse("nama_lengkap", detailContent)).openPopup();
      }
      return () => {};
   }, [openDetail, detailContent]);

   const props = { daftarKepemilikanRumah, getData };

   return (
      <React.Fragment>
         {openDetail && <div className="drawer-overlay" />}
         <div className={`bg-white drawer drawer-start ${openDetail ? "drawer-on" : ""}`} style={{ width: "100%" }}>
            <Card className="rounded-0 w-100">
               <Card.Header className="pe-5">
                  <div className="card-title">
                     <div className="d-flex justify-content-center flex-column me-3">
                        <span className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Detail Responden</span>
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
               <Card.Body className="hover-scroll-overlay-y" id="card-body-responden" ref={cardBody}>
                  <Row>
                     <Col>
                        {!isLoading && (
                           <React.Suspense
                              fallback={
                                 <Bars
                                    visible={true}
                                    color="#4fa94d"
                                    radius="9"
                                    wrapperStyle={{
                                       alignItems: "center",
                                       display: "flex",
                                       justifyContent: "center",
                                    }}
                                    wrapperClass="page-loader flex-column bg-dark bg-opacity-25"
                                 />
                              }>
                              <BiodataResponden {...props} />
                              <Koordinat />
                              <KepemilikanRumah />
                              <VolumeSeptiktank />
                              <PenampunganTinja {...props} />
                              <FormsPenampunganTinja />
                              <FormsVolumeSeptiktank />
                           </React.Suspense>
                        )}
                     </Col>
                     <Col id="maps-detail-responden" style={{ height: cardBody.current ? cardBody.current.clientHeight : "auto" }} />
                  </Row>
               </Card.Body>
               <Card.Footer className="text-end">
                  <ButtonGroup>
                     {h.buttons(`Perbaharui Volume Septiktank`, false, {
                        onClick: () => dispatch(setModule({ ...module, openFormsVolumeSeptiktank: true })),
                     })}
                     {h.parse("id", volumeSeptiktank) &&
                        h.buttons(`Tambah Penampungan Tinja`, false, {
                           variant: "success",
                           onClick: () => dispatch(setModule({ ...module, openFormsPenampunganTinja: true, pageType: "insert" })),
                        })}
                  </ButtonGroup>
               </Card.Footer>
            </Card>
         </div>
      </React.Fragment>
   );
};
export default Context;
