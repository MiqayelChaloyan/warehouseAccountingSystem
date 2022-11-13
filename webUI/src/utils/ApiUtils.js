import axios from 'axios';
import { ENDPOINTS, BASE_URL } from '../constans/ApiConstans';

export async function getWarehouses() {
    return axios.get(`${BASE_URL}${ENDPOINTS.warehouses}`)
}

export async function getWarehouse(id) {
    return axios.get(`${BASE_URL}${ENDPOINTS.warehouse}${id}`)
}

export async function updateWarehouse(id, body) {
    return axios.put(`${BASE_URL}${ENDPOINTS.warehouse}${id}`, body)
}

export async function createWarehouse(body) {
    return axios.post(`${BASE_URL}${ENDPOINTS.warehouses}`, body)
}

export async function deleteWarehouse(id) {
    return axios.delete(`${BASE_URL}${ENDPOINTS.warehouse}${id}`)
}

export async function deleteItemFromWarehouse(warehouseId, prodId) {
    return axios.delete(`${BASE_URL}${ENDPOINTS.prodWarehouse}${warehouseId}/${prodId}`)
}

export async function getProducts() {
    return axios.get(`${BASE_URL}${ENDPOINTS.products}`)
}

export async function getProduct(id) {
    return axios.get(`${BASE_URL}${ENDPOINTS.product}${id}`)
}

export async function createProduct(body) {
    return axios.post(`${BASE_URL}${ENDPOINTS.products}`, body)
}

export async function updateProduct(id, body) {
    return axios.put(`${BASE_URL}${ENDPOINTS.product}${id}`, body)
}

export async function deleteProduct(id) {
    return axios.delete(`${BASE_URL}${ENDPOINTS.product}${id}`)
}

export async function transferProduct(id, body) {
    return await axios.post(`${BASE_URL}${ENDPOINTS.transferProd}${id}`, body)
}