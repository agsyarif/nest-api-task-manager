import { IsEmail, IsNotEmpty } from "class-validator"

export class vaOtherBankDto {
  // $path.$method.$amount.$expired.$bank_code.$partner_reff.$customer_id.$customer_name.$customer_email.$client-id
  
  @IsNotEmpty()
  amount: string

  @IsNotEmpty()
  expired: string

  @IsNotEmpty()
  bank_code: string

  @IsNotEmpty()
  partner_reff: string

  @IsNotEmpty()
  customer_id: string

  @IsNotEmpty()
  customer_name: string

  @IsNotEmpty()
  @IsEmail()
  customer_email: string

}