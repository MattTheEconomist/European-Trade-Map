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
import BarGraph from "./graphic/BarGraph";
import ForceBlocks from "./graphic/forceBlocks";

const Source = () => {
  const [origin, setOrigin] = useState("Germany");
  const [tradeFlow, setTradeFlow] = useState("export");

  const svg = d3.select("#europeMap");

  useEffect(() => {
    d3.selectAll(".countryPath").attr("fill", "grey");

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

  useEffect(() => {
    // clearArrowsAndCircles();

    // d3.selectAll(".countryPath").attr("fill", "grey");

    // const tradePartners =
    //   tradeFlow === "export"
    //     ? findTradePartnersExport(origin)
    //     : findTradePartnersImport(origin);

    // const colorObj = colorByCountry(tradePartners);

    // console.log("colorObj onload", colorObj);
    // colorObj[origin] = "green";

    // paintCountries(colorObj, origin);

    setTimeout(() => {
      setOrigin("Italy");
    }, 100);
  }, []);

  function handleOriginChange(e) {
    const originSelected = e.target.value;

    if (originSelected === "United Kingdom") {
      setOrigin("unitedKingdom");
    } else {
      setOrigin(originSelected);
    }
  }

  function originChangeFromGraphic(countryName) {
    setOrigin(countryName);
  }

  function tradeFlowToImport() {
    if (tradeFlow === "export") {
      setTradeFlow("import");
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
        <div id="graphContainer">
          <BarGraph origin={origin} tradeFlow={tradeFlow} />
          <ForceBlocks
            origin={origin}
            tradeFlow={tradeFlow}
            originChangeFromGraphic={originChangeFromGraphic}
          />
        </div>
        <EuroMap
          origin={origin}
          originChangeFromGraphic={originChangeFromGraphic}
        />
      </div>

      <CountrySelect
        handleOriginChange={handleOriginChange}
        origin={origin}
        tradeFlow={tradeFlow}
        tradeFlowToExport={tradeFlowToExport}
        tradeFlowToImport={tradeFlowToImport}
      />
    </>
  );
};

export default Source;
