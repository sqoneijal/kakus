import React from "react";
import { Dropdown } from "react-bootstrap";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Main = () => {
   const handleChangeTheme = (value) => {
      localStorage.setItem("kakus-theme", value);
      document.documentElement.setAttribute("data-bs-theme", value);
   };

   const themeLists = [
      { title: "Light", value: "light", icon: "ki-outline ki-night-day fs-2" },
      { title: "Dark", value: "dark", icon: "ki-outline ki-moon fs-2" },
   ];

   return (
      <Dropdown bsPrefix="app-navbar-item ms-1 ms-md-4">
         <Dropdown.Toggle as="a" bsPrefix="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px">
            <i className="ki-outline ki-night-day theme-light-show fs-1" />
            <i className="ki-outline ki-moon theme-dark-show fs-1" />
         </Dropdown.Toggle>
         <Dropdown.Menu
            as="div"
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px">
            <Each
               of={themeLists}
               render={(row) => (
                  <div className="menu-item px-3 my-0">
                     <a
                        href="#"
                        className="menu-link px-3 py-2"
                        onClick={(e) => {
                           e.preventDefault();
                           handleChangeTheme(h.parse("value", row));
                        }}>
                        <span className="menu-icon">
                           <i className={h.parse("icon", row)} />
                        </span>
                        <span className="menu-title">{h.parse("title", row)}</span>
                     </a>
                  </div>
               )}
            />
         </Dropdown.Menu>
      </Dropdown>
   );
};
export default Main;
