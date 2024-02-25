import moment from "moment";
import React from "react";
import { Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
moment.locale("id");

const LoginSession = () => {
   const { module } = useSelector((e) => e.redux);
   const { loginSessions } = module;

   const renderStatus = (status) => {
      return status === 200 ? "badge-light-success" : "badge-light-danger";
   };

   return (
      <Card className="mb-5 mb-lg-10">
         <Card.Header>
            <Card.Title>
               <h3>Login Sessions</h3>
            </Card.Title>
         </Card.Header>
         <Card.Body className="p-0">
            <Table className="align-middle table-row-bordered table-row-solid gy-4 gs-9" responsive>
               <thead className="border-gray-200 fs-5 fw-semibold bg-lighten">
                  <tr>
                     <th className="min-w-250px">Location</th>
                     <th className="min-w-100px">Status</th>
                     <th className="min-w-150px">Device</th>
                     <th className="min-w-150px">IP Address</th>
                     <th className="min-w-150px">Time</th>
                  </tr>
               </thead>
               <tbody className="fw-6 fw-semibold text-gray-600">
                  <Each
                     of={loginSessions}
                     render={(row) => (
                        <tr>
                           <td>
                              {h.parse("city", row)} - {h.parse("countryName", row)}
                           </td>
                           <td>
                              <span className={`badge ${renderStatus(h.parse("status", row))} fs-7 fw-bold`}>{h.parse("status", row)}</span>
                           </td>
                           <td>{h.parse("device", row)}</td>
                           <td>{h.parse("request", row)}</td>
                           <td>{moment(h.parse("time", row)).fromNow()}</td>
                        </tr>
                     )}
                  />
               </tbody>
            </Table>
         </Card.Body>
      </Card>
   );
};
export default LoginSession;
