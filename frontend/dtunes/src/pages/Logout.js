import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token and perform any other logout operations
        onLogout();

        // Navigate to login page
        navigate('/login', { replace: true });
    }, [navigate, onLogout]);

    return null; // This component does not render anything
};

export default Logout;
