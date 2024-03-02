import React, { useLayoutEffect } from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { buttonConfig, position } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Forms = React.lazy(() => import("./Forms"));

const Context = () => {
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      dispatch(position(["Referensi", `Daftar ${document.title}`]));
      dispatch(
         buttonConfig({
            label: `Tambah ${document.title}`,
            type: "add",
            loading: "false",
         })
      );
      return () => {};
   }, []);

   return (
      <Card className="shadow-sm">
         <Card.Body>
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
               <Lists />
               <Forms />
            </React.Suspense>
         </Card.Body>
      </Card>
   );
};
export default Context;
