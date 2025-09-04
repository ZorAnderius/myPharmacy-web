import { useEffect, useState } from "react";
import "./App.css";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { refreshToken } from "./providers/authService";
import { responseStatuses } from "../constants/responseStatuses";
import Loader from "../features/Loader/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
         await refreshToken();

      } catch (err) {
        console.error("Refresh failed on mount:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <RouterProvider
        router={router}
        hydrateFallbackElement={<div>Loading app...</div>}
      />
    </>
  );
}

export default App;
