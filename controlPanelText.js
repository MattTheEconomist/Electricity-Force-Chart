import {
  graphDimensions,
  fourGroupingsYPozTopText,
  fourGroupingsYPozBottomText,
  threeGroupingsYPozText,
  fourGroupingsXPozRight,
  fourGroupingsXPozLeft,
  fourGroupingsYPozTop,
  fourGroupingsYPozBottom,
  threeGroupingsXPozMiddle,
  threeGroupingsYPoz,
  width,
  height,
  focalXdistance,
  focalYdistance,
  fourGroupingsXPozLeftText,
  fourGroupingsXPozRightText,
} from "./graphDimensions.js";

export const textFunctionCall = {
  groupDefault: defaultText,
  groupRegion: regionText,
  groupPopulation: populationText,
  groupCoal: coalText,
  groupRenewable: renewableText,
};

function clearExistingText() {
  let svg = d3.select("svg");

  // add transition later
  svg.selectAll("text").remove();
}

function defaultText() {
  let svg = d3.select("svg");
}

function regionText() {
  let svg = d3.select("svg");
  svg.append("text").text("hello").attr("x", 20).attr("y", 20);
}

function populationText() {
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
  let svg = d3.select("svg");
  svg.append("text").text("hello").attr("x", 20).attr("y", 20);
}
function renewableText() {
  let svg = d3.select("svg");
  svg.append("text").text("hello").attr("x", 20).attr("y", 20);
}

export default textFunctionCall;
