import "~/assets/css/pace-minimal.css";
import "~/assets/css/plugins.bundle.css";
import "~/assets/css/style.bundle.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Bars } from "react-loader-spinner";
import { Provider } from "react-redux";
import Switch, { Case } from "react-switch-case";
import store from "./store";

const Login = React.lazy(() => import("./page/Login/Context"));
const ControlPanel = React.lazy(() => import("./page/ControlPanel/Context"));

if (process.env.NODE_ENV === "development") {
   new EventSource("http://localhost:8081/esbuild").addEventListener("change", () => location.reload());
}

const App = () => {
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
         <div className="d-flex flex-column flex-column-fluid flex-lg-row">
            <Switch condition={location.pathname}>
               <Case value="/">
                  <Login />
               </Case>
               <Case value="/login">
                  <Login />
               </Case>
               <Case value="/controlpanel">
                  <ControlPanel />
               </Case>
            </Switch>
         </div>
      </React.Suspense>
   );
};
const container = document.getElementById("kt_app_root");
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);
