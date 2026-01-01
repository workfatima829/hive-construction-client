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
