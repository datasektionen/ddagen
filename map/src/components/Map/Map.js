import React from "react";
import "./Map.css";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import fairMap from "../../assets/map.svg";

const mapStateToProps = state => {
  return { companies: state.companies, selectedCompany: state.selectedCompany };
};

const ConnectedMap = ({ selectedCompany }) => {
  return (
    <div className="map">
      <img alt="fairmap" src={fairMap} />
      <p className="full-width" style={{ textAlign: "right", margin: "4pt" }}>
        {selectedCompany || "None"}
      </p>
    </div>
  );
};

ConnectedMap.propTypes = { selectedCompany: PropTypes.number };
ConnectedMap.defaultProps = { selectedCompany: undefined };

const Map = connect(mapStateToProps)(ConnectedMap);

export default Map;
