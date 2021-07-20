import * as d3 from "d3";

export function clearArrows() {
  const arrowLines = d3.selectAll(".arrow");

  arrowLines.transition().duration(800).style("opacity", 0);

  setTimeout(() => {
    arrowLines.remove();
  }, 1100);
}

export default clearArrows;
