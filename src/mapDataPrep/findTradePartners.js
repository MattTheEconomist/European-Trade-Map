import totalExportData from "../data/totalExportData.json";

export function findTradePartners(origin) {
  let fullTradeData = totalExportData.filter(
    (row) => row.Partner === origin.toLowerCase()
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
    value = value.replace(/,/g, "");
    value = parseInt(value);

    fullTradeData_numbers[key] = value;
  }

  const tradeValues = Object.values(fullTradeData_numbers)
    .sort((a, b) => (a > b ? -1 : 1))
    .filter(Boolean);

  const topThreeCountries = {};

  for (let i = 0; i < 3; i++) {
    const currentValue = tradeValues[i];

    let currentKey = getKeyByValue(fullTradeData_numbers, currentValue);

    currentKey = currentKey.charAt(0).toUpperCase() + currentKey.slice(1);

    topThreeCountries[currentKey] = currentValue;
  }

  //   console.log(topThreeCountries);

  return topThreeCountries;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default findTradePartners;
