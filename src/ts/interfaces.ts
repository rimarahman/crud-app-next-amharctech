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