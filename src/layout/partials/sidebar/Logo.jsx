import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

const Logo = () => {
   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
         <Link to={"/"}>
            <img alt="Koperasi" data-src="/getfile/logo.png" className="h-25px app-sidebar-logo-default theme-light-show lozad" />
            <img alt="Koperasi" data-src="/getfile/logo.png" className="h-25px app-sidebar-logo-default theme-dark-show lozad" />
            <img alt="Koperasi" data-src="/getfile/small-logo.png" className="h-20px app-sidebar-logo-minimize lozad" />
         </Link>
      </div>
   );
};
export default Logo;
