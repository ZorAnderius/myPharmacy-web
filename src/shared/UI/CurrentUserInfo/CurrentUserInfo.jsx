import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticate, selectIsLoading } from "../../../redux/auth/selectors";
import { getCurrentUserThunk } from "../../../redux/auth/operations";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const CurrentUserInfo = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticate);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !user) {
      // If user is authenticated but user data is missing, fetch it from backend
      setIsLocalLoading(true);
      dispatch(getCurrentUserThunk())
        .unwrap()
        .finally(() => setIsLocalLoading(false));
    }
  }, [dispatch, isAuthenticated, user]);

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  if (isLoading || isLocalLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '20px' }}>
        <PuffLoader color="#4ade80" size={40} />
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <h3>User Profile (from /users/current):</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
    </div>
  );
};

export default CurrentUserInfo;
