import "~/assets/css/datatables.bundle.css";

import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Switch, { Case } from "react-switch-case";
import * as h from "~/Helpers";

const LayoutPartialsHeader = React.lazy(() => import("~/layout/partials/Header"));
const LayoutPartialsSidebar = React.lazy(() => import("~/layout/partials/Sidebar"));
const LayoutPartialsToolbar = React.lazy(() => import("~/layout/partials/Toolbar"));
const Admin = React.lazy(() => import("./Admin/Context"));

const Context = () => {
   const { init } = useSelector((e) => e.redux);

   // string
   const [toolbarFilter, setToolbarFilter] = useState("");

   const props = { toolbarFilter, setToolbarFilter };

   return (
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
            <BrowserRouter basename="/">
               <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                  <LayoutPartialsHeader />
                  <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                     <LayoutPartialsSidebar />
                     <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                        <div className="d-flex flex-column flex-column-fluid">
                           <LayoutPartialsToolbar {...props} />
                           <Switch condition={h.parse("role", init)}>
                              <Case value={1}>
                                 <Admin />
                              </Case>
                           </Switch>
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
