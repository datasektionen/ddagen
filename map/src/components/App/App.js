import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "components/Map/Map";
import FilterBar from "components/FilterBar/FilterBar";
import CompanyExplorer from "components/CompanyExplorer/CompanyExplorer";

function useWindowResize() {
  const [width, setWidth] = useState(window.innerWidth);
  const listener = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return { width };
}

function App() {
  const { width } = useWindowResize();

  if (width <= 768) {
    return (
      <div className="container">
        <div className="app-container-right">
          <Map />
        </div>
        <div className="app-container-left">
          <div className="company-filters-container full-width">
            <FilterBar />
          </div>
          <CompanyExplorer />
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="app-container-left">
        <div className="company-filters-container full-width">
          <FilterBar />
        </div>
        <CompanyExplorer />
      </div>
      <div className="app-container-right">
        <Map />
      </div>
    </div>
  );
}

export default App;
