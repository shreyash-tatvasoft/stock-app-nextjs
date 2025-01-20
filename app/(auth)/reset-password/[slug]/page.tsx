import { NextPage } from "next";
import { ResetPasswordPageProps, PasswordFields } from "../../../common/types";
import ResetPwdForm from "./resetForm";

const LoginForm: NextPage<ResetPasswordPageProps> = async ({ params }) => {
  const token = (await params).slug;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ResetPwdForm token={token} />
    </div>
  );
};

export default LoginForm;
