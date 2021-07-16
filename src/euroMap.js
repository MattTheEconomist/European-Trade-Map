import React, { useState } from "react";
import * as d3 from "d3";
import { useEffect } from "react";
import capitals from "./data/capitals.json";

const EuroMap = () => {
  // export async function EuroMap() {
  const [geoMap, setGeoMap] = useState({});
  const [origin, setOrigin] = useState("Ireland");
  const [dest, setDest] = useState("Greece");

  const countryList = [
    "Belgium",
    "Bulgaria",
    "Czechia",
    "Germany",
    "Denmark",
    "Estonia",
    "Spain",
    "Finland",
    "France",
    "United",
    "Greece",
    "Hungary",
    "Italy",
    "Lithuania",
    "Luxembourg",
    "Latvia",
    "Malta",
    "Netherlands",
    "Pakistan",
    "Poland",
    "Portugal",
    "Romania",
    "Slovenia",
    "Slovakia",
    "Sweden",
    "Austria",
    "Cyprus",
    "Croatia",
    "Ireland",
  ];

  let width = 800;
  let height = 400;

  let geoJsonUrl =
    "https://gist.githubusercontent.com/spiker830/3eab0cb407031bf9f2286f98b9d0558a/raw/7edae936285e77be675366550e20f9166bed0ed5/europe_features.json";

  let europeProjection = d3
    .geoMercator()
    .center([13, 52])
    .scale([width / 1.5])
    .translate([width / 2, height / 2]);

  const pathGenerator = d3.geoPath().projection(europeProjection);

  const svg = d3.select("svg");

  //   draw map functions
  useEffect(() => {
    fetch(geoJsonUrl).then((response) => {
      response.json().then((geoData) => {
        setGeoMap(geoData);
        drawWorldMap(geoData);
      });
    });
  }, []);

  useEffect(() => {
    drawWorldMap(geoMap);
  }, [geoMap]);

  function drawWorldMap(geoData) {
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

  //   plot capitals
  useEffect(() => {
    const euroCapitals = capitals.filter((row) =>
      countryList.includes(row.country)
    );

    svg
      .selectAll("text")
      .data(euroCapitals)
      .enter()
      .append("text")
      .attr("x", function (d) {
        // return europeProjection(longitudeFormat(d.Longitude));
        return europeProjection([d.longitude, d.latitude])[0];
      })
      .attr("y", function (d) {
        // return europeProjection(latitudeFormat(d.Latitude));
        return europeProjection([d.longitude, d.latitude])[1] - 10;
      })
      .text((d) => d.capital)
      .style("font-size", "10px");
  }, []);

  // draw a line

  function radsToDegs(rad) {
    return (rad * 180) / Math.PI;
  }

  function degsToRags(deg) {
    return (deg * Math.PI) / 180.0;
  }

  function createPathCoordinates(origRow, destRow) {
    origRow = capitals.filter((row) => row.country === origRow);
    destRow = capitals.filter((row) => row.country === destRow);

    origRow = origRow[0];
    destRow = destRow[0];

    // console.log(origRow);

    if (typeof origRow === "undefined") {
      return null;
    }

    let coordinates = {};

    coordinates["x1"] = europeProjection([
      origRow.longitude,
      origRow.latitude,
    ])[0];
    coordinates["y1"] = europeProjection([
      origRow.longitude,
      origRow.latitude,
    ])[1];
    coordinates["x2"] = europeProjection([
      destRow.longitude,
      destRow.latitude,
    ])[0];
    coordinates["y2"] = europeProjection([
      destRow.longitude,
      destRow.latitude,
    ])[1];

    return coordinates;
  }

  function degreeRotationBetweenCoordinates(coordObj) {
    const yDiff = coordObj.y2 - coordObj.y1;
    const xDiff = coordObj.x2 - coordObj.x1;

    const radians = Math.atan2(yDiff, xDiff);

    return radsToDegs(radians);
  }

  useEffect(() => {
    const lineCoords = createPathCoordinates(origin, dest);
    svg
      .append("line")
      .attr("id", "arrowStem")
      .attr("class", "arrow")
      .attr("x1", lineCoords.x1)
      .attr("y1", lineCoords.y1)
      .attr("x2", lineCoords.x1)
      .attr("y2", lineCoords.y1)
      //   .attr("x2", lineCoords.x2)
      //   .attr("y2", lineCoords.y2)
      .style("stroke", "black")
      .style("stroke-width", 3)
      .style("stroke-linecap", "butt")
      .transition()
      .duration(2000)
      .attr("x2", lineCoords.x2)
      .attr("y2", lineCoords.y2);
  }, [origin, dest]);
  //   }, []);
  //   });

  function handleOriginChange(e) {
    setOrigin(e.target.value);

    console.log(e.target.value);
    console.log(origin);
  }

  function handleDestChange(e) {
    setDest(e.target.value);

    console.log(e.target.value);
    console.log(dest);
  }

  return (
    <>
      {/* <select id="OriginSelect" onSelect={handleOriginChange}> */}
      <select id="OriginSelect" onChange={handleOriginChange}>
        <option>Greece</option>
        <option>Ireland</option>
        <option>Sweden</option>
      </select>
      <select id="destSelect" onChange={handleDestChange}>
        <option>Poland</option>
        <option>Spain</option>
        <option>Portugal</option>
      </select>
      <svg width={800} height={450} viewBox="0 0 800 450"></svg>
    </>
  );
};

export default EuroMap;
