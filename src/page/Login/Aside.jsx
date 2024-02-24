import lozad from "lozad";
import React, { useLayoutEffect } from "react";

const Aside = () => {
   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
         <div className="d-flex flex-center flex-lg-start flex-column">
            <span className="mb-7">
               <img alt="KAKUS" className="lozad" data-src="/getfile/logo.png" />
            </span>
            <h2 className="text-white fw-normal m-0">Kakus Terkelola, Masyarakat Sehat: Solusi Informasi Praktis untuk WC Anda!</h2>
         </div>
      </div>
   );
};
export default Aside;
