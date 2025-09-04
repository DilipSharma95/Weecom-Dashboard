import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ProductForm = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    title,
    initialData = null
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        brand: '',
        thumbnail: ''
    });

    const [errors, setErrors] = useState({});

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                price: initialData.price?.toString() || '',
                category: initialData.category || '',
                stock: initialData.stock?.toString() || '',
                brand: initialData.brand || '',
                thumbnail: initialData.thumbnail || ''
            });
        } else {
            // Reset form for new product
            setFormData({
                title: '',
                description: '',
                price: '',
                category: '',
                stock: '',
                brand: '',
                thumbnail: ''
            });
        }
        setErrors({});
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Valid price is required';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
            newErrors.stock = 'Valid stock quantity is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const submitData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
        };

        try {
            await onSubmit(submitData);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 py-4">
                        {/* Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter product title"
                                className={errors.title ? 'border-red-500' : ''}
                            />
                            {errors.title && (
                                <span className="text-red-500 text-sm">{errors.title}</span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                                rows={3}
                            />
                        </div>

                        {/* Price */}
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price *</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                className={errors.price ? 'border-red-500' : ''}
                            />
                            {errors.price && (
                                <span className="text-red-500 text-sm">{errors.price}</span>
                            )}
                        </div>

                        {/* Category */}
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category *</Label>
                            <Input
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Enter category"
                                className={errors.category ? 'border-red-500' : ''}
                            />
                            {errors.category && (
                                <span className="text-red-500 text-sm">{errors.category}</span>
                            )}
                        </div>

                        {/* Stock */}
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock *</Label>
                            <Input
                                id="stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                className={errors.stock ? 'border-red-500' : ''}
                            />
                            {errors.stock && (
                                <span className="text-red-500 text-sm">{errors.stock}</span>
                            )}
                        </div>

                        {/* Brand */}
                        <div className="grid gap-2">
                            <Label htmlFor="brand">Brand</Label>
                            <Input
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="Enter brand name"
                            />
                        </div>

                        {/* Thumbnail URL */}
                        <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Image URL</Label>
                            <Input
                                id="thumbnail"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                            />
                            {formData.thumbnail && (
                                <div className="mt-2">
                                    <img
                                        src={formData.thumbnail}
                                        alt="Preview"
                                        className="w-20 h-20 object-cover rounded-md"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : (initialData ? 'Update' : 'Add')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductForm;