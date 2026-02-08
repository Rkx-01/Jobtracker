import { Inbox } from "lucide-react";

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Inbox size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs yet</h3>
            <p className="text-sm text-gray-500 text-center max-w-sm">
                Paste an email from a job application above to get started tracking your applications.
            </p>
        </div>
    );
};

export default EmptyState;
