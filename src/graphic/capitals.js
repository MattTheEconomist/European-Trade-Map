import capitals from "../data/capitals.json";
import countryList from "../data/countryList";

import { europeProjection } from "../mapDataPrep/mapDrawFunctions";

export function drawCapitals(svg) {
  const euroCapitals = capitals.filter((row) =>
    countryList.includes(row.country)
  );
  // console.log(euroCapitals);

  svg
    .selectAll("text")
    .data(euroCapitals)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return europeProjection([d.longitude, d.latitude])[0];
    })
    .attr("y", function (d) {
      return europeProjection([d.longitude, d.latitude])[1] - 10;
    })
    .text((d) => d.capital)
    .style("font-size", "10px");
}

export default drawCapitals;
