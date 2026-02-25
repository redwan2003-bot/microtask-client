import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Users, Briefcase, Coins, CreditCard, CheckCircle, Clock } from "lucide-react";
import Swal from "sweetalert2";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({});
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
        axiosSecure.get('/stats/admin').then(res => setStats(res.data));
        axiosSecure.get('/withdrawals').then(res => setWithdrawals(res.data.filter(w => w.status === 'pending')));
    }, [axiosSecure]);

    const handleApprove = (id) => {
        Swal.fire({ title: "Approve Payment?", icon: "warning", showCancelButton: true, confirmButtonText: "Yes, Pay!" }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/withdrawals/${id}`, { status: 'approved' }).then(res => {
                    if (res.data.modifiedCount > 0) {
                        setWithdrawals(withdrawals.filter(w => w._id !== id));
                        Swal.fire("Done!", "Payment marked as completed.", "success");
                    }
                });
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-extrabold mb-8 italic">Admin Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600"><Users size={28} /></div>
                    <div><p className="text-xs text-gray-500 font-semibold">Workers</p><p className="text-2xl font-black">{stats.totalWorkers || 0}</p></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600"><Briefcase size={28} /></div>
                    <div><p className="text-xs text-gray-500 font-semibold">Buyers</p><p className="text-2xl font-black">{stats.totalBuyers || 0}</p></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600"><Coins size={28} /></div>
                    <div><p className="text-xs text-gray-500 font-semibold">Total Coins</p><p className="text-2xl font-black">{stats.totalCoins || 0}</p></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600"><CreditCard size={28} /></div>
                    <div><p className="text-xs text-gray-500 font-semibold">Payments</p><p className="text-2xl font-black">{stats.totalPayments || 0}</p></div>
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Pending Withdraw Requests</h3>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50"><tr><th>Worker</th><th>Coins</th><th>Amount</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                        {withdrawals.map(w => (
                            <tr key={w._id} className="hover:bg-gray-50 border-b border-gray-100">
                                <td className="font-semibold">{w.worker_name}</td>
                                <td>{w.withdrawal_coins}</td>
                                <td className="text-green-600 font-bold">${w.withdrawal_amount}</td>
                                <td><span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{w.payment_system}: {w.account_number}</span></td>
                                <td><span className="flex items-center gap-1 text-warning font-bold"><Clock size={14} /> Pending</span></td>
                                <td><button onClick={() => handleApprove(w._id)} className="btn btn-sm btn-success text-white"><CheckCircle size={14} /> Pay</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {withdrawals.length === 0 && <p className="text-center py-10 text-gray-400">No pending withdrawals.</p>}
            </div>
        </div>
    );
};

export default AdminHome;
