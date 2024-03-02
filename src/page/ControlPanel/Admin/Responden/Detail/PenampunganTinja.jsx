import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import wnumb from "wnumb";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const PenampunganTinja = ({ getData }) => {
   const { module } = useSelector((e) => e.redux);
   const { penampunganTinja } = module;
   const dispatch = useDispatch();

   const rp = (text) => {
      return wnumb({ thousand: ".", prefix: "Rp " }).to(h.toInt(text));
   };

   return (
      h.arrLength(penampunganTinja) && (
         <Row className="mt-10">
            <h4>Informasi Penampungan/Penyedotan Tinja</h4>
            <Table size="sm" responsive>
               <tbody>
                  <Each
                     of={penampunganTinja}
                     render={(row, index) => (
                        <tr className={index + 1 !== penampunganTinja.length ? "border-bottom" : ""}>
                           <td className="text-center fw-bold align-middle" style={{ width: "5%", fontSize: 40 }}>
                              {index + 1}
                           </td>
                           <td className="text-center align-middle" style={{ width: "5%" }}>
                              <a
                                 href="#"
                                 className="btn btn-active-icon-warning btn-active-text-warning btn-sm p-0 m-0"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(
                                       setModule({ ...module, pageType: "update", openFormsPenampunganTinja: true, detailPenampunganTinja: row })
                                    );
                                 }}>
                                 <i className="ki-outline ki-notepad-edit fs-1" />
                              </a>
                              <a
                                 href="#"
                                 className="btn btn-active-icon-danger btn-active-text-danger btn-sm p-0 m-0"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    h.confirmDelete({
                                       url: "/hapuspenampungantinja",
                                       id: h.parse("id", row),
                                       custom: { id_responden: h.parse("id_responden", row) },
                                    }).then((res) => {
                                       const { data } = res;
                                       if (!data.status) return;
                                       h.notification(data.status, data.msg_response);
                                       getData(h.parse("id_responden", row));
                                    });
                                 }}>
                                 <i className="ki-outline ki-trash-square fs-1" />
                              </a>
                           </td>
                           <td>
                              <Row>
                                 <Col>
                                    {h.detail_label("Tahun Penyedotan", h.parse("kala_penyedotan", row))}
                                    {h.detail_label("Tahun Pembangunan", h.parse("pembangunan", row))}
                                    {h.detail_label("Harga Penyedotan", rp(h.parse("harga_penyedotan", row)))}
                                 </Col>
                                 <Col>
                                    {h.detail_label("Tingkat Keamanan", h.parse("tingkat_keamanan", row))}
                                    {h.detail_label("Tanggal Penyedotan Terakhir", h.parse("tanggal_penyedotan_terakhir", row, "date"))}
                                    {h.detail_label("Tanggal Rencana Penyedotan", h.parse("tanggal_rencana_penyedotan", row, "date"))}
                                 </Col>
                              </Row>
                           </td>
                        </tr>
                     )}
                  />
               </tbody>
            </Table>
         </Row>
      )
   );
};
export default PenampunganTinja;
