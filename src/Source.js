import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import drawArrowFull from "./graphic/arrow";
import CountrySelect from "./controlPanel/countrySelect";
import EuroMap from "./graphic/europeMap";
import clearArrows from "./graphic/clearArrows";
import findTradePartners from "./mapDataPrep/findTradePartners";
import calculateArrowWidth from "./graphic/arrowWidths";
import colorByCountry, { paintCountries } from "./graphic/colorByCountry";
import { color } from "d3";

const Source = () => {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("Italy");

  const svg = d3.select("#europeMap");

  useEffect(() => {
    if (origin) {
      clearArrows();

      const tradePartners = findTradePartners(origin);

      const colorObj = colorByCountry(tradePartners);

      paintCountries(colorObj, origin);
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
      <EuroMap origin={origin} />
      <CountrySelect
        handleDestChange={handleDestChange}
        handleOriginChange={handleOriginChange}
        origin={origin}
        dest={dest}
      />

      <h3 id="deleteMe"> Origin Selected: {origin}</h3>
    </>
  );
};

export default Source;
