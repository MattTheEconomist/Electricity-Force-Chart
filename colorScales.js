import { stateData } from "./data/stateData.js";

const worstColor = "hsla(0, 100%, 50%, 1)";
const medianColor = "hsla(110, 0%, 50%, 1)";
const bestColor = "hsla(110, 100%, 50%, 1)";

// changes saturation level as you increase electric cleanliness

export const colorsCleanlinessBest = d3
  .scaleLinear()
  .domain([0, 43])
  .range([0, 100]);

export const colorsCleanlinessWorst = d3
  .scaleLinear()
  .domain([42, 84])
  .range([0, 100]);
