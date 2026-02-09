import { useEffect, useState } from "react";
import API from "../api";
import { AlertCircle, Clock } from "lucide-react";

const FollowUpList = ({ onRefresh }) => {
    const [followUps, setFollowUps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFollowUps();
    }, [onRefresh]);

    const fetchFollowUps = async () => {
        try {
            const { data } = await API.get("/jobs/follow-ups");
            setFollowUps(data);
        } catch (error) {
            console.error("Failed to fetch follow-ups", error);
        } finally {
            setLoading(false);
        }
    };

    const daysSince = (date) => {
        const diff = Date.now() - new Date(date).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    if (loading) return <div className="text-gray-500">Loading...</div>;
    if (followUps.length === 0) return null;

    return (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-amber-600 dark:text-amber-400" size={20} />
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                    Needs Follow-Up ({followUps.length})
                </h3>
            </div>

            <div className="space-y-3">
                {followUps.map(job => (
                    <div key={job._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{job.company}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{job.role}</p>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                                {job.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <Clock size={14} />
                            <span>Last updated {daysSince(job.updatedAt)} days ago</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowUpList;
