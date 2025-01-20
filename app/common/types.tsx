export interface DbTableTypes {
  users: UserType[];
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordPageProps {
  params: { slug: string };
}

export interface PasswordFields {
  password: string;
  confirmPassword: string;
}

export interface FormProps {
    token: string
  }
