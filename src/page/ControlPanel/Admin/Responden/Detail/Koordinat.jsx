import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const Koordinat = () => {
   const { module } = useSelector((e) => e.redux);
   const { koordinatRumah } = module;

   return (
      <Row className="mt-10">
         <h4>Koordinat Lokasi Rumah</h4>
         <Col>{h.detail_label("Latitude", h.toInt(h.parse("latitude", koordinatRumah)))}</Col>
         <Col>{h.detail_label("Longitude", h.toInt(h.parse("longitude", koordinatRumah)))}</Col>
      </Row>
   );
};
export default Koordinat;
