import { useEffect, useState } from "react";
import "./App.css";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import Loader from "../features/Loader/Loader";
import { useDispatch } from "react-redux";
import { getAccessToken } from "./providers/tokenManager";
import { getCSRFToken } from "./providers/csrfService";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        // Wait a bit for Redux persist to rehydrate
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Initialize CSRF token
        try {
          await getCSRFToken();
        } catch (csrfError) {
          console.warn("CSRF token initialization failed:", csrfError);
          // Continue without CSRF token - it will be handled per request
        }

        // Only try to refresh token if we have one and it might be expired
        const existingToken = getAccessToken();
        if (existingToken) {
          // Check if token is expired or about to expire (optional)
          // For now, let's not automatically refresh on app start
          // The API interceptor will handle token refresh when needed
        }
        // If no token, don't try to get current user - user is not authenticated
      } catch {
        // If refresh fails, user is not authenticated - this is normal
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <RouterProvider
      router={router}
      HydrateFallbackElement={<div>Loading app...</div>}
    />
  );
}

export default App;
