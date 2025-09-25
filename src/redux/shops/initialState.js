import { responseStatuses } from "../../constants/responseStatuses";

const initialState = {
  shops: [],
  currentShop: null,
  status: responseStatuses.IDLE,
  error: null,
};

export default initialState;
