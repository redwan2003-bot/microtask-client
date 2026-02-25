import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ pkg }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (pkg?.price > 0) {
            axiosSecure.post('/create-payment-intent', { price: pkg.price })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [axiosSecure, pkg]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            Swal.fire("Error", error.message, "error");
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            Swal.fire("Error", confirmError.message, "error");
            setProcessing(false);
        } else if (paymentIntent.status === "succeeded") {
            const paymentInfo = {
                email: user.email,
                price: pkg.price,
                transactionId: paymentIntent.id,
                date: new Date(),
                coins: pkg.coins,
                status: 'succeeded'
            };

            const res = await axiosSecure.post('/payments', paymentInfo);
            if (res.data.insertedId) {
                Swal.fire("Success!", `You purchased ${pkg.coins} coins. Transaction ID: ${paymentIntent.id}`, "success");
                navigate('/dashboard/payment-history');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 text-center italic">Complete Your Purchase</h3>
            <div className="mb-6 bg-gray-50 p-4 rounded-xl text-center border-b-2 border-primary/20">
                <p className="text-gray-500 font-medium">Package: <span className="text-gray-800">{pkg?.coins} Coins</span></p>
                <p className="text-3xl font-black text-primary">${pkg?.price}</p>
            </div>
            <div className="p-4 border rounded-xl mb-8 bg-gray-50">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                />
            </div>
            <button
                className="btn btn-primary w-full rounded-full text-white font-bold"
                type="submit"
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? <span className="loading loading-spinner"></span> : `Pay $${pkg?.price}`}
            </button>
        </form>
    );
};

const Payment = () => {
    const location = useLocation();
    const pkg = location.state?.pkg;

    if (!pkg) return <div className="text-center py-20 font-bold text-xl">Invalid Package Access</div>;

    return (
        <div className="p-4 flex items-center justify-center min-h-[70vh]">
            <Elements stripe={stripePromise}>
                <CheckoutForm pkg={pkg} />
            </Elements>
        </div>
    );
};

export default Payment;
