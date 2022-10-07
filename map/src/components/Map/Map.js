import React from "react";
import "./Map.css";
import actions from 'store/actions';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { SvgLoader, SvgProxy } from 'react-svgmt';
import fairMapLevel1 from "../../assets/level1.svg";
import fairMapLevel2 from "../../assets/level2.svg";

const mapStateToProps = state => {
  return { companies: state.companies, selectedCompany: state.selectedCompany };
};

function mapDispatchToProps(dispatch) {
  return {
    selectCompany: companyId => dispatch(actions.selectCompany(companyId)),
    unselectCompany: () => dispatch(actions.unselectCompany())
  };
}

const indexesLevel1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
const indexesLevel2 = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]

class ConnectedMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "tab1"
    };
  }

  componentDidUpdate() {
    const { selectedCompany } = this.props
    if (selectedCompany) {
      if (selectedCompany < 100) {
        this.handleTab1()
      } else {
        this.handleTab2()
      }
    }
  }

  handleTab1 = () => {
    const { unselectCompany, selectedCompany } = this.props
    if (this.state.activeTab !== "tab1") {
      if (selectedCompany >= 100)
        unselectCompany()
      this.setState({ activeTab: "tab1" })
    }
  }

  handleTab2 = () => {
    const { unselectCompany, selectedCompany } = this.props
    if (this.state.activeTab !== "tab2") {
      if (selectedCompany < 100)
        unselectCompany()
      this.setState({ activeTab: "tab2" })
    }
  }

  /*
  handleSelected = (companyId, selectedCompany) => {
    const { selectCompany, unselectCompany } = this.props;
    console.log(`selected a svg element ${companyId}`)

    console.log(companyId)

    if (companyId === selectedCompany) {
      unselectCompany()
    } else {
      selectCompany({ companyId })
    }
  }*/

  render() {
    const { selectedCompany } = this.props;

    return (
      <div className="Tabs">
        <ul className="nav">
          <li className={this.state.activeTab === "tab1" ? "active first" : "first"  } onClick={this.handleTab1}>Plan 2</li>
          <li className={this.state.activeTab === "tab2" ? "active second" : "second"} onClick={this.handleTab2}>Plan 3</li>
        </ul>
        <div className="outlet">
          {this.state.activeTab === "tab1" ? <Level1 /> : <Level2 />}
        </div>
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

class ConnectedLevel1 extends React.Component {

  handleSelected = (companyId, selectedCompany) => {
    const { selectCompany, unselectCompany } = this.props;
    console.log(`selected a svg element ${companyId}`)

    if (companyId === selectedCompany) {
      unselectCompany()
    } else {
      selectCompany({ companyId })
    }
  }

  up = () => {
    const { selectCompany } = this.props
    selectCompany({ companyId: 199 })
  }

  render() {
    const { selectedCompany } = this.props;

    return (
      <div className="Level1">
        <div className="map" >
          <SvgLoader path={fairMapLevel1}>
            {indexesLevel1.map(idx => {
              return <SvgProxy
                key={idx}
                selector={`#p${idx}`}
                class={selectedCompany === idx ? "selectedStyle" : "defaultStyle"} />
            })}
            {indexesLevel1.map(idx => {
              return <SvgProxy
                key={idx}
                onClick={() => this.handleSelected(idx, selectedCompany)} selector={`#g${idx}`} />
            })}
            <SvgProxy key={1675} onClick={() => this.up()} selector={`#rect1675`} />
            <SvgProxy key={1571} onClick={() => this.up()} selector={`#rect1571`} />
          </SvgLoader>
        </div>
      </div>
    );
  }
};

ConnectedLevel1.propTypes = {
  selectedCompany: PropTypes.number,
  selectCompany: PropTypes.func.isRequired,
  unselectCompany: PropTypes.func.isRequired
};

ConnectedLevel1.defaultProps = {
  selectedCompany: undefined
};

const Level1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLevel1);

class ConnectedLevel2 extends React.Component {

  handleSelected = (companyId, selectedCompany) => {
    const { selectCompany, unselectCompany } = this.props;
    console.log(`selected a svg element ${companyId}`)

    if (companyId === selectedCompany) {
      unselectCompany()
    } else {
      selectCompany({ companyId })
    }

    console.log("selecteddd: " + companyId);
  }

  down = () => {
    const { selectCompany } = this.props
    selectCompany({ companyId: 99 })
  }

  render() {
    const { selectedCompany } = this.props;
    
    return (
      <div className="Level2">
        <div className="map" >
          <SvgLoader path={fairMapLevel2}>
            {indexesLevel2.map(idx => {
              return <SvgProxy
                key={idx}
                selector={`#p${idx}`}
                class={selectedCompany === idx ? "selectedStyle" : "defaultStyle"} />
            })}
            {indexesLevel2.map(idx => {
              return <SvgProxy
                key={idx}
                onClick={() => this.handleSelected(idx, selectedCompany)} selector={`#g${idx}`} />
            })}
            <SvgProxy key={1292} onClick={() => this.down()} selector={`#rect1292`} />
            <SvgProxy key={1294} onClick={() => this.down()} selector={`#rect1294`} />
          </SvgLoader>
        </div>
      </div>
    );
  }
};

ConnectedLevel2.propTypes = {
  selectedCompany: PropTypes.number,
  selectCompany: PropTypes.func.isRequired,
  unselectCompany: PropTypes.func.isRequired
};

ConnectedLevel2.defaultProps = {
  selectedCompany: undefined
};

const Level2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLevel2);

export default Map;
