import * as d3 from "d3";

export function paintCountries(colorObj, origin) {
  restoreDefaultColor();

  highlightSelectedCountry(origin);
  transitionCountryColors(colorObj);
}

function highlightSelectedCountry(origin) {
  d3.select(`#${origin}`).transition().duration(1500).attr("fill", "green");
}

function transitionCountryColors(colorObj) {
  setTimeout(() => {
    const countries = Object.keys(colorObj);
    for (let i = 0; i < countries.length; i++) {
      const currentCountryName = countries[i];
      const selectedCountry = d3.select(`#${currentCountryName}`);

      selectedCountry
        .transition()
        .duration(1500)
        .attr("fill", colorObj[currentCountryName]);
    }
  }, 900);
}

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

function restoreDefaultColor() {
  d3.selectAll(".countryPath").transition().duration(1000).attr("fill", "grey");
}

export default colorByCountry;