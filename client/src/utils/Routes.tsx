import React, {useContext, useEffect} from 'react'
import {Routes as Router, Route, useNavigate} from 'react-router-dom'
import { AuthContext } from './AuthContext'
import Home from '../pages/Home'
import Login from '../pages/Login'

const Routes = () => {
    const { user, authenticated } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) {
            navigate('/login');
        } else {
            navigate('/')
        }
    }, [authenticated, navigate]);

    return (
        <Router>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={authenticated && user ? <Home user={user}/> : <Login />} />
        </Router>
    )
}

export default Routes