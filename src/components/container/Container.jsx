import React from "react";

// const Container = ({ children }) => {
//   return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
// };

// export default Container;


export const Container = ({ children }) => {
  return <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 py-4 bg-white dark:bg-gray-900"> {children} </div>

}

