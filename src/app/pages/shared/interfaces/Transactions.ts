export interface ITransactions {
  transactionId: string;
  merchantId: string;
  rrn: string;
  stan: string;
  pan: string;
  currencyCode: string;
  currencyAlpha: string;
  type: string;
  amount: number;
  status: string;
  responseCode: number;
  responseDescription: string;
  creationDate: string;
}

export interface SearchTransactions {
  referenceNumber: string;
  type: string;
  endDate: string;
  startDate: string;
  terminalId: string;
  merchantId: string;
}
