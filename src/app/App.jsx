import { useEffect, useState } from "react";
import "./App.css";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { refreshToken } from "./providers/authService";
import { responseStatuses } from "../constants/responseStatuses";

function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("token");
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token2 = await refreshToken();
        if (!token2) setToken("No token");
      } catch (err) {
        console.error("Refresh failed on mount:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <RouterProvider
        router={router}
        hydrateFallbackElement={<div>Loading app...</div>}
      />
      <div>{token}</div>
    </>
  );
}

export default App;
