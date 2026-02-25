import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { LogOut, User as UserIcon, Coins, Bell, Github } from "lucide-react";
import axios from "axios";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [coins, setCoins] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [showNotif, setShowNotif] = useState(false);
    const notifRef = useRef(null);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/users/role/${user.email}`)
                .then(res => setCoins(res.data.coins || 0));
            axios.get(`http://localhost:5000/notifications/${user.email}`, { withCredentials: true })
                .then(res => setNotifications(res.data || []))
                .catch(() => { });
        }
    }, [user]);

    // Click outside to close notifications
    useEffect(() => {
        const handler = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setShowNotif(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
            <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1">
                    <Github size={16} /> Join as Developer
                </a>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-[100] px-4 lg:px-12 shadow-sm border-b border-gray-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="text-2xl font-black text-primary italic tracking-tighter">MicroTask</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold gap-2">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {user ? (
                    <>
                        {/* Available Coins */}
                        <div className="hidden sm:flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
                            <Coins size={18} className="text-amber-500" />
                            <span className="font-bold text-amber-700">{coins}</span>
                        </div>

                        {/* Notification Bell */}
                        <div className="relative" ref={notifRef}>
                            <button onClick={() => setShowNotif(!showNotif)} className="btn btn-ghost btn-circle relative">
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{unreadCount}</span>
                                )}
                            </button>
                            {showNotif && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-y-auto">
                                    <div className="p-4 border-b border-gray-100">
                                        <h4 className="font-bold text-gray-800">Notifications</h4>
                                    </div>
                                    {notifications.length === 0 ? (
                                        <p className="p-4 text-gray-400 text-sm text-center">No notifications</p>
                                    ) : (
                                        notifications.slice(0, 10).map(n => (
                                            <div key={n._id} className={`p-4 border-b border-gray-50 text-sm hover:bg-gray-50 transition-colors ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                                                <p className="text-gray-700">{n.message}</p>
                                                <p className="text-xs text-gray-400 mt-1">{new Date(n.time).toLocaleString()}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* User Profile */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary/20">
                                <div className="w-10 rounded-full">
                                    <img alt="User profile" src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-base-100 rounded-2xl w-64 border border-gray-100">
                                <div className="flex flex-col items-center mb-4 pb-4 border-b">
                                    <p className="font-bold text-gray-800 text-lg">{user?.displayName}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                    <div className="flex items-center gap-1 mt-2 text-amber-600 font-bold">
                                        <Coins size={14} /> {coins} Coins
                                    </div>
                                </div>
                                <li><Link to="/dashboard" className="flex items-center gap-2 py-3"><UserIcon size={18} /> Dashboard</Link></li>
                                <div className="divider my-1"></div>
                                <li>
                                    <button onClick={logOut} className="flex items-center gap-2 py-3 text-error hover:bg-error/10">
                                        <LogOut size={18} /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost font-bold">Login</Link>
                        <Link to="/register" className="btn btn-primary text-white rounded-full px-8">Join Now</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
