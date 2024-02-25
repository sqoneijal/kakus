import React from "react";
import { Bars } from "react-loader-spinner";

const Logo = React.lazy(() => import("./sidebar/Logo"));
const Menu = React.lazy(() => import("./sidebar/Menu"));

const Sidebar = () => {
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
         <div id="kt_app_sidebar" className="app-sidebar flex-column">
            <Logo />
            <Menu />
         </div>
      </React.Suspense>
   );
};
export default Sidebar;
