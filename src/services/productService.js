import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const productService = {
    getProducts: (limit = 10, skip = 0, search = '') => {
        let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
        if (search) {
            url = `${BASE_URL}/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }
        return axios.get(url);
    },

    addProduct: (product) => {
        return axios.post(`${BASE_URL}/products/add`, product);
    },

    updateProduct: (id, product) => {
        return axios.put(`${BASE_URL}/products/${id}`, product);
    },

    deleteProduct: (id) => {
        return axios.delete(`${BASE_URL}/products/${id}`);
    },
    getProduct: (id) => {
        return axios.get(`${BASE_URL}/products/${id}`);
    },

    getCategories: () => {
        return axios.get(`${BASE_URL}/products/categories`);
    }
};