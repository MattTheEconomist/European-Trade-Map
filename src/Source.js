import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { drawArrowDirection } from "./graphic/arrow";
import CountrySelect from "./controlPanel/countrySelect";
import EuroMap from "./graphic/europeMap";
import clearArrowsAndCircles from "./graphic/clearArrows";
import {
  findTradePartnersExport,
  findTradePartnersImport,
} from "./mapDataPrep/findTradePartners";
import calculateArrowWidth from "./graphic/arrowWidths";
import colorByCountry, { paintCountries } from "./graphic/colorByCountry";
import { color, utcFormat } from "d3";

const Source = () => {
  const [origin, setOrigin] = useState("Germany");
  const [dest, setDest] = useState("Italy");
  const [tradeFlow, setTradeFlow] = useState("export");

  const svg = d3.select("#europeMap");

  useEffect(() => {
    if (origin) {
      clearArrowsAndCircles();

      const tradePartners =
        tradeFlow === "export"
          ? findTradePartnersExport(origin)
          : findTradePartnersImport(origin);

      const colorObj = colorByCountry(tradePartners);
      paintCountries(colorObj, origin);

      drawArrowDirection(svg, origin, tradePartners, tradeFlow);
    }
  }, [origin, tradeFlow]);

  function handleOriginChange(e) {
    const originSelected = e.target.value;

    if (originSelected === "United Kingdom") {
      setOrigin("unitedKingdom");
    } else {
      setOrigin(originSelected);
    }
  }

  function handleDestChange(e) {
    setDest(e.target.value);
  }

  function tradeFlowToImport() {
    if (tradeFlow === "export") {
      setTradeFlow("import");

      findTradePartnersImport(origin);
    }
  }

  function tradeFlowToExport() {
    if (tradeFlow === "import") {
      setTradeFlow("export");
    }
  }

  return (
    <>
      <h3>Dynamic Title Here</h3>

      <div id="mapAndGraphContainer">
        <div id="graphContainer"></div>
        <EuroMap origin={origin} />
      </div>

      <CountrySelect
        handleDestChange={handleDestChange}
        handleOriginChange={handleOriginChange}
        origin={origin}
        dest={dest}
        tradeFlow={tradeFlow}
        tradeFlowToExport={tradeFlowToExport}
        tradeFlowToImport={tradeFlowToImport}
      />
    </>
  );
};

export default Source;
