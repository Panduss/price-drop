import React, {useContext, useEffect, useState} from "react";
import "../App.css";
import {fbLogin} from "../backend/auth";
import {useFetch} from "../hooks/useFetchWrapper";
import {AuthContext} from "../utils/AuthContext";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../hooks/useStorage";
import {AiOutlineLogout} from "react-icons/ai";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {handleError} = useFetch()
    const {setAuthenticated, setUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const {setItem} = useLocalStorage()

    const handleSubmit = async (event: any) => {
        //Prevent page reload
        event.preventDefault();

        if (password && email) {
            fbLogin({email, password}).then(user => {
                setAuthenticated(true)
                setUser(user)
                setItem('user', JSON.stringify(user))
                navigate('/')
            }).catch(e => handleError(e))
        }
    };

    return (
        <div className="content">
            <div className="header">
                <h3 className="header">Gear price drop PCT</h3>
            </div>

            <form className="add-new-form" onSubmit={handleSubmit}>
                <label>Username </label>
                <input type="text" name="uname" required
                       onChange={(e) => setEmail((e.target as HTMLInputElement).value)}/>
                <label>Password </label>
                <input type="password" name="pass" required
                       onChange={(e) => setPassword((e.target as HTMLInputElement).value)}/>
                <div className="button-container">
                    <button className='add-button' type="submit">Login</button>
                </div>

            </form>
        </div>
    );
}

export default Login;