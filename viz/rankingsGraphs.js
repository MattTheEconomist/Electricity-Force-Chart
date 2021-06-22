import { stateData } from "../data/stateData.js";

const graphMargin = { top: 20, right: 20, bottom: 70, left: 40 };
const graphDimensions_rankings = {
  //   height: 150,
  height: 200 - graphMargin.top - graphMargin.bottom,
  width: 550 - graphMargin.right - graphMargin.left,
  barWidth: 7,
  barToBar: 8,
};

// svg.

export function graphRankings(column, State, svgSelector) {
  const stateDataSorted = stateData.sort((a, b) =>
    a[column] > b[column] ? 1 : -1
  );
  const yData = stateDataSorted.map((row) => row[column]);

  console.log(yData);

  const height = graphDimensions_rankings.height;
  const width = graphDimensions_rankings.width;

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(yData)])
    .range([0, height]);

  console.log(height - yScale(100), height - yScale(200));

  svgSelector
    .selectAll("bar")
    .data(stateDataSorted)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * graphDimensions_rankings.barToBar)
    .attr("fill", (d) => {
      if (d.State === State) {
        return "red";
      } else {
        return "blue";
      }
    })
    .attr("y", (d, i) => height - yScale(yData[i]) + graphMargin.top)

    .attr("width", 6)
    .attr("height", (d, i) => yScale(yData[i]) + 20);
}
