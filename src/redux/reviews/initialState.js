import { responseStatuses } from "../../constants/responseStatuses";

const initialState = {
  reviews: [],
  status: responseStatuses.IDLE,
  error: null,
};

export default initialState;
