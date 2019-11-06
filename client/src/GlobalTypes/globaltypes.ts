export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  checkPassword: (inputPassword: string) => boolean;
  hashPassword: (plainTextPassword: string) => string;
}
