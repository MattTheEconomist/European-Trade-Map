import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import capitals from "../data/capitals.json";
// import capitals from "C:/Users/Admin/Documents/js/d3 Stuff/European-Trade-Map/src/data";
import countryList from "../data/countryList";

import { geoJsonUrl, europeProjection } from "../mapDataPrep/mapDrawFunctions";

export function drawCapitals(svg) {
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
}

export default drawCapitals;
