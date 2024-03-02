import React, { useLayoutEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let map = null;

const DetailMaps = () => {
   const { module } = useSelector((e) => e.redux);
   const { openDetailMaps, detailContent } = module;
   const dispatch = useDispatch();

   const handleClose = () => {
      dispatch(setModule({ ...module, openDetailMaps: false, detailContent: {} }));
      map.remove();
   };

   useLayoutEffect(() => {
      if (openDetailMaps && h.objLength(detailContent)) {
         map = L.map("maps-detail").setView([h.parse("latitude", detailContent), h.parse("longitude", detailContent)], 100);

         L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

         L.marker([h.parse("latitude", detailContent), h.parse("longitude", detailContent)])
            .addTo(map)
            .bindPopup(h.parse("nama_lengkap", detailContent))
            .openPopup();
      }
      return () => {};
   }, [openDetailMaps, detailContent]);

   return (
      <React.Fragment>
         {openDetailMaps && <div className="drawer-overlay" />}
         <div className={`bg-white drawer drawer-end ${openDetailMaps ? "drawer-on" : ""}`} style={{ width: window.innerWidth / 2 }}>
            <Card className="rounded-0 w-100">
               <Card.Header className="pe-5">
                  <div className="card-title">
                     <div className="d-flex justify-content-center flex-column me-3">
                        <span className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Detail Lokasi</span>
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
               <Card.Body id="maps-detail" />
            </Card>
         </div>
      </React.Fragment>
   );
};
export default DetailMaps;
