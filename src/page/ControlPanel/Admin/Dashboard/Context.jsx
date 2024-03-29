import React from "react";
import { Bars } from "react-loader-spinner";

const DaftarPenampungan = React.lazy(() => import("./DaftarPenampungan"));

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
         <DaftarPenampungan />
      </React.Suspense>
   );
};
export default Context;
