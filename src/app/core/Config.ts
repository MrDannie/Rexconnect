export class Config {
  public login: string;
  public setPassword: string;
  public addAccount: string;
  public sendResetLink: string;
  public resendResetLink: string;
  public verifyEmail: string;
  public getUsers: string;
  public createRole: string;
  public createUser: string;
  public createBusiness: string;
  public updateBusiness: string;
  public updateUser: string;
  public updateRole: string;
  public getRole: string;
  public auditService: string;
  public getXToken: string;

  public getPermissions: string;

  public auditLogs: string;

  public changePassword: string;
  public uploadBusinessLogo: string;

  public getSingleBusiness: string;

  public uploadBusinessDocuments: string;
  public getBusinessDocuments: string;

  public getCommentHistory: string;
  public makeComment: string;
  public requestService: string;
  public getWalletBalance: string;
  public getBillPayReports: string;

  public getBillPaymentKeys: string;
  public deleteBillPaymentKeys: string;
  public checkLiveStatus: string;
  public getStatisticsLink: string;
  public getTerminalStatLink: string;
  public allTerminals: string;

  public getMerchantsList: string;
  public addNewTerminal: string;
  public uploadTerminals: string;
  public getSingleTerminal: string;
  public updateTerminal: string;
  public getTransactions: string;
  public getAllMerchants: string;
  public getStates: string;
  public addNewMerchant: string;
  public getSingleMerchant: string;
  public getMerchantTerminals: string;

  //stations
  public stations: string;

  // Acquirer
  public getAllAcquirers: string;
  getPtsps: string;
  getPtspsList: string;

  constructor() {
    this.login = '/v1/auth/login';
    this.getStatisticsLink = '/v1/reports/getStatistics';
    this.getTerminalStatLink = '/v1/reports/getTopTerminalReport';
    this.resendResetLink = '/authentication/email/resend-verification';
    this.setPassword = '/authentication/reset/na/password';
    this.addAccount = '/authentication/signup';
    this.verifyEmail = '/authentication/email/verify';
    this.auditService = 'audit-log/logs/v2/search';
    this.getUsers = '/users';
    this.createRole = '/roles/create';
    this.createUser = '/users/create';

    // terminals
    this.allTerminals = '/v1/terminals';
    this.uploadTerminals = '/v1/terminals/upload';
    this.getSingleTerminal = '/v1/terminals/{terminalId}';
    this.updateTerminal = '/v1/terminals/{terminalId}';

    // transactions
    this.getTransactions = '/v1/transactions';

    // merchants
    this.getMerchantsList = '/v1/merchants/getMerchantList';
    this.addNewTerminal = '/v1/terminals';
    this.getAllMerchants = '/v1/merchants';
    this.addNewMerchant = '/v1/merchants';
    this.getSingleMerchant = '/v1/merchants/{merchantId}';
    this.getMerchantTerminals = '/v1/merchants/{merchantId}/terminals';

    // utils
    this.getStates = '/v1/countries/getStates/{countryCode}';

    //stations
    this.stations = '/v1/stations';

    //ACQUIRER
    this.getAllAcquirers = '/v1/clients';

    // PTSPTS
    this.getPtspsList = '/v1/ptsps/list';
  }
}
