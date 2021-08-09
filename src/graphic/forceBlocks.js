import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import {
  findTradePartnersExport,
  findTradePartnersImport,
} from "../mapDataPrep/findTradePartners";

export function ForceBlocks(props) {
  const { origin, tradeFlow } = props;

  useEffect(() => {
    const tradePartnersFull = createTradeData(origin, tradeFlow);
    createBlocks(tradePartnersFull);
  }, [origin, tradeFlow]);

  function createBlocks(fullTradeData) {
    const svg = d3.select("#blockSvg");

    const tradeVolumes = Object.values(fullTradeData);

    const blockScale = d3
      .scaleLinear()
      .domain([0, d3.max(tradeVolumes)])
      .range([5, 40]);

    svg
      .selectAll(".block")
      .data(tradeVolumes)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        const fiveRemainder = i % 5;

        return 30 * fiveRemainder;
      })
      .attr("y", (d, i) => {
        const fiveMultipler = Math.floor(i / 5);

        return 30 * fiveMultipler;
      })
      .attr("width", (d) => {
        return blockScale(d);
      })
      .attr("height", (d) => {
        return blockScale(d);
      })
      .attr("class", "block");
  }

  function createTradeData(origin, tradeFlow) {
    let tradePartnersFull =
      tradeFlow === "export"
        ? findTradePartnersExport(origin)
        : findTradePartnersImport(origin);

    return tradePartnersFull;
  }

  function drawBlocks(fullTradeData) {}

  return (
    <>
      {" "}
      <h3>
        {" "}
        my props are {origin} and {tradeFlow}
      </h3>
      <svg id="blockSvg" height={400}></svg>
    </>
  );
}

export default ForceBlocks;
