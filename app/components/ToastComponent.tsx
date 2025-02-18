"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  message: string;
  type: "success" | "error" | "info" | "warning";
}

const ToastComponent: React.FC<Props> = ({ message, type }) => {
  useEffect(() => {
    // Trigger the appropriate toast type on the client side
    console.log("first", message,type)
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        break;
    }
  }, [message, type]);

  return null; // No UI is rendered, just trigger the toast
};

export default ToastComponent;
