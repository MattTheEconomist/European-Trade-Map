import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import summaryData from "../data/summaryData.json";

import {
  findTradePartnersExport,
  findTradePartnersImport,
} from "../mapDataPrep/findTradePartners";

import { colorByCountry } from "./colorByCountry";

export function ForceBlocks(props) {
  const { origin, tradeFlow, originChangeFromForce } = props;

  useEffect(() => {
    createBlocks(tradeFlow);
    reDrawBlocks(tradeFlow);
  }, [origin, tradeFlow]);

  useEffect(() => {
    createBlocks(tradeFlow);
  }, []);

  function generateRow(idx) {
    let rowPx = 45;
    let totalRows = 5;
    let thisRow = 3;

    if (idx > 9 && idx <= 14) {
      rowPx = 35;
      thisRow = 2;
      return thisRow * rowPx;
    }

    if (idx > 14) {
      rowPx = 30;
      return thisRow * rowPx;
    }

    return Math.floor(idx / totalRows) * rowPx;
  }

  function generateCol(idx) {
    let columnPx = 50;
    let totalColumns = 5;

    if (idx > 14) {
      totalColumns = 20;
      columnPx = 20;
      return (idx - 15) * columnPx + 27;
    }

    return (idx % totalColumns) * columnPx + 25;
  }

  function createBlocks(tradeFlow) {
    const svg = d3.select("#blockSvg");

    const keyString =
      tradeFlow === "import" ? "countryTotalImports" : "countryTotalExports";

    const summaryDataSorted = summaryData.sort(
      (a, b) => b[keyString] - a[keyString]
    );

    const tradeVolumes = summaryDataSorted.map((row) => row[keyString]);

    let countryNames = summaryDataSorted.map((row) => row.Partner);
    countryNames = countryNames.map(
      (el) => el.charAt(0).toUpperCase() + el.slice(1)
    );

    const colorObj = generateColorObj(tradeFlow, origin);

    const blockScale = d3
      .scaleLinear()
      .domain([0, d3.max(tradeVolumes)])
      .range([7, 40]);

    svg
      .selectAll(".block")
      .data(tradeVolumes)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        return generateCol(i);
      })
      .attr("y", (d, i) => {
        return generateRow(i);
      })
      .attr("width", (d) => {
        return blockScale(d);
      })
      .attr("height", (d) => {
        return blockScale(d);
      })
      .attr("fill", (d, i) => {
        const thisCountryName = countryNames[i];
        if (origin.toLowerCase() === thisCountryName) {
          return "green";
        }
        return colorObj[thisCountryName];
      })
      .attr("class", "block")
      .attr("id", (d, i) => `${countryNames[i]}Block`)
      .on("click", function () {
        const thisId = this.id;
        const countryName = thisId.replace("Block", "");
        originChangeFromForce(countryName);
      });
  }

  function reDrawBlocks(tradeFlow) {
    const keyString =
      tradeFlow === "import" ? "countryTotalImports" : "countryTotalExports";

    const summaryDataSorted = summaryData.sort(
      (a, b) => b[keyString] - a[keyString]
    );

    const tradeVolumes = summaryDataSorted.map((row) => row[keyString]);

    let countryNames = summaryDataSorted.map((row) => row.Partner);
    countryNames = countryNames.map(
      (el) => el.charAt(0).toUpperCase() + el.slice(1)
    );

    const colorObj = generateColorObj(tradeFlow, origin);

    const blockScale = d3
      .scaleLinear()
      .domain([0, d3.max(tradeVolumes)])
      .range([5, 40]);

    d3.selectAll(".block")
      .transition()
      .duration(1000)
      .attr("width", (d) => {
        return blockScale(d);
      })
      .attr("height", (d) => {
        return blockScale(d);
      })
      .attr("fill", (d, i) => {
        const thisCountryName = countryNames[i];
        if (origin === thisCountryName) {
          return "green";
        }
        return colorObj[thisCountryName];
      });
  }

  function generateColorObj(tradeFlow, origin) {
    const tradePartnersFull = createTradeData(origin, tradeFlow);
    const colorObj = colorByCountry(tradePartnersFull);
    return colorObj;
  }

  function createTradeData(origin, tradeFlow) {
    let tradePartnersFull =
      tradeFlow === "export"
        ? findTradePartnersExport(origin)
        : findTradePartnersImport(origin);

    return tradePartnersFull;
  }

  return (
    <>
      <h3 id="forceBlocksTitle">
        {origin}'s share of all{" "}
        {tradeFlow.charAt(0).toUpperCase() + tradeFlow.slice(1)}s
      </h3>
      <svg id="blockSvg" height={400}></svg>
    </>
  );
}

export default ForceBlocks;
