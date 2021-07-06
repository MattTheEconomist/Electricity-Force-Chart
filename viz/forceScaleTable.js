import { radiusCalc } from "../graphDimensions/graphDimensionsForce.js";

const scaleSvgDimensions = {
  width: 320,
  height: 150,
  textLeft: 50,
  circleRight: 5,
  circleTop: 70,
  scaleTextBottom: 30,
};

const scaleSvg = d3
  .select("#forceScale")
  .append("svg")
  .attr("height", scaleSvgDimensions.height)
  .attr("width", scaleSvgDimensions.width);

// .style("background-color", "green");

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
    return circleXPoz[d] - scaleSvgDimensions.circleRight;
  })
  .attr("cy", scaleSvgDimensions.circleTop)
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
    return circleXPoz[d] - scaleSvgDimensions.circleRight;
  })
  .attr("y", scaleSvgDimensions.height - scaleSvgDimensions.scaleTextBottom)
  .attr("text-anchor", "middle");
// .stroke("grey");

scaleSvg
  .append("text")
  .text("Total Electricity Generated (trillion BTU)")
  .attr("x", scaleSvgDimensions.width / 2 - 12)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .attr("id", "scaleTextTitle");
