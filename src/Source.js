import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import drawArrowFull from "./graphic/arrow";
import CountrySelect from "./controlPanel/countrySelect";
import EuroMap from "./graphic/europeMap";
import totalExportData from "./data/totalExportData.json";

// import capitalData from "../data/capitals.json";

const Source = () => {
  const [origin, setOrigin] = useState("Ireland");
  const [dest, setDest] = useState("Greece");

  const svg = d3.select("#europeMap");

  useEffect(() => {
    drawArrowFull(svg, origin, dest);

    // refactor this into its own function in a "data preprocessing" file

    const tradeData = totalExportData.filter(
      (row) => row.Partner === origin.toLowerCase()
    );
    console.log(tradeData);
  }, [origin, dest]);

  function handleOriginChange(e) {
    setOrigin(e.target.value);
  }

  function handleDestChange(e) {
    setDest(e.target.value);
  }

  return (
    <>
      {/* <select id="OriginSelect" onSelect={handleOriginChange}> */}
      <EuroMap />
      <CountrySelect
        handleDestChange={handleDestChange}
        handleOriginChange={handleOriginChange}
        origin={origin}
        dest={dest}
      />
    </>
  );
};

export default Source;
