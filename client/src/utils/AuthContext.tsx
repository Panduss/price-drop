import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { iUser } from "../models";
import {useLocalStorage} from "../hooks/useStorage";

type Props = {
    children?: ReactNode;
}

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void
    user: iUser|null
    setUser: (user: iUser|null) => void
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => {},
    user: null,
    setUser: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({children}: Props) => {

    const [ authenticated, setAuthenticated ] = useState<boolean>(initialValue.authenticated)
    const [ user, setUser ] = useState<iUser|null>(initialValue.user)
    const { getItem } = useLocalStorage()

    useEffect(() => {
        const user  = getItem('user')
        if (user) {
            setAuthenticated(true)
            setUser(JSON.parse(user))
        }
    }, [])

    return (
        <AuthContext.Provider value={{authenticated, setAuthenticated, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {  AuthContext, AuthProvider }