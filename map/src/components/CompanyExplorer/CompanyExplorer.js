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

function mapDispatchToProps(dispatch) {
  return {
    selectCompany: companyId => dispatch(actions.selectCompany(companyId)),
    unselectCompany: () => dispatch(actions.unselectCompany())
  };
}

class ConnectedCompanyExplorer extends React.Component {
  constructor() {
    super()
    this.selfRef = React.createRef()
    this.itemRefs = {}
  }

  componentDidUpdate() {
    const { selectedCompany } = this.props
    if (typeof selectedCompany !== "undefined" && selectedCompany % 100 != 99) {
      this.itemRefs[selectedCompany].scrollIntoView({ block: "center", inline: "nearest", behaviour: "smooth" })
    }
  }

  handleSelectCompany(id, e) {
    // Make sure, if we click a company website link, the box doesn't close:
    if (e && e.target && e.target.nodeName === "A") {
      return;
    }

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
        <div className="company-list full-width" ref={this.selfRef}>
          {companies.map(companyEl => (
            <CompanyDisplay
              ref={el => { this.itemRefs[companyEl.position] = el }}
              company={companyEl}
              key={companyEl.position}
              selected={selectedCompany === companyEl.position}
              onMouseDown={(e) => this.handleSelectCompany(companyEl.position, e)}
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
  mapDispatchToProps
)(ConnectedCompanyExplorer);

export default CompanyExplorer;
