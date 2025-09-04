// src/components/Products/ProductTable.jsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import LoadingSkeleton from '../common/LoadingSkeleton';
import ErrorMessage from '../common/ErrorMessage';
import ProductForm from './ProductForm';
import { useProducts } from '../../hooks/useProducts';

const ProductTable = () => {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const limit = 10;
    const skip = page * limit;

    const {
        data,
        isLoading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        isAddingProduct,
        isUpdatingProduct,
        isDeletingProduct
    } = useProducts(limit, skip, search);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(0); // Reset to first page on search
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsEditDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct.mutateAsync(id);
        }
    };

    const handleAddProduct = async (productData) => {
        await addProduct.mutateAsync(productData);
        setIsAddDialogOpen(false);
    };

    const handleUpdateProduct = async (productData) => {
        await updateProduct.mutateAsync({
            id: editingProduct.id,
            product: productData
        });
        setIsEditDialogOpen(false);
        setEditingProduct(null);
    };

    if (error) {
        return <ErrorMessage message="Failed to fetch products" />;
    }

    const products = data?.data?.products || [];
    const total = data?.data?.total || 0;
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="space-y-6">
            {/* Header with Search and Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                    <p className="text-gray-600">Manage your product inventory</p>
                </div>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="w-full sm:w-auto"
                >
                    Add Product
                </Button>
            </div>

            {/* Search Input */}
            <Card className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={handleSearch}
                            className="w-full"
                        />
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                        Total: {total} products
                    </div>
                </div>
            </Card>

            {/* Products Table */}
            <Card>
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan="5" className="text-center py-8">
                                            <div className="text-gray-500">
                                                {search ? 'No products found for your search' : 'No products available'}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={product.thumbnail}
                                                        alt={product.title}
                                                        className="w-10 h-10 rounded-md object-cover"
                                                    />
                                                    <span>{product.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>${product.price}</TableCell>
                                            <TableCell>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                    {product.category}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-sm ${product.stock > 10
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.stock}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(product)}
                                                        disabled={isUpdatingProduct}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(product.id)}
                                                        disabled={isDeletingProduct}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </Card>

            {/* Pagination */}
            {products.length > 0 && (
                <Card className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-600">
                            Showing {skip + 1} to {Math.min(skip + limit, total)} of {total} results
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 0}
                            >
                                Previous
                            </Button>
                            <span className="flex items-center px-4">
                                Page {page + 1} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setPage(page + 1)}
                                disabled={page >= totalPages - 1}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Add Product Dialog */}
            <ProductForm
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSubmit={handleAddProduct}
                isLoading={isAddingProduct}
                title="Add New Product"
            />

            {/* Edit Product Dialog */}
            <ProductForm
                isOpen={isEditDialogOpen}
                onClose={() => {
                    setIsEditDialogOpen(false);
                    setEditingProduct(null);
                }}
                onSubmit={handleUpdateProduct}
                isLoading={isUpdatingProduct}
                title="Edit Product"
                initialData={editingProduct}
            />
        </div>
    );
};

export default ProductTable;