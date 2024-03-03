import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModule } from "~/redux";

const Peta = () => {
   const { module } = useSelector((e) => e.redux);
   const { openPeta } = module;
   const dispatch = useDispatch();

   const handleClose = () => {
      dispatch(setModule({ ...module, openPeta: false }));
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
               <Card.Body className="hover-scroll-overlay-y">
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo
                  </p>
               </Card.Body>
               <Card.Footer className="text-end">
                  <button className="btn btn-light-danger">Dismiss drawer</button>
               </Card.Footer>
            </Card>
         </div>
      </React.Fragment>
   );
};
export default Peta;
