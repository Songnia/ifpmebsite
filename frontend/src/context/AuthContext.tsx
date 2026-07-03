import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface AuthContextType {
    token: string | null;
    user: UserProfile | null;
    isAuthenticated: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('ifpmeb_admin_token'));
    const [user, setUser] = useState<UserProfile | null>(null);

    const fetchUserProfile = async (access: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, '') || ''}/api/v1/auth/me/', {
                headers: { 'Authorization': `Bearer ${access}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else if (response.status === 401) {
                logout();
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserProfile(token);
        }
    }, [token]);

    useEffect(() => {
        const handleStorageChange = () => {
            const newToken = localStorage.getItem('ifpmeb_admin_token');
            setToken(newToken);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const login = (access: string, refresh: string) => {
        localStorage.setItem('ifpmeb_admin_token', access);
        localStorage.setItem('ifpmeb_admin_refresh', refresh);
        setToken(access);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('ifpmeb_admin_token');
        localStorage.removeItem('ifpmeb_admin_refresh');
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
