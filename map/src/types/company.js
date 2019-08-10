import { PropTypes } from "prop-types";

const companyType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  businessAreas: PropTypes.arrayOf(PropTypes.string),
  employees: PropTypes.number,
  contact: PropTypes.string.isRequired,
  opportunities: PropTypes.arrayOf(PropTypes.string),
  website: PropTypes.string,
  instagram: PropTypes.string,
  linkedin: PropTypes.string,
  facebook: PropTypes.string,
  img: PropTypes.shape({
    default: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  }),
  position: PropTypes.number.isRequired
});

export default companyType;
