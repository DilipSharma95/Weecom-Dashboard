import React, { useState } from 'react';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('products');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // You can add routing logic here later
        console.log(`Clicked on ${tab}`);
    };

    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-6">
            <div className="mb-8">
                <h2 className="text-xl font-bold">Weecom</h2>
            </div>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => handleTabClick('products')}
                            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${activeTab === 'products'
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <span>📦</span>
                            <span className="ml-3">Products</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleTabClick('analytics')}
                            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${activeTab === 'analytics'
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <span>📊</span>
                            <span className="ml-3">Analytics</span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleTabClick('settings')}
                            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${activeTab === 'settings'
                                    ? 'bg-gray-700 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <span>⚙️</span>
                            <span className="ml-3">Settings</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
