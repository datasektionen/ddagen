import { SELECT_COMPANY, UNSELECT_COMPANY } from "store/constants";
import initialState from "./state";

function rootReducer(state = initialState, action) {
  console.log(`triggering action with type: ${!action ? "" : action.type}`);
  if (action.type === SELECT_COMPANY) {
    console.log(`paylod is:`);
    console.log(action.payload);
    return { ...state, selectedCompany: action.payload.companyId};
  } if (action.type === UNSELECT_COMPANY) {
    return { ...state, selectedCompany: undefined};
  }
  return state;
}

export default rootReducer;
