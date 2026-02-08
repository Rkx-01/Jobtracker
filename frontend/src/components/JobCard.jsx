import { Trash2 } from "lucide-react";

const JobCard = ({ job, onDelete }) => {
    const statusColors = {
        Applied: "bg-blue-50 text-blue-700 border-blue-200",
        Interview: "bg-amber-50 text-amber-700 border-amber-200",
        Rejected: "bg-red-50 text-red-700 border-red-200",
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <div className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200 animate-fadeIn">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.company}</h3>
                    <p className="text-sm text-gray-600 mb-3">{job.role}</p>

                    <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
                            {job.status}
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(job.createdAt)}</span>
                    </div>
                </div>

                <button
                    onClick={() => onDelete(job._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    aria-label="Delete job"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default JobCard;
