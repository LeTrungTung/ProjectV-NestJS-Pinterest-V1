import axiosClient from "./axiosClient";
import { ParamType } from "../types/type";

export class ImageAPIAdmin {
  static getAllImages(): Promise<Array<any>> {
    const url: string = "/api/v1/image";
    return axiosClient.get(url);
  }
  static getImageById(id: number): Promise<any> {
    const url: string = `/api/v1/image/${id}`;
    return axiosClient.get(url);
  }
  static editImagebyId(id: number, param: ParamType): Promise<any> {
    const url = `/api/v1/image/${id}`;
    return axiosClient.patch(url, param);
  }
}
