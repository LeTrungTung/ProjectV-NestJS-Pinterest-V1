import axiosClient from "./axiosClient";

export class ImageAPI {
  static getAllImages() {
    const url = "/api/v1/image";
    return axiosClient.get(url);
  }
  static postImage(params: any) {
    const url = "/api/v1/image";
    return axiosClient.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static getImageSaved() {
    const url = "/api/v1/images-saved-user";
    return axiosClient.get(url);
  }
  static postImageSaved(params: any) {
    const url = "/api/v1/images-saved-user";
    return axiosClient.post(url, params);
  }
  static getImageById(id: number) {
    const url = `/api/v1/image/${id}`;
    return axiosClient.get(url);
  }
  static deleteImageById(id: number) {
    const url = `/api/v1/images-saved-user/${id}`;
    return axiosClient.delete(url);
  }
  static getAllImages_Comments() {
    const url = "/api/v1/image/get-image-comment";
    return axiosClient.get(url);
  }
  static getAllImages_Love() {
    const url = "/api/v1/image/get-image-love";
    return axiosClient.get(url);
  }
  static getAllImages_Like() {
    const url = "/api/v1/image/get-image-like";
    return axiosClient.get(url);
  }
  static getUsersCreateImage(id: number) {
    const url = `/api/v1/image/get-image-user/${id}`;
    return axiosClient.get(url);
  }
  static getImageCreatedUser(id: number) {
    const url = `/api/v1/image/get-user-create-image/${id}`;
    return axiosClient.get(url);
  }
  static getUsersSaveImage(id: number) {
    const url = `/api/v1/image/get-image-user-save/${id}`;
    return axiosClient.get(url);
  }
  static getOperationImage() {
    const url = `/api/v1/operation-image`;
    return axiosClient.get(url);
  }

  static editOperationImage(id: number, param: any): Promise<any> {
    const url = `/api/v1/operation-image/${id}`;
    return axiosClient.patch(url, param);
  }
  static deleteLoveImage(id: number) {
    const url = `/api/v1/operation-image/${id}`;
    return axiosClient.delete(url);
  }
  static postLoveImage(params: any) {
    const url = "/api/v1/operation-image";
    return axiosClient.post(url, params);
  }
}
