import { useEffect, useState } from "react";
import "./App.css";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import Loader from "../features/Loader/Loader";
import { useDispatch } from "react-redux";
import { getAccessToken } from "./providers/tokenManager";
import { refreshThunk } from "../redux/auth/operations";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        // Wait a bit for Redux persist to rehydrate
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Try to refresh token if we have one stored
        const existingToken = getAccessToken();
        if (existingToken) {
          try {
            // Attempt to refresh the token to verify it's still valid
            await dispatch(refreshThunk()).unwrap();
            // If successful, user will be authenticated
          } catch (error) {
            // If refresh fails, clear the invalid token
            console.error('Token refresh failed:', error);
            // Token will be cleared by the auth service
          }
        }
        // If no token, user is not authenticated - this is normal
      } catch (error) {
        console.error('Auth initialization failed:', error);
        // If initialization fails, user is not authenticated - this is normal
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
      fallbackElement={<div>Loading app...</div>}
    />
  );
}

export default App;
