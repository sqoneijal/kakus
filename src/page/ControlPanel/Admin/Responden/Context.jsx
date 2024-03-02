import React, { useLayoutEffect } from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { buttonConfig } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Forms = React.lazy(() => import("./Forms"));
const DetailMaps = React.lazy(() => import("./DetailMaps"));
const Detail = React.lazy(() => import("./Detail/Context"));

const Context = () => {
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      dispatch(
         buttonConfig({
            label: `Tambah ${document.title}`,
            type: "add",
            loading: "false",
         })
      );
      return () => {};
   }, []);

   const daftarKepemilikanRumah = [
      { value: 1, label: "Milik Pribadi" },
      { value: 2, label: "Hak Pakai" },
      { value: 3, label: "Hak Milik Bersama" },
      { value: 4, label: "Hak Milik Bersama dengan Bagian Terpisah" },
      { value: 5, label: "Hak Milik Konstruktif" },
      { value: 6, label: "Kontrak Sewa" },
   ];

   const props = { daftarKepemilikanRumah };

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
               <Lists {...props} />
               <Forms {...props} />
               <DetailMaps />
               <Detail {...props} />
            </React.Suspense>
         </Card.Body>
      </Card>
   );
};
export default Context;
