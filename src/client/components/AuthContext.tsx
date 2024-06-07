import React, { createContext, useContext, useEffect, useState } from 'react'

export interface AuthContextType {
    isAuthenticated:boolean;
    login:(arg:string)=>void;
    logout:()=>void;
}

const AuthContext = createContext<AuthContextType| undefined>(undefined)

export function useAuth() {
    return useContext(AuthContext)
}

// We will need to rely on this isAuthenticated state anywhere in the application where we need to conditionally render components based on user's authentication status
export const AuthProvider = ({ children }:any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true)
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    )
}