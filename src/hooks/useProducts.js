// src/hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';

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