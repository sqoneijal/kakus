import React from "react";
import { Container } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("./Dashboard/Context"));
const Profile = React.lazy(() => import("./Profile/Context"));
const ReferensiJenisSeptiktank = React.lazy(() => import("./Referensi/JenisSeptiktank/Context"));
const Responden = React.lazy(() => import("./Responden/Context"));
const Penampungan = React.lazy(() => import("./Penampungan/Context"));

const Context = ({ setToolbarFilter }) => {
   const props = { setToolbarFilter };

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
                  <Route path="profile" element={<Profile />} />
                  <Route path="responden" element={<Responden />} />
                  <Route path="penampungan" element={<Penampungan {...props} />} />
                  <Route path="referensi">
                     <Route path="jenisseptiktank" element={<ReferensiJenisSeptiktank />} />
                  </Route>
               </Routes>
            </Container>
         </div>
      </React.Suspense>
   );
};
export default Context;
