import axios from "axios";
import { DEFAULT_LANG } from "../common/constants";
import { loginCache } from "../store/cache";
import { actionLogout } from "../store/reducer/user";
import { store } from "../store";

const appServiceName = "https://haraj-express-api1.herokuapp.com/api/v1";

const PUBLIC_APIS = [
  { urls: "category/", method: axios.get },
  { urls: "config/make", method: axios.get },
  { urls: "config/model", method: axios.get },
  { urls: "product/vendorCount", method: axios.get },
  { urls: "product/advsearch", method: axios.post },
  { urls: "auth/login", method: axios.post },
];

class RestfulProvider {
  constructor() {
    this.setCommonHeaders();
  }

  setCommonHeaders = (url, method) => {
    const token = loginCache.fetchToken();
    const language = localStorage.getItem("language") || DEFAULT_LANG;

    const isPublicApi = PUBLIC_APIS.some(
      (api) => api.urls === url && api.method === method
    );

    if (token && !isPublicApi) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      axios.defaults.headers.common["Authorization"] = undefined;
    }

    axios.defaults.headers.common["Content-Language"] = language;
  };

  makeCall = (url, data, axiosMethod) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (true) {
      this.setCommonHeaders(url, axiosMethod);
    }

    return new Promise((resolve, reject) => {
      const response = axiosMethod(`${appServiceName}/${url}`, data, header);

      response
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (
            error.response?.status === 401 ||
            error.response?.data.message === "Access is denied"
          ) {
            window.location.href = "/";
            store.dispatch(actionLogout());
          } else {
            reject(
              error.response?.data?.message ||
                "Server is down, please check after some time !!"
            );
          }
        });
    });
  };

  put = (url, data) => {
    return this.makeCall(url, data, axios.put);
  };

  post = (url, data) => {
    return this.makeCall(url, data, axios.post);
  };

  get = (url) => {
    return this.makeCall(url, undefined, axios.get);
  };

  delete = (url, request) => {
    return this.makeCall(url, { data: request }, axios.delete);
  };
}

export default new RestfulProvider();
