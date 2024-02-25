import React, { useLayoutEffect, useRef, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as h from "~/Helpers";
import { setInit } from "~/redux";

const LayoutPartialsHeader = React.lazy(() => import("~/layout/partials/Header"));
const LayoutPartialsSidebar = React.lazy(() => import("~/layout/partials/Sidebar"));
const LayoutPartialsToolbar = React.lazy(() => import("~/layout/partials/Toolbar"));

const Context = () => {
   const { init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const boxRef = useRef(null);

   // bool
   const [isLoading, setIsLoading] = useState(true);

   // string
   const [toolbarFilter, setToolbarFilter] = useState("");

   const initPage = () => {
      const fetch = h.get(`/controlpanel/init`, {}, true);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         if (!data.status) return window.open("/", "_parent");

         dispatch(setInit(data));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      bodyInit();
      appRootInit();
      initPage();
      return () => {};
   }, []);

   const props = { toolbarFilter, setToolbarFilter };

   return (
      !isLoading &&
      h.objLength(init) && (
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
            <BrowserRouter basename="controlpanel">
               <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                  <LayoutPartialsHeader />
                  <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                     <LayoutPartialsSidebar />
                     <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                        <div className="d-flex flex-column flex-column-fluid">
                           <LayoutPartialsToolbar {...props} />
                           {/* <Context {...props} /> */}
                        </div>
                     </div>
                  </div>
               </div>
            </BrowserRouter>
         </React.Suspense>
      )
   );
};
export default Context;

const bodyInit = () => {
   const body = document.body;
   body.classList.add("app-default");
   body.setAttribute("data-kt-app-layout", "light-sidebar");
   body.setAttribute("data-kt-app-header-fixed", true);
   body.setAttribute("data-kt-app-sidebar-enabled", true);
   body.setAttribute("data-kt-app-sidebar-fixed", true);
   body.setAttribute("data-kt-app-sidebar-hoverable", true);
   body.setAttribute("data-kt-app-sidebar-push-header", true);
   body.setAttribute("data-kt-app-sidebar-push-toolbar", true);
   body.setAttribute("data-kt-app-sidebar-push-footer", true);
   body.setAttribute("data-kt-app-toolbar-enabled", true);
   body.setAttribute("data-kt-app-footer-fixed", true);
   body.setAttribute("data-kt-app-toolbar-fixed", true);
};

const appRootInit = () => {
   const div = document.querySelector("#kt_app_root");
   div.classList.add("d-flex");
   div.classList.add("flex-column");
   div.classList.add("flex-root");
   div.classList.add("app-root");
};
