import { TrendingUp, Clock, Globe, Award } from "lucide-react";
import { useEffect, useState } from "react";

const PlatformStats = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.3 }
        );
        const el = document.getElementById('platform-stats');
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, []);

    const stats = [
        { icon: <Globe size={36} />, value: "50K+", label: "Active Users", color: "bg-blue-500" },
        { icon: <TrendingUp size={36} />, value: "1.2M+", label: "Tasks Completed", color: "bg-green-500" },
        { icon: <Clock size={36} />, value: "24/7", label: "Platform Uptime", color: "bg-purple-500" },
        { icon: <Award size={36} />, value: "$500K+", label: "Paid to Workers", color: "bg-amber-500" }
    ];

    return (
        <div id="platform-stats" className="py-24 px-4 bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">Platform at a Glance</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">Trusted by thousands worldwide. Our numbers speak for themselves.</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}>
                                {stat.icon}
                            </div>
                            <p className="text-4xl font-black mb-2">{stat.value}</p>
                            <p className="text-gray-400 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlatformStats;
