import { worstColor, medianColor, bestColor } from "../colorScales.js";

const width = 350,
  height = 150,
  textRight = 10,
  circleLeft = 45,
  circleTop = 70,
  circleBetween = 90,
  titleLeft = 40;

const colorTextBottom = 30;
const circleRadius = 25;

const colorSvg = d3
  .select("#colorScale")
  .append("svg")
  .attr("height", height)
  .attr("width", width);
//   .style("background-color", "green");

let circleXPoz = [];

circleXPoz.push(width / 2 - circleBetween);
circleXPoz.push(width / 2);
circleXPoz.push(width / 2 + circleBetween);

console.log(circleXPoz);

const colorArray = [worstColor, medianColor, bestColor];

colorSvg
  .selectAll("circle")
  .data(circleXPoz)
  .enter()
  .append("circle")
  .attr("r", circleRadius)
  .attr("cx", (d, i) => {
    return d - circleLeft;
  })
  .attr("cy", circleTop)
  .attr("fill", (d, i) => colorArray[i]);

const textArray = ["Dirtiest Electricity", "", "Cleanest Electricity"];

colorSvg
  .selectAll(".colorText")
  .data(textArray)
  .enter()
  .append("text")
  .attr("class", "colorText scaleText")
  .text((d) => {
    return d;
  })
  .attr("x", (d, i) => {
    return circleXPoz[i] - circleLeft + textRight;
  })
  .attr("y", height - colorTextBottom)
  .attr("text-anchor", "middle");

colorSvg
  .append("text")
  .text("Electric Cleanliness (C02 per BTU) ")
  .attr("x", width / 2 - titleLeft)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .attr("id", "scaleTextTitle");
