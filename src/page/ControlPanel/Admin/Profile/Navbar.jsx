import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setInit } from "~/redux";

const TabsNav = React.lazy(() => import("./TabsNav"));

const Navbar = () => {
   const { init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   const gantiFoto = (file) => {
      const formData = { file, id: h.parse("id", init) };

      const fetch = h.post(`/gantifoto`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         h.notification(data.status, data.msg_response);

         if (!data.status) return;

         document.querySelector("#avatar").src = `/getfile/${h.parse("content", data)}`;
         dispatch(setInit({ ...init, avatar: data.content }));
      });
   };

   const userBadge = { 1: "ki-outline ki-verify fs-1 text-primary" };
   const userRole = { 1: "Administrator" };

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
         <Card className="mb-5 mb-xl-10">
            <Card.Body className="pt-9 pb-0">
               <div className="d-flex flex-wrap flex-sm-nowrap">
                  <div className="me-7 mb-4">
                     <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                        <img id="avatar" data-src={`/getfile/${h.parse("avatar", init)}`} alt={h.parse("nama", init)} className="lozad" />
                     </div>
                  </div>
                  <div className="flex-grow-1">
                     <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                        <div className="d-flex flex-column">
                           <div className="d-flex align-items-center mb-2">
                              <span className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">{h.parse("nama", init)}</span>
                              <i className={userBadge[h.parse("role", init)]} />
                           </div>
                           <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                              <span className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2">
                                 <i className="ki-outline ki-profile-circle fs-4 me-1" /> {userRole[h.parse("role", init)]}
                              </span>
                              <span className="d-flex align-items-center text-gray-500 text-hover-primary mb-2">
                                 <i className="ki-outline ki-sms fs-4 me-1" /> {h.parse("email", init)}
                              </span>
                           </div>
                        </div>
                        <div className="d-flex my-4">
                           <label className="btn btn-sm btn-primary me-3">
                              Ganti Foto{" "}
                              <input
                                 type="file"
                                 style={{ display: "none" }}
                                 onChange={(e) => {
                                    const files = e.target.files;
                                    if (h.arrLength(files)) {
                                       gantiFoto(files[0]);
                                    }
                                 }}
                              />
                           </label>
                        </div>
                     </div>
                     <div className="d-flex flex-wrap flex-stack">
                        <div className="d-flex flex-column flex-grow-1 pe-8">
                           <div className="d-flex flex-wrap">
                              <div className="border border-gray-300 border-dashed rounded min-w-200px py-3 px-4 me-6 mb-3">
                                 <div className="d-flex align-items-center">
                                    <i className="ki-outline ki-arrow-up fs-3 text-success me-2" />
                                    <div className="fs-2 fw-bold">{h.parse("last_login", init, "date")}</div>
                                 </div>
                                 <div className="fw-semibold fs-6 text-gray-500">Terakhir Login</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <TabsNav />
            </Card.Body>
         </Card>
      </React.Suspense>
   );
};
export default Navbar;
