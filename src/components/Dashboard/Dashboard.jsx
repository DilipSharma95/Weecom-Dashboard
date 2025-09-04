import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <MainContent />
            </div>
        </div>
    );
};

export default Dashboard;