import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { geoJsonUrl, europeProjection } from "../mapDataPrep/mapDrawFunctions";
import drawCapitals from "./capitals";

const EuroMap = () => {
  const [geoMap, setGeoMap] = useState({});

  //   draw map functions
  useEffect(() => {
    fetch(geoJsonUrl).then((response) => {
      response.json().then((geoData) => {
        setGeoMap(geoData);
        drawMap(geoData);
      });
    });
  }, []);

  useEffect(() => {
    drawMap(geoMap);
    drawCapitals(svg);
  }, [geoMap]);

  useEffect(() => {
    drawCapitals(svg);
  }, []);

  const svg = d3.select("#europeMap");

  function drawMap(geoData) {
    svg
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", d3.geoPath().projection(europeProjection))
      .attr("stroke", "grey")
      .attr("fill", "hsla(210, 79%, 67%, 0.68)")
      .on("mouseover", (d) => {});
  }

  return (
    <svg
      id="europeMap"
      // width={800}
      //  height={450}
      viewBox="0 0 800 450"
    ></svg>
  );
};

export default EuroMap;
