import { Injectable } from '@nestjs/common';
interface associativeArray {
  [key: string]: any;
}

@Injectable()
export class HelperService {
  /**
   * This method will convert an Objet to an $ prefix object.
   * @param data
   * @returns
   */
  public objTo$obj(data: Object): Object {
    let result :associativeArray = {};
    try {
      Object.keys(data).forEach((key) => {
        result[`$${key}`]= data[key];
      });
    } catch (err) {
      throw new Error(err);
    }
    return result;
  }
}
