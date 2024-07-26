import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Loader, Placeholder } from 'rsuite';

import React from "react";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.authSlice.status);

  useEffect(() => {
    //explain if-condition is authentication true authStatus false authentication true (true && (false !== true)) = true && true

    //explain else-if-condition is authentication false authStatus true authentication true (false && (true !== true)) = false && false

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
  // return loader ? (
  //     <div>
  //       <Placeholder.Paragraph rows={8} />
  //       <Loader backdrop content="loading..." vertical />
  //     </div>
  //   ) : (
  //     <>{children}</>
  //   );
}
