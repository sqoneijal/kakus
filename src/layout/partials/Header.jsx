import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Container } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Navbar = React.lazy(() => import("./header/Navbar"));

const Header = () => {
   const { buttonConfig, module } = useSelector((e) => e.redux);
   const { openForms } = module;
   const dispatch = useDispatch();

   const buttonType = h.parse("type", buttonConfig);

   const handleButtonClick = (e) => {
      e.preventDefault();
      if (buttonType === "add") {
         dispatch(setModule({ ...module, openForms: true, pageType: "insert" }));
      } else if (buttonType === "back") {
         dispatch(setModule({ ...module, openForms: false, pageType: "", detailContent: {} }));
      }
   };

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
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
         <div id="kt_app_header" className="app-header" data-kt-sticky-name="app-header-minimize" data-kt-sticky-animation="false">
            <Container fluid className="app-container d-flex align-items-stretch justify-content-between" id="kt_app_header_container">
               <div className="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" title="Show sidebar menu">
                  <div className="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
                     <i className="ki-outline ki-abstract-14 fs-2 fs-md-1" />
                  </div>
               </div>
               <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                  <span className="d-lg-none">
                     <img alt="KAKUS" data-src="/getfile/small-logo.png" className="h-30px lozad" />
                  </span>
               </div>
               <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
                  <div className="app-header-menu app-header-mobile-drawer align-items-stretch">
                     {h.objLength(buttonConfig) && !openForms && (
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                           {h.buttons(h.parse("label", buttonConfig), h.parse("loading", buttonConfig) === "true", {
                              onClick: handleButtonClick,
                              variant: buttonType === "back" ? "danger" : "primary",
                           })}
                        </div>
                     )}
                  </div>
                  <Navbar />
               </div>
            </Container>
         </div>
      </React.Suspense>
   );
};
export default Header;
