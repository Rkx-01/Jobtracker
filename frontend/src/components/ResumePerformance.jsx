import { useEffect, useState } from "react";
import API from "../api";
import { FileText, TrendingUp } from "lucide-react";

const ResumePerformance = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResumeStats();
    }, []);

    const fetchResumeStats = async () => {
        try {
            const { data } = await API.get("/jobs/resume-stats");
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch resume stats", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-gray-500">Loading resume stats...</div>;
    if (Object.keys(stats).length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="text-indigo-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Resume Performance
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                            <th className="pb-3 font-medium">Resume</th>
                            <th className="pb-3 font-medium text-center">Total</th>
                            <th className="pb-3 font-medium text-center">Interview Rate</th>
                            <th className="pb-3 font-medium text-center">Offer Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {Object.entries(stats).map(([resume, data]) => (
                            <tr key={resume} className="text-sm">
                                <td className="py-3 font-medium text-gray-900 dark:text-white">{resume}</td>
                                <td className="py-3 text-center text-gray-600 dark:text-gray-400">{data.total}</td>
                                <td className="py-3 text-center">
                                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                                        {data.interviewRate}%
                                        {data.interviewRate > 30 && <TrendingUp size={14} />}
                                    </span>
                                </td>
                                <td className="py-3 text-center">
                                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                                        {data.offerRate}%
                                        {data.offerRate > 10 && <TrendingUp size={14} />}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>Tip:</strong> Compare interview and offer rates to see which resume performs best.
                </p>
            </div>
        </div>
    );
};

export default ResumePerformance;
