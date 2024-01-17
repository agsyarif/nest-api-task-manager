import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AxiosService {
  constructor(
    private readonly httpService: HttpService
  ) {}

  async HttpPost(url, body: Object = {}, header: any = '', is_feedback: boolean = false) {
    let response: any;

    try {
      if  (header != "")
          response = await (await this.httpService.post(url,body,{ headers: header }).toPromise()).data;
      else
          response = await (await this.httpService.post(url,body).toPromise()).data;
  } catch (error) {
      Logger.error(`${error}`,JSON.stringify(error.message),'BillerException',);
      response = error.message;
      if (is_feedback){
          return false;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST,);
  }
  if (is_feedback){
      return true;
  }
  return response;
  }
}