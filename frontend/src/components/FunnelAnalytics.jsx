import { useEffect, useState } from "react";
import API from "../api";
import { TrendingUp } from "lucide-react";

const FunnelAnalytics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await API.get("/jobs/enhanced-stats");
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch funnel stats", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-gray-500">Loading analytics...</div>;
    if (!stats) return null;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-indigo-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Application Funnel
                </h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Applied</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {stats.totalApplied}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">→ Interview Rate</p>
                        <p className="text-lg font-semibold text-blue-600">
                            {stats.funnel.appliedToInterview}%
                        </p>
                    </div>
                </div>

                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${Math.min(stats.funnel.appliedToInterview, 100)}%` }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Interview</p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {stats.totalInterview}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">→ Offer Rate</p>
                        <p className="text-lg font-semibold text-green-600">
                            {stats.funnel.interviewToOffer}%
                        </p>
                    </div>
                </div>

                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500"
                        style={{ width: `${Math.min(stats.funnel.interviewToOffer, 100)}%` }}
                    />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Offers</p>
                        <p className="text-2xl font-semibold text-green-600">
                            {stats.totalOffer}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Overall Success</p>
                        <p className="text-lg font-semibold text-indigo-600">
                            {stats.funnel.overallSuccess}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FunnelAnalytics;
