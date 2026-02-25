import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Trash2, UserCog } from "lucide-react";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axiosSecure.get('/users')
            .then(res => setUsers(res.data));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "User will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            fetchUsers();
                            Swal.fire("Deleted!", "User has been removed.", "success");
                        }
                    });
            }
        });
    };

    const handleUpdateRole = (id, newRole) => {
        axiosSecure.patch(`/users/role/${id}`, { role: newRole })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    fetchUsers();
                    Swal.fire("Updated!", `Role updated to ${newRole}.`, "success");
                }
            });
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-8 italic">Manage Users</h2>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50 uppercase text-xs font-bold text-gray-500">
                        <tr>
                            <th className="py-4 px-6">User</th>
                            <th className="py-4 px-6">Email</th>
                            <th className="py-4 px-6">Role</th>
                            <th className="py-4 px-6">Coins</th>
                            <th className="py-4 px-6">Update Role</th>
                            <th className="py-4 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photo} alt={user.name} />
                                            </div>
                                        </div>
                                        <div className="font-bold text-gray-700">{user.name}</div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-gray-500">{user.email}</td>
                                <td className="py-4 px-6">
                                    <span className={`badge px-3 py-2 font-bold ${user.role === 'admin' ? 'badge-primary' :
                                            user.role === 'buyer' ? 'badge-secondary' : 'badge-accent'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-4 px-6 font-bold text-primary">{user.coins}</td>
                                <td className="py-4 px-6">
                                    <select
                                        defaultValue={user.role}
                                        onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                                        className="select select-sm select-bordered w-full max-w-xs focus:ring-1 ring-primary"
                                    >
                                        <option value="worker">Worker</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="py-4 px-6">
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-ghost btn-xs text-error hover:bg-error/10">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
