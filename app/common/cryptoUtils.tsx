import crypto from "crypto";

const SECRET_KEY = process.env.CRYPTO_SECRET_KEY || "";
const IV = process.env.CRYPTO_IV || ""; // Must be 16 bytes

// Encrypt function
export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), IV);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decrypt function
export function decrypt(encryptedText: string): string {
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), IV);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
