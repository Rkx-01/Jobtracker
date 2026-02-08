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
        <div className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors">
            
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">JobTracker</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your applications</p>
            </div>

            
            <nav className="flex-1 p-4">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <LayoutDashboard size={20} />
                    <span className="font-medium">Dashboard</span>
                </button>
            </nav>

            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user?.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <LogOut size={18} />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
