export interface Note {
  id?: number;
  title: string;
  content: string;
}

export interface LoginData {
  username?: string;
  password?: string;
}

export interface ApiResponse {
  token?: string;
  username: string
}


export interface LoginFormData {
  email: string;
  password: string;
  errorMessage: string | null;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
}