import {useEffect, useState} from "react";

export const hasUser = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    return isAuthenticated;
};