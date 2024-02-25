import React from "react";
import { Container } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";

const PageTitle = React.lazy(() => import("./PageTitle"));

const Toolbar = ({ toolbarFilter }) => {
   const { module } = useSelector((e) => e.redux);
   const { showToolbarFilter } = module;

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
         <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
            <Container fluid id="kt_app_toolbar_container" className="app-container d-flex flex-stack">
               <PageTitle />
               <div className="d-flex align-items-center gap-2 gap-lg-3">{showToolbarFilter && toolbarFilter}</div>
            </Container>
         </div>
      </React.Suspense>
   );
};
export default Toolbar;
