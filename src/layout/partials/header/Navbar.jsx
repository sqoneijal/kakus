import React from "react";
import { Dropdown } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const ThemeMode = React.lazy(() => import("./theme-mode/Main"));
const UserAccountMenus = React.lazy(() => import("./UserAccountMenus"));

const Navbar = () => {
   const { init } = useSelector((e) => e.redux);

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
         <div className="app-navbar flex-shrink-0">
            <ThemeMode />
            <Dropdown bsPrefix="app-navbar-item ms-1 ms-md-4" id="kt_header_user_menu_toggle">
               <Dropdown.Toggle as="div" bsPrefix="cursor-pointer symbol symbol-35px">
                  <img data-src={`/getfile/${h.parse("avatar", init)}`} className="rounded-3 lozad" alt={h.parse("username", init)} />
               </Dropdown.Toggle>
               <UserAccountMenus />
            </Dropdown>
            <div className="app-navbar-item d-lg-none ms-2 me-n2" title="Show header menu">
               <div className="btn btn-flex btn-icon btn-active-color-primary w-30px h-30px" id="kt_app_header_menu_toggle">
                  <i className="ki-outline ki-element-4 fs-1" />
               </div>
            </div>
         </div>
      </React.Suspense>
   );
};
export default Navbar;
