import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { FileText, Clock, Coins } from "lucide-react";

const WorkerHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({});
    const [approved, setApproved] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/stats/worker/${user?.email}`).then(res => setStats(res.data));
        axiosSecure.get(`/submissions/worker/${user?.email}`).then(res => setApproved(res.data.filter(s => s.status === 'approved')));
    }, [user, axiosSecure]);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-extrabold mb-8 italic">Worker Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600"><FileText size={32} /></div>
                    <div><p className="text-sm text-gray-500 font-semibold">Total Submissions</p><p className="text-3xl font-black">{stats.totalSubmissions || 0}</p></div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600"><Clock size={32} /></div>
                    <div><p className="text-sm text-gray-500 font-semibold">Pending</p><p className="text-3xl font-black">{stats.pendingSubmissions || 0}</p></div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600"><Coins size={32} /></div>
                    <div><p className="text-sm text-gray-500 font-semibold">Total Earning</p><p className="text-3xl font-black">{stats.totalEarning || 0} Coins</p></div>
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Approved Submissions</h3>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50"><tr><th>Task</th><th>Amount</th><th>Buyer</th><th>Status</th></tr></thead>
                    <tbody>
                        {approved.map(sub => (
                            <tr key={sub._id} className="hover:bg-gray-50 border-b border-gray-100">
                                <td className="font-semibold">{sub.task_title}</td>
                                <td className="text-green-600 font-bold">{sub.payable_amount} Coins</td>
                                <td>{sub.buyer_name}</td>
                                <td><span className="badge badge-success">Approved</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {approved.length === 0 && <p className="text-center py-10 text-gray-400">No approved submissions yet.</p>}
            </div>
        </div>
    );
};

export default WorkerHome;
