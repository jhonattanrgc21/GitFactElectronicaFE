import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as ExcelJS from "exceljs/dist/exceljs.min.js";
import { BillReportsReceipts } from '../bill-reports/interfaces/billReportsReceipts.interface';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class BillReportsService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBillFilter(
    consecutiveNumber,
    identification,
    dateFrom,
    dateTo,
  ) {
    const method = "/getbillreports";
    return this.http.post(
      this.url + method,
      JSON.stringify({
        consecutive: consecutiveNumber,
        identification: identification,
        startDate: dateFrom,
        endDate: dateTo,
      }),
      {
        headers: new HttpHeaders()
          .set("Content-Type", "text/plain")
          .set("Accept", "*/*"),
      }
    );
  }

  exportBillReports(billReportslist: BillReportsReceipts[]) {
    const workbook = new ExcelJS.Workbook();

    let groups = workbook.addWorksheet("Facturas Electrónicas");
    groups.columns = [
      { header: "Número de documento", key: "consecutiveNumber", width: 22.71 },
      { header: "Fecha de facturación", key: "billDate", width: 20.71 },
      { header: "Identificación receptor", key: "identification", width: 20.71 },
      { header: "Nombre receptor", key: "name", width: 22.71 },
      { header: "Tipo de documento", key: "description", width: 25.71 },
      { header: "Moneda", key: "currency", width: 13.71 },
      { header: "Subtotal Facturado", key: "finalSalePrice", width: 20.71 },
      { header: "Monto IVA", key: "TaxTotal", width: 13.71 },
      { header: "Monto final", key: "finalTotalPrice", width: 13.71 },
      { header: "Estado", key: "stateBill", width: 13.71 },
    ];
    groups.addRows(billReportslist);

    workbook.xlsx.writeBuffer().then((data) => this.saveAsExcelFile(data, "Reporte de Facturas Electrónicas"));
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}

