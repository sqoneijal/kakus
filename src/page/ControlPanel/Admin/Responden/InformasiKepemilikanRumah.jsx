import React from "react";
import { Col, Row } from "react-bootstrap";
import * as h from "~/Helpers";

const InformasiKepemilikanRumah = ({ input, setInput, errors }) => {
   return (
      <Row className="mt-10">
         <h4>Informasi Pemilik Rumah/Bangunan</h4>
         <Col>
            {h.form_text(
               `NIK`,
               `nik_kepemilikan`,
               { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`nik_kepemilikan`, input) },
               true,
               errors
            )}
         </Col>
         <Col>
            {h.form_text(
               `Nama Lengkap`,
               `nama_kepemilikan`,
               { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`nama_kepemilikan`, input) },
               true,
               errors
            )}
         </Col>
      </Row>
   );
};
export default InformasiKepemilikanRumah;
