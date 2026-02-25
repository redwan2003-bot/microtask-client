import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/dashboard";

    const onSubmit = (data) => {
        setLoading(true);
        setLoginError('');
        signIn(data.email, data.password)
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch(error => {
                setLoginError(error.message);
                setLoading(false);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;
                // Save user to DB if new
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    role: 'worker',
                    coins: 10,
                    createdAt: new Date()
                };
                await axios.post('http://localhost:5000/users', userInfo);
                navigate(from, { replace: true });
            })
            .catch(error => {
                setLoginError(error.message);
            });
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h1 className="text-3xl font-bold text-center mb-4">Login Now</h1>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                        {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" {...register("password", { required: true })} placeholder="Password" className="input input-bordered" />
                        {errors.password && <span className="text-red-500 text-sm mt-1">Password is required</span>}
                    </div>

                    {loginError && <p className="text-red-500 text-sm mt-2 font-medium">{loginError}</p>}

                    <div className="form-control mt-6">
                        <button disabled={loading} className="btn btn-primary text-white">
                            {loading ? <span className="loading loading-spinner"></span> : "Login"}
                        </button>
                    </div>

                    <div className="divider">OR</div>

                    <button type="button" onClick={handleGoogleSignIn} className="btn btn-outline btn-primary w-full">
                        <FaGoogle className="mr-2" /> Login with Google
                    </button>

                    <p className="text-center mt-4 text-sm">
                        New here? <Link to="/register" className="text-primary font-bold">Create Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
