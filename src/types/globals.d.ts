declare global {
  interface IUser {
    userName: string;
    email: string;
    password: string;
    isEmailVerified?: boolean;
    isAdmin?: boolean;
  }

  interface IToken {
    token: string;
    email: string;
    emailType: string;
    date: Date;
    validity: number;
  }
}

export {};
