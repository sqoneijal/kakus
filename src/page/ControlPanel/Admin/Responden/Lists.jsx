import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let datatable;

const Lists = ({ daftarKepemilikanRumah }) => {
   const { filter, module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const datatable_url = `/getdata?${h.serialize(filter)}`;
   datatable = h.initDatatable({
      show_edit_button: true,
      show_delete_button: true,
      url: datatable_url,
      columns: [
         {
            data: null,
            render: (data) => {
               return `<button id="nama_lengkap">${h.parse("nama_lengkap", data)}</button>`;
            },
         },
         { data: "nik" },
         {
            data: null,
            render: (data) => {
               return h.renderArray(daftarKepemilikanRumah, h.parse("id_kepemilikan_rumah", data));
            },
         },
         { data: "desa" },
         {
            data: null,
            class: "text-center",
            width: "5%",
            render: () => {
               return `<a href="#" id="maps" class="btn btn-active-icon-primary btn-active-text-primary btn-sm p-0 m-0"><i class="ki-outline ki-map fs-1"></i></a>`;
            },
         },
         { data: null },
      ],
      columnDefs: true,
      createdRow: (row, data) => {
         const namaLengkap = row.querySelector("#nama_lengkap");
         namaLengkap.onclick = (e) => {
            e.preventDefault();
            dispatch(setModule({ ...module, openDetail: true, detailContent: data }));
         };

         const maps = row.querySelector("#maps");
         maps.onclick = (e) => {
            e.preventDefault();
            dispatch(setModule({ ...module, openDetailMaps: true, detailContent: data }));
         };

         const _edit = row.querySelector("#edit");
         if (_edit) {
            _edit.onclick = (e) => {
               e.preventDefault();
               dispatch(setModule({ ...module, openForms: true, pageType: "update", detailContent: data }));
            };
         }

         const _delete = row.querySelector("#delete");
         if (_delete) {
            _delete.onclick = (e) => {
               e.preventDefault();
               h.confirmDelete({
                  url: "/hapus",
                  id: data.id,
               }).then((res) => {
                  if (typeof res === "undefined") return;
                  const { data } = res;
                  h.notification(data.status, data.msg_response);
                  data.status && datatable.reload();
               });
            };
         }
      },
   });

   useLayoutEffect(() => {
      datatable.init();
      return () => {};
   }, []);

   return (
      <Table hover id="datatable" className="align-middle table-row-dashed fs-6" size="sm">
         <thead>
            <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
               <th>nama lengkap</th>
               <th>nik</th>
               <th>kepemilikan rumah</th>
               <th>desa</th>
               <th />
               <th />
            </tr>
         </thead>
         <tbody className="text-gray-600 fw-semibold" />
      </Table>
   );
};
export default Lists;
