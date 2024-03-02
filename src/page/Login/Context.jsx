import React from "react";
import { Bars } from "react-loader-spinner";

const Aside = React.lazy(() => import("./Aside"));
const Body = React.lazy(() => import("./Body"));

const Context = () => {
   return (
      <div className="d-flex flex-column flex-column-fluid flex-lg-row">
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
            <Aside />
            <Body />
         </React.Suspense>
      </div>
   );
};
export default Context;
