import { Zap, Users, Shield, ArrowRight } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: <Users size={40} />,
            step: "01",
            title: "Sign Up & Choose Role",
            description: "Register as a Worker to earn coins by completing tasks, or as a Buyer to post tasks and get things done."
        },
        {
            icon: <Zap size={40} />,
            step: "02",
            title: "Complete or Post Tasks",
            description: "Workers browse and complete micro-tasks. Buyers create tasks and review submissions from our global workforce."
        },
        {
            icon: <Shield size={40} />,
            step: "03",
            title: "Earn & Withdraw",
            description: "Workers earn coins for approved work. Convert coins to cash and withdraw securely via Bkash, Nagad, or PayPal."
        }
    ];

    return (
        <div className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">How It Works</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto">Start earning in just 3 simple steps. Our platform makes microtasking effortless.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-black px-4 py-1 rounded-full">
                                STEP {step.step}
                            </div>
                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-primary/30">
                                    <ArrowRight size={32} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
