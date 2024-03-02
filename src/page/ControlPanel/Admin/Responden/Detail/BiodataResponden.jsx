import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const BiodataResponden = ({ daftarKepemilikanRumah }) => {
   const { module } = useSelector((e) => e.redux);
   const { biodataResponden } = module;

   return (
      <Row>
         <h4>Biodata Responden</h4>
         <Col>
            {h.detail_label("NIK", h.parse("nik", biodataResponden))}
            {h.detail_label("Nama Lengkap", h.parse("nama_lengkap", biodataResponden))}
            {h.detail_label("Nama Kepala Keluarga", h.parse("nama_kepala_keluarga", biodataResponden))}
            {h.detail_label("Provinsi", h.parse("provinsi", biodataResponden))}
            {h.detail_label("Kabupaten/Kota", h.parse("kabkota", biodataResponden))}
         </Col>
         <Col>
            {h.detail_label("Kecamatan", h.parse("kecamatan", biodataResponden))}
            {h.detail_label("Desa", h.parse("desa", biodataResponden))}
            {h.detail_label("Alamat", h.parse("alamat", biodataResponden))}
            {h.detail_label("Kode Pos", h.parse("kode_pos", biodataResponden))}
            {h.detail_label("Kepemilikan Rumah", h.renderArray(daftarKepemilikanRumah, h.parse("id_kepemilikan_rumah", biodataResponden)))}
         </Col>
      </Row>
   );
};
export default BiodataResponden;
