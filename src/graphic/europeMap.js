import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { geoJsonUrl, europeProjection } from "../mapDataPrep/mapDrawFunctions";
import drawCapitals from "./capitals";
import colorByCountry, { paintCountries } from "./colorByCountry";

const EuroMap = (props) => {
  const [geoMap, setGeoMap] = useState({});

  const { originChangeFromGraphic, origin } = props;

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
      .attr("stroke", "black")
      .attr("class", "countryPath")
      .attr("id", function (d) {
        const countryName = d.properties.name;
        if (countryName === "Czech Republic") {
          return "Czechia";
        }
        if (countryName === "United Kingdom") {
          return "unitedKingdom";
        } else {
          return countryName;
        }
      });

    const countries = d3.selectAll(".countryPath");

    countries.on("click", function () {
      originChangeFromGraphic(this.id);
      // console.log(this.id);
    });
  }

  return (
    <div id="mapContainer">
      <svg
        id="europeMap"
        viewBox="0 -100 700 450"
        // viewBox="0 0 100 100"
      ></svg>
    </div>
  );
};

export default EuroMap;
