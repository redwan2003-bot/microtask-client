import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure.get(`/payments/${user?.email}`)
            .then(res => setPayments(res.data));
    }, [user, axiosSecure]);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-8 italic">My Payment History</h2>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-4">#</th>
                            <th className="py-4">Price</th>
                            <th className="py-4">Coins Purchased</th>
                            <th className="py-4">Transaction ID</th>
                            <th className="py-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100">
                                <td className="py-4">{index + 1}</td>
                                <td className="py-4 font-bold text-primary">${payment.price}</td>
                                <td className="py-4 font-semibold">{payment.coins} Coins</td>
                                <td className="py-4 text-xs font-mono text-gray-500">{payment.transactionId}</td>
                                <td className="py-4 text-gray-400">{new Date(payment.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
