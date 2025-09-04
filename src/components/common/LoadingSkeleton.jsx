import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const LoadingSkeleton = ({ rows = 5 }) => {
    return (
        <div className="p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-16" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-16" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-20" /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(rows)].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </TableCell>
                            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-12 rounded-full" /></TableCell>
                            <TableCell>
                                <div className="flex justify-end space-x-2">
                                    <Skeleton className="h-8 w-12" />
                                    <Skeleton className="h-8 w-16" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default LoadingSkeleton;