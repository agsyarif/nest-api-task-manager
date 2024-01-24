import { IsEmail, IsNotEmpty } from "class-validator"

export class VaEwalletOvoDto {
  
  @IsNotEmpty()
  amount: string

  @IsNotEmpty()
  expired: string

  @IsNotEmpty()
  retail_code: string

  @IsNotEmpty()
  partner_reff: string

  @IsNotEmpty()
  customer_id: string

  @IsNotEmpty()
  customer_name: string

  @IsNotEmpty()
  @IsEmail()
  customer_email: string

  @IsNotEmpty()
  ewallet_phone: string
}