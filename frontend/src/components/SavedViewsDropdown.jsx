import { useEffect, useState } from "react";
import API from "../api";
import { Save, X } from "lucide-react";

const SavedViewsDropdown = ({ currentFilters, onApplyView }) => {
    const [views, setViews] = useState([]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [viewName, setViewName] = useState("");

    useEffect(() => {
        fetchViews();
    }, []);

    const fetchViews = async () => {
        try {
            const { data } = await API.get("/saved-views");
            setViews(data);
        } catch (error) {
            console.error("Failed to fetch saved views", error);
        }
    };

    const saveCurrentView = async () => {
        if (!viewName.trim()) return;

        try {
            await API.post("/saved-views", {
                name: viewName,
                filters: currentFilters
            });
            setViewName("");
            setShowSaveModal(false);
            fetchViews();
        } catch (error) {
            console.error("Failed to save view", error);
        }
    };

    const deleteView = async (id) => {
        if (!confirm("Delete this saved view?")) return;

        try {
            await API.delete(`/saved-views/${id}`);
            fetchViews();
        } catch (error) {
            console.error("Failed to delete view", error);
        }
    };

    const applyView = (view) => {
        onApplyView(view.filters);
    };

    return (
        <div className="flex gap-2">
            <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                onChange={(e) => {
                    const view = views.find(v => v._id === e.target.value);
                    if (view) applyView(view);
                    e.target.value = "";
                }}
                defaultValue=""
            >
                <option value="">Load Saved View...</option>
                {views.map(view => (
                    <option key={view._id} value={view._id}>
                        {view.name}
                    </option>
                ))}
            </select>

            <button
                onClick={() => setShowSaveModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
                <Save size={18} />
                Save View
            </button>

            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Save Current View
                            </h3>
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="View name (e.g., Interview Jobs)"
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
                            value={viewName}
                            onChange={(e) => setViewName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && saveCurrentView()}
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={saveCurrentView}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedViewsDropdown;
