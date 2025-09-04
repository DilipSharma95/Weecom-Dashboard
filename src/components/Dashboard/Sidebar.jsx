import React from 'react';

const Sidebar = () => {
    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-6">
            <div className="mb-8">
                <h2 className="text-xl font-bold">Weecom</h2>
            </div>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                        >
                            <span>📦</span>
                            <span className="ml-3">Product</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                        >
                            <span>📊</span>
                            <span className="ml-3">Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                        >
                            <span>⚙️</span>
                            <span className="ml-3">Setting</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;