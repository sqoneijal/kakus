import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import wnumb from "wnumb";
import * as h from "~/Helpers";

let datatable;

const Lists = () => {
   const { filter } = useSelector((e) => e.redux);

   const rp = (text) => {
      return wnumb({ prefix: "Rp ", thousand: "." }).to(h.toInt(text));
   };

   const penampungan = (data) => {
      return `<div class="row">
         <div class="col">
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tahun Penyedotan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("kala_penyedotan", data)}</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tahun Pembangunan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("pembangunan", data)}</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Harga Penyedotan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${rp(h.parse("harga_penyedotan", data))}</span></div>
            </div>
         </div>
         <div class="col">
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tingkat Keamanan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("tingkat_keamanan", data)}</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tanggal Penyedotan Terakhir</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse(
                  "tanggal_penyedotan_terakhir",
                  data,
                  "date"
               )}</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Tanggal Rencana Penyedotan</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse(
                  "tanggal_rencana_penyedotan",
                  data,
                  "date"
               )}</span></div>
            </div>
         </div>
      </div>`;
   };

   const volume = (data) => {
      return `<div class="row">
         <div class="col">
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Panjang</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("panjang", data)} m2</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Lebar</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("lebar", data)} m2</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Jenis Septiktank</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("jenis_septiktank", data)}</span></div>
            </div>
         </div>
         <div class="col">
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Kedalaman</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("kedalaman", data)} m2</span></div>
            </div>
            <div class="row">
               <div class="fw-semibold text-muted col-sm-12">Diameter</div>
               <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("diameter_tabung", data)} m2</span></div>
            </div>
         </div>
      </div>`;
   };

   const koordinat = (data) => {
      return `<div class="row">
         <div class="fw-semibold text-muted col-sm-12">Latitude</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.toInt(h.parse("latitude", data))}</span></div>
      </div>
      <div class="row">
         <div class="fw-semibold text-muted col-sm-12">Longitude</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.toInt(h.parse("longitude", data))}</span></div>
      </div>`;
   };

   const responden = (data) => {
      const statusPenyedotan = {
         "": `<span class="badge badge-warning">Belum dilakukan</span>`,
         1: `<span class="badge badge-success">Sudah dilakukan</span>`,
         2: `<span class="badge badge-danger">Tolak</span>`,
      };

      return `<div class="row">
         <div class="fw-semibold text-muted col-sm-12">Nama Lengkap</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("nama_lengkap", data)}</span></div>
      </div>
      <div class="row">
         <div class="fw-semibold text-muted col-sm-12">NIK</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${h.parse("nik", data)}</span></div>
      </div>
      <div class="row">
         <div class="fw-semibold text-muted col-sm-12">Status Penyedotan</div>
         <div class="col-md-12 col-sm-12"><span class="fw-bold fs-6 text-gray-800">${statusPenyedotan[h.parse("status", data)]}</span></div>
      </div>`;
   };

   const datatable_url = `/getdata?${h.serialize(filter)}`;
   datatable = h.initDatatable({
      show_edit_button: false,
      show_delete_button: false,
      url: datatable_url,
      order: [[3, "asc"]],
      columns: [
         {
            data: null,
            render: (data) => {
               return responden(data);
            },
         },
         {
            data: null,
            render: (data) => {
               return koordinat(data);
            },
         },
         {
            data: null,
            render: (data) => {
               return volume(data);
            },
         },
         {
            data: null,
            render: (data) => {
               return penampungan(data);
            },
         },
      ],
      columnDefs: false,
      createdRow: (row, data) => {},
   });

   useLayoutEffect(() => {
      datatable.init();
      return () => {};
   }, []);

   return (
      <Table responsive hover id="datatable" className="align-middle table-row-dashed fs-6" size="sm">
         <thead>
            <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
               <th>responden</th>
               <th>koordinat</th>
               <th>volume</th>
               <th>penampungan</th>
            </tr>
         </thead>
         <tbody className="text-gray-600 fw-semibold" />
      </Table>
   );
};
export default Lists;
