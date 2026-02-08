import { Clock } from "lucide-react";

const Timeline = ({ statusHistory }) => {
    if (!statusHistory || statusHistory.length === 0) {
        return null;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const statusColors = {
        Applied: "bg-blue-500 dark:bg-blue-400",
        Interview: "bg-amber-500 dark:bg-amber-400",
        Rejected: "bg-red-500 dark:bg-red-400",
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-gray-400 dark:text-gray-500" />
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Timeline</h4>
            </div>

            <div className="space-y-2">
                {statusHistory.map((entry, index) => (
                    <div key={index} className="flex items-start gap-3">
                        {/* Dot indicator */}
                        <div className="flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full ${statusColors[entry.status]}`}></div>
                            {index < statusHistory.length - 1 && (
                                <div className="w-0.5 h-6 bg-gray-200 dark:bg-gray-700 my-1"></div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{entry.status}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(entry.date)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
