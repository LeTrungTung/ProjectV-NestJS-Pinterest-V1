import axios from "axios";
import axiosClient from "./axiosClient";

export class UserAPI {
  // API đăng ký
  static register(param: any): Promise<any> {
    const url = "http://localhost:5000/api/v1/auth/register";
    return axios.post(url, param);
  }
  //   API đăng nhập
  static login(param: any): Promise<any> {
    const url = "/api/v1/auth/login";
    return axiosClient.post(url, param, { withCredentials: true });
  }

  static deleteCookie() {
    const url = `api/v1/auth/logout`;
    return axiosClient.post(url);
  }

  static getUsers(): Promise<any> {
    const url = "api/v1/user";
    return axiosClient.get(url);
  }
  static editUsername(id: number, param: any): Promise<any> {
    const url = `api/v1/user/edit-user/${id}`;
    return axiosClient.patch(url, param);
  }
  static editAvatar(id: number, param: any): Promise<any> {
    const url = `api/v1/user/avatar/${id}`;
    return axiosClient.patch(url, param);
  }
  static getUserById(id: number): Promise<any> {
    const url = `/api/v1/user/${id}`;
    return axiosClient.get(url);
  }
}
