import { useSelector } from "react-redux";
import {
  selectAuthStatus,
  selectIsAuthenticate,
} from "../../../redux/auth/selectors";
import { useEffect } from "react";
import { responseStatuses } from "../../../constants/responseStatuses";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

const PublicGuard = ({ children }) => {
  const iaAuthenticated = useSelector(selectIsAuthenticate);
  const authStatus = useSelector(selectAuthStatus);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authStatus === responseStatuses.SUCCEEDED && iaAuthenticated) {
      const from = location.state?.from?.pathname || ROUTES.MAIN;
      navigate(from, { replace: true });
    }
  }, [authStatus, iaAuthenticated, location.state?.from, navigate]);

  if (authStatus === responseStatuses.SUCCEEDED && iaAuthenticated) {
    return null;
  }

  return children;
};

export default PublicGuard;
