import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
  <div className="flex-grow">
    <Header />
    <main className="py-8 px-4 md:px-6 max-w-screen-xl mx-auto">
       <Outlet />
    </main>
    <Footer />
  </div>
</div>

  ) : null;
}

export default App;
