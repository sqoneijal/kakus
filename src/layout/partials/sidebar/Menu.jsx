import React, { useLayoutEffect, useState } from "react";
import { Accordion, AccordionButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { Show } from "~/Show";
import { buttonConfig, filter, position, setModule, showButton } from "~/redux";
import Navigation from "./Navigation.json";

const Menu = () => {
   const dispatch = useDispatch();
   const location = useLocation();

   // string
   const [defaultActiveKey, setDefaultActiveKey] = useState(0);

   useLayoutEffect(() => {
      let active = 0;
      Navigation.map((row, index) => {
         row.sub &&
            row.child.map((item) => {
               if (h.parse("pathname", location) === h.parse("pathname", item)) {
                  active = index;
               }
            });
      });
      setDefaultActiveKey(active);
      return () => {};
   }, [location, Navigation]);

   const handleChangeNav = (params = {}) => {
      if (h.parse("pathname", params) === h.parse("currentLocation", params)) {
         return;
      }
      dispatch(position([]));
      dispatch(filter({}));
      dispatch(setModule({}));
      dispatch(showButton(false));
      dispatch(buttonConfig({}));
   };

   return (
      <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
         <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper">
            <div id="kt_app_sidebar_menu_scroll" className="scroll-y my-5 mx-3" style={{ height: window.innerHeight - 100 }}>
               <Accordion
                  bsPrefix="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6"
                  defaultActiveKey={0}
                  activeKey={defaultActiveKey}>
                  <Each
                     of={Navigation}
                     render={(row, index) => (
                        <Show>
                           <Show.When isTrue={row.sub}>
                              <Accordion.Item className="menu-item" eventKey={index}>
                                 <AccordionButton
                                    as="span"
                                    bsPrefix={`menu-link ${
                                       h.parse("child", row) && row.child.find((item) => h.parse("pathname", item) === h.parse("pathname", location))
                                          ? "active"
                                          : ""
                                    }`}
                                    onClick={() => setDefaultActiveKey(index)}>
                                    <span className="menu-icon">
                                       <i className={h.parse("icon", row)} />
                                    </span>
                                    <span className="menu-title">{h.parse("label", row)}</span>
                                    <span className="menu-arrow" />
                                 </AccordionButton>
                                 <Accordion.Body className="menu-sub menu-sub-accordion">
                                    <Each
                                       of={row.child}
                                       render={(item) => (
                                          <div className="menu-item">
                                             <Link
                                                className={`menu-link ${h.parse("pathname", location) === h.parse("pathname", item) ? "active" : ""}`}
                                                to={h.parse("pathname", item)}
                                                onClick={() => {
                                                   handleChangeNav({
                                                      pathname: h.parse("pathname", item),
                                                      currentLocation: h.parse("pathname", location),
                                                   });
                                                   document.title = h.parse("label", item);
                                                }}>
                                                <span className="menu-bullet">
                                                   <span className="bullet bullet-dot" />
                                                </span>
                                                <span className="menu-title">{h.parse("label", item)}</span>
                                             </Link>
                                          </div>
                                       )}
                                    />
                                 </Accordion.Body>
                              </Accordion.Item>
                           </Show.When>
                           <Show.Else>
                              <div className="menu-item">
                                 <Link
                                    to={h.parse("pathname", row)}
                                    className={`menu-link ${h.parse("pathname", location) === h.parse("pathname", row) ? "active" : ""}`}
                                    onClick={() => {
                                       handleChangeNav({
                                          pathname: h.parse("pathname", row),
                                          currentLocation: h.parse("pathname", location),
                                       });
                                       document.title = h.parse("label", row);
                                    }}>
                                    <span className="menu-icon">
                                       <i className={h.parse("icon", row)} />
                                    </span>
                                    <span className="menu-title">{h.parse("label", row)}</span>
                                 </Link>
                              </div>
                           </Show.Else>
                        </Show>
                     )}
                  />
               </Accordion>
            </div>
         </div>
      </div>
   );
};
export default Menu;
