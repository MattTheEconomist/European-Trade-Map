import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { geoJsonUrl, europeProjection } from "../mapDataPrep/mapDrawFunctions";
import drawCapitals from "./capitals";

const EuroMap = (props) => {
  const [geoMap, setGeoMap] = useState({});

  const { colorObj, origin } = props;

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

  useEffect(() => {
    // if (origin) {
    const countries = Object.keys(colorObj);
    console.log(origin);
    for (let i = 0; i < countries.length; i++) {
      const currentCountryName = countries[i];
      const selectedCountry = d3.select(`#${currentCountryName}`);

      selectedCountry.attr("fill", colorObj[currentCountryName]);

      // console.log(currentCountry);
      // console.log(colorObj);
      // currentCountry.attr("fill", " green");
      // }
    }
  }, [origin]);

  const svg = d3.select("#europeMap");

  function drawMap(geoData) {
    let pathGenerator = d3.geoPath().projection(europeProjection);

    svg
      .selectAll("path")
      .attr("class", "countryPath")
      .data(geoData.features)
      .enter()
      .append("path")
      // .attr("d", d3.geoPath().projection(europeProjection))
      .attr("d", pathGenerator)
      .attr("stroke", "red")
      // .attr("fill", "hsla(210, 79%, 67%, 0.68)")
      // .attr("fill", function (d) {
      //   const currentName = d.properties.name;

      //   console.log(currentName);

      //   return colorObj[currentName];
      // })
      .attr("id", function (d) {
        return d.properties.name;
      });

    const countries = d3.selectAll(".countryPath");

    countries.on("click", function () {
      console.log(this.id);
    });
  }

  // function clicked(d) {
  //   // console.log("clicked");
  //   console.log(d);
  // }

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
