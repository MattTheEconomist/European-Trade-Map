import { filter } from "d3-array";
import totalExportData from "../data/totalExportData.json";

export function findTradePartnersExport(origin) {
  let fullTradeData;

  let filterCriteria;

  if (origin === "UnitedKingdom" || origin === "unitedKingdom") {
    filterCriteria = "unitedKingdom";
  } else {
    filterCriteria = origin.toLowerCase();
  }

  fullTradeData = totalExportData.filter(
    (row) => row.Partner === filterCriteria
  );

  fullTradeData = fullTradeData[0];

  fullTradeData = Object.keys(fullTradeData)
    .filter((key) => key !== "european")
    .reduce((obj, key) => {
      obj[key] = fullTradeData[key];
      return obj;
    }, {});

  let fullTradeData_numbers = {};

  for (let [key, value] of Object.entries(fullTradeData)) {
    value = parseInt(value);

    fullTradeData_numbers[key] = value;
  }

  const fullTradeData_final = sortByValues(fullTradeData_numbers);

  // console.log(
  //   "find tradepartners exp before final",
  //   Object.keys(fullTradeData).length
  //   // fullTradeData
  // );

  return fullTradeData_final;
}

export function findTradePartnersImport(origin) {
  let fullTradeData = {};

  let filterCriteria;
  if (origin === "UnitedKingdom" || origin === "unitedKingdom") {
    filterCriteria = "unitedKingdom";
  } else {
    filterCriteria = origin.toLowerCase();
  }

  for (let i = 0; i < totalExportData.length; i++) {
    const tradeRow = totalExportData[i];

    const originatingCountry = tradeRow.Partner;

    const tradeValue = tradeRow[filterCriteria];

    fullTradeData[originatingCountry] = tradeValue;
  }

  fullTradeData["Partner"] = filterCriteria;

  const fullTradeData_final = sortByValues(fullTradeData);

  // // console.log("find tradepartners import, before final", fullTradeData);
  // console.log(
  //   "find tradepartners import, before final",
  //   Object.keys(fullTradeData).length
  //   // fullTradeData
  // );

  return fullTradeData_final;
}

function sortByValues(obj) {
  const tradeValues = Object.values(obj)
    .sort((a, b) => (a > b ? -1 : 1))
    .filter(Boolean);

  let outputObj = {};

  const countryCount = Object.keys(obj).length - 2;

  for (let i = 0; i < countryCount; i++) {
    const currentValue = tradeValues[i];

    let currentKey = getKeyByValue(obj, currentValue);

    if (currentKey) {
      currentKey = currentKey.charAt(0).toUpperCase() + currentKey.slice(1);

      // if (currentKey === "unitedKingdom") {
      if (currentKey === "United Kingdom") {
        currentKey = "unitedKingdom";
      }

      outputObj[currentKey] = currentValue;
    }
  }
  return outputObj;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default findTradePartnersExport;
