import * as d3 from "d3";

export function calculateArrowWidth(tradeVolume) {
  //   const maxVol = 141316785159;
  const maxVol = 1413167;
  const minVol = 410666;
  const widthScale = d3.scaleLinear().domain([maxVol, minVol]).range([1, 15]);
}

export default calculateArrowWidth;
