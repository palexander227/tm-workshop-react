import axios from "axios";

const appServiceName = "https://thoughtmuseum-api.herokuapp.com";

class RestfulProvider {
  constructor() {
    this.setCommonHeaders();
  }

  setCommonHeaders = () => {
    const token = localStorage.getItem("token");
    const tokenValue = token?.replace(/^"(.*)"$/, "$1");

    tokenValue &&
      (axios.defaults.headers.common["Authorization"] = `Bearer ${tokenValue}`);
  };

  makeCall = (url, data, axiosMethod) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (localStorage.getItem("token")) {
      this.setCommonHeaders();
    }

    return new Promise((resolve, reject) => {
      const response = axiosMethod(`${appServiceName}/${url}`, data, header);

      response
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(
            error.response?.data?.message ||
              "Server is down, please check after some time!!"
          );
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
