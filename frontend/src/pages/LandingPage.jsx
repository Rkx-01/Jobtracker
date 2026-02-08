import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, StickyNote, Target, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />

            
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    <div>
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Track your job applications{" "}
                            <span className="text-indigo-600 dark:text-indigo-400">smarter.</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                            A simple dashboard to manage applications, interviews and follow-ups in one place.
                        </p>

                        
                        <div className="flex gap-4">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-indigo-600/30"
                            >
                                Get Started
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    
                    <div className="relative">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                            
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Applied</p>
                                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">12</p>
                                </div>
                                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                                    <p className="text-xs text-amber-600 dark:text-amber-400 mb-1">Interview</p>
                                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">5</p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <p className="text-xs text-green-600 dark:text-green-400 mb-1">Offers</p>
                                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">2</p>
                                </div>
                            </div>

                            
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                                            <div className="h-5 w-16 bg-indigo-200 dark:bg-indigo-800 rounded-full"></div>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Everything you need to track applications
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Simple, powerful features to stay organized
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                            <Target className="text-indigo-600 dark:text-indigo-400" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Smart Tracking
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track Applied / Interview / Rejected in one dashboard. See your progress at a glance.
                        </p>
                    </div>

                    
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                            <StickyNote className="text-amber-600 dark:text-amber-400" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Notes & Reminders
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Add notes and follow-up reminders per job. Never miss an important deadline.
                        </p>
                    </div>

                    
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                            <BarChart3 className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Analytics
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            See application stats and progress. Make data-driven decisions about your job search.
                        </p>
                    </div>
                </div>
            </section>

            
            <section className="max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        How it works
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Get started in 3 simple steps
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    
                    <div className="text-center">
                        <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            1
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Sign up
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Create your free account in seconds
                        </p>
                    </div>

                    
                    <div className="text-center">
                        <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            2
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Add jobs
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Paste job emails or add jobs manually
                        </p>
                    </div>

                    
                    <div className="text-center">
                        <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            3
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Track progress
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Monitor your applications in the dashboard
                        </p>
                    </div>
                </div>
            </section>

            
            <section className="max-w-4xl mx-auto px-6 py-20">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-12 text-center shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Start tracking your applications today
                    </h2>
                    <p className="text-indigo-100 mb-8 text-lg">
                        Join students and professionals organizing their job search
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors shadow-lg"
                    >
                        Get Started
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            
            <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
                    <p>© 2024 JobTracker. Built as a portfolio project.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
