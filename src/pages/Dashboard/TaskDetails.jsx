import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/tasks/${id}`)
            .then(res => setTask(res.data));
    }, [id, axiosSecure]);

    const handleSubmission = (e) => {
        e.preventDefault();
        const proof = e.target.proof.value;

        const submissionData = {
            task_id: task._id,
            task_title: task.title,
            worker_email: user.email,
            worker_name: user.displayName,
            buyer_email: task.buyer_email,
            proof_details: proof,
            status: 'pending',
            payable_amount: task.payable_amount,
            submission_date: new Date()
        };

        axiosSecure.post('/submissions', submissionData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Submitted!',
                        text: 'Your work proof has been submitted for review.',
                        timer: 2000
                    });
                    navigate('/dashboard/mySubmissions');
                }
            });
    };

    if (!task) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="max-w-5xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
                <img src={task.image} alt={task.title} className="w-full h-80 object-cover rounded-2xl shadow-lg" />
                <div className="bg-white p-8 rounded-2xl shadow border border-gray-100">
                    <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
                    <div className="flex gap-4 mb-6">
                        <span className="badge badge-primary font-bold p-4">{task.payable_amount} Coins</span>
                        <span className="badge badge-outline font-bold p-4">Needed: {task.required_workers}</span>
                        <span className="badge badge-ghost font-bold p-4">Deadline: {task.deadline}</span>
                    </div>
                    <div className="divider"></div>
                    <h3 className="text-xl font-bold mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{task.detail}</p>

                    <h3 className="text-xl font-bold mb-2">Submission Instructions</h3>
                    <div className="bg-blue-50 p-4 rounded-lg text-blue-800 border-l-4 border-blue-500">
                        {task.submission_info}
                    </div>
                </div>
            </div>

            <div className="lg:w-1/3">
                <div className="sticky top-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 italic">Submit Your Work</h2>
                    <form onSubmit={handleSubmission} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Submission Proof</span>
                            </label>
                            <textarea name="proof" required className="textarea textarea-bordered h-48 focus:textarea-primary" placeholder="Enter proof details, URLs, or text required by the buyer..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-full text-white font-bold">Submit Proof</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
