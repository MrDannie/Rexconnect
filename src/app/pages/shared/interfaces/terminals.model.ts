export interface ITerminal {
  countryCode: string;
  currencyCode: string;
  callHomeTime: string;
  merchantCategoryCode: string;
  merchantId: string;
  merchantKey: string;
  merchantLocationNameAddress: string;
  merchantName: string;
  merchantToken: string;
  transactionTimeout: string;
  terminalId: string;
  ptspId: string;
  isActive: boolean;
}

export interface IAddTerminal {
  merchantId: string;
  terminalId: string;
  transactionTimeout: number;
  callHomeTime: number;
  ptspId: number;
}
