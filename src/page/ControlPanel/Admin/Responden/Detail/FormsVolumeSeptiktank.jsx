import React, { useLayoutEffect, useState } from "react";
import { ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const FormsVolumeSeptiktank = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { openFormsVolumeSeptiktank, detailContent } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   // array
   const [daftarJenisSeptiktank, setDaftarJenisSeptiktank] = useState([]);

   const initPage = () => {
      const fetch = h.get(`/initpenampungantinja`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setDaftarJenisSeptiktank(data.daftarJenisSeptiktank);
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      if (openFormsVolumeSeptiktank && h.objLength(detailContent)) initPage();
      return () => {};
   }, [openFormsVolumeSeptiktank, detailContent]);

   const clearProps = () => {
      setInput({});
      setErrors({});
   };

   const handleClose = () => {
      clearProps();
      dispatch(setModule({ ...module, openFormsVolumeSeptiktank: false }));
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = { user_modified: h.parse("username", init), id_responden: h.parse("id", detailContent) };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/submitvolumeseptiktank`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setErrors(data.errors);
         h.notification(data.status, data.msg_response);

         if (!data.status) return;

         clearProps();
         dispatch(setModule({ ...module, ...data.content, openFormsVolumeSeptiktank: false }));
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <React.Fragment>
         {openFormsVolumeSeptiktank && <div className="drawer-overlay" style={{ zIndex: 9999 }} />}
         <div
            className={`bg-white drawer drawer-end ${openFormsVolumeSeptiktank ? "drawer-on" : ""}`}
            style={{ width: window.innerWidth / 2, zIndex: 9999 }}>
            <Card className="rounded-0 w-100">
               <Card.Header className="pe-5">
                  <div className="card-title">
                     <div className="d-flex justify-content-center flex-column me-3">
                        <span className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Volume Septiktank</span>
                     </div>
                  </div>
                  <div className="card-toolbar">
                     <button className="btn btn-sm btn-icon btn-active-light-primary" onClick={handleClose}>
                        <i className="ki-duotone ki-cross fs-2">
                           <span className="path1" />
                           <span className="path2" />
                        </i>
                     </button>
                  </div>
               </Card.Header>
               <Card.Body className="hover-scroll-overlay-y">
                  {!isLoading && (
                     <React.Fragment>
                        <Row>
                           <Col>
                              {h.form_select(
                                 "Jenis Septiktank",
                                 "id_jenis_septiktank",
                                 {
                                    onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                                    value: h.parse("id_jenis_septiktank", input),
                                 },
                                 daftarJenisSeptiktank.map((row) => ({ value: h.parse("id", row), label: h.parse("nama", row) })),
                                 true,
                                 errors
                              )}
                           </Col>
                           <Col>
                              {h.form_text(
                                 `Lebar`,
                                 `lebar`,
                                 {
                                    onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                                    value: h.parse(`lebar`, input),
                                 },
                                 true,
                                 errors
                              )}
                           </Col>
                           <Col>
                              {h.form_text(
                                 `Kedalaman`,
                                 `kedalaman`,
                                 {
                                    onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                                    value: h.parse(`kedalaman`, input),
                                 },
                                 true,
                                 errors
                              )}
                           </Col>
                        </Row>
                        <Row>
                           <Col>
                              {h.form_text(
                                 `Diameter Tabung`,
                                 `diameter_tabung`,
                                 {
                                    onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                                    value: h.parse(`diameter_tabung`, input),
                                 },
                                 true,
                                 errors
                              )}
                           </Col>
                           <Col>
                              {h.form_text(
                                 `Panjang`,
                                 `panjang`,
                                 {
                                    onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                                    value: h.parse(`panjang`, input),
                                 },
                                 true,
                                 errors
                              )}
                           </Col>
                           <Col />
                        </Row>
                     </React.Fragment>
                  )}
               </Card.Body>
               <Card.Footer className="text-end">
                  <ButtonGroup>
                     {h.buttons(`Simpan`, isSubmit, {
                        onClick: isSubmit ? null : submit,
                     })}
                     {h.buttons(`Batal`, false, {
                        variant: "danger",
                        onClick: () => handleClose(),
                     })}
                  </ButtonGroup>
               </Card.Footer>
            </Card>
         </div>
      </React.Fragment>
   );
};
export default FormsVolumeSeptiktank;
