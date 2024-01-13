export interface editReceiptRequest {
  //TODO: mudar os dados daq 
  receiptId?: number;
  issueDate?: string;
  paymentDate?: number;
  office: string;
  receiveDate: string;
  institution?: any;
}
