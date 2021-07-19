const CountrySelect = (props) => {
  const { handleDestChange, handleOriginChange } = props;

  return (
    <div id="countrySelectContainer">
      <select id="OriginSelect" onChange={handleOriginChange}>
        <option>Greece</option>
        <option>Ireland</option>
        <option>Sweden</option>
      </select>
      <select id="destSelect" onChange={handleDestChange}>
        <option>Poland</option>
        <option>Spain</option>
        <option>Portugal</option>
      </select>
    </div>
  );
};

export default CountrySelect;
