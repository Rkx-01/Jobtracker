import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import EmptyState from "../components/EmptyState";

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [emailText, setEmailText] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(JSON.parse(storedUser));
            fetchJobs();
        }
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const { data } = await API.get("/jobs");
            setJobs(data);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddJob = async () => {
        if (!emailText.trim()) return;

        setSubmitting(true);
        try {
            await API.post("/jobs/parse", { emailText });
            setEmailText("");
            fetchJobs();
        } catch (err) {
            alert("Failed to parse email");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this job?")) return;

        try {
            await API.delete(`/jobs/${id}`);
            fetchJobs();
        } catch (err) {
            alert("Failed to delete");
        }
    };

    // Stats
    const stats = {
        Applied: jobs.filter((j) => j.status === "Applied").length,
        Interview: jobs.filter((j) => j.status === "Interview").length,
        Rejected: jobs.filter((j) => j.status === "Rejected").length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main Content */}
            <div className="ml-64 p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                            Welcome back, {user?.name}
                        </h1>
                        <p className="text-gray-600">Track and manage your job applications</p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Applied</p>
                                    <p className="text-3xl font-semibold text-gray-900">{stats.Applied}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Interview</p>
                                    <p className="text-3xl font-semibold text-gray-900">{stats.Interview}</p>
                                </div>
                                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Rejected</p>
                                    <p className="text-3xl font-semibold text-gray-900">{stats.Rejected}</p>
                                </div>
                                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Job Section */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Job</h2>
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                            rows="4"
                            placeholder="Paste email content here (e.g., 'Thank you for applying at Google...')"
                            value={emailText}
                            onChange={(e) => setEmailText(e.target.value)}
                        />
                        <button
                            onClick={handleAddJob}
                            disabled={!emailText.trim() || submitting}
                            className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus size={18} />
                            {submitting ? "Adding..." : "Auto Extract & Add Job"}
                        </button>
                    </div>

                    {/* Jobs List */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Applications</h2>

                        {loading ? (
                            <div className="grid gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                                    </div>
                                ))}
                            </div>
                        ) : jobs.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <div className="grid gap-4">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} onDelete={handleDelete} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
