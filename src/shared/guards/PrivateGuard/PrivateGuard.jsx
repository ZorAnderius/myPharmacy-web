import { useSelector } from "react-redux";
import {
  selectAuthStatus,
  selectIsAuthenticate,
} from "../../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { responseStatuses } from "../../../constants/responseStatuses";
import { ROUTES } from "../../../constants/routes";
import GlobalLoader from "../../UI/GlobalLoader/GlobalLoader";

const PrivateGuard = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticate);
  const authStatus = useSelector(selectAuthStatus);
  return authStatus === responseStatuses.LOADING ? (
    <GlobalLoader />
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
};

export default PrivateGuard;
