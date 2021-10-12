import countryList from "../data/countryList";
import React from "react";

const CountrySelect = (props) => {
  const {
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

  const originSelect = document.getElementById("originSelect");

  return (
    <div id="countrySelectContainer" style={{ minWidth: 500 }}>
      <h3> Change Country Selected </h3>
      <select id="originSelect" onChange={handleOriginChange} value={origin}>
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
      ? `currently showing ${btnType}s`
      : `show ${btnType}s instead`;

  return (
    <button id={btnId} className="tradeFlowBtn" onClick={clickFunction}>
      {btnText}
    </button>
  );
};

export default CountrySelect;
