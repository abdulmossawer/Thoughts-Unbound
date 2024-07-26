import React from 'react';

export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`bg-blue-600 text-white dark:bg-gray-700 dark:text-white hover:bg-blue-700 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 rounded-lg p-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
