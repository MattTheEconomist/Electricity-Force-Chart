import { stateData } from "./data/stateData.js";

const worstColor = "hsla(0, 100%, 50%, 1)";
const medianColor = "hsla(110, 0%, 50%, 1)";
const bestColor = "hsla(110, 100%, 50%, 1)";

const indexTicks = d3.ticks(0, 50, 50);

export const colorsCleanlinessBest = d3
  .scaleLinear()
  //   .domain(d3.ticks(0, 43, 25))
  .domain([0, 43])
  .range([0, 100]);

export const colorsCleanlinessWorst = d3
  .scaleLinear()
  //   .domain(d3.ticks(43, 84, 25))
  .domain([42, 84])
  .range([0, 100]);

// console.log(indexTicks);
