import { graphDimensions } from "./graphDimensions.js";

const width = graphDimensions.width,
  height = graphDimensions.height,
  focalXdistance = graphDimensions.focalXdistance,
  focalYdistance = graphDimensions.focalYdistance;

export const textFunctionCall = {
  groupDefault: defaultText,
  //   groupRegion: regionText,
  //   groupPopulation: populationText,
  //   groupCoal: coalText,
  //   groupRenewable: renewableText,
};

let svg = d3.select("svg");

function defaultText() {
  //   d3.selectAll("text").remove();

  svg
    .selectAll("text")
    .append("text")
    .text("hello")
    .attr("x", 100)
    .attr("y", 100);

  console.log("hi");

  //   return null;
}

export default textFunctionCall;
