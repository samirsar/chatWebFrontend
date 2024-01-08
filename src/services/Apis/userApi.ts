import API from "../../lib/api";
import Cookies from "js-cookie";
export type ReqType = {
  body?: object;
  params?: {};
  type?: string;
  id?: string;
};
export const login = async (req: ReqType) => {
  try {
    let url = "/v1/api/users/login";
    const resp = await API.post(url, req.body ? req.body : {}, {});
    return resp;
  } catch (error) {
    throw error;
  }
};
export const SignUp = async (req: ReqType) => {
  try {
    let url = "/v1/api/users/create";
    const resp = await API.post(url, req.body ? req.body : {}, {});
    return resp;
  } catch (error) {
    throw error;
  }
};
export const getUsers = async (req: ReqType) => {
  const token = Cookies.get("user");
  try {
    let url = "/v1/api/users/all";
    const resp = await API.get(
      url,
      req.body ? req.body : {},
      {
        Authorization: `Bearer ${token ? JSON.parse(token).access : ""}`,
      },
      req.params
    );
    return resp;
  } catch (error) {
    throw error;
  }
};
