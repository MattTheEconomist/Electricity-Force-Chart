import { stateData } from "../data/stateData.js";

const graphMargin = { top: 20, right: 20, bottom: 70, left: 40 };
const graphDimensions_rankings = {
  //   height: 150,
  height: 200 - graphMargin.top - graphMargin.bottom,
  width: 550 - graphMargin.right - graphMargin.left,
  barWidth: 9,
  barToBar: 8,
};

// svg.

export function graphRankings(column, State, svgSelector) {
  const stateDataSorted = stateData.sort((a, b) =>
    a[column] > b[column] ? 1 : -1
  );
  const yData = stateDataSorted.map((row) => row[column]);

  // console.log(yData);

  const height = graphDimensions_rankings.height;
  const width = graphDimensions_rankings.width;

  const barClassName = `bar_${column}`;

  d3.selectAll(`.${barClassName}`).remove();

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(yData)])
    .range([0, height]);

  const rankTooltip = d3
    .select("body")
    .append("div")
    .attr("class", "rankTooltip")
    .style("width", "100px")
    .style("height", "100px")
    .style("position", "absolute")
    .style("opacity", 0);

  svgSelector
    .selectAll("bar")
    .data(stateDataSorted)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * graphDimensions_rankings.barToBar)
    .attr("fill", (d) => {
      if (d.State === State) {
        return "#48E0EB";
      } else {
        return "blue";
      }
    })
    .attr("y", (d, i) => height - yScale(yData[i]) + graphMargin.top)
    .attr("width", 6)
    .attr("height", (d, i) => yScale(yData[i]) + 20)
    .classed(barClassName, true)
    .on("mouseover", (d) => {
      rankTooltip
        .style("opacity", 0.95)
        .style("left", d3.event.pageX + 5 + "px")
        .style("top", d3.event.pageY - 60 + "px")
        // .html(d.name);
        .html(tooltipRankText(d, column));
    })
    .on("mouseout", () => {
      rankTooltip.style("opacity", 0);
    });

  arrowAxis(svgSelector, column);
}

function arrowAxis(svgSelector, column) {
  const arrowClassName = `line_${column}`;

  let endingXBuffer;

  if (column === "totalConsumed") {
    endingXBuffer = 135;
  }
  if (column === "electric_cleanliness") {
    endingXBuffer = 140;
  }

  d3.selectAll(`.${arrowClassName}`).remove();

  const startingX = 100;
  const endingX = startingX + endingXBuffer;
  const endingY = 175;
  const arrowCurve = 15;
  const textMargin = 5;

  svgSelector
    .append("line")
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x1", endingX - arrowCurve)
    .attr("y1", endingY - arrowCurve)
    .attr("x2", endingX)
    .attr("y2", endingY)
    .attr("class", `${arrowClassName}`);

  svgSelector
    .append("line")
    .style("stroke", "black")
    .style("stroke-width", 1)
    .attr("x1", endingX - arrowCurve)
    .attr("y1", endingY + arrowCurve)
    .attr("x2", endingX)
    .attr("y2", endingY)
    .attr("class", `${arrowClassName}`);

  svgSelector
    .append("text")
    .text(() => {
      let axisText;

      if (column === "electric_cleanliness") {
        axisText = "Dirtier Electricity";
      }

      if (column === "totalConsumed") {
        axisText = "More Electricity ";
      }
      return axisText;
    })
    .attr("dx", startingX)
    .attr("dy", endingY + textMargin)
    .attr("class", `${arrowClassName} arrowText`);
}

function tooltipRankText(d, column) {
  let quantity;

  const state = d.name;

  if (column === "totalConsumed") {
    quantity = d.totalConsumed;
    // quantity =
    quantity = Math.round(quantity);

    return `<span class="stateNameTooltip">${state}</span> </br> produces ${quantity} BTU of Electricity`;
  }
  if (column === "electric_cleanliness") {
    quantity = d.electric_cleanliness;
    quantity = Math.round(quantity);
    return `<span class="stateNameTooltip">${state}</span> </br>has electric cleanliness of ${quantity} C02/BTU`;
  }

  // return `${state} ${units} of ${quantity} `;
}
