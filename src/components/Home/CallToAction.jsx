import { Link } from "react-router-dom";
import { Rocket, ArrowRight } from "lucide-react";

const CallToAction = () => {
    return (
        <div className="py-24 px-4">
            <div className="container mx-auto">
                <div className="relative bg-gradient-to-r from-primary to-secondary rounded-[2rem] p-12 lg:p-20 text-center text-white overflow-hidden shadow-2xl">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-8">
                            <Rocket size={16} /> Start Earning Today
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
                            Ready to Turn Your <br /> Free Time Into Income?
                        </h2>
                        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of workers and buyers on the leading micro-tasking platform.
                            Complete simple tasks and start earning coins instantly.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/register" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none rounded-full px-10 font-bold shadow-lg">
                                Get Started Free <ArrowRight size={18} />
                            </Link>
                            <Link to="/login" className="btn btn-lg btn-outline text-white border-white/30 hover:bg-white/10 rounded-full px-10 font-bold">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
