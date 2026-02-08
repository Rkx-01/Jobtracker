import { LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-900">JobTracker</h1>
                <p className="text-sm text-gray-500 mt-1">Track your applications</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <LayoutDashboard size={20} />
                    <span className="font-medium">Dashboard</span>
                </button>
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-gray-200">
                <div className="px-4 py-3 bg-gray-50 rounded-lg mb-3">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut size={18} />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
