import http from "./http";

function getAllVendors() {
  return http.get(`vendor/`);
}

function updateVendorName(id, vendor) {
  return http.put(`vendor/${id}`, vendor);
}

function deleteVendor(id) {
  return http.delete(`vendor/${id}`);
}

export default {
  getAllVendors,
  updateVendorName,
  deleteVendor,
};
