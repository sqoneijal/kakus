import React, { useLayoutEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Switch, { Case } from "react-switch-case";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Navbar = React.lazy(() => import("./Navbar"));
const Overview = React.lazy(() => import("./Overview"));
const Logs = React.lazy(() => import("./Logs/Context"));

const Context = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { tabAktif } = module;
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const initPage = () => {
      const formData = { id: h.parse("id", init) };

      setIsLoading(true);
      const fetch = h.post(`/init`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, ...data, tabAktif: 1 }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      initPage();
      return () => {};
   }, []);

   return (
      !isLoading && (
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
            <Navbar />
            {tabAktif && (
               <Switch condition={tabAktif}>
                  <Case value={1}>
                     <Overview />
                  </Case>
                  <Case value={2}>
                     <Logs />
                  </Case>
               </Switch>
            )}
         </React.Suspense>
      )
   );
};
export default Context;
