import { sankeyDimensions } from "../graphDimensions/graphDimensionsSankey.js";

const sankeyWidth = sankeyDimensions.width;

const svgLabels = d3.select("#sankeyLabels").append("svg");

svgLabels.attr("height", 50).attr("width", sankeyWidth);
//   .style("background-color", "green");

const textYPoz = 20,
  marginRight = 150;

// const generationText
svgLabels
  .append("text")
  .text("Generation")
  .attr("dx", 0)
  .attr("dy", textYPoz)
  .attr("class", "sankeyLabelText");

svgLabels
  .append("text")
  .text("Consumption")
  .attr("dx", sankeyWidth)
  .attr("dy", textYPoz)
  .attr("class", "sankeyLabelText")
  .attr("text-anchor", "end");

svgLabels;
// .attr("fill", "green")
// .style("background-color", "green");
