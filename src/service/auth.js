import http from "./http";

function login(loginInfo) {
  return http.post("auth/login", loginInfo);
}

function checkTokenExpiry() {
  return http.get("auth/verifyTokenExpiration");
}

export default {
  checkTokenExpiry,
  login,
};
