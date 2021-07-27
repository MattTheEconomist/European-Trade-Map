import countryList from "../data/countryList";
import * as d3 from "d3";
import React, { useState, useEffect } from "react";

const CountrySelect = (props) => {
  const {
    handleDestChange,
    handleOriginChange,
    origin,
    dest,
    tradeFlow,
    tradeFlowToExport,
    tradeFlowToImport,
  } = props;

  const countryListSorted = countryList.sort((a, b) => (a > b ? 1 : -1));

  countryListSorted.splice(-1, 1, "United Kingdom");

  const optionsHtml = countryListSorted.map((el, ind) => (
    <option key={ind}>{el}</option>
  ));

  const destSelect = document.getElementById("destSelect");
  const originSelect = document.getElementById("originSelect");

  return (
    <div id="countrySelectContainer">
      <select id="originSelect" onChange={handleOriginChange} value={origin}>
        {optionsHtml}
      </select>

      <select id="destSelect" onChange={handleDestChange} value={dest}>
        {optionsHtml}
      </select>

      <TradeFlowButton
        btnType="Import"
        tradeFlow={tradeFlow}
        tradeFlowToExport={tradeFlowToExport}
        tradeFlowToImport={tradeFlowToImport}
      />

      <TradeFlowButton
        btnType="Export"
        tradeFlow={tradeFlow}
        tradeFlowToExport={tradeFlowToExport}
        tradeFlowToImport={tradeFlowToImport}
      />
    </div>
  );
};

const TradeFlowButton = (props) => {
  const { btnType, tradeFlow, tradeFlowToExport, tradeFlowToImport } = props;

  const btnTypeLower = btnType.toLowerCase();

  const clickFunction =
    btnType === "Import" ? tradeFlowToImport : tradeFlowToExport;

  const btnId = tradeFlow === btnTypeLower ? "activeBtn" : "passiveBtn";

  const btnText =
    tradeFlow === btnTypeLower
      ? `currently showing ${btnType}`
      : `show ${btnType} instead`;

  return (
    <button id={btnId} className="tradeFlowBtn" onClick={clickFunction}>
      {btnText}
    </button>
  );
};

export default CountrySelect;
