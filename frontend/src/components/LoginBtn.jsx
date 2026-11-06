import { Link, useNavigate } from 'react-router'
import { KeyIcon } from 'lucide-react'
import toast from 'react-hot-toast';
import { useState } from 'react';
import {user} from '../lib/axios.js'

const LoginBtn = ({type}) => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (loading) return;
        if(!window.confirm("Are you sure you want to logout?")) return;
        setLoading(true);
        try {
            await user.post("/out");
            toast.success("Logout Successful");
            navigate("/login");
        } catch (error) {
            console.log("Error on logout:", error);
            if(error.response.status === 429) {
                toast.error("Too many requests", {
                    duration: 4000,
                    icon: "💀"
                });
            } else {
                toast.error("Could not logout!");
            }
        } finally {
            setLoading(false);
        }
    }

    if (type === "out") return (
        <Link className="btn btn-outline hover:bg-amber-800 hover:text-[#ece3ca] ml-4" onClick={handleLogout}>
            <KeyIcon className="size-5" />
            <span>{loading ? "Loading..." : "Logout"}</span>
        </Link>
    );

    return (
        <Link to={"/login"} className="btn btn-outline hover:bg-amber-800 hover:text-[#ece3ca] ml-4">
            <KeyIcon className="size-5" />
            <span>Login</span>
        </Link>
    )
}

export default LoginBtn
