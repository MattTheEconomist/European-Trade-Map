import countryList from "../data/countryList";

const CountrySelect = (props) => {
  const { handleDestChange, handleOriginChange, origin, dest } = props;

  const countryListSorted = countryList.sort((a, b) => (a > b ? 1 : -1));

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
    </div>
  );
};

export default CountrySelect;
