import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const VolumeSeptiktank = () => {
   const { module } = useSelector((e) => e.redux);
   const { volumeSeptiktank } = module;

   return (
      <Row className="mt-10">
         <h4>Volume Septiktank</h4>
         <Col>
            {h.detail_label("Panjang", `${h.parse("panjang", volumeSeptiktank)} m2`)}
            {h.detail_label("Lebar", `${h.parse("lebar", volumeSeptiktank)} m2`)}
            {h.detail_label("Jenis Septiktank", h.parse("nama_jenis_septiktank", volumeSeptiktank))}
         </Col>
         <Col>
            {h.detail_label("Kedalaman", `${h.parse("kedalaman", volumeSeptiktank)} m2`)}
            {h.detail_label("Diameter", `${h.parse("diameter_tabung", volumeSeptiktank)} m2`)}
            {h.detail_label("Keterangan Jenis Septiktank", h.parse("keterangan_jenis_septiktank", volumeSeptiktank))}
         </Col>
      </Row>
   );
};
export default VolumeSeptiktank;
