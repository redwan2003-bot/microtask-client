import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Wallet, Info } from "lucide-react";

const Withdrawals = () => {
    const { user } = useContext(AuthContext);
    const [coins, setCoins] = useState(0);
    const [withdrawCoins, setWithdrawCoins] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/users/role/${user?.email}`)
            .then(res => setCoins(res.data.coins));
    }, [user, axiosSecure]);

    const withdrawAmount = withdrawCoins ? (parseInt(withdrawCoins) / 20).toFixed(2) : '0.00';

    const handleWithdraw = (e) => {
        e.preventDefault();
        const form = e.target;
        const withdrawal_coins = parseInt(form.withdrawal_coins.value);
        const payment_system = form.payment_system.value;
        const account_number = form.account_number.value;

        if (withdrawal_coins < 200) {
            Swal.fire("Error", "Minimum withdrawal is 200 coins.", "error");
            return;
        }

        if (withdrawal_coins > coins) {
            Swal.fire("Error", "You don't have enough coins.", "error");
            return;
        }

        const withdrawalData = {
            worker_email: user.email,
            worker_name: user.displayName,
            withdrawal_coins,
            withdrawal_amount: withdrawal_coins / 20,
            payment_system,
            account_number,
            withdrawal_date: new Date(),
            status: 'pending'
        };

        axiosSecure.post('/withdrawals', withdrawalData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire("Requested!", "Your withdrawal request is being processed.", "success");
                    form.reset();
                    setWithdrawCoins('');
                }
            });
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-12 italic text-center">Withdraw Your Earnings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center items-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5">
                        <Wallet size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 mb-2">Current Balance</h3>
                    <p className="text-5xl font-black text-gray-900 mb-4">{coins} Coins</p>
                    <p className="text-primary font-bold">≈ ${(coins / 20).toFixed(2)} USD</p>
                    <div className="mt-8 bg-blue-50 p-4 rounded-xl flex items-start gap-3 w-full border-l-4 border-blue-500">
                        <Info size={20} className="text-blue-500 mt-1 shrink-0" />
                        <p className="text-sm text-blue-800 font-medium">
                            Minimum withdrawal: 200 coins ($10). <br />
                            Conversion rate: 20 coins = $1.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <form onSubmit={handleWithdraw} className="space-y-4">
                        <div className="form-control">
                            <label className="label font-bold text-gray-700">Coins to Withdraw</label>
                            <input
                                type="number"
                                name="withdrawal_coins"
                                required
                                placeholder="Minimum 200"
                                value={withdrawCoins}
                                onChange={(e) => setWithdrawCoins(e.target.value)}
                                className="input input-bordered focus:input-primary"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-gray-700">Withdraw Amount ($)</label>
                            <input
                                type="text"
                                value={`$${withdrawAmount}`}
                                readOnly
                                className="input input-bordered bg-gray-100 font-bold text-green-600"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-gray-700">Payment System</label>
                            <select name="payment_system" className="select select-bordered focus:select-primary">
                                <option value="Bkash">Bkash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Rocket">Rocket</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-gray-700">Account Number / Email</label>
                            <input type="text" name="account_number" required placeholder="Account info" className="input input-bordered focus:input-primary" />
                        </div>
                        {coins >= 200 ? (
                            <button type="submit" className="btn btn-primary w-full text-white font-bold h-14 text-lg rounded-full mt-4">Withdraw Now</button>
                        ) : (
                            <p className="text-center text-error font-bold mt-4 py-4 bg-error/10 rounded-xl">Insufficient coins (minimum 200)</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Withdrawals;
