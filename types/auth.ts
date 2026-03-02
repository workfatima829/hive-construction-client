export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: "admin" | "investor";
  verifiedAt: Date | null;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, username: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
