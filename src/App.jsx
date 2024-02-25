import "~/assets/css/custom.css";
import "~/assets/css/pace-minimal.css";
import "~/assets/css/plugins.bundle.css";
import "~/assets/css/style.bundle.css";

import React, { useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Bars } from "react-loader-spinner";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setInit } from "~/redux";
import { Show } from "./Show";
import store from "./store";

const Login = React.lazy(() => import("./page/Login/Context"));
const ControlPanel = React.lazy(() => import("./page/ControlPanel/Context"));

if (process.env.NODE_ENV === "development") {
   new EventSource("http://localhost:8081/esbuild").addEventListener("change", () => location.reload());
}

const App = () => {
   const { init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const initLogin = () => {
      const fetch = h.get(`/login/init`, {}, true);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         if (h.objLength(data.content)) dispatch(setInit({ ...data.content }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      initLogin();
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
            <div className="d-flex flex-column flex-column-fluid flex-lg-row">
               <Show>
                  <Show.When isTrue={h.objLength(init)}>
                     <ControlPanel />
                  </Show.When>
                  <Show.Else>
                     <Login />
                  </Show.Else>
               </Show>
            </div>
         </React.Suspense>
      )
   );
};
const container = document.getElementById("kt_app_root");
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);
