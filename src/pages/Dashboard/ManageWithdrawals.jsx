import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { CheckCircle, Clock } from "lucide-react";

const ManageWithdrawals = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = () => {
        axiosSecure.get('/withdrawals')
            .then(res => setWithdrawals(res.data));
    };

    const handleApprove = (id) => {
        Swal.fire({
            title: "Approve Withdrawal?",
            text: "Make sure you've sent the money to the worker.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            confirmButtonText: "Yes, Approve!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/withdrawals/${id}`, { status: 'approved' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            fetchWithdrawals();
                            Swal.fire("Approved!", "Payment has been marked as completed.", "success");
                        }
                    });
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-8 italic">Pending Withdrawals</h2>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50 uppercase text-xs">
                        <tr>
                            <th className="py-4">Worker</th>
                            <th className="py-4">Amount ($)</th>
                            <th className="py-4">Coins</th>
                            <th className="py-4">Payment Info</th>
                            <th className="py-4">Status</th>
                            <th className="py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawals.map((w) => (
                            <tr key={w._id} className="hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100">
                                <td className="py-4 font-bold text-gray-700">{w.worker_name}</td>
                                <td className="py-4 text-green-600 font-black">${w.withdrawal_amount}</td>
                                <td className="py-4">{w.withdrawal_coins} Coins</td>
                                <td className="py-4">
                                    <div className="text-xs font-semibold px-3 py-1 bg-gray-100 rounded-full inline-block border border-gray-200">
                                        {w.payment_system}: {w.account_number}
                                    </div>
                                </td>
                                <td className="py-4">
                                    {w.status === 'pending' ? (
                                        <span className="flex items-center gap-1 text-warning font-bold"><Clock size={16} /> Pending</span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-success font-bold"><CheckCircle size={16} /> Completed</span>
                                    )}
                                </td>
                                <td className="py-4">
                                    {w.status === 'pending' && (
                                        <button onClick={() => handleApprove(w._id)} className="btn btn-sm btn-success text-white px-6 rounded-full font-bold">
                                            Pay Now
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageWithdrawals;
