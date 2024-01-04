export interface editReceiptRequest {
  //TODO: mudar os dados daq 
  receiptID?: number;
  issueDate?: string;
  paymentDate?: number;
  office: string;
  receiveDate: string;
  institution?: any;
}
