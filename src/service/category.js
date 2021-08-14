import http from "./http";

function getAllCategories() {
  return http.get(`category/`);
}

function createCategories(category) {
  return http.post(`category/`, category);
}

function addCategoryImage(id, image) {
  return http.post(`category/${id}/doc`, image);
}

function deleteCategories(id) {
  return http.delete(`category/${id}`);
}

function updateCategories(id, category) {
  return http.post(`category/${id}`, category);
}
export default {
  getAllCategories,
  createCategories,
  addCategoryImage,
  deleteCategories,
  updateCategories,
};
