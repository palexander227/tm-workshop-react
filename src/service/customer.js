import http from "./http";

function getAllCustomers() {
  return http.get(`customer/`);
}

function updateCustomerName(id, customer) {
  return http.put(`customer/${id}`, customer);
}

function deleteCustomer(id) {
  return http.delete(`customer/${id}`);
}

export default {
  getAllCustomers,
  updateCustomerName,
  deleteCustomer,
};
