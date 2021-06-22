import { stateData } from "../data/stateData.js";

const svg = d3.select("#totalPowerContainer").append("svg");

const graphDimensions_rankings = {
  height: 150,
  width: 500,
  barWidth: 7,
  barToBar: 8,
};

function graphRankings(column) {
  let yData = stateData.map((row) => row[column]);
  yData = yData.sort((a, b) => a - b);

  const height = graphDimensions_rankings.height;
  const width = graphDimensions_rankings.width;

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(yData)])
    // .range([height, 0]);
    .range([0, height]);

  //   console.log(yScale(100), yScale(200));
  console.log(height - yScale(100), height - yScale(200));

  console.log(yData);

  svg
    .selectAll("bar")
    .data(yData)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 6)
    // .attr("y", (d) => d / 100)
    // .attr("y", (d) => yScale(d))
    // .attr("y", (d) => yScale(d) + height)

    .attr("y", (d) => height - yScale(d))
    .attr("width", 6)
    .attr("height", (d) => yScale(d));
  // .attr("height", (d) => height - yScale(d));
  // .attr("height", (d) => yScale(d) - height);
  // .attr("height", (d) => (yScale(d) - height) * -1);
}

graphRankings("totalConsumed");
