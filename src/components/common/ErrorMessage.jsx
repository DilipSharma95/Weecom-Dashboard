import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ErrorMessage = ({
    message = 'Something went wrong',
    onRetry = null,
    showRetry = true
}) => {
    return (
        <Card className="p-8">
            <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                    </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    Error Loading Data
                </h3>
                <p className="mt-2 text-gray-600">
                    {message}
                </p>
                {showRetry && onRetry && (
                    <Button
                        onClick={onRetry}
                        className="mt-4"
                        variant="outline"
                    >
                        Try Again
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default ErrorMessage;