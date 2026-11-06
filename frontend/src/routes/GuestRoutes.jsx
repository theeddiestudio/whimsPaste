import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { user } from '../lib/axios';

const GuestRoutes = ({ children }) => {
    const [isLogged, setIsLogged] = useState(null);

    useEffect(() => {
        const checkLogins = async () => {
            try {
                const res = await user.get("/check");
                setIsLogged(res.data.isLogged);
            } catch (error) {
                console.log("Error while checking logins", error);
                setIsLogged(false);
            }
        }
        
        checkLogins();
    },[])

    if (isLogged === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if(isLogged) {
        return <Navigate to="/" replace />;
    } else {
        return children;
    }
}

export default GuestRoutes
