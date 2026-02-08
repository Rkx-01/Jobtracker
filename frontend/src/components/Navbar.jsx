import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">J</span>
                        </div>
                        <span className="text-xl font-semibold text-gray-900 dark:text-white">
                            JobTracker
                        </span>
                    </Link>

                    {/* Login Button */}
                    <Link
                        to="/login"
                        className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
