import { useState } from "react";
import { Trash2, StickyNote, Calendar, ChevronDown, ChevronUp, FileText } from "lucide-react";
import Timeline from "./Timeline";
import StatusTimeline from "./StatusTimeline";
import API from "../api";

const JobCard = ({ job, onDelete, onUpdate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [notes, setNotes] = useState(job.notes || "");
    const [followUpDate, setFollowUpDate] = useState(
        job.followUpDate ? new Date(job.followUpDate).toISOString().split('T')[0] : ""
    );
    const [isSavingNotes, setIsSavingNotes] = useState(false);
    const [isSavingDate, setIsSavingDate] = useState(false);
    const [status, setStatus] = useState(job.status);
    const [resumeVersion, setResumeVersion] = useState(job.resumeVersion || "Default");

    const statusColors = {
        Applied: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        Interview: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        Offer: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
        Rejected: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    const handleSaveNotes = async () => {
        setIsSavingNotes(true);
        try {
            await API.patch(`/jobs/${job._id}/notes`, { notes });
            onUpdate();
        } catch (error) {
            alert("Failed to save notes");
        } finally {
            setIsSavingNotes(false);
        }
    };

    const handleSaveFollowUp = async () => {
        setIsSavingDate(true);
        try {
            await API.patch(`/jobs/${job._id}/followup`, { followUpDate });
            onUpdate();
        } catch (error) {
            alert("Failed to save follow-up date");
        } finally {
            setIsSavingDate(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await API.patch(`/jobs/${job._id}`, { status: newStatus });
            setStatus(newStatus);
            onUpdate();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleResumeChange = async (newResume) => {
        try {
            await API.patch(`/jobs/${job._id}`, { resumeVersion: newResume });
            setResumeVersion(newResume);
            onUpdate();
        } catch (error) {
            alert("Failed to update resume version");
        }
    };

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 animate-fadeIn">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{job.company}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{job.role}</p>

                    <div className="flex items-center gap-3 flex-wrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
                            {job.status}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(job.createdAt)}</span>

                        {job.followUpDate && (
                            <span className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400">
                                <Calendar size={12} />
                                Follow-up: {formatDate(job.followUpDate)}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors"
                    >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {isExpanded ? "Hide details" : "Show details"}
                    </button>

                    {isExpanded && (
                        <div className="mt-4 space-y-4">

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <StickyNote size={16} />
                                    Notes
                                </label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-colors"
                                    rows="3"
                                    placeholder="Add notes about this application..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                                <button
                                    onClick={handleSaveNotes}
                                    disabled={isSavingNotes}
                                    className="mt-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg disabled:opacity-50 transition-colors"
                                >
                                    {isSavingNotes ? "Saving..." : "Save Notes"}
                                </button>
                            </div>


                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <Calendar size={16} />
                                    Follow-up Date
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                                        value={followUpDate}
                                        onChange={(e) => setFollowUpDate(e.target.value)}
                                    />
                                    <button
                                        onClick={handleSaveFollowUp}
                                        disabled={isSavingDate}
                                        className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-colors"
                                    >
                                        {isSavingDate ? "Saving..." : "Set"}
                                    </button>
                                </div>
                            </div>


                            <Timeline statusHistory={job.statusHistory} />
                        </div>
                    )}
                </div>

                <button
                    onClick={() => onDelete(job._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    aria-label="Delete job"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default JobCard;
