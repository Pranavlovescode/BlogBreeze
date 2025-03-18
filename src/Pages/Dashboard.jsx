import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import Sidebar from '../components/Sidebar'; // Adjust the import path for Sidebar

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-grow p-4 bg-gray-100 h-full overflow-auto">
  {/* <h1 className="text-2xl font-bold mb-4">Dashboard</h1> */}
  <Outlet />
</div>

    </div>
  );
}
