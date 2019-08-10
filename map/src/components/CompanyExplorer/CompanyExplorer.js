import React from "react";
import "./CompanyExplorer.css";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import actions from "store/actions";
import companyType from "types/company";
import CompanyDisplay from "components/CompanyDisplay/CompanyDisplay";

const mapStateToProps = state => {
  return { companies: state.companies, selectedCompany: state.selectedCompany };
};

function maptDispatchToProps(dispatch) {
  return {
    selectCompany: companyId => dispatch(actions.selectCompany(companyId)),
    unselectCompany: () => dispatch(actions.unselectCompany())
  };
}

class ConnectedCompanyExplorer extends React.Component {
  handleSelectCompany(id) {
    const { selectedCompany, unselectCompany, selectCompany } = this.props;
    console.log(`selecting company`);
    if (id === selectedCompany) {
      unselectCompany();
    } else {
      selectCompany({ companyId: id });
    }
  }

  render() {
    const { companies, selectedCompany } = this.props;

    return (
      <div className="company-explorer-wrapper ">
        <div className="company-list full-width">
          {companies.map(companyEl => (
            <CompanyDisplay
              company={companyEl}
              key={companyEl.position}
              selected={selectedCompany === companyEl.position}
              onMouseDown={() => this.handleSelectCompany(companyEl.position)}
            />
          ))}
        </div>
      </div>
    );
  }
}

ConnectedCompanyExplorer.propTypes = {
  companies: PropTypes.arrayOf(companyType),
  selectCompany: PropTypes.func.isRequired,
  unselectCompany: PropTypes.func.isRequired,
  selectedCompany: PropTypes.number
};

ConnectedCompanyExplorer.defaultProps = {
  companies: [],
  selectedCompany: undefined
};

const CompanyExplorer = connect(
  mapStateToProps,
  maptDispatchToProps
)(ConnectedCompanyExplorer);

export default CompanyExplorer;
