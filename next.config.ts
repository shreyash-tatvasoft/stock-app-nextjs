import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    CRYPTO_SECRET_KEY : process.env.CRYPTO_SECRET_KEY,
    CRYPTO_IV : process.env.CRYPTO_IV
  },
};

export default nextConfig;
