import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { channel } from 'diagnostics_channel';
import { vaOtherBankDto } from './dtos/va-other-bank.dto';
import { VaDedicatedDto } from './dtos/va-dedicated.dto';
import { VaEwalletOvoDto } from './dtos/va-ewallet-ovo.dto';
import { VaRetail } from './dtos/va-retail.dto';

@Injectable()
export class SignatureService {

  private readonly signatureKey: string = 'LinkQu@2020';
  private readonly clientId: string = 'testing';
  
  generateSignature(requestData: any, path: string, method: string, channel: string): string {

    var secondValue: any = null;
    if(channel === 'va-permata'){
      secondValue = this.generateStringVaPermata(requestData);
      
    }else if(channel === 'va-other-bank') {
      secondValue = this.generateStringVaOtherBank(requestData);
    }else if(channel === 'va-dedicated') {
      secondValue = this.generateStringVaDedicated(requestData);
    }else if(channel === 'va-ewallet-ovo') {
      secondValue = this.generateStringEwalletAndOvo(requestData);
    }else if(channel === 'va-retail') {
      secondValue = this.generateStringRetail(requestData);
    }

    const concatenation = `${path}${method}${secondValue}`;
    return this.hashValue(concatenation);
  }

  private generateStringVaPermata(requestData: any): string {
    
    const {
      amount,
      expired,
      partner_reff,
      customer_id,
      customer_name,
      customer_email,
    } = requestData;

    const values = [amount, expired, partner_reff, customer_id, customer_name, customer_email];

    return this.generateCommonString(values)

  }

  private generateStringVaOtherBank({ amount, expired, bank_code, partner_reff, customer_id, customer_name, customer_email }: vaOtherBankDto): string {
    
    const values = [amount, expired, bank_code, partner_reff, customer_id, customer_name, customer_email]
    return this.generateCommonString(values)
  }

  private generateStringVaDedicated({bank_code, customer_id, customer_name, customer_email}: VaDedicatedDto) {

    const values = [bank_code, customer_id, customer_name, customer_email]
    return this.generateCommonString(values)
  }

  private generateStringEwalletAndOvo({amount, expired, retail_code, partner_reff, customer_id, customer_name, customer_email, ewallet_phone}: VaEwalletOvoDto) {

    const values =[amount, expired, retail_code, partner_reff, customer_id, customer_name, customer_email, ewallet_phone]
    return this.generateCommonString(values)
  }

  private generateStringRetail({amount, expired, retail_code, partner_reff, customer_id, customer_name, customer_email}: VaRetail) {
    
    const values = [amount, expired, retail_code, partner_reff, customer_id, customer_name, customer_email]
    return this.generateCommonString(values)
  }

  private generateQris() {
    
  }

  private generateCommonString(values: string[]): string {
    const combinedValues = values.join('') + this.clientId;
    return this.removeNonAlphanumeric(combinedValues).toLowerCase();
  }

  private removeNonAlphanumeric(input: string): string {
    
    if (input) {
      return input.replace(/[^a-zA-Z0-9]/g, ''); 
    } else {
      return '';
    }
  }

  private hashValue(value: string): string {

    const hmac = crypto.createHmac('sha256', this.signatureKey);
    hmac.update(value);
    return hmac.digest('hex');

  }

}
