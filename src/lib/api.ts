import axios from 'axios';
const devURL = import.meta.env.VITE_BASE_URL;
const axiosAPI = axios.create({
  baseURL: devURL,
});

const apiRequest = (
  method: string,
  url: string,
  request: {},
  headers: {},
  params?: {},
) => {
  headers = { ...headers };

  return axiosAPI({
    url,
    method,
    params,
    headers,
    data: request,
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
const get = (url: string, body: object, headers: object, params?: object) =>
   apiRequest('GET', url, body, headers, params);

const post = (url: string, request: object, headers: object) =>
  apiRequest('POST', url, request, headers);

const patch = (url: string, request: object, headers: object) =>
  apiRequest('PATCH', url, request, headers);
const del = (url: string, request: object, headers: object) =>
  apiRequest('DELETE', url, request, headers);


const API={
    get,
    post,
    patch,
    del,
};

export default API;