import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// lib/utils.ts
import Cookies from "js-cookie";

/**
 * Get error message from different error sources
 */
export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return "An error occurred. Please try again.";
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength (min 8 characters)
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Format error messages for specific fields
 */
export const formatErrorMessage = (field: string): string => {
  const messages: Record<string, string> = {
    emailOrUsername: "Invalid email or username",
    password: "Incorrect password",
    email: "Email not found",
    username: "Username not found",
    firstName: "First name is required",
    lastName: "Last name is required",
    confirmPassword: "Passwords do not match",
  };
  return messages[field] || "An error occurred";
};

/**
 * Get user from cookies
 */
export const getUser = () => {
  const userCookie = Cookies.get("user");
  if (!userCookie) return null;
  try {
    return JSON.parse(userCookie);
  } catch {
    return null;
  }
};

/**
 * Get token from cookies
 */
export const getToken = () => {
  return Cookies.get("token") || null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!Cookies.get("token") && !!Cookies.get("user");
};

/**
 * Get user role from cookies
 */
export const getUserRole = () => {
  return Cookies.get("role") || null;
};

/**
 * Clear all auth cookies
 */
export const clearAuthCookies = () => {
  Cookies.remove("token");
  Cookies.remove("user");
  Cookies.remove("role");
  Cookies.remove("username");
};

/**
 * Check if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Check if username is valid (3+ characters, alphanumeric + underscore)
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  return usernameRegex.test(username);
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};