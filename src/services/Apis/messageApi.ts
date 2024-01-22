import API from "../../lib/api";
import Cookies from "js-cookie";
export type ReqType = {
    body?: object;
    params?: {};
    type?: string;
    id?: string;
};
export const sendMessage = async (req: ReqType) => {
    const token = Cookies.get("user");
    try {
        let url = "/v1/api/messages/create";
        const resp = await API.post(url, req.body ? req.body : {}, {
            Authorization: `${token ? JSON.parse(token).token : ""}`,
        });
        return resp;
    } catch (error) {
        throw error;
    }
};
export const getMessageBetweenSenderAndReceiver = async (req: ReqType) => {
    const token = Cookies.get("user");
    try {
        let url = "/v1/api/messages/getMessages";
        const resp = await API.get(url, req.body ? req.body : {}, {
            Authorization: `${token ? JSON.parse(token).token : ""}`,
        }, req.params);
        return resp;
    } catch (error) {
        throw error;
    }
};
