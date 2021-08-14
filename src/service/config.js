import http from "./http";

function getAllMakes() {
  return http.get(`config/make`);
}

function getAllModels() {
  return http.get(`config/model`);
}

function createMakes(makeInfo) {
  return http.post(`config/make`, makeInfo);
}

function createModels(modalInfo) {
  return http.post(`config/model`, modalInfo);
}

export default {
  getAllMakes,
  getAllModels,
  createMakes,
  createModels,
};
