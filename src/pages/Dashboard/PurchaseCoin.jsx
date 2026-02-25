import { useNavigate } from "react-router-dom";
import { Coins, ChevronRight } from "lucide-react";

const PurchaseCoin = () => {
    const navigate = useNavigate();

    const packages = [
        { coins: 10, price: 1 },
        { coins: 150, price: 10 },
        { coins: 500, price: 20 },
        { coins: 1000, price: 35 },
    ];

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-12 italic text-center">Purchase Coin Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {packages.map((pkg, index) => (
                    <div key={index} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                            <Coins size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.coins} Coins</h3>
                        <p className="text-3xl font-black text-primary mb-8">${pkg.price}</p>
                        <button
                            onClick={() => navigate('/dashboard/payment', { state: { pkg } })}
                            className="btn btn-primary w-full rounded-full text-white font-bold"
                        >
                            Buy Now <ChevronRight size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseCoin;
