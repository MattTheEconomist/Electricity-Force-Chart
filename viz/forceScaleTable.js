import { radiusCalc } from "../graphDimensions/graphDimensionsForce.js";

const scaleSvg = d3
  .select("#forceScale")
  .append("svg")
  .attr("height", 200)
  .attr("width", 500);
//   .attr("fill", "green");

const circleData = [200, 500, 1000, 1500, 2000, 3000];

const marginLeft = 20;

const circleXPoz = {
  200: 20,
  500: 50,
  1000: 90,
  1500: 130,
  2000: 180,
  3000: 250,
};

scaleSvg
  .selectAll("circle")
  .data(circleData)
  .enter()
  .append("circle")
  .attr("r", (d) => {
    return radiusCalc(d);
  })
  .attr("cx", (d, i) => {
    let xPoz;
    xPoz = circleXPoz[d];
    return xPoz + marginLeft;
  })
  .attr("cy", 100)
  .attr("fill", "white")
  .attr("stroke", "grey")
  .attr("stroke-width", 2)
  .style("stroke-dasharray", "8, 3");

scaleSvg
  .selectAll(".scaleText")
  .data(circleData)
  .enter()
  .append("text")
  .attr("class", "scaleText")
  .text((d) => {
    return d;
  })
  .attr("x", (d) => {
    return circleXPoz[d];
  })
  .attr("y", 160)
  .fill("grey");

scaleSvg
  .select("#scaleTextTitle")
  .append("text")
  .text(() => {
    return "Total Electricity Generated (trillion BTU)";
  })
  .attr("x", 100)
  .attr("y", 200)
  //   .attr("class", "scaleText")
  .attr("id", "scaleTextTitle");

// scaleSvg
//   //   .select("#scaleTextTitle")
//   .insert("text")
//   .text(() => {
//     return "Total Electricity Generated (trillion BTU)";
//   })
//   .attr("x", 100)
//   .attr("y", 200)
//   //   .attr("class", "scaleText")
//   .attr("id", "scaleTextTitle");
