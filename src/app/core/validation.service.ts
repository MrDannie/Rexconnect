// tslint:disable
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {
    /**
     * Contains all potential validation messages for Intergrator
     */

    return {
      email: {
        required: 'Email is required',
        invalid: 'Email is invalid',
      },
      alternate_email: {
        required: 'Alternate Email is required',
        invalid: 'Alternate Email is invalid',
      },
      terminalId: {
        length: 'Terminal ID must be 8 characters long'
      },
      merchantId: {
        length: 'Merchant ID must be 15 characters long'
      },
      type: {
        required: 'Business type is required',
      },
      nature_of_business: {
        required: 'Nature of Business is required',
      },
      default_currency: {
        required: 'Default Currency is required',
      },
      address: {
        required: 'Address is required',
      },
      password: {
        required: 'Password is required',
        minLength: 'Password must be 8 characters and above!',
        hasUpper: 'Password must have an upper case character! ',
        hasNumber: 'Password must have a number!',
        hasLower: 'Password must have a lower case character!',
      },
      phone_number: {
        required: 'Phone Number is required',
      },
      website: {
        required: 'Website is required',
      },
      name: {
        required: 'Name is required',
      },
      firstname: {
        required: 'First Name is required',
      },
      lastname: {
        required: 'Last Name is required',
      },
      namdescriptione: {
        required: 'Description is required',
      },
      business_name: {
        required: 'Business name is required',
      },
      username: {
        required: 'Username is required',
      },
      role: {
        required: 'Role Name is required',
      },
      userRole: {
        required: 'User Role is required',
      },
      customer_name: {
        required: 'Customer Name is required',
      },
      product_name: {
        required: 'Product Name is required',
      },
      sku: {
        required: 'SKU is required',
      },
      product_category: {
        required: 'Product Category is required',
      },
      description: {
        required: 'Description is required',
      },
      image_url: {
        required: 'Image is required',
      },
      price: {
        required: 'Price is required',
      },
      role_category: {
        required: 'Role Category is required',
      },
      status: {
        required: 'Status is required',
      },
      store: {
        required: 'Store is required',
      },
      role_description: {
        required: 'Role Description is required',
      },
      pin: {
        required: 'PIN is required',
      },
      confirm_pin: {
        required: 'Confirm PIN is required',
      },
      merchant_code: {
        required: 'Merchant Code is required',
      },
      dialing_code: {
        required: 'Dialing Code is required',
      },
      account_number: {
        minLength: 'Account Number must be 10 digits',
        maxLength: 'Account Number must be 10 digits',
      },
      otp: {
        required: 'OTP is required',
      },
      bvn: {
        required: 'BVN is required ',
      },
      date_of_birth: {
        required: 'Date Of Birth is required',
      },
      registration_number: {
        required: 'Registration Number is required',
      },
      incorporation_number: {
        required: 'Incorporation Number is required',
      },
      date_of_incorporation: {
        required: 'Date Of Incorporation is required',
      },
      tin: {
        required: 'Tax Identification Number is required',
      },
      generic: {
        required: 'This field is required',
      },
      town: {
        required: 'Town is required',
      },
      state: {
        required: 'State is required',
      },
      country: {
        required: 'Country is required',
      },
      color: {
        required: 'Color is required',
      },
      terminalPrefix: {
        required: 'Terminal Prefix is required',
      },
      logo_url: {
        required: 'Logo is required',
      },
      location: {
        required: 'Location is required',
      },
      bankCode: {
        required: 'Bank Code is required',
      },
       shortName: {
        required: 'shortName is required',
      },

    };
  }
}
