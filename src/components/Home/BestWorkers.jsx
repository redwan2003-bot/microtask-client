import { useEffect, useState } from "react";
import axios from "axios";

const BestWorkers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);

    const mockWorkers = [
        { id: 1, name: "Alexander Pierce", coins: 4500, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" },
        { id: 2, name: "Sophia Martinez", coins: 3800, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
        { id: 3, name: "Marcus Wright", coins: 3200, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
        { id: 4, name: "Isabella Chen", coins: 2900, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" },
        { id: 5, name: "David Kim", coins: 2500, photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop" },
        { id: 6, name: "Emma Wilson", coins: 2100, photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop" }
    ];

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/best-workers')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setWorkers(res.data);
                } else {
                    setWorkers(mockWorkers);
                }
            })
            .catch(() => {
                setWorkers(mockWorkers);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="py-20 px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 italic">Meet Our Top Workers</h2>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    The hardest working individuals on our platform. Earn coins and climb to the top of the leaderboard!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
                {workers.map((worker) => (
                    <div key={worker._id || worker.id} className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <img
                                src={worker.photo}
                                alt={worker.name}
                                className="w-full h-full rounded-full object-cover border-4 border-primary ring-4 ring-primary/20"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full shadow-md text-gray-800">
                                ⭐ TOP
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 text-center mb-1">{worker.name}</h3>
                        <p className="text-primary font-bold text-center text-lg mb-4">{worker.coins} Coins Earned</p>
                        <div className="divider opacity-50"></div>
                        <div className="flex justify-center">
                            <button className="btn btn-sm btn-ghost hover:bg-primary hover:text-white rounded-full">View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
            {workers.length === 0 && !loading && (
                <p className="text-center text-gray-400 mt-10">No workers found yet. Be the first!</p>
            )}
            {loading && (
                <div className="flex justify-center gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="skeleton w-80 h-64 rounded-3xl"></div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestWorkers;
