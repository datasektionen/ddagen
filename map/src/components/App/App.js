import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "components/Map/Map";
// import FilterBar from "components/FilterBar/FilterBar";
import CompanyExplorer from "components/CompanyExplorer/CompanyExplorer";

function useWindowResize() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const dimensionListener = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener("resize", dimensionListener);
    return () => {
      window.removeEventListener("resize", dimensionListener);
    };
  }, []);

  return dimensions;
}

function App() {
  const { width, height } = useWindowResize();

  if (width <= 768) {
    return (
      <div className="container" style={{ maxHeight: height }}>
        <div className="app-container-right">
          <Map />
        </div>
        <div className="app-container-left">
          <CompanyExplorer />
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="app-container-left">
        <CompanyExplorer />
      </div>
      <div className="app-container-right">
        <Map />
      </div>
    </div>
  );
}

export default App;
