import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import capitals from "./data/capitals.json";
import countryList from "./data/countryList";
import drawArrowStem from "./graphic/arrow";
import CountrySelect from "./controlPanel/countrySelect";
import EuroMap from "./graphic/europeMap";

const Source = () => {
  //eveunually, received these props from control panel file
  const [geoMap, setGeoMap] = useState({});
  const [origin, setOrigin] = useState("Ireland");
  const [dest, setDest] = useState("Greece");

  const svg = d3.select("#europeMap");

  useEffect(() => {
    drawArrowStem(svg, origin, dest);
    // drawArrowStem(origin, dest);
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
      />
    </>
  );
};

export default Source;
