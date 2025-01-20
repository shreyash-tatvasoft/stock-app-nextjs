"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { API_ROUTES, ROUTES } from "../../../common/constant";
import { toast } from "react-toastify";
import { NextPage } from "next";
import { FormProps } from "@/app/common/types";

const ResetPwdForm: NextPage<FormProps> = ({ token }) => {
  const router = useRouter();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      const httpBody = {
        new_password: values.password,
      };
      const res = await fetch(API_ROUTES.USER_ROUTES.RESET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(httpBody),
      });
      const result = await res.json();

      if (result && result.message) {
        toast.success(result.message);
        router.push(ROUTES.LOGIN);
        formik.resetForm();
      } else {
        let errMsg = "Something went wrong";
        if (result && result.error) {
          errMsg = result.error;
        }
        toast.error(errMsg);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

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
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Enter confirm password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className={`mt-1 block w-full rounded-md border ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "border-red-500"
              : "border-gray-300"
          } px-3 py-2 text-gray-900`}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
      >
        Save
      </button>
    </form>
  );
};

export default ResetPwdForm;
