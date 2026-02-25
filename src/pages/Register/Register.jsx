import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // 1. Upload image to ImgBB
            const imageFile = { image: data.photo[0] };
            const res = await axios.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const photoURL = res.data.data.display_url;

                // 2. Create user in Firebase
                const result = await createUser(data.email, data.password);
                const loggedUser = result.user;

                // 3. Update profile
                await updateUserProfile(data.name, photoURL);

                // 4. Save user in DB with role-based coins
                const initialCoins = data.role === 'worker' ? 10 : 50;
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    photo: photoURL,
                    role: data.role,
                    coins: initialCoins,
                    createdAt: new Date()
                };

                const dbRes = await axios.post('http://localhost:5000/users', userInfo);
                if (dbRes.data.insertedId) {
                    reset();
                    navigate('/');
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h1 className="text-3xl font-bold text-center mb-4">Register Now</h1>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                        {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Photo</span>
                        </label>
                        <input type="file" {...register("photo", { required: true })} className="file-input file-input-bordered w-full" />
                        {errors.photo && <span className="text-red-500 text-sm mt-1">Photo is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} placeholder="Password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-500 text-sm mt-1">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm mt-1">Password must be 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-500 text-sm mt-1">Password must have one uppercase, one lowercase, one number and one special character.</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Select Role</span>
                        </label>
                        <select {...register("role", { required: true })} className="select select-bordered w-full">
                            <option value="worker">Worker (Earn Coins)</option>
                            <option value="buyer">Buyer (Post Tasks)</option>
                        </select>
                    </div>

                    <div className="form-control mt-6">
                        <button disabled={loading} className="btn btn-primary text-white">
                            {loading ? <span className="loading loading-spinner"></span> : "Register"}
                        </button>
                    </div>

                    <p className="text-center mt-4 text-sm">
                        Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
