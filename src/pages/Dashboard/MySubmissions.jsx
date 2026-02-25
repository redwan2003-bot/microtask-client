import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MySubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure.get(`/submissions/worker/${user?.email}`)
            .then(res => {
                setSubmissions(res.data);
            });
    }, [user, axiosSecure]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(submissions.length / itemsPerPage);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-8 italic text-gray-800">My Submissions</h2>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-4">#</th>
                            <th className="py-4">Task Title</th>
                            <th className="py-4">Payable Amount</th>
                            <th className="py-4">Submission Date</th>
                            <th className="py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((sub, index) => (
                            <tr key={sub._id} className="hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100">
                                <td className="py-4">{indexOfFirstItem + index + 1}</td>
                                <td className="py-4 font-semibold text-gray-700">{sub.task_title}</td>
                                <td className="py-4">{sub.payable_amount} Coins</td>
                                <td className="py-4 text-gray-500">{new Date(sub.submission_date).toLocaleDateString()}</td>
                                <td className="py-4">
                                    <span className={`badge px-4 py-3 font-semibold ${sub.status === 'pending' ? 'badge-warning text-warning-content' :
                                            sub.status === 'approved' ? 'badge-success text-success-content' :
                                                'badge-error text-error-content'
                                        }`}>
                                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 join">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="join-item btn btn-outline btn-primary"
                    >
                        «
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`join-item btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline btn-primary'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="join-item btn btn-outline btn-primary"
                    >
                        »
                    </button>
                </div>
            )}

            {submissions.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-400 font-medium">You haven't submitted any tasks yet.</p>
                </div>
            )}
        </div>
    );
};

export default MySubmissions;
