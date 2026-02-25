import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    PlusSquare,
    ListTodo,
    CheckSquare,
    Wallet,
    History,
    Users,
    Bell,
    Home,
    LogOut
} from "lucide-react";
import useRole from "../../hooks/useRole";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Sidebar = () => {
    const [role] = useRole();
    const { logOut } = useContext(AuthContext);

    const workerLinks = (
        <>
            <li><NavLink to="/dashboard/worker-home"><LayoutDashboard size={20} /> Worker Home</NavLink></li>
            <li><NavLink to="/dashboard/taskList"><ListTodo size={20} /> Task List</NavLink></li>
            <li><NavLink to="/dashboard/mySubmissions"><History size={20} /> My Submissions</NavLink></li>
            <li><NavLink to="/dashboard/withdrawals"><Wallet size={20} /> Withdrawals</NavLink></li>
        </>
    );

    const buyerLinks = (
        <>
            <li><NavLink to="/dashboard/buyer-home"><LayoutDashboard size={20} /> Buyer Home</NavLink></li>
            <li><NavLink to="/dashboard/addTask"><PlusSquare size={20} /> Add Task</NavLink></li>
            <li><NavLink to="/dashboard/myTasks"><ListTodo size={20} /> My Tasks</NavLink></li>
            <li><NavLink to="/dashboard/manageSubmissions"><CheckSquare size={20} /> Manage Submissions</NavLink></li>
            <li><NavLink to="/dashboard/purchase-coin"><Wallet size={20} /> Purchase Coin</NavLink></li>
            <li><NavLink to="/dashboard/payment-history"><History size={20} /> Payment History</NavLink></li>
        </>
    );

    const adminLinks = (
        <>
            <li><NavLink to="/dashboard/admin-home"><LayoutDashboard size={20} /> Admin Home</NavLink></li>
            <li><NavLink to="/dashboard/manage-users"><Users size={20} /> Manage Users</NavLink></li>
            <li><NavLink to="/dashboard/manage-tasks"><CheckSquare size={20} /> Manage Tasks</NavLink></li>
            <li><NavLink to="/dashboard/manage-withdrawals"><Wallet size={20} /> Manage Withdrawals</NavLink></li>
        </>
    );

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-2">
                    {/* Role-based links */}
                    <div className="mb-4 px-4 py-2 bg-primary/10 rounded-xl">
                        <p className="text-xs font-bold text-primary uppercase tracking-widest">Navigation - {role}</p>
                    </div>
                    {role === 'worker' && workerLinks}
                    {role === 'buyer' && buyerLinks}
                    {role === 'admin' && adminLinks}

                    {/* Shared Links */}
                    <div className="divider opacity-50 my-4"></div>
                    <li><NavLink to="/"><Home size={20} /> Back to Home</NavLink></li>
                    <li><NavLink to="/dashboard/notifications"><Bell size={20} /> Notifications</NavLink></li>
                    <div className="flex-grow"></div>
                    <li>
                        <button onClick={logOut} className="btn btn-ghost text-error justify-start gap-3 hover:bg-error/10">
                            <LogOut size={20} /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
