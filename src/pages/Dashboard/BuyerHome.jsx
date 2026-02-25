import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { Briefcase, Clock, DollarSign, Eye, CheckCircle, XCircle } from "lucide-react";

const BuyerHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({});
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/stats/buyer/${user?.email}`).then(res => setStats(res.data));
        axiosSecure.get(`/submissions/buyer/${user?.email}`).then(res => setSubmissions(res.data.filter(s => s.status === 'pending')));
    }, [user, axiosSecure]);

    const handleApprove = (id) => {
        axiosSecure.patch(`/submissions/approve/${id}`).then(res => {
            if (res.data.modifiedCount > 0) {
                setSubmissions(submissions.filter(s => s._id !== id));
            }
        });
    };

    const handleReject = (id) => {
        axiosSecure.patch(`/submissions/reject/${id}`).then(res => {
            if (res.data.modifiedCount > 0) {
                setSubmissions(submissions.filter(s => s._id !== id));
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-extrabold mb-8 italic">Buyer Dashboard</h2>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600"><Briefcase size={32} /></div>
                    <div><p className="text-sm text-gray-500 font-semibold">Total Tasks</p><p className="text-3xl font-black">{stats.totalTasks || 0}</p></div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600"><Clock size={32} /></div>
                    <div><p className="text-sm text-gray-500 font-semibold">Pending Workers</p><p className="text-3xl font-black">{stats.pendingWorkers || 0}</p></div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600"><DollarSign size={32} /></div>
                    <div><p className="text-sm text-gray-500 font-semibold">Total Payment</p><p className="text-3xl font-black">${stats.totalPayment || 0}</p></div>
                </div>
            </div>

            {/* Task To Review */}
            <h3 className="text-2xl font-bold mb-4">Tasks To Review</h3>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50"><tr><th>Worker</th><th>Task</th><th>Amount</th><th>Actions</th></tr></thead>
                    <tbody>
                        {submissions.map(sub => (
                            <tr key={sub._id} className="hover:bg-gray-50 border-b border-gray-100">
                                <td className="font-semibold">{sub.worker_name}</td>
                                <td>{sub.task_title}</td>
                                <td className="text-primary font-bold">{sub.payable_amount} Coins</td>
                                <td className="flex gap-2">
                                    <button onClick={() => handleApprove(sub._id)} className="btn btn-sm btn-success text-white"><CheckCircle size={16} /> Approve</button>
                                    <button onClick={() => handleReject(sub._id)} className="btn btn-sm btn-error text-white"><XCircle size={16} /> Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {submissions.length === 0 && <p className="text-center py-10 text-gray-400">No pending submissions.</p>}
            </div>
        </div>
    );
};

export default BuyerHome;
