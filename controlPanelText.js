import {
  fourGroupingsYPozTopText,
  fourGroupingsYPozBottomText,
  threeGroupingsYPozText,
  fourGroupingsXPozLeftText,
  fourGroupingsXPozRightText,
  threeGroupingsXPozMiddleText,
  threeGroupingsXPozLeftText,
  threeGroupingsXPozRightText,
  secondTextLineYAdd,
} from "./graphDimensions/graphDimensionsForce.js";

export const textFunctionCall = {
  groupDefault: defaultText,
  groupRegion: regionText,
  groupPopulation: populationText,
  groupCoal: coalText,
  groupRenewable: renewableText,
};

function clearExistingText() {
  let svg = d3.select("#forceViz");

  let textNodes = svg.selectAll("text");

  textNodes.remove();
}

function defaultText() {
  clearExistingText();
  let svg = d3.select("#forceViz");
}

function regionText() {
  clearExistingText();
  let svg = d3.select("#forceViz");
  const regionMidWest = "Midwest Region";
  const regionNorthEast = "Northeast Region";
  const regionSouth = "South Region";
  const regionWest = "West Region";

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

  svg.selectAll("text").attr("class", "forceChartGroupText");
}

function populationText() {
  clearExistingText();
  let svg = d3.select("#forceViz");
  const popCat4Text = "Population more than 11M";
  const popCat3Text = "Population between 6M and 11M";
  const popCat2Text = "Population between 6M and 3M";
  const popCat1Text = "Population less than 3M";

  svg
    .append("text")
    .text(popCat4Text)
    .attr("x", fourGroupingsXPozLeftText + 50)
    .attr("y", fourGroupingsYPozTopText)
    .attr("text-anchor", "middle");
  svg
    .append("text")
    .text(popCat3Text)
    .attr("x", fourGroupingsXPozRightText + 50)
    .attr("y", fourGroupingsYPozTopText)
    .attr("text-anchor", "middle");
  svg
    .append("text")
    .text(popCat2Text)
    .attr("x", fourGroupingsXPozRightText + 50)
    .attr("y", fourGroupingsYPozBottomText)
    .attr("text-anchor", "middle");
  svg
    .append("text")
    .text(popCat1Text)
    .attr("x", fourGroupingsXPozLeftText + 50)
    .attr("y", fourGroupingsYPozBottomText)
    .attr("text-anchor", "middle");

  svg.selectAll("text").attr("class", "forceChartGroupText");
}

function coalText() {
  clearExistingText();

  const noneTextOne = "No Coal";
  const noneTextTwo = "(0%)";
  const lowTextOne = "Low Coal ";
  const lowTextTwo = "(Between 0% and 25%) ";
  const highTextOne = "High Coal";
  const highTextTwo = "(Greater than 25%)";

  let svg = d3.select("#forceViz");

  svg
    .append("text")
    .text(noneTextOne)
    .attr("x", threeGroupingsXPozLeftText)
    .attr("y", threeGroupingsYPozText)
    .attr("text-anchor", "middle");
  svg
    .append("text")
    .text(noneTextTwo)
    .attr("x", threeGroupingsXPozLeftText)
    .attr("y", threeGroupingsYPozText + secondTextLineYAdd)
    .attr("text-anchor", "middle");

  svg
    .append("text")
    .text(lowTextOne)
    .attr("x", threeGroupingsXPozMiddleText)
    .attr("y", threeGroupingsYPozText)
    .attr("text-anchor", "middle");

  svg
    .append("text")
    .text(lowTextTwo)
    .attr("x", threeGroupingsXPozMiddleText)
    .attr("y", threeGroupingsYPozText + secondTextLineYAdd)
    .attr("text-anchor", "middle");

  svg
    .append("text")
    .text(highTextOne)
    .attr("x", threeGroupingsXPozRightText)
    .attr("y", threeGroupingsYPozText)
    .attr("text-anchor", "middle");
  svg
    .append("text")
    .text(highTextTwo)
    .attr("x", threeGroupingsXPozRightText)
    .attr("y", threeGroupingsYPozText + secondTextLineYAdd)
    .attr("text-anchor", "middle");

  svg.selectAll("text").attr("class", "forceChartGroupText");
}
function renewableText() {
  clearExistingText();

  const lowTextOne = "Low Renewables";
  const lowTextTwo = "(less than 8%)";
  const mediumTextOne = "Medium Renewables";
  const mediumTextTwo = "(between 8% and 15%)";
  const highTextOne = "High Renewables";
  const highTextTwo = "(greater than 15%)";

  let svg = d3.select("#forceViz");

  svg
    .append("text")
    .text(lowTextOne)
    .attr("x", threeGroupingsXPozLeftText)
    .attr("y", threeGroupingsYPozText)
    .attr("text-anchor", "middle");

  svg
    .append("text")
    .text(lowTextTwo)
    .attr("x", threeGroupingsXPozLeftText)
    .attr("y", threeGroupingsYPozText + secondTextLineYAdd)
    .attr("text-anchor", "middle");

  svg
    .append("text")
    .text(mediumTextOne)
    .attr("x", threeGroupingsXPozMiddleText)
    .attr("y", threeGroupingsYPozText)
    .attr("text-anchor", "middle");
  svg
    .append("text")
    .text(mediumTextTwo)
    .attr("x", threeGroupingsXPozMiddleText)
    .attr("y", threeGroupingsYPozText + secondTextLineYAdd)
    .attr("text-anchor", "middle");

  svg
    .append("text")
    .text(highTextOne)
    .attr("x", threeGroupingsXPozRightText)
    .attr("y", threeGroupingsYPozText)
    .attr("text-anchor", "middle");
  svg
    .append("text")
    .text(highTextTwo)
    .attr("x", threeGroupingsXPozRightText)
    .attr("y", threeGroupingsYPozText + secondTextLineYAdd)
    .attr("text-anchor", "middle");

  svg.selectAll("text").attr("class", "forceChartGroupText");
}

export default textFunctionCall;
