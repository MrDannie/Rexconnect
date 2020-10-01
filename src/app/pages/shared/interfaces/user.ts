export interface User {
  accessToken: 'string';
  expiryDuration: 0;
  user: {
    activated: boolean;
    email: 'string';
    firstName: 'string';
    lastName: 'string';
    merchant: {
      merchantAddress: 'string';
      merchantCodes: ['string'];
      merchantName: 'string';
      merchantPhone: 'string';
      merchantType: 'string';
    };
    roles: [
      {
        name: 'string';
        permissions: ['string'];
      }
    ];
    userType: 'string';
    username: 'string';
  };
}
