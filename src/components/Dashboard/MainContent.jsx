import React from 'react';
import ProductTable from '../Products/ProductTable';

const MainContent = () => {
    return (
        <main className="flex-1 p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <ProductTable />
            </div>
        </main>
    );
};

export default MainContent;