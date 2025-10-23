"use client";

import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(isMobile ? false : true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className=" flex h-screen">
      <Topbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main
        className={`flex-1 min-h-screen overflow-y-auto bg-gray-100 pt-[5rem] ml-0 lg:ml-72`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
