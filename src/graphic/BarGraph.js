import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import { barGraphDims } from "../mapDataPrep/graphDimensions";
import {
  findTradePartnersExport,
  findTradePartnersImport,
} from "../mapDataPrep/findTradePartners";

export function BarGraph(props) {
  const { origin, tradeFlow } = props;
  const [tradePartnersFull, setTradePartnersFull] = useState(
    createTradeData(origin, tradeFlow)
  );

  const { height, width, barHeight, barMargin } = barGraphDims;

  // let barData, countries;

  // useEffect(() => {
  //   // const tradePartnersFull = createTradeData(origin, tradeFlow);

  //   const tradePartnersTop = createAbbrevData(tradePartnersFull);
  //   const barData = Object.values(tradePartnersTop);
  //   updateBarWidths(barData);
  //   createBars(barData);
  // }, []);

  const tradePartnersTop = createAbbrevData(tradePartnersFull);
  const barData = Object.values(tradePartnersTop);
  updateBarWidths(barData);
  createBars(barData);

  // useEffect(() => {
  //   // setTradePartnersTop(createAbbrevData(tradePartnersFull));

  //   const tradePartnersFull = createTradeData(origin, tradeFlow);
  //   const tradePartnersTop = createAbbrevData(tradePartnersFull);
  //   const barData = Object.values(tradePartnersTop);
  //   updateBarWidths(barData);
  // }, [origin, tradeFlow]);

  useEffect(() => {
    // d3.selectAll(".bar").remove();

    const tradePartnersFull = createTradeData(origin, tradeFlow);
    const tradePartnersTop = createAbbrevData(tradePartnersFull);
    const barData = Object.values(tradePartnersTop);

    const svg = d3.select("#graphSvg");
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(barData)])
      .range([0, width]);

    svg
      .selectAll(".bar")
      .data(barData)
      .enter()
      .append("rect")
      .attr("x", 20)
      .attr("y", (d, i) => i * (barHeight + barMargin) + 30)
      // .attr("width", (d) => {
      //   return xScale(d);
      // })
      .attr("height", barHeight)
      .attr("class", "bar");

    d3.selectAll(".bar")
      .transition()
      .duration(1500)
      .attr("width", (d) => {
        return xScale(d);
      });
  }, [origin, tradeFlow]);

  function createAbbrevData(tradePartnersFull) {
    const allCountries = Object.keys(tradePartnersFull);
    const allVolumes = Object.values(tradePartnersFull);

    let rez = {};

    for (let i = 0; i < 5; i++) {
      rez[allCountries[i]] = allVolumes[i];
    }

    return rez;
  }

  function createTradeData(origin, tradeFlow) {
    let tradePartnersFull =
      tradeFlow === "export"
        ? findTradePartnersExport(origin)
        : findTradePartnersImport(origin);

    return tradePartnersFull;
  }

  function updateBarWidths(barData) {
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(barData)])
      .range([0, width]);

    d3.selectAll(".bar")
      .data(barData)
      .enter()
      .transition()
      .duration(1500)
      .attr("width", (d) => xScale(d));
  }

  function createBars(barData) {
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(barData)])
      .range([0, width]);

    const svg = d3.select("#graphSvg");

    svg
      .selectAll(".bar")
      .data(barData)
      .enter()
      .append("rect")
      .attr("x", 20)
      .attr("y", (d, i) => i * (barHeight + barMargin) + 30)
      .attr("width", (d) => {
        return xScale(d);
      })
      .attr("height", barHeight)
      .attr("class", "bar");
  }

  return <svg id="graphSvg" height={500}></svg>;
}

export default BarGraph;
