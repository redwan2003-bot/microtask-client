import { Outlet } from "react-router-dom";
import Sidebar from "../components/Shared/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="lg:flex">
            {/* Sidebar - drawer on mobile, fixed on desktop */}
            <div className="z-50">
                <Sidebar />
            </div>

            {/* Content area - responsive padding */}
            <div className="flex-1 min-h-screen bg-base-100 p-4 md:p-6 lg:p-8 overflow-x-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
