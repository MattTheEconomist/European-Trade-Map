import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import summaryData from "../data/summaryData.json";

export const ForceBlocksTooltip = (props) => {
  const { tooltipStyles, blockHovered, tradeFlow, isHovering } = props;

  let { toolX, toolY, visibility } = tooltipStyles;

  if (!isHovering) {
    return <></>;
  }

  toolY += 310;
  console.log("toolY", toolY);

  const countryName = blockHovered.slice(0, -5).toLowerCase();

  let summaryDataRow = summaryData.filter((row) => row.Partner === countryName);

  const keyString =
    tradeFlow === "import" ? "countryTotalImports" : "countryTotalExports";
  summaryDataRow = summaryDataRow[0];

  let tradeValue;

  if (summaryDataRow) {
    tradeValue = summaryDataRow[keyString];
  }

  function formatTradeValue(tradeValue) {
    let formattedValue = tradeValue / 1000000000;
    let trailingLetter;

    if (formattedValue > 1) {
      trailingLetter = "B";
    } else {
      formattedValue = tradeValue / 1000000;
      trailingLetter = "M";
    }

    formattedValue = formattedValue.toFixed(1);

    return `${formattedValue}${trailingLetter}`;
  }

  const tradeValueText = formatTradeValue(tradeValue);

  const tradeFlowText =
    tradeFlow.charAt(0).toUpperCase() + tradeFlow.slice(1) + "s";

  const yOffset = 60;
  const xOffset = 100;

  const yPoz = toolY + yOffset;
  const xPoz = toolX + xOffset;

  let newViz;

  if (!toolX) {
    newViz = "hidden";
  } else {
    newViz = visibility;
  }

  let blockSelection;
  if (blockHovered) {
    blockSelection = d3.select(`#${blockHovered}`);
  }

  const styles = {
    top: yPoz,
    left: xPoz,
    width: "100px",
    visibility: newViz,
    position: "absolute",
    // position: "relative",
  };

  return (
    <div id="forceTooltip" style={styles}>
      <span>{countryName}</span>
      <span>{tradeFlowText} </span>
      <span>{tradeValueText}</span>
    </div>
  );
};

export default ForceBlocksTooltip;