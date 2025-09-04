import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EmptyState = ({
    title = 'No Data Found',
    description = 'There are no items to display.',
    actionLabel = null,
    onAction = null,
    icon = null
}) => {
    const DefaultIcon = () => (
        <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
        </svg>
    );

    return (
        <Card className="p-8">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center">
                    {icon || <DefaultIcon />}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {title}
                </h3>
                <p className="mt-2 text-gray-600">
                    {description}
                </p>
                {actionLabel && onAction && (
                    <Button
                        onClick={onAction}
                        className="mt-4"
                    >
                        {actionLabel}
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default EmptyState;
