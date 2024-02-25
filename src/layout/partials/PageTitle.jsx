import React from "react";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const PageTitle = () => {
   const { position } = useSelector((e) => e.redux);

   return (
      <div className="page-title d-flex align-items-center flex-wrap me-3">
         <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 align-items-center my-0">{document.title}</h1>
         {h.arrLength(position) && (
            <React.Fragment>
               <span className="h-20px border-gray-300 border-start mx-4" />
               <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0">
                  <Each
                     of={position}
                     render={(row, index) => (
                        <React.Fragment key={row}>
                           <li className="breadcrumb-item text-muted">{row}</li>
                           {index + 1 !== position.length && (
                              <li className="breadcrumb-item">
                                 <span className="bullet bg-gray-500 w-5px h-2px" />
                              </li>
                           )}
                        </React.Fragment>
                     )}
                  />
               </ul>
            </React.Fragment>
         )}
      </div>
   );
};
export default PageTitle;
