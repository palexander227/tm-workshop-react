import http from "./http";

function login(loginInfo) {
  return http.post("user/login", loginInfo);
}

function signup(signupInfo) {
  return http.post("user/register", signupInfo);
}

function getAllUser() {
  return http.get("user");
}

function getUserById(id) {
  return http.get(`user/${id}`);
}

export default {
  login,
  signup,
  getAllUser,
  getUserById,
};
