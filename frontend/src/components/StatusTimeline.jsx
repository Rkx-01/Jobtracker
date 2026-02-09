const StatusTimeline = ({ history }) => {
    if (!history || history.length === 0) {
        return <p className="text-sm text-gray-500">No status history available</p>;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Applied': return 'bg-blue-500';
            case 'Interview': return 'bg-amber-500';
            case 'Offer': return 'bg-green-500';
            case 'Rejected': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-4">
            {history.map((item, index) => (
                <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                        {index < history.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-600 mt-1" />
                        )}
                    </div>
                    <div className="pb-4">
                        <p className="font-medium text-gray-900 dark:text-white">{item.status}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(item.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatusTimeline;
