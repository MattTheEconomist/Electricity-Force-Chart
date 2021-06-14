import {
  fourGroupingsYPozTopText,
  fourGroupingsYPozBottomText,
  threeGroupingsYPozText,
  fourGroupingsXPozLeftText,
  fourGroupingsXPozRightText,
  threeGroupingsXPozMiddleText,
  threeGroupingsXPozLeftText,
  threeGroupingsXPozRightText,
} from "./graphDimensions/graphDimensionsForce.js";

export const textFunctionCall = {
  groupDefault: defaultText,
  groupRegion: regionText,
  groupPopulation: populationText,
  groupCoal: coalText,
  groupRenewable: renewableText,
};

function clearExistingText() {
  let svg = d3.select("svg");

  let textNodes = svg.selectAll("text");

  textNodes.remove();

  // // transition looks buggy
  // textNodes.transition().duration(250).style("opacity", 0);

  // setTimeout(() => {
  //   textNodes.remove();
  // }, 500);
}

function defaultText() {
  clearExistingText();
  let svg = d3.select("svg");
}

function regionText() {
  clearExistingText();
  let svg = d3.select("svg");
  const regionMidWest = "Midwest";
  const regionNorthEast = "Northeast";
  const regionSouth = "South";
  const regionWest = "West";

  svg
    .append("text")
    .text(regionMidWest)
    .attr("x", fourGroupingsXPozLeftText)
    .attr("y", fourGroupingsYPozTopText);
  svg
    .append("text")
    .text(regionNorthEast)
    .attr("x", fourGroupingsXPozRightText)
    .attr("y", fourGroupingsYPozTopText);
  svg
    .append("text")
    .text(regionSouth)
    .attr("x", fourGroupingsXPozRightText)
    .attr("y", fourGroupingsYPozBottomText);
  svg
    .append("text")
    .text(regionWest)
    .attr("x", fourGroupingsXPozLeftText)
    .attr("y", fourGroupingsYPozBottomText);
}

function populationText() {
  clearExistingText();
  let svg = d3.select("svg");
  const popCat4Text = "More than 11M";
  const popCat3Text = "Between 6M and 11M";
  const popCat2Text = "Between 6M and 3M";
  const popCat1Text = "Less than 3M";

  svg
    .append("text")
    .text(popCat4Text)
    .attr("x", fourGroupingsXPozLeftText)
    .attr("y", fourGroupingsYPozTopText);
  svg
    .append("text")
    .text(popCat3Text)
    .attr("x", fourGroupingsXPozRightText)
    .attr("y", fourGroupingsYPozTopText);
  svg
    .append("text")
    .text(popCat2Text)
    .attr("x", fourGroupingsXPozRightText)
    .attr("y", fourGroupingsYPozBottomText);
  svg
    .append("text")
    .text(popCat1Text)
    .attr("x", fourGroupingsXPozLeftText)
    .attr("y", fourGroupingsYPozBottomText);
}

function coalText() {
  clearExistingText();

  const noneText = "None (0%)";
  const lowText = "Low (Between 0% and 25%) ";
  const highText = "High (Greater than 25%)";

  let svg = d3.select("svg");

  svg
    .append("text")
    .text(noneText)
    .attr("x", threeGroupingsXPozLeftText)
    .attr("y", threeGroupingsYPozText);

  svg
    .append("text")
    .text(lowText)
    .attr("x", threeGroupingsXPozMiddleText)
    .attr("y", threeGroupingsYPozText);

  svg
    .append("text")
    .text(highText)
    .attr("x", threeGroupingsXPozRightText)
    .attr("y", threeGroupingsYPozText);
}
function renewableText() {
  clearExistingText();

  const lowText = "Low (less than 10%)";
  const mediumText = "Medium (less than 10%)";
  const highText = "High (less than 10%)";

  let svg = d3.select("svg");

  svg
    .append("text")
    .text(lowText)
    .attr("x", threeGroupingsXPozLeftText)
    .attr("y", threeGroupingsYPozText);

  svg
    .append("text")
    .text(mediumText)
    .attr("x", threeGroupingsXPozMiddleText)
    .attr("y", threeGroupingsYPozText);

  svg
    .append("text")
    .text(highText)
    .attr("x", threeGroupingsXPozRightText)
    .attr("y", threeGroupingsYPozText);
}

export default textFunctionCall;
