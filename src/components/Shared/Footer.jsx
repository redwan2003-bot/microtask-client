import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div>
                    <h2 className="text-3xl font-extrabold text-white italic mb-6">MicroTask</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        The world's leading platform for micro-tasking. Connecting talented workers with global opportunities.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-all"><Facebook size={20} /></a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-all"><Twitter size={20} /></a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-all"><Instagram size={20} /></a>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-6">Useful Links</h3>
                    <ul className="space-y-4">
                        <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                        <li><a href="/login" className="hover:text-primary transition-colors">Earning Guide</a></li>
                        <li><a href="/register" className="hover:text-primary transition-colors">Post a Task</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex items-center gap-3"><MapPin size={18} className="text-primary" /> Dhaka, Bangladesh</li>
                        <li className="flex items-center gap-3"><Phone size={18} className="text-primary" /> +880 123 456 789</li>
                        <li className="flex items-center gap-3"><Mail size={18} className="text-primary" /> info@microtask.com</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-6">Newsletter</h3>
                    <p className="text-gray-400 mb-6 italic">Stay updated with latest opportunities.</p>
                    <div className="flex flex-col gap-3">
                        <input type="email" placeholder="Email Address" className="input bg-gray-800 border-none focus:ring-2 ring-primary w-full" />
                        <button className="btn btn-primary w-full">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-10 text-center">
                <p>&copy; {new Date().getFullYear()} MicroTask Platform. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
