import { SELECT_COMPANY, UNSELECT_COMPANY } from "store/constants";

function selectCompany(payload) {
  return { type: SELECT_COMPANY, payload };
}

function unselectCompany() {
  return { type: UNSELECT_COMPANY };
}

const actions = { selectCompany, unselectCompany };

export default actions;
