import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticate } from "../../../redux/auth/selectors";
import { getCurrentUserThunk } from "../../../redux/auth/operations";
import { useEffect, useState } from "react";

const CurrentUserInfo = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticate);
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !user) {
      // If user is authenticated but user data is missing, fetch it from backend
      setIsLoading(true);
      dispatch(getCurrentUserThunk())
        .unwrap()
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, isAuthenticated, user]);

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  if (isLoading) {
    return <div>Loading user profile...</div>;
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
