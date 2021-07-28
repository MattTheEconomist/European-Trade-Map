import capitals from "../data/capitals.json";
import countryList from "../data/countryList";

import centroids from "../data/centroids.json";

import { europeProjection } from "../mapDataPrep/mapDrawFunctions";
import M from "minimatch";

const removeTheseCountries = [
  "Albania",
  "Macedonia",
  "Malta",
  "Cyprus",
  "Maldova",
];

const makeTheseSmaller = ["Portugal", "Switzerland", "Bosnia", "Denmark"];

export function drawCapitals(svg) {
  svg
    .selectAll("text")
    .data(centroids)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return europeProjection([d.longitude, d.latitude])[0];
    })
    .attr("y", function (d) {
      return europeProjection([d.longitude, d.latitude])[1];
    })
    .text((d) => d.name)
    .style("font-size", "8px")
    .attr("text-anchor", "middle");
}

export default drawCapitals;
