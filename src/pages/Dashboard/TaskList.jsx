import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/tasks/available')
            .then(res => {
                setTasks(res.data);
            });
    }, [axiosSecure]);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-8 italic">Available Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map(task => (
                    <div key={task._id} className="card bg-white shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                        <figure className="px-4 pt-4">
                            <img src={task.image} alt={task.title} className="rounded-xl h-48 w-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-xl font-bold">{task.title}</h2>
                            <p className="text-gray-600 line-clamp-2">{task.detail}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="badge badge-primary badge-outline font-bold">{task.payable_amount} Coins</span>
                                <span className="text-sm font-medium text-gray-500">Needed: {task.required_workers}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                                <Link to={`/dashboard/taskDetails/${task._id}`} className="btn btn-primary btn-sm px-6">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {tasks.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-400 font-bold">No tasks available right now.</p>
                </div>
            )}
        </div>
    );
};

export default TaskList;
