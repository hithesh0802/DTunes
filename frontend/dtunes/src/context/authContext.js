import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
            axios.get('/api/users/me').then(res => {
                setUser(res.data.user);
            }).catch(err => {
                console.log(err);
                localStorage.removeItem('token');
            });
        }
    }, []);

    const register = async (userData) => {
        const res = await axios.post('/api/users/register', userData);
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
        setUser(res.data.user);
    };

    const login = async (userData) => {
        const res = await axios.post('/api/users/login', userData);
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
