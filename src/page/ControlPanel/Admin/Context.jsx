import React from "react";
import { Container } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("./Dashboard/Context"));

const Context = () => {
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
         <div id="kt_app_content" className="app-content flex-column-fluid">
            <Container fluid id="kt_app_content_container" className="app-container">
               <Routes>
                  <Route path="/" element={<Dashboard />} />
               </Routes>
            </Container>
         </div>
      </React.Suspense>
   );
};
export default Context;
