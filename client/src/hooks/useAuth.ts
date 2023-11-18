import {useContext} from "react";
import {AuthContext} from "../utils/AuthContext";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "./useStorage";

export const useAuth = () => {
    const { setAuthenticated, user, setUser } = useContext(AuthContext)
    const { removeItem } = useLocalStorage()

    const navigate = useNavigate();

    const logout = () => {
        setAuthenticated(false)
        setUser(null)
        removeItem('user')
        navigate('/login')
    };

    return { user, logout };
};