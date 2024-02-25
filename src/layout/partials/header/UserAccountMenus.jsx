import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as h from "~/Helpers";
import { buttonConfig, filter, position, setModule, showButton } from "~/redux";

const UserAccountMenus = () => {
   const { init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   const handleClickProfile = () => {
      document.title = "Profile";
      dispatch(position([]));
      dispatch(filter({}));
      dispatch(setModule({}));
      dispatch(showButton(false));
      dispatch(buttonConfig({}));
   };

   return (
      <Dropdown.Menu
         as="div"
         bsPrefix="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
         renderOnMount={true}>
         <Dropdown.Item as="div" bsPrefix="menu-item px-3">
            <div className="menu-content d-flex align-items-center px-3">
               <div className="symbol symbol-50px me-5">
                  <img alt={h.parse("username", init)} className="lozad" data-src={`/getfile/${h.parse("avatar", init)}`} />
               </div>
               <div className="d-flex flex-column">
                  <div className="fw-bold d-flex align-items-center fs-5">{h.parse("nama", init)}</div>
                  <a className="fw-semibold text-muted text-hover-primary fs-7">{h.parse("email", init)}</a>
               </div>
            </div>
         </Dropdown.Item>
         <Dropdown.Divider as="div" bsPrefix="separator my-2" />
         <Dropdown.Item as="div" bsPrefix="menu-item px-5">
            <Link className="menu-link px-5" to={"/profile"} onClick={handleClickProfile}>
               Profile
            </Link>
         </Dropdown.Item>
         <Dropdown.Item as="div" bsPrefix="menu-item px-5">
            <a href="/logout" className="menu-link px-5">
               Sign Out
            </a>
         </Dropdown.Item>
      </Dropdown.Menu>
   );
};
export default UserAccountMenus;
