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
export const signUp = async (req: ReqType) => {
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
  if(token)
  try {
    let url = "/v1/api/users/all";
    if(req.id)
    url=`/v1/api/users/user/${req.id}`;
    const resp = await API.get(
      url,
      req.body ? req.body : {},
      {
        Authorization: `${token ? JSON.parse(token).token : ""}`,
      },
      req.params
    );
    return resp;
  } catch (error) {
    throw error;
  }
};