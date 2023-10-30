export interface LoginCred {
  email: string;
  password: string;
}

// Token JWt
//  types of data to be stored inside the token
export interface IToken {
  _id: string;
  email: string;
  role: TokenRole;
  department?: TokenDepartment;
}

export type TokenRole = "student" | "staff" | "chief-warden";
export type TokenDepartment = "maintenance" | "chef" | "warden";
