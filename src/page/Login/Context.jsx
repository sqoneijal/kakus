import React, { useLayoutEffect } from "react";
import { Bars } from "react-loader-spinner";

const Aside = React.lazy(() => import("./Aside"));
const Body = React.lazy(() => import("./Body"));

const bodyClassInit = () => {
   const body = document.body;
   body.classList.add("app-blank");
   body.classList.add("bgi-size-cover");
   body.classList.add("bgi-attachment-fixed");
   body.classList.add("bgi-position-center");
   body.classList.add("bgi-no-repeat");
   body.style.background = `url(/getfile/login-bg.jpg)`;
};

const rootClassInit = () => {
   const div = document.getElementById("kt_app_root");
   div.classList.add("d-flex");
   div.classList.add("flex-column");
   div.classList.add("flex-root");
};

const Context = () => {
   useLayoutEffect(() => {
      bodyClassInit();
      rootClassInit();
      return () => {};
   }, []);

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
         <Aside />
         <Body />
      </React.Suspense>
   );
};
export default Context;
