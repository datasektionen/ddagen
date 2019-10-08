import React from "react";
import "./Map.css";
import actions from 'store/actions';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { SvgLoader, SvgProxy } from 'react-svgmt';
import fairMap from "../../assets/map.svg";

const mapStateToProps = state => {
  return { companies: state.companies, selectedCompany: state.selectedCompany };
};

function mapDispatchToProps(dispatch) {
  return {
    selectCompany: companyId => dispatch(actions.selectCompany(companyId)),
    unselectCompany: () => dispatch(actions.unselectCompany())
  };
}

const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79]


const selectedStyle = "fill:#212121;r:27;transition:all 700ms ease-in-out;z-index:1000";
const defaultStyle = "transition:all 700ms ease-in-out"

class ConnectedMap extends React.Component {
  handleSelected = (companyId, selectedCompany) => {
    const { selectCompany, unselectCompany } = this.props;
    console.log(`selected a svg element ${companyId}`)

    if (companyId === selectedCompany) {
      unselectCompany()
    } else {
      selectCompany({ companyId })
    }
  }

  render() {
    const { selectedCompany } = this.props;
    return (
      <div className="map" >
        <SvgLoader path={fairMap}>
          {indexes.map(idx => {
            return <SvgProxy
              key={idx}
              selector={`#p${idx}`}
              style={selectedCompany === idx ? selectedStyle : defaultStyle} />
          })}
          {indexes.map(idx => {
            return <SvgProxy
              key={idx}
              onClick={() => this.handleSelected(idx, selectedCompany)} selector={`#g${idx}`} />
          })}
        </SvgLoader>
      </div>
    );
  }

};

ConnectedMap.propTypes = {
  selectedCompany: PropTypes.number,
  selectCompany: PropTypes.func.isRequired,
  unselectCompany: PropTypes.func.isRequired
};
ConnectedMap.defaultProps = {
  selectedCompany: undefined
};

const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedMap);

export default Map;
