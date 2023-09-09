import axiosClient from "./axiosClient";

export class FollowAPI {
  static getAllFollow_User() {
    const url = `/api/v1/follow`;
    return axiosClient.get(url);
  }
  static getUserFollowed(id: number) {
    const url = `/api/v1/follow/get-userbyid-followed/${id}`;
    return axiosClient.get(url);
  }
  static getUserFolloweOther(id: number) {
    const url = `/api/v1/follow/get-userbyid-follow-other/${id}`;
    return axiosClient.get(url);
  }

  static deleteFollowed(id: number) {
    const url = `/api/v1/follow/${id}`;
    return axiosClient.delete(url);
  }
  static addFollowed(params: any) {
    const url = `/api/v1/follow`;
    return axiosClient.post(url, params);
  }
}
