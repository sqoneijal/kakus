import React, { useLayoutEffect, useState } from "react";
import { ButtonGroup, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { Hint, Typeahead } from "react-bootstrap-typeahead";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { applyFilter, setModule } from "~/redux";

const InformasiKepemilikanRumah = React.lazy(() => import("./InformasiKepemilikanRumah"));

const Forms = ({ daftarKepemilikanRumah }) => {
   const { module, init, filter } = useSelector((e) => e.redux);
   const { pageType, openForms, detailContent } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   // array
   const [daftarProvinsi, setDaftarProvinsi] = useState([]);
   const [selectedProvinsi, setSelectedProvinsi] = useState([]);
   const [daftarKabkota, setDaftarKabkota] = useState([]);
   const [selectedKabkota, setSelectedKabkota] = useState([]);
   const [daftarKecamatan, setDaftarKecamatan] = useState([]);
   const [selectedKecamatan, setSelectedKecamatan] = useState([]);
   const [daftarDesa, setDaftarDesa] = useState([]);
   const [selectedDesa, setSelectedDesa] = useState([]);

   const getDetail = (id_responden) => {
      const formData = { id_responden };

      const fetch = h.post(`/getdetail`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         const { biodataResponden, koordinatRumah } = data;

         setInput({
            ...biodataResponden,
            old_nik: h.parse("nik", biodataResponden),
            latitude: h.toInt(h.parse("latitude", koordinatRumah)),
            longitude: h.toInt(h.parse("longitude", koordinatRumah)),
         });
         setSelectedProvinsi([{ id: h.parse("id_provinsi", biodataResponden), label: h.parse("provinsi", biodataResponden) }]);
         setSelectedKabkota([{ id: h.parse("id_kabkota", biodataResponden), label: h.parse("kabkota", biodataResponden) }]);
         setSelectedKecamatan([{ id: h.parse("id_kecamatan", biodataResponden), label: h.parse("kecamatan", biodataResponden) }]);
         setSelectedDesa([{ id: h.parse("id_desa", biodataResponden), label: h.parse("desa", biodataResponden) }]);

         getDaftarKabkota(h.parse("id_provinsi", biodataResponden));
         getDaftarKecamatan(h.parse("id_kabkota", biodataResponden));
         getDaftarDesa(h.parse("id_kecamatan", biodataResponden));
      });
   };

   useLayoutEffect(() => {
      if (openForms && pageType === "update" && h.objLength(detailContent)) getDetail(h.parse("id", detailContent));
      return () => {};
   }, [openForms, pageType, detailContent]);

   const props = { input, setInput, errors };

   const handlechangeDesa = (data) => {
      setSelectedDesa(data);
      setInput((prev) => ({ ...prev, id_desa: h.arrLength(data) ? h.parse("id", data[0]) : "" }));
   };

   const getDaftarDesa = (id_kecamatan) => {
      const fetch = h.get(`/getdaftardesa?${h.serialize({ id_kecamatan })}`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setDaftarDesa(data);
      });
   };

   const handleChangeKecamatan = (data) => {
      setDaftarDesa([]);
      setSelectedDesa([]);
      setSelectedKecamatan(data);
      setInput((prev) => ({ ...prev, id_kecamatan: h.arrLength(data) ? h.parse("id", data[0]) : "" }));
      if (h.arrLength(data)) getDaftarDesa(h.parse("id", data[0]));
   };

   const getDaftarKecamatan = (id_kabkota) => {
      const fetch = h.get(`/getdaftarkecamatan?${h.serialize({ id_kabkota })}`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setDaftarKecamatan(data);
      });
   };

   const handleChangeKabkota = (data) => {
      setDaftarKecamatan([]);
      setSelectedKecamatan([]);
      setDaftarDesa([]);
      setSelectedDesa([]);
      setSelectedKabkota(data);
      setInput((prev) => ({ ...prev, id_kabkota: h.arrLength(data) ? h.parse("id", data[0]) : "" }));
      if (h.arrLength(data)) getDaftarKecamatan(h.parse("id", data[0]));
   };

   const getDaftarKabkota = (id_provinsi) => {
      const fetch = h.get(`/getdaftarkabkota?${h.serialize({ id_provinsi })}`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setDaftarKabkota(data);
      });
   };

   const handleChangeProvinsi = (data) => {
      setDaftarKabkota([]);
      setSelectedKabkota([]);
      setDaftarKecamatan([]);
      setSelectedKecamatan([]);
      setDaftarDesa([]);
      setSelectedDesa([]);
      setSelectedProvinsi(data);
      setInput((prev) => ({ ...prev, id_provinsi: h.arrLength(data) ? h.parse("id", data[0]) : "" }));
      if (h.arrLength(data)) getDaftarKabkota(h.parse("id", data[0]));
   };

   const getDaftarProvinsi = () => {
      const fetch = h.get(`/getdaftarprovinsi`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setDaftarProvinsi(data);
      });
   };

   useLayoutEffect(() => {
      if (openForms) getDaftarProvinsi();
      return () => {};
   }, [openForms]);

   const clearProps = () => {
      setInput({});
      setErrors({});
   };

   const handleClose = () => {
      clearProps();
      dispatch(setModule({ ...module, openForms: false, pageType: "", detailContent: {} }));
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = { pageType, user_modified: h.parse("username", init) };
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

         clearProps();
         dispatch(setModule({ ...module, openForms: false, pageType: "", detailContent: {} }));
         dispatch(applyFilter({ url: "/getdata", data: { ...filter } }));
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <React.Fragment>
         {openForms && <div className="drawer-overlay" />}
         <div className={`bg-white drawer drawer-start ${openForms ? "drawer-on" : ""}`} style={{ width: window.innerWidth / 2 }}>
            <Card className="rounded-0 w-100">
               <Card.Header className="pe-5">
                  <div className="card-title">
                     <div className="d-flex justify-content-center flex-column me-3">
                        <span className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">
                           {h.pageType(pageType)} {document.title}
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
                           `Nama Lengkap`,
                           `nama_lengkap`,
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                              value: h.parse(`nama_lengkap`, input),
                           },
                           true,
                           errors
                        )}
                     </Col>
                     <Col>
                        {h.form_text(
                           `Nama Kepala Keluarga`,
                           `nama_kepala_keluarga`,
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                              value: h.parse(`nama_kepala_keluarga`, input),
                           },
                           true,
                           errors
                        )}
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        {h.form_text(
                           `NIK`,
                           `nik`,
                           { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`nik`, input) },
                           true,
                           errors
                        )}
                     </Col>
                     <Col>
                        {h.form_select(
                           "Kepemilikan Rumah",
                           "id_kepemilikan_rumah",
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                              value: h.parse("id_kepemilikan_rumah", input),
                           },
                           daftarKepemilikanRumah,
                           true,
                           errors
                        )}
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <Typeahead
                           id="id_provinsi"
                           onChange={handleChangeProvinsi}
                           options={daftarProvinsi.map((row) => ({ ...row, label: h.parse("nama", row) }))}
                           placeholder="Provinsi"
                           renderInput={({ inputRef, referenceElementRef, ...inputProps }) => {
                              return (
                                 <Hint>
                                    <FloatingLabel
                                       controlId={inputProps.id}
                                       label={inputProps.placeholder}
                                       className="form-label mb-2"
                                       style={{ width: "100%" }}>
                                       <Form.Control
                                          {...inputProps}
                                          ref={(node) => {
                                             inputRef(node);
                                             referenceElementRef(node);
                                          }}
                                          isInvalid={h.is_invalid("id_provinsi", errors)}
                                       />
                                       <Form.Label className="required" htmlFor={inputProps.id}>
                                          {inputProps.placeholder}
                                       </Form.Label>
                                       {h.msg_response("id_provinsi", errors)}
                                    </FloatingLabel>
                                 </Hint>
                              );
                           }}
                           selected={selectedProvinsi}
                        />
                     </Col>
                     <Col>
                        <Typeahead
                           id="id_kabkota"
                           onChange={handleChangeKabkota}
                           options={daftarKabkota.map((row) => ({ ...row, label: h.parse("nama", row) }))}
                           placeholder="Kabupaten/Kota"
                           renderInput={({ inputRef, referenceElementRef, ...inputProps }) => {
                              return (
                                 <Hint>
                                    <FloatingLabel
                                       controlId={inputProps.id}
                                       label={inputProps.placeholder}
                                       className="form-label mb-2"
                                       style={{ width: "100%" }}>
                                       <Form.Control
                                          {...inputProps}
                                          ref={(node) => {
                                             inputRef(node);
                                             referenceElementRef(node);
                                          }}
                                          isInvalid={h.is_invalid("id_kabkota", errors)}
                                       />
                                       <Form.Label className="required" htmlFor={inputProps.id}>
                                          {inputProps.placeholder}
                                       </Form.Label>
                                       {h.msg_response("id_kabkota", errors)}
                                    </FloatingLabel>
                                 </Hint>
                              );
                           }}
                           selected={selectedKabkota}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <Typeahead
                           id="id_kecamatan"
                           onChange={handleChangeKecamatan}
                           options={daftarKecamatan.map((row) => ({ ...row, label: h.parse("nama", row) }))}
                           placeholder="Kecamatan"
                           renderInput={({ inputRef, referenceElementRef, ...inputProps }) => {
                              return (
                                 <Hint>
                                    <FloatingLabel
                                       controlId={inputProps.id}
                                       label={inputProps.placeholder}
                                       className="form-label mb-2"
                                       style={{ width: "100%" }}>
                                       <Form.Control
                                          {...inputProps}
                                          ref={(node) => {
                                             inputRef(node);
                                             referenceElementRef(node);
                                          }}
                                          isInvalid={h.is_invalid("id_kecamatan", errors)}
                                       />
                                       <Form.Label className="required" htmlFor={inputProps.id}>
                                          {inputProps.placeholder}
                                       </Form.Label>
                                       {h.msg_response("id_kecamatan", errors)}
                                    </FloatingLabel>
                                 </Hint>
                              );
                           }}
                           selected={selectedKecamatan}
                        />
                     </Col>
                     <Col>
                        <Typeahead
                           id="id_desa"
                           onChange={handlechangeDesa}
                           options={daftarDesa.map((row) => ({ ...row, label: h.parse("nama", row) }))}
                           placeholder="Desa"
                           renderInput={({ inputRef, referenceElementRef, ...inputProps }) => {
                              return (
                                 <Hint>
                                    <FloatingLabel
                                       controlId={inputProps.id}
                                       label={inputProps.placeholder}
                                       className="form-label mb-2"
                                       style={{ width: "100%" }}>
                                       <Form.Control
                                          {...inputProps}
                                          ref={(node) => {
                                             inputRef(node);
                                             referenceElementRef(node);
                                          }}
                                          isInvalid={h.is_invalid("id_desa", errors)}
                                       />
                                       <Form.Label className="required" htmlFor={inputProps.id}>
                                          {inputProps.placeholder}
                                       </Form.Label>
                                       {h.msg_response("id_desa", errors)}
                                    </FloatingLabel>
                                 </Hint>
                              );
                           }}
                           selected={selectedDesa}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        {h.form_text(
                           `Alamat`,
                           `alamat`,
                           { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`alamat`, input) },
                           true,
                           errors
                        )}
                     </Col>
                     <Col md={3} sm={12}>
                        {h.form_text(
                           `Kode Pos`,
                           `kode_pos`,
                           { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`kode_pos`, input) },
                           true,
                           errors
                        )}
                     </Col>
                  </Row>
                  <Row className="mt-5">
                     <h4>Koordinat</h4>
                     <Col>
                        {h.form_text(
                           `Latitude`,
                           `latitude`,
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                              value: h.parse(`latitude`, input),
                           },
                           true,
                           errors
                        )}
                     </Col>
                     <Col>
                        {h.form_text(
                           `Longitude`,
                           `longitude`,
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                              value: h.parse(`longitude`, input),
                           },
                           true,
                           errors
                        )}
                     </Col>
                  </Row>
                  {h.parse("id_kepemilikan_rumah", input) && h.parse("id_kepemilikan_rumah", input) !== 1 && (
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
                        <InformasiKepemilikanRumah {...props} />
                     </React.Suspense>
                  )}
               </Card.Body>
               <Card.Footer className="text-end">
                  <ButtonGroup>
                     {h.buttons(`Simpan ${document.title}`, isSubmit, {
                        onClick: isSubmit ? null : submit,
                     })}
                     {h.buttons(`Batal`, false, {
                        onClick: () => handleClose(),
                        variant: "danger",
                     })}
                  </ButtonGroup>
               </Card.Footer>
            </Card>
         </div>
      </React.Fragment>
   );
};
export default Forms;
