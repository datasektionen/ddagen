import companies from "./companies";

const companyList = [
  ...companies
];

const initialState = {
  selectedCompany: undefined,
  companies: companyList
};

export default initialState;
