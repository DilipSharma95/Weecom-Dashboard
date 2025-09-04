import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Product Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Welcome, Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;