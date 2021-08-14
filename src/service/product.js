import http from "./http";

function getAllProduct() {
  return http.get(`product/`);
}

function deleteProduct(productId) {
  return http.delete(`product/${productId}`);
}

function updateProduct(productId, request) {
  return http.put(`product/${productId}`, request);
}

function getBuyProductByCustomer(customerId) {
  return http.get(`product/${customerId}/buyProducts`);
}

function getSoldProductsByVendor(vendorId) {
  return http.get(`product/${vendorId}/soldProducts`);
}

export default {
  getAllProduct,
  deleteProduct,
  updateProduct,
  getBuyProductByCustomer,
  getSoldProductsByVendor,
};
