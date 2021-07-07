import { stateData } from "../data/stateData.js";

import { xPositionCall, yPositionCall } from "../controlPanelGroupings.js";

import { textFunctionCall } from "../controlPanelText.js";

import {
  graphDimensions,
  radiusCalc,
} from "../graphDimensions/graphDimensionsForce.js";

import {
  colorsCleanlinessBest,
  colorsCleanlinessWorst,
} from "../colorScales.js";

const width = graphDimensions.width,
  height = graphDimensions.height,
  focalXdistance = graphDimensions.focalXdistance,
  focalYdistance = graphDimensions.focalYdistance;

let groupingSelected = "groupDefault";

let selectedStateFromForce = "XX";

//Initialize a simple force layout, using the nodes and edges in dataset

let simulation = d3
  .forceSimulation(stateData)
  // .forceSimulation(testData)
  .force("charge", d3.forceManyBody().strength(1.8))
  .force(
    "x",
    d3.forceX().x((d) => {
      return xPositionCall[groupingSelected](d);
      // return 100;
    })
  )
  .force(
    "y",
    d3.forceY().y((d) => {
      return yPositionCall[groupingSelected](d);
      // return 100;
    })
  )
  .force(
    "collision",
    d3.forceCollide().radius(function (d) {
      return radiusCalc(d.totalGenerated);
    })
  );

const colors = d3.scaleOrdinal(d3.schemeCategory10);

//Create SVG element
const forceSvg = d3
  .select("#forceVizContainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("id", "forceViz");

const forceTooltip = d3
  .select("body")
  .append("div")
  .attr("id", "forceTooltip")
  .style("position", "absolute")
  .style("opacity", 0);

//Create nodes as circles
const nodes = forceSvg
  .selectAll("circle")
  .attr("id", "forceSVG")
  .data(stateData)
  // .data(testData)
  .enter()
  .append("circle")
  .attr("class", "forceCircle")
  .attr("id", (d) => {
    return d.State;
  })
  .attr("r", (d) => {
    return radiusCalc(d.totalGenerated);
  })
  .style("fill", function (d, i) {
    const cleanliness = d.electric_cleanliness;
    let saturation;

    if (cleanliness > 43) {
      saturation = colorsCleanlinessWorst(cleanliness);
      return `hsla(0, ${saturation}%, 50%, 1)`;
    }
    if (cleanliness < 43) {
      saturation = colorsCleanlinessBest(cleanliness);
      return `hsla(110, ${saturation}%, 50%, 1)`;
    }
  })
  .on("mouseover", (d) => {
    forceTooltip
      .style("opacity", 0.9)
      .style("left", d3.event.pageX + 5 + "px")
      .style("top", d3.event.pageY - 50 + "px")
      .html(forceTooltipText(d));
  })
  .on("mouseout", () => {
    forceTooltip.style("opacity", 0);
  })
  .on("dblclick", function (d1) {
    const activeState = d1.State;

    // d3.select(this)
    //   .attr("class", "forceCircle active")
    //   .transition()
    //   .duration(1500)
    //   .attr("r", 900);

    const selectedStateX = this.cx.baseVal.value;
    // const selectedStateY = this.cy.baseVal.value;

    // simulation.force(
    //   "x",
    //   d3.forceX().x((d) => {
    //     if (d.State !== activeState) {
    //       const stateX = d3.select(`#${d.State}`)._groups[0][0].cx.baseVal
    //         .value;

    //       if (stateX > selectedStateX) {
    //         return 1500;
    //       } else {
    //         return -1000;
    //       }
    //     } else {
    //       return selectedStateX;
    //     }
    //   })
    // );

    // d3.selectAll(".forceChartGroupText")
    //   .transition()
    //   .duration(500)
    //   .style("opacity", 0);
    // simulation.alpha(0.3).restart();

    // setTimeout(() => {
    //   d3.select("#entireForceContainer")
    //     .attr("class", "hideMe")
    //     // .attr("height", 0);
    //     .style("height", 0);
    //   d3.select("#entireSankeyContainer").classed("hideMe", false);
    // }, 1500);

    // selectedStateFromForce = activeState;
  });

//Every time the simulation "ticks", this will be called
simulation.on("tick", ticked);

function ticked() {
  nodes
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });
}

const groupingButtons = document.getElementsByClassName("groupingBtn");

Array.from(groupingButtons).forEach((el) => {
  el.addEventListener("click", changeGrouping);
});

function changeGrouping(el) {
  groupingSelected = el.currentTarget.id;

  textFunctionCall[groupingSelected]();

  simulation.alpha(0.7).restart();
  simulation.force("x").initialize(stateData);
  simulation.force("y").initialize(stateData);
}

function forceTooltipText(d) {
  forceTooltip.style("background-color", "white");

  const stateName = d.name;
  const totalElectricity = Math.round(d.totalGenerated);
  const electric_cleanliness = d.electric_cleanliness.toFixed(2);

  return `<span id="forceTooltipState"> ${stateName}</span>

  <table>
  <tr>
  <td>Electricity Generated: </td>
  <td>${totalElectricity}</td>
  </tr>
  <tr>
  <td>Electric Cleanliness: </td>
  <td>${electric_cleanliness}</td>
  </tr>
  </table>`;
}

export { selectedStateFromForce, simulation };
