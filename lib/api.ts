import { RegisterPayload } from "@/types/auth";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: getAuthHeaders(),
    });
    if (response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("username");
      window.location.href = "/";
      throw new Error("Unauthorized");
    }
    
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }); 
    
    if (response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("username");
      window.location.href = "/";
      throw new Error("Unauthorized");
    }
    
    return response.json();
  },

  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    
    if (response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("username");
      window.location.href = "/";
      throw new Error("Unauthorized");
    }
    
    return response.json();
  },
  
  delete: async (endpoint: string, data?: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    
    if (response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("username");
      window.location.href = "/";
      throw new Error("Unauthorized");
    }
    
    return response.json();
  },
};

export const getAuthHeader = () => {
  const token = Cookies.get("token");
  return {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };
};

export const authAPI = {
  // Login
  login: async (email: string, username: string, password: string) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }
    return res.json();
  },

  // Register
  register: async (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Registration failed");
    }
    return res.json();
  },

  // Verify Email
  verifyEmail: async (token: string) => {
    const res = await fetch(`${API_URL}/verify?token=${token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Verification failed");
    }
    return res.json();
  },

  // Forgot Password
  forgotPassword: async (email: string) => {
    const res = await fetch(`${API_URL}/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to send reset link");
    }
    return res.json();
  },
  resetPassword: async (token: string, newPassword: string, confirmPassword: string) => {
    const res = await fetch(`${API_URL}/resetPassword/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword, confirmPassword }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Password reset failed");
    }
    return res.json();
  },

  // Change Password (Protected)
  changePassword: async (id: string, password: string) => {
    const res = await fetch(`${API_URL}/updatePassword/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Password change failed");
    }
    return res.json();
  },

  // Logout
  logout: () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
    Cookies.remove("username");
  },
};