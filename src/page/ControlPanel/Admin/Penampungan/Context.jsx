import moment from "moment";
import React, { useLayoutEffect } from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { filter as setFilter, setModule } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Peta = React.lazy(() => import("./Peta"));

const Context = ({ setToolbarFilter }) => {
   const { module, filter } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      dispatch(setFilter({ tahun: moment().format("YYYY") }));
      dispatch(setModule({ ...module, showToolbarFilter: true }));
      return () => {};
   }, []);

   useLayoutEffect(() => {
      if (h.objLength(filter))
         setToolbarFilter(
            h.buttons(`Lihat Peta`, false, {
               onClick: () => dispatch(setModule({ ...module, openPeta: true })),
            })
         );
      return () => {};
   }, [filter]);

   return (
      <Card className="shadow-sm">
         <Card.Body>
            {h.objLength(filter) && (
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
                  <Peta />
               </React.Suspense>
            )}
         </Card.Body>
      </Card>
   );
};
export default Context;
