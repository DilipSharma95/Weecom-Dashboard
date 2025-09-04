import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE_URL = 'https://dummyjson.com';

// Add request interceptor for debugging
axios.interceptors.request.use(request => {
    console.log('Starting Request:', request.url);
    return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
    response => {
        console.log('Response:', response.status, response.data);
        return response;
    },
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const productService = {
    getProducts: async (limit = 10, skip = 0, search = '') => {
        try {
            let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
            if (search && search.trim()) {
                url = `${BASE_URL}/products/search?q=${search}&limit=${limit}&skip=${skip}`;
            }
            const response = await axios.get(url);
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    addProduct: async (product) => {
        try {
            console.log('Adding product:', product);
            const response = await axios.post(`${BASE_URL}/products/add`, {
                title: product.title,
                description: product.description || 'No description',
                price: parseFloat(product.price),
                discountPercentage: 0,
                rating: 4.5,
                stock: parseInt(product.stock),
                brand: product.brand || 'Generic',
                category: product.category,
                thumbnail: product.thumbnail || 'https://via.placeholder.com/150',
                images: [product.thumbnail || 'https://via.placeholder.com/150']
            });
            console.log('Product added:', response.data);
            return response;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },

    updateProduct: async (id, product) => {
        try {
            console.log('Updating product:', id, product);
            const response = await axios.put(`${BASE_URL}/products/${id}`, {
                title: product.title,
                description: product.description,
                price: parseFloat(product.price),
                stock: parseInt(product.stock),
                brand: product.brand,
                category: product.category,
                thumbnail: product.thumbnail
            });
            console.log('Product updated:', response.data);
            return response;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            console.log('Deleting product:', id);
            const response = await axios.delete(`${BASE_URL}/products/${id}`);
            console.log('Product deleted:', response.data);
            return response;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },

    getProduct: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/products/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    getCategories: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products/categories`);
            return response;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
};

export const useProducts = (limit = 10, skip = 0, search = '') => {
    const queryClient = useQueryClient();

    // Query key for caching
    const queryKey = ['products', { limit, skip, search }];

    // Fetch products query
    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey,
        queryFn: () => productService.getProducts(limit, skip, search),
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        keepPreviousData: true, // Keep previous data while fetching new data
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    // Add product mutation
    const addProduct = useMutation({
        mutationFn: productService.addProduct,
        onSuccess: () => {
            // Invalidate and refetch products
            queryClient.invalidateQueries(['products']);

            // Show success message (you can add toast here)
            console.log('Product added successfully');
        },
        onError: (error) => {
            console.error('Error adding product:', error);
            // You can add error toast here
        }
    });

    // Update product mutation
    const updateProduct = useMutation({
        mutationFn: ({ id, product }) => productService.updateProduct(id, product),
        onSuccess: () => {
            // Invalidate and refetch products
            queryClient.invalidateQueries(['products']);

            console.log('Product updated successfully');
        },
        onError: (error) => {
            console.error('Error updating product:', error);
        }
    });

    // Delete product mutation
    const deleteProduct = useMutation({
        mutationFn: productService.deleteProduct,
        onSuccess: () => {
            // Invalidate and refetch products
            queryClient.invalidateQueries(['products']);

            console.log('Product deleted successfully');
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
        }
    });

    return {
        // Query data
        data,
        isLoading,
        error,
        refetch,

        // Mutations
        addProduct,
        updateProduct,
        deleteProduct,

        // Loading states
        isAddingProduct: addProduct.isLoading,
        isUpdatingProduct: updateProduct.isLoading,
        isDeletingProduct: deleteProduct.isLoading,

        // Error states
        addError: addProduct.error,
        updateError: updateProduct.error,
        deleteError: deleteProduct.error,
    };
};

// Optional: Custom hook for single product
export const useProduct = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getProduct(id),
        enabled: !!id, // Only run if id exists
        staleTime: 5 * 60 * 1000,
    });
};

// Optional: Custom hook for categories
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => productService.getCategories(),
        staleTime: 30 * 60 * 1000, // Categories change less frequently
        cacheTime: 60 * 60 * 1000,
    });
};