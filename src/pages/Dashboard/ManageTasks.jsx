import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const ManageTasks = () => {
    const [tasks, setTasks] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axiosSecure.get('/all-tasks')
            .then(res => setTasks(res.data));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Task?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tasks/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            fetchTasks();
                            Swal.fire("Deleted!", "Task has been removed.", "success");
                        }
                    });
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-8 italic">Manage All Tasks</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tasks.map(task => (
                    <div key={task._id} className="card card-side bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow overflow-hidden">
                        <figure className="w-1/3">
                            <img src={task.image} alt={task.title} className="h-full object-cover" />
                        </figure>
                        <div className="card-body w-2/3 p-6">
                            <h2 className="card-title text-xl font-bold mb-1 line-clamp-1">{task.title}</h2>
                            <p className="text-sm text-gray-500 mb-2 font-medium">By: {task.buyer_email}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="badge badge-sm badge-outline font-bold">{task.payable_amount} Coins/Work</span>
                                <span className="badge badge-sm badge-primary text-white font-bold">{task.required_workers} Left</span>
                            </div>
                            <div className="card-actions justify-end mt-auto pt-4 border-t border-gray-100">
                                <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-error btn-outline flex items-center gap-2">
                                    <Trash2 size={16} /> Delete Task
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {tasks.length === 0 && <p className="text-center py-20 text-gray-500 font-medium italic text-xl">No tasks found.</p>}
        </div>
    );
};

export default ManageTasks;
