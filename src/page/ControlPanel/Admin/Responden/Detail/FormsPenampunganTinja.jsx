import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import wnumb from "wnumb";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const FormsPenampunganTinja = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { openFormsPenampunganTinja, detailContent, volumeSeptiktank, pageType, detailPenampunganTinja } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [input, setInput] = useState({});

   useLayoutEffect(() => {
      if (pageType === "update" && h.objLength(detailPenampunganTinja)) setInput({ ...detailPenampunganTinja });
      return () => {};
   }, [pageType, detailPenampunganTinja]);

   const clearProps = () => {
      setErrors({});
      setInput({});
   };

   const handleClose = () => {
      clearProps();
      dispatch(setModule({ ...module, openFormsPenampunganTinja: false, pageType: "", detailPenampunganTinja: {} }));
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         pageType,
         user_modified: h.parse("username", init),
         id_responden: h.parse("id", detailContent),
         id_volume_septiktank: h.parse("id", volumeSeptiktank),
      };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/submitpenampungantinja`, formData);
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
         dispatch(setModule({ ...module, ...data.content, openFormsPenampunganTinja: false, pageType: "", detailPenampunganTinja: {} }));
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <React.Fragment>
         {openFormsPenampunganTinja && <div className="drawer-overlay" style={{ zIndex: 9999 }} />}
         <div
            className={`bg-white drawer drawer-end ${openFormsPenampunganTinja ? "drawer-on" : ""}`}
            style={{ width: window.innerWidth / 2, zIndex: 9999 }}>
            <Card className="rounded-0 w-100">
               <Card.Header className="pe-5">
                  <div className="card-title">
                     <div className="d-flex justify-content-center flex-column me-3">
                        <span className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">
                           {h.pageType(pageType)} Keterangan Penampungan Tinja
                        </span>
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
                  <Row>
                     <Col>
                        {h.form_text(
                           `Tahun Penyedotan`,
                           `kala_penyedotan`,
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                              value: h.parse(`kala_penyedotan`, input),
                           },
                           true,
                           errors
                        )}
                     </Col>
                     <Col>
                        {h.form_text(
                           `Tahun Pembangunan`,
                           `pembangunan`,
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                              value: h.parse(`pembangunan`, input),
                           },
                           true,
                           errors
                        )}
                     </Col>
                     <Col>
                        {h.form_text(
                           `Harga Penyedotan`,
                           `harga_penyedotan`,
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value.replace(/\./g, "") })),
                              value: wnumb({ thousand: "." }).to(h.toInt(h.parse(`harga_penyedotan`, input))),
                           },
                           true,
                           errors
                        )}
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        {h.form_text(`Tingkat Keamanan`, `tingkat_keamanan`, {
                           onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                           value: h.parse(`tingkat_keamanan`, input),
                        })}
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        {h.date_picker(
                           "Tanggal Penyedotan Terakhir",
                           "tanggal_penyedotan_terakhir",
                           {
                              onChange: ([date]) => setInput((prev) => ({ ...prev, tanggal_penyedotan_terakhir: moment(date).format("YYYY-MM-DD") })),
                              value: h.parse("tanggal_penyedotan_terakhir", input),
                           },
                           true,
                           errors
                        )}
                     </Col>
                     <Col>
                        {h.date_picker(
                           "Tanggal Rencana Penyedotan",
                           "tanggal_rencana_penyedotan",
                           {
                              onChange: ([date]) => setInput((prev) => ({ ...prev, tanggal_rencana_penyedotan: moment(date).format("YYYY-MM-DD") })),
                              value: h.parse("tanggal_rencana_penyedotan", input),
                           },
                           true,
                           errors
                        )}
                     </Col>
                  </Row>
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
export default FormsPenampunganTinja;
