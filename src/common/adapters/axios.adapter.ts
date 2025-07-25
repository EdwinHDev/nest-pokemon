import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

  async get<T>( url: string ): Promise<T> {
    try {
      const response = await fetch( url );
      const data: T = await response.json();
      return data;
    } catch (error) {
      throw new Error('This is an error - Check logs')
    }
  }

}