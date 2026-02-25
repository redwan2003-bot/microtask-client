import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        const total_amount = data.required_workers * data.payable_amount;

        try {
            // 1. Upload image to ImgBB
            const imageFile = { image: data.task_image[0] };
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const taskItem = {
                    title: data.title,
                    detail: data.detail,
                    required_workers: parseInt(data.required_workers),
                    payable_amount: parseInt(data.payable_amount),
                    total_amount: total_amount,
                    image: res.data.data.display_url,
                    submission_info: data.submission_info,
                    deadline: data.deadline,
                    buyer_email: user.email,
                    buyer_name: user.displayName,
                    status: 'active',
                    createdAt: new Date()
                };

                const taskRes = await axiosSecure.post('/tasks', taskItem);
                if (taskRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Task "${data.title}" added successfully!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/myTasks');
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.message || "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center italic">Create New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Task Title</span>
                        </label>
                        <input type="text" {...register("title", { required: true })} placeholder="e.g., Watch YouTube Video" className="input input-bordered w-full focus:input-primary" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Required Workers</span>
                        </label>
                        <input type="number" {...register("required_workers", { required: true })} placeholder="Number of workers" className="input input-bordered w-full focus:input-primary" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Payable Amount (per worker)</span>
                        </label>
                        <input type="number" {...register("payable_amount", { required: true })} placeholder="Coins per worker" className="input input-bordered w-full focus:input-primary" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Completion Deadline</span>
                        </label>
                        <input type="date" {...register("deadline", { required: true })} className="input input-bordered w-full focus:input-primary" />
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Task Details</span>
                    </label>
                    <textarea {...register("detail", { required: true })} className="textarea textarea-bordered h-24 focus:textarea-primary" placeholder="Detailed instructions for workers..."></textarea>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Submission Requirements</span>
                    </label>
                    <textarea {...register("submission_info", { required: true })} className="textarea textarea-bordered h-24 focus:textarea-primary" placeholder="What proof should workers submit? (e.g., Screenshot)"></textarea>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Task Image/Thumbnail</span>
                    </label>
                    <input type="file" {...register("task_image", { required: true })} className="file-input file-input-bordered w-full file-input-primary" />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary w-full text-white text-lg">
                    {loading ? <span className="loading loading-spinner"></span> : "Add Task"}
                </button>
            </form>
        </div>
    );
};

export default AddTask;
