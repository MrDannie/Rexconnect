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

  // ADMIN
  public adminUserRole: string;
  public adminGetToken: string;
  public adminGetUsers: string;
  public adminGetClients: string;
  public adminBusinessUsers: string;
  public adminBusinessServices: string;
  public adminBusinessAdminUser: string;
  public adminGetABusiness: string;
  public adminGetBusinessDocument: string;
  public adminGetDepartmentRoles: string;
  public adminVerifyBusiness: string;
  public adminInviteUser: string;
  public adminGetAUser: string;
  public adminCreateRole: string;
  public adminCreateDepartment: string;
  public adminGetAllPermissions: string;
  public adminGetAllDepartments: string;
  public adminGetAdminUserRole: string;
  public adminRoles: string;
  public adminVerifyDoc: string;
  public adminGetComments: string;
  public adminAddComments: string;
  public adminUpdateUserRole: string;
  public adminUpdateRole: string;
  public adminUpdateDept: string;
  public adminSuspendAdminUser: string;
  public adminRequestedServices: string;
  public adminReviewServiceRequest: string;

  // BILL PAYMENT ADMIN
  public bpaGetClients: string;
  public bpaFund: string;
  public bpaBillProviders: string;
  public bpaGet: string;
  public bpaUpdateUser: string;
  public bpaClientBiller: string;
  public bpaCreateClient: string;
  public bpaCreateProvider: string;
  public bpaUpdateClient: string;
  public bpaUpdateProvider: string;
  public bpaCategory: string;
  public bpaBillers: string;
  public bpaPaymentItem: string;
  public bpaPaymentItemAttribute: string;
  public bpaProviderSettlement: string;

  public uploadDocuments: string;
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
    this.createBusiness = '/business/create';
    this.updateBusiness = '/business/update';
    this.updateUser = '/users/update';
    this.updateRole = '/roles/update';
    this.getRole = '/roles';
    this.getXToken = '/api/access-control/v2/getToken';
    this.getPermissions = '/roles/permissions/default ';
    this.adminUserRole = '/admin/role';
    this.adminGetToken = '/admin/getToken';
    this.adminGetUsers = '/admin/get/system/users';
    this.adminGetClients = '/admin/get/clients';
    this.adminBusinessUsers = '/admin/client/users';
    this.adminBusinessServices = '/admin/client/services';
    this.adminBusinessAdminUser = '/admin/client/admin';
    this.adminGetDepartmentRoles = '/admin/department/roles';
    this.adminInviteUser = '/admin/invite';
    this.adminRoles = '/admin/roles';

    this.uploadDocuments = '/api/accelerex-integrator/v1/admin/upload';
    this.auditLogs = '/api/audit-log/logs/v2/search/REXHUB';
    this.adminGetABusiness = '/admin/get/client';
    this.adminGetBusinessDocument = '/admin/business/documents';
    this.adminVerifyBusiness = '/admin/verify/business';
    this.adminGetAUser = '/admin/get/system/user';
    this.adminCreateRole = '/admin/create/role';
    this.adminCreateDepartment = '/admin/create/department';
    this.adminGetAllPermissions = '/admin/system/permissions';
    this.adminGetAllDepartments = '/admin/system/departments';
    this.adminGetAdminUserRole = '/admin/role';
    this.adminVerifyDoc = '/admin/verify/document';
    this.adminGetComments = '/admin/get/comments';
    this.adminAddComments = '/admin/add/comments';
    this.adminUpdateUserRole = '/admin/update/system/user';
    this.adminUpdateRole = '/admin/update/roles';
    this.adminUpdateDept = '/admin/update/department';
    this.adminSuspendAdminUser = '/admin/client/user/status';
    this.adminRequestedServices = '/admin/client/services/pending';
    this.adminReviewServiceRequest = '/admin/client/services/review';

    this.uploadDocuments = '/api/accelerex-integrator/v1/admin/upload';
    this.auditLogs = '/api/audit-log/logs/v2/search/REXHUB-';

    this.changePassword = '/authentication/password/update';
    this.uploadBusinessLogo = '/business/profile/logo';

    this.getSingleBusiness = '/business/';

    this.uploadBusinessDocuments = '/business/upload';
    this.getBusinessDocuments = '/business/get/documents?business_id=';

    this.getCommentHistory = '/business/get/comments?business_id=';
    this.makeComment = '/business/add/comments';
    this.requestService = '/business/request/service';
    this.getWalletBalance = '/business/service/details';
    this.getBillPaymentKeys = '/business/request/keys';
    this.deleteBillPaymentKeys = '/business/request/keys/delete';
    this.getBillPayReports = '/business/service/reports';

    // BILL PAYMENT ADMIN
    this.bpaGetClients = '/clients';
    this.bpaFund = '/fund';
    this.bpaBillProviders = '/billProviders';
    this.bpaGet = '/get';
    this.bpaUpdateUser = '/updateUsers';
    this.bpaClientBiller = '/clientBillers';
    this.bpaCreateClient = '/createClients';
    this.bpaCreateProvider = '/createBillProvider';
    this.bpaUpdateClient = '/updateClients';
    this.bpaUpdateProvider = '/updateBillProvider';
    this.bpaCategory = '/category';
    this.bpaBillers = '/billers';
    this.bpaPaymentItem = '/paymentItem';
    this.bpaPaymentItemAttribute = '/paymentItemAttributes';
    this.checkLiveStatus = '/business/service/toggle';
    this.bpaProviderSettlement = '/billproviders';

    // terminals
    this.allTerminals = '/v1/terminals';
    this.uploadTerminals = '/v1/uploads/uploadTerminals';
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
  }
}
