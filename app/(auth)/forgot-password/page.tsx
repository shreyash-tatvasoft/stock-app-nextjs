"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_ROUTES, ROUTES } from "../../common/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {

    const router = useRouter();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const res = await fetch(API_ROUTES.USER_ROUTES.FORGOT_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await res.json();

      if (result && result.token) {
        toast.success(result.message)
        router.push(`${ROUTES.RESET_PASSWORD}/${result.token}`);
        formik.resetForm();
      } else {
        let errMsg = "Something went wrong";
        if (result && result.message) {
          errMsg = result.message;
        }
        toast.error(errMsg);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email address and we’ll send you instructions to reset your
          password.
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email adreess"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`mt-1 block w-full rounded-md border ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            } px-3 py-2 text-gray-900`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Submit
        </button>

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <a
            href={ROUTES.LOGIN}
            className="text-sm text-blue-500 font-bold hover:underline"
          >
            Back to Log In
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
