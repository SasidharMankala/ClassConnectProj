import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

const Logout = () => {
    const role = Cookies.get('role');
    const navigate = useNavigate();

    const handleLogout = () => {
        const path = '/';
        Cookies.remove('email');
        Cookies.remove('role');
        Cookies.remove('univname');
        Cookies.remove('password');
        navigate(path);
    };

    return (
        <>
            {role == 'admin' ? <button onClick={handleLogout} className="btn btn-dark text-white mt-3 ml-3 w-50">Logout</button> : <Button onClick={handleLogout} className="text-light" type="text">Logout</Button>}
        </>
        
    );
};

export default Logout;
