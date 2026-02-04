export interface User {
    id: string;
    name: string;
    email: string;
    accessToken : string;
    refreshToken : string;  
}

export interface AuthRequest {
    username: string ;
    password : string;
}

export interface LoginResponseDto {
  id: string;
  username: string;
  email: string;
  token: string;
  gender : string;
  firstname: string;
  lastname: string;
  image :string;
  accessToken : string;
  refreshToken : string;  
}

