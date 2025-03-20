import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Oauth() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/user');
    }, [navigate]);

    return (
        <div>
            <h4>Redirecting…</h4>
        </div>
    );
}

export default Oauth;
