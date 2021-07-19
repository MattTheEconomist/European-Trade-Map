import countryList from "../data/countryList";

import totalExportData from "../data/totalExportData.json";

const CountrySelect = (props) => {
  const { handleDestChange, handleOriginChange, origin, dest } = props;

  const countryListSorted = countryList.sort((a, b) => a - b);

  const optionsHtml = countryListSorted.map((el, ind) => (
    <option key={ind}>{el}</option>
  ));

  const tradeData = totalExportData.filter((row) => row.Partner === origin);

  console.log(tradeData);

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
    </div>
  );
};

export default CountrySelect;