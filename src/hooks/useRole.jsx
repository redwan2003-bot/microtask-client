import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/users/role/${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                    setRoleLoading(false);
                })
        } else if (!loading) {
            setRoleLoading(false);
        }
    }, [user, loading]);

    return [role, roleLoading];
};

export default useRole;
