// src/hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProducts = (limit = 10, skip = 0, search = '') => {
    const queryClient = useQueryClient();

    const queryKey = ['products', { limit, skip, search }];

    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey,
        queryFn: () => productService.getProducts(limit, skip, search),
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
        retry: 2,
    });

    const addProduct = useMutation({
        mutationFn: productService.addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            alert('Product added successfully!');
        },
        onError: (error) => {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    });

    const updateProduct = useMutation({
        mutationFn: ({ id, product }) => productService.updateProduct(id, product),
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            alert('Product updated successfully!');
        },
        onError: (error) => {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    });

    const deleteProduct = useMutation({
        mutationFn: productService.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            alert('Product deleted successfully!');
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    });

    return {
        data,
        isLoading,
        error,
        refetch,
        addProduct,
        updateProduct,
        deleteProduct,
        isAddingProduct: addProduct.isLoading,
        isUpdatingProduct: updateProduct.isLoading,
        isDeletingProduct: deleteProduct.isLoading,
    };
};