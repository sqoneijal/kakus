import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const TabsNav = () => {
   const { module } = useSelector((e) => e.redux);
   const { tabAktif } = module;
   const dispatch = useDispatch();

   const array = [
      { value: 1, label: "Overview" },
      { value: 2, label: "Logs" },
   ];

   const handleClickTabs = (e) => {
      e.preventDefault();
      dispatch(setModule({ ...module, tabAktif: h.toInt(e.target.dataset.value) }));
   };

   return (
      <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
         <Each
            of={array}
            render={(row) => (
               <li className="nav-item mt-2">
                  <a
                     className={`nav-link text-active-primary ms-0 me-10 py-5 ${tabAktif === h.parse("value", row) ? "active" : ""}`}
                     href="#"
                     data-value={h.parse("value", row)}
                     onClick={handleClickTabs}>
                     {h.parse("label", row)}
                  </a>
               </li>
            )}
         />
      </ul>
   );
};
export default TabsNav;
