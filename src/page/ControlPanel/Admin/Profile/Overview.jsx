import React, { useLayoutEffect, useState } from "react";
import { ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setInit, setModule } from "~/redux";
import { Show } from "~/Show";

const Overview = () => {
   const { init, module } = useSelector((e) => e.redux);
   const { openForms } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   useLayoutEffect(() => {
      if (h.objLength(init)) setInput({ ...init, old_email: h.parse("email", init) });
      return () => {};
   }, [init]);

   const submit = (e) => {
      e.preventDefault();
      const formData = { user_modified: h.parse("username", init) };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/submit`, formData);
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

         dispatch(setInit({ ...init, ...data.content }));
         dispatch(setModule({ ...module, openForms: false }));
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <Card className="mb-5 mb-xl-10">
         <Card.Header className="cursor-pointer">
            <Card.Title className="m-0">
               <h3 className="fw-bold m-0">{openForms ? "Perbaharui Profil" : "Detail Profil"}</h3>
            </Card.Title>
            <Show>
               <Show.When isTrue={!openForms}>
                  {h.buttons(`Edit Profile`, false, {
                     className: "align-self-center",
                     onClick: () => dispatch(setModule({ ...module, openForms: true })),
                  })}
               </Show.When>
               <Show.When isTrue={openForms}>
                  <ButtonGroup>
                     {h.buttons(`Batal`, false, {
                        variant: "danger",
                        className: "align-self-center",
                        onClick: () => dispatch(setModule({ ...module, openForms: false })),
                     })}
                     {h.buttons(`Simpan`, false, {
                        className: "align-self-center",
                        onClick: isSubmit ? null : submit,
                     })}
                  </ButtonGroup>
               </Show.When>
            </Show>
         </Card.Header>
         <Card.Body className="p-9">
            <Show>
               <Show.When isTrue={openForms}>
                  <Row>
                     <Col>
                        {h.form_text(
                           `Nama Lengkap`,
                           `nama`,
                           { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`nama`, input) },
                           true,
                           errors
                        )}
                     </Col>
                     <Col>
                        {h.form_text(
                           `Email`,
                           `email`,
                           { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`email`, input) },
                           true,
                           errors
                        )}
                     </Col>
                     <Col>{h.form_text(`Username`, `username`, { disabled: true, value: h.parse(`username`, input) })}</Col>
                  </Row>
                  {h.form_password(`Password (Kosongkan saja jika tidak ingin mengganti dengan yang baru!)`, `password`, {
                     onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                     value: h.parse(`password`, input),
                  })}
               </Show.When>
               <Show.Else>
                  <Row className="mb-7">
                     <Col lg={4} className="fw-semibold text-muted">
                        Nama Lengkap
                     </Col>
                     <Col lg={8}>
                        <span className="fw-bold fs-6 text-gray-800">{h.parse("nama", init)}</span>
                     </Col>
                  </Row>
                  <Row className="mb-7">
                     <Col lg={4} className="fw-semibold text-muted">
                        Email
                     </Col>
                     <Col lg={8}>
                        <span className="fw-bold fs-6 text-gray-800">{h.parse("email", init)}</span>
                     </Col>
                  </Row>
                  <Row className="mb-7">
                     <Col lg={4} className="fw-semibold text-muted">
                        Username
                     </Col>
                     <Col lg={8}>
                        <span className="fw-bold fs-6 text-gray-800">{h.parse("username", init)}</span>
                     </Col>
                  </Row>
               </Show.Else>
            </Show>
         </Card.Body>
      </Card>
   );
};
export default Overview;
