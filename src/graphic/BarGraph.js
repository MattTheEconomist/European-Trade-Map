import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import { barGraphDims } from "../mapDataPrep/graphDimensions";
import {
  findTradePartnersExport,
  findTradePartnersImport,
} from "../mapDataPrep/findTradePartners";

export function BarGraph(props) {
  const { origin, tradeFlow } = props;
  const { height, width, barHeight } = barGraphDims;

  const tradePartners =
    tradeFlow === "export"
      ? findTradePartnersExport(origin)
      : findTradePartnersImport(origin);

  const tradeVolumes = Object.values(tradePartners);

  const xScale = d3.scaleLinear().domain(tradeVolumes).range([0, width]);

  d3.selectAll(".bar")
    .data(tradeVolumes)
    .enter()
    .append("rect")
    .attr("x", 20)
    .attr("y", (d, i) => i * barHeight)
    .attr("width", (d) => {
      return xScale(d);
    })
    .attr("height", barHeight);

  return <svg id="graphSvg"></svg>;
}

export default BarGraph;
