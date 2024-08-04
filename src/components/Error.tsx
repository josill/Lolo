import React from "react";

interface ErrorMessageProps {
  message?: string;
}

function ErrorMessage({ message = "Something went wrong" }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl font-bold text-red-500">{message}</div>
    </div>
  );
}

export default ErrorMessage;
