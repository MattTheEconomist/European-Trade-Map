import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { geoJsonUrl, europeProjection } from "../mapDataPrep/mapDrawFunctions";
import drawCapitals from "./capitals";
import colorByCountry, { paintCountries } from "./colorByCountry";

const EuroMap = (props) => {
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
    let pathGenerator = d3.geoPath().projection(europeProjection);

    svg
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("stroke", "red")
      .attr("class", "countryPath")
      .attr("id", function (d) {
        return d.properties.name;
      });

    const countries = d3.selectAll(".countryPath");

    countries.on("click", function () {
      console.log(this.id);
    });
  }

  return <svg id="europeMap" viewBox="0 0 800 450"></svg>;
};

export default EuroMap;
