import { responseStatuses } from "../../constants/responseStatuses";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: responseStatuses.IDLE,
  error: null,
};

export default initialState;
