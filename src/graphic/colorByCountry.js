import * as d3 from "d3";

export function colorByCountry(tradePartners) {
  const volumes = Object.values(tradePartners);
  const countries = Object.keys(tradePartners);

  const colorScaleFunc = d3
    .scaleLinear()
    .domain([d3.min(volumes), d3.max(volumes)])
    .range([0, 100]);

  let countryColorObj = {};
  for (let i = 0; i < countries.length; i++) {
    const currentCountry = countries[i];
    const currenVolume = volumes[i];

    let saturationValue = colorScaleFunc(currenVolume);
    saturationValue = parseFloat(saturationValue).toFixed(0);
    const currentColor = `hsla(186, ${saturationValue}%, 50%, 1)`;

    countryColorObj[currentCountry] = currentColor;
  }

  return countryColorObj;
}

export default colorByCountry;
