"use client";

import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { User, LoginResponse, RegisterPayload } from "@/types/auth";
import { authAPI } from "@/lib/api";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUser = Cookies.get("user");
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = useCallback(
    async (email: string, username: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await authAPI.login(email, username, password);
        Cookies.set("token", response.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(response.user), { expires: 7 });
        Cookies.set("role", response.user.role, { expires: 7 });
        Cookies.set("username", response.user.username, { expires: 7 });
        
        setToken(response.token);
        setUser(response.user);
        
        return response;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(async (data: RegisterPayload) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(data);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
    Cookies.remove("username");
    setToken(null);
    setUser(null);
  }, []);

  return {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user,
  };
};
