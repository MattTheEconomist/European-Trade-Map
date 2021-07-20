import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import drawArrowFull from "./graphic/arrow";
import CountrySelect from "./controlPanel/countrySelect";
import EuroMap from "./graphic/europeMap";
import clearArrows from "./graphic/clearArrows";
import findTradePartners from "./mapDataPrep/findTradePartners";
import calculateArrowWidth from "./graphic/arrowWidths";

// import capitalData from "../data/capitals.json";

const Source = () => {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("Italy");

  const svg = d3.select("#europeMap");

  useEffect(() => {
    if (origin) {
      clearArrows();

      const tradePartners = findTradePartners(origin);

      console.log(tradePartners);

      Object.keys(tradePartners).forEach((country) => {
        const lineWidth = calculateArrowWidth(tradePartners[country]);

        drawArrowFull(svg, origin, country, lineWidth);
      });
    }
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
