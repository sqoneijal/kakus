import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const KepemilikanRumah = () => {
   const { module } = useSelector((e) => e.redux);
   const { biodataResponden } = module;

   return (
      h.parse("id_kepemilikan_rumah", biodataResponden) !== 1 && (
         <Row className="mt-10">
            <h4>Kepemilikan Rumah/Bangunan</h4>
            <Col>{h.detail_label("NIK", h.parse("nik_pemilik_rumah", biodataResponden))}</Col>
            <Col>{h.detail_label("Nama Lengkap", h.parse("nama_pemilik_rumah", biodataResponden))}</Col>
         </Row>
      )
   );
};
export default KepemilikanRumah;
