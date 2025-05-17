import axios from 'axios'

const API_URL = 'https://fakestoreapi.com/products'

export function fetchProducts() {
  return axios.get(API_URL)
}

export function addProduct(product) {
  return axios.post(API_URL, product)
}

export function updateProduct(id, product) {
  return axios.put(`${API_URL}/${id}`, product)
}

export function deleteProduct(id) {
  return axios.delete(`${API_URL}/${id}`)
}

export function fetchByCategory(category) {
  return axios.get(`${API_URL}/category/${category}`)
}