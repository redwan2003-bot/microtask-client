import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Trash2, Edit3 } from "lucide-react";
import Swal from "sweetalert2";

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, [user, axiosSecure]);

    const fetchTasks = () => {
        axiosSecure.get(`/tasks/buyer/${user?.email}`)
            .then(res => setTasks(res.data));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Task?",
            text: "Remaining coins will be refunded.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tasks/buyer/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        setTasks(tasks.filter(t => t._id !== id));
                        Swal.fire("Deleted!", "Coins refunded.", "success");
                    }
                });
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            title: form.title.value,
            detail: form.detail.value,
            submission_info: form.submission_info.value
        };
        axiosSecure.patch(`/tasks/${editTask._id}`, data).then(res => {
            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Task updated successfully.", "success");
                setEditTask(null);
                fetchTasks();
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 italic">My Posted Tasks</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Workers Needed</th>
                            <th>Payable Amount</th>
                            <th>Total Cost</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                                <td>{index + 1}</td>
                                <td className="font-semibold">{task.title}</td>
                                <td>{task.required_workers}</td>
                                <td>{task.payable_amount} Coins</td>
                                <td>{task.total_amount} Coins</td>
                                <td>
                                    <span className={`badge ${task.status === 'active' ? 'badge-success' : 'badge-ghost'}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <button onClick={() => setEditTask(task)} className="btn btn-sm btn-outline btn-info"><Edit3 size={16} /></button>
                                    <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-outline btn-error"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editTask && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-lg">
                        <h3 className="font-bold text-2xl mb-6">Update Task</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="form-control">
                                <label className="label font-bold">Title</label>
                                <input name="title" defaultValue={editTask.title} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-bold">Task Detail</label>
                                <textarea name="detail" defaultValue={editTask.detail} className="textarea textarea-bordered h-24" required></textarea>
                            </div>
                            <div className="form-control">
                                <label className="label font-bold">Submission Info</label>
                                <textarea name="submission_info" defaultValue={editTask.submission_info} className="textarea textarea-bordered h-24" required></textarea>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button type="button" onClick={() => setEditTask(null)} className="btn">Cancel</button>
                                <button type="submit" className="btn btn-primary text-white">Save Changes</button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop"><button onClick={() => setEditTask(null)}>close</button></form>
                </dialog>
            )}
        </div>
    );
};

export default MyTasks;
