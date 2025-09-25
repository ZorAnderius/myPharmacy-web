import { useEffect, useState } from "react";
import "./App.css";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import Loader from "../features/Loader/Loader";
import GlobalLoader from "../shared/UI/GlobalLoader/GlobalLoader";
import { useDispatch } from "react-redux";
import { getAccessToken } from "./providers/tokenManager";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/store";
import { syncWithToken } from "../redux/auth/slice";
import { refreshThunk } from "../redux/auth/operations";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        // Wait a bit for Redux persist to rehydrate
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Sync Redux state with localStorage first
        dispatch(syncWithToken());
        
        // Check if we have a token stored
        const existingToken = getAccessToken();
        if (existingToken) {
          try {
            // Verify and refresh token with backend
            await dispatch(refreshThunk()).unwrap();
          } catch (error) {
            console.error('Token refresh failed:', error);
            // Token is invalid, user will be logged out
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

  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading app...</div>}
          />
          <GlobalLoader />
        </>
      )}
    </PersistGate>
  );
}

export default App;
