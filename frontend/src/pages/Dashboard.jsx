import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [emailText, setEmailText] = useState("");
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
            const { data } = await API.get("/jobs");
            setJobs(data);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        }
    };

    const handeConnect = async () => {
        if (!emailText.trim()) return;
        try {
            await API.post("/jobs/parse", { emailText });
            setEmailText("");
            fetchJobs(); // Refresh list
        } catch (err) {
            alert("Failed to parse email");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            await API.delete(`/jobs/${id}`);
            fetchJobs();
        } catch (err) {
            alert("Failed to delete");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    // Stats
    const stats = {
        Applied: jobs.filter((j) => j.status === "Applied").length,
        Interview: jobs.filter((j) => j.status === "Interview").length,
        Rejected: jobs.filter((j) => j.status === "Rejected").length,
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Job Tracker</h1>
                    <div className="flex items-center gap-4">
                        <span>Welcome, {user?.name}</span>
                        <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
                    </div>
                </div>

                {/* Create Job Section */}
                <div className="bg-white p-6 rounded shadow mb-8">
                    <h2 className="text-xl font-semibold mb-2">Add New Job via Email Text</h2>
                    <textarea
                        className="w-full p-2 border rounded mb-2"
                        rows="4"
                        placeholder="Paste email content here (e.g., 'Thank you for applying at Google...')"
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                    />
                    <button
                        onClick={handeConnect}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Auto Extract & Add Job
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-100 p-4 rounded text-center">
                        <h3 className="font-bold text-blue-800">Applied</h3>
                        <p className="text-2xl">{stats.Applied}</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded text-center">
                        <h3 className="font-bold text-yellow-800">Interview</h3>
                        <p className="text-2xl">{stats.Interview}</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded text-center">
                        <h3 className="font-bold text-red-800">Rejected</h3>
                        <p className="text-2xl">{stats.Rejected}</p>
                    </div>
                </div>

                {/* Job List */}
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <div key={job._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{job.company}</h3>
                                <p className="text-gray-600">{job.role}</p>
                                <span
                                    className={`inline-block px-2 py-1 text-xs rounded mt-1 ${job.status === "Accepted"
                                            ? "bg-green-200 text-green-800"
                                            : job.status === "Rejected"
                                                ? "bg-red-200 text-red-800"
                                                : job.status === "Interview"
                                                    ? "bg-yellow-200 text-yellow-800"
                                                    : "bg-blue-200 text-blue-800"
                                        }`}
                                >
                                    {job.status}
                                </span>
                                <p className="text-xs text-gray-400 mt-1">{new Date(job.createdAt).toLocaleDateString()}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(job._id)}
                                className="text-red-500 hover:text-red-700 font-bold"
                            >
                                X
                            </button>
                        </div>
                    ))}
                    {jobs.length === 0 && <p className="text-center text-gray-500">No jobs found.</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
