import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { VirtualAccountService } from './virtual-account.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { CreateVaPermataDto } from './dtos/create-va-permata.dto';
import { SignatureService } from 'src/transactions/signature/signature.service';
import { headers, path_va_dedicated, path_va_dedicated_update, path_va_other_bank, path_va_permata, url_linkqu } from 'src/transactions/constants/linkqu.constant';

@Controller('virtual-account')
export class VirtualAccountController {
  constructor( 
    private readonly virtualAcountService: VirtualAccountService,
    private readonly httpService: HttpService,
    private readonly signatureService: SignatureService,
    
  ) {}

  private readonly signatureKey: string = 'LinkQu@2020';

  @Post()
  create(@Body() body: CreateVaPermataDto) {

    const signature = this.signatureService.generateSignature(body, path_va_permata, "POST", "va-permata");

    const url = url_linkqu + path_va_permata

    const bodyRequest = {...body, signature, url_callback: process.env.URL_CALLBACK}

    const vaPermata = this.httpService.post(url, bodyRequest, { headers }).pipe(
      map((response: AxiosResponse) => {
        
        console.log(response);
        

        return response.data;

      })
    )

    // add to database (service)

    return vaPermata;

  }

  @Post('/va-other-bank')
  createVaOtherBank(@Body() body: any) {

    const signature = this.signatureService.generateSignature(body, path_va_other_bank, "POST", "va-other-bank");
    console.log(signature);
    
    const url = url_linkqu + path_va_other_bank
    const bodyRequest = {...body, signature, url_callback: process.env.URL_CALLBACK}
    console.log(bodyRequest);

    const vaOtherBank = this.httpService.post(url, bodyRequest, { headers }).pipe(
      map((response: AxiosResponse) => {
        return response.data;
      })
    )

    // add to database

    return vaOtherBank
  }

  @Get()
  getVaBank(@Query() query: any) {

    const signature = this.signatureService.generateSignature(query, path_va_other_bank, "POST", "va-permata");
    
    const url = url_linkqu + path_va_other_bank
    const bodyRequest = {...query, signature, url_callback: process.env.URL_CALLBACK}

    const getVa = this.httpService.get(url, { headers, params: {
      "amount" : 30000,
      "partner_reff" : "200102083952237456",
      "customer_id" : "31857118",
      "customer_name" : "GPI LINKQU",
      "expired" : "20240122150000",
      "username" : "LI307GXIN",
      "pin" : "2K2NPCBBNNTovgB",
      "customer_phone" : "081231857418",
      "customer_email" : "pay@linkqu.id",
      "bank_code" : "013",
      "signature" : `${signature}`,
      "url_callback" : "https://url_callback_partner.com"
    } }).pipe(
      map((response: AxiosResponse) => {
        return response.data;
      })
    )

    return getVa;
  }

  @Post('va-dedicated')
  createVaDedicated(@Body() body: any) {
    const signature = this.signatureService.generateSignature(body, path_va_dedicated, "POST", "va-dedicated");

    const url = url_linkqu + path_va_dedicated
    const bodyRequest = {...body, signature, url_callback: process.env.URL_CALLBACK}

    console.log(url);
    
    console.log(bodyRequest);
    console.log(signature);

    const vaDedicated = this.httpService.post(url, bodyRequest, { headers }).pipe(
      map((response: AxiosResponse) => {
        return response.data;
      })
    )

    return vaDedicated;
  }

  @Put('va-dedicated')
  updateVaDedicated(@Body() body: any) {
    const signature = this.signatureService.generateSignature(body, path_va_dedicated, "POST", "va-dedicated");

    const url = url_linkqu + path_va_dedicated_update
    const bodyRequest = {...body, signature, url_callback: process.env.URL_CALLBACK}

    const vaDedicated = this.httpService.post(url, bodyRequest, { headers }).pipe(
      map((response: AxiosResponse) => {
        return response.data;
      })
    )

    return vaDedicated;
  }
}
