"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { API_ROUTES, ROUTES } from "../../common/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const LoginForm = () => {
    const router = useRouter();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const res = await fetch(API_ROUTES.USER_ROUTES.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await res.json();

      if (result && result.token) {
        toast.success("Login Successfully");
        router.push(ROUTES.STOCK_DASHBOARD);
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
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter email adreess"
            className={`mt-1 block w-full rounded-md border ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            } px-3 py-2 text-gray-900`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-700 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`mt-1 block w-full rounded-md border ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            } px-3 py-2 text-gray-900`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-700 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}

          <div className="my-1 text-end">
            <Link
              className="text-sm text-blue-500 font-bold hover:underline"
              href={ROUTES.FORGOT_PASSWORD}
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Log In
        </button>

        <div className="mt-2 text-center">
          <span className="text-sm text-gray-700">Don’t have an account? </span>
          <Link
            href={ROUTES.REGISTER}
            className="text-sm text-blue-500 font-bold hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
