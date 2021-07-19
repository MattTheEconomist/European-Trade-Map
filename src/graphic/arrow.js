import { europeProjection } from "../mapDataPrep/mapDrawFunctions";
import * as d3 from "d3";
import capitals from "../data/capitals.json";
import countryList from "../data/countryList";

export function drawArrowStem(svg, origin, dest) {
  // export function drawArrowStem(origin, dest) {
  const lineCoords = createPathCoordinates(origin, dest);

  console.log("called drawArrow");

  svg
    .append("line")
    .attr("id", "arrowStem")
    .attr("class", "arrow")
    .attr("x1", lineCoords.x1)
    .attr("y1", lineCoords.y1)
    .attr("x2", lineCoords.x1)
    .attr("y2", lineCoords.y1)
    .style("stroke", "black")
    .style("stroke-width", 3)
    .style("stroke-linecap", "butt")
    .transition()
    .duration(2000)
    .attr("x2", lineCoords.x2)
    .attr("y2", lineCoords.y2);
}

function degreeRotationBetweenCoordinates(coordObj) {
  const yDiff = coordObj.y2 - coordObj.y1;
  const xDiff = coordObj.x2 - coordObj.x1;

  const radians = Math.atan2(yDiff, xDiff);

  return radsToDegs(radians);
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

function radsToDegs(rad) {
  return (rad * 180) / Math.PI;
}

function degsToRags(deg) {
  return (deg * Math.PI) / 180.0;
}

export default drawArrowStem;
