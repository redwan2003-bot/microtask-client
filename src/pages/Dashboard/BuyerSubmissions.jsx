import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { CheckCircle, XCircle, Eye } from "lucide-react";

const BuyerSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/submissions/buyer/${user?.email}`)
            .then(res => {
                setSubmissions(res.data);
            });
    }, [user, axiosSecure]);

    const handleApprove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to approve this submission! Coins will be awarded.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/submissions/approve/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            setSubmissions(submissions.map(sub => sub._id === id ? { ...sub, status: 'approved' } : sub));
                            Swal.fire("Approved!", "Submission has been approved.", "success");
                        }
                    });
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to reject this submission!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/submissions/reject/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            setSubmissions(submissions.map(sub => sub._id === id ? { ...sub, status: 'rejected' } : sub));
                            Swal.fire("Rejected!", "Submission has been rejected.", "success");
                        }
                    });
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-8 italic text-gray-800">Manage Submissions</h2>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-4">Worker Name</th>
                            <th className="py-4">Task Title</th>
                            <th className="py-4">Payable Amount</th>
                            <th className="py-4">Status</th>
                            <th className="py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.filter(s => s.status === 'pending').map((sub) => (
                            <tr key={sub._id} className="hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100">
                                <td className="py-4 font-semibold text-gray-700">{sub.worker_name}</td>
                                <td className="py-4 text-gray-600">{sub.task_title}</td>
                                <td className="py-4 font-bold text-primary">{sub.payable_amount} Coins</td>
                                <td className="py-4">
                                    <span className="badge badge-warning">Pending</span>
                                </td>
                                <td className="py-4 flex gap-2">
                                    <button onClick={() => setSelectedSubmission(sub)} className="btn btn-sm btn-outline btn-info" title="View Proof">
                                        <Eye size={16} />
                                    </button>
                                    <button onClick={() => handleApprove(sub._id)} className="btn btn-sm btn-outline btn-success" title="Approve">
                                        <CheckCircle size={16} />
                                    </button>
                                    <button onClick={() => handleReject(sub._id)} className="btn btn-sm btn-outline btn-error" title="Reject">
                                        <XCircle size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {submissions.filter(s => s.status === 'pending').length === 0 && (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-400 font-medium">No pending submissions to review.</p>
                </div>
            )}

            {/* Proof Modal */}
            {selectedSubmission && (
                <dialog id="proof_modal" className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-2xl mb-4 italic">Proof Details from {selectedSubmission.worker_name}</h3>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 min-h-[150px] whitespace-pre-wrap">
                            {selectedSubmission.proof_details}
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setSelectedSubmission(null)} className="btn">Close</button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setSelectedSubmission(null)}>close</button>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default BuyerSubmissions;
