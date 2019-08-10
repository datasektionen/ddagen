import companies from "./companies";

const companyList = [
  ...companies,
  {
    name: "Yelp",
    description: "Yelp is a website and mobile app...",
    businessAreas: ["IT", "Software Development"],
    employees: 5000,
    contact: "eucareers@yelp.com",
    opportunities: ["Full time", "Internship"],
    website: "yelp.com",
    instagram: null,
    linkedin: "Yelp",
    facebook: "yelpengineers",
    img: { default: "../yelp.png", placeholder: "../yelp-32.png" },
    position: 38
  },
  {
    name: "Ericsson",
    description: "LM Ericsson AB is one of the greatest...",
    businessAreas: ["IT", "Software Development"],
    employees: 100000,
    contact: "career@ericsson.com",
    opportunities: ["Full time", "Internship"],
    website: "ericsson.com",
    instagram: null,
    linkedin: "Ericsson",
    facebook: "ericsson",
    img: { default: "../ericsson.png", placeholder: "../ericsson-32.png" },
    position: 39
  }
];

const initialState = {
  selectedCompany: undefined,
  companies: companyList
};

export default initialState;
