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

  // stations
  public stations: string;

  // Acquirer
  public getAllAcquirers: string;
  public getPtsps: string;
  public getPtspsList: string;
  public getSingleAcquirer: string;
  public getRoutesLists: string;
  public disableAcquirer: string;
  public enableAcquirer: string;
  // ptsps
  public ptsps: string;
  public getAcquirerRoutes: string;
  public getAcquirerPtsps: string;
  public disableMerchant: string;
  public enableMerchant: string;
  public getAquirerPtspList: string;
  public disableRoute: string;
  public enableRoute: string;

  // settings
  public settings: string;
  public changePassword: string;
  public updateProfile: string;

  //auditlogs

  public auditLogs: string;

  // Endpoints For Admin Purposes
  public getAllMerchantsForAcquirer: string;
  public adminAddNewMerchant: string;
  public adminGetAllUsersForAcquirer: string;
  public adminCreateUserForAcquirer: string;
  public getSingleMerchantForAdmin: string;
  getAllTerminalsForAcquirer: string;
  getTransactionsForAcquirer: string;

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

    // stations
    this.stations = '/v1/stations';

    // ACQUIRER
    this.getAllAcquirers = '/v1/clients';

    // PTSPTS LISTS
    this.getPtspsList = '/v1/ptsps/list';

    // ROUTES LIDTS
    this.getRoutesLists = '/v1/routing-rules/list';

    // SINGLE ACQUIRER
    this.getSingleAcquirer = '/v1/clients/{clientId}';

    // DISABLE ACQUIRER
    this.disableAcquirer = '/v1/clients/{acquirerId}/disable';

    this.disableRoute = '/v1/routing-rules/{routeId}/disable';

    this.disableMerchant = '/v1/merchants/{merchantId}/disable';

    // ENABLE ACQUIRER
    this.enableAcquirer = '/v1/clients/{acquirerId}/enable';

    this.enableMerchant = '/v1/merchants/{merchantId}/enable';

    this.enableRoute = '/v1/routing-rules/{routeId}/enable';

    // ptsps

    this.ptsps = '/v1/ptsps';

    // GET ACQUIRER ROUTES
    this.getAcquirerRoutes = '/v1/clients/routes';

    this.getAcquirerPtsps = '/v1/clients/ptsps/list';

    this.getAcquirerPtsps = '/v1/clients/ptsps/list';

    this.getAquirerPtspList = '/v1/clients/ptsps/list';

    // settings
    this.changePassword = '/v1/auth/password/change';
    this.settings = '/v1/settings';

    //auditLogs
    this.auditLogs = '/api/audit-log/logs/v3/search/';

    //xtoken
    this.getXToken = '/api/access-control/v2/getToken';

    // profile
    this.updateProfile = '/v1/users/profile/me';

    // End Points For Admin Purposes
    this.getAllMerchantsForAcquirer = '/v1/clients/{clientId}/merchants';

    this.adminAddNewMerchant = '/v1/clients/{clientId}/merchants';

    this.adminGetAllUsersForAcquirer = '/v1/clients/{clientId}/users';

    this.adminCreateUserForAcquirer = '/v1/clients/{clientId}/users';

    this.getSingleMerchantForAdmin =
      '/v1/clients/{clientId}/merchants/{merchantId}';

    this.getAllTerminalsForAcquirer =
      '/v1/clients/{clientId}/merchants/{merchantId}/terminals';

    this.getTransactionsForAcquirer = '/v1/clients/{clientId}/transactions';
  }
}
