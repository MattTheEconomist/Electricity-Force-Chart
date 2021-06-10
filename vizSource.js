import { stateData } from "./data/stateData.js";

import { xPositionCall, yPositionCall } from "./controlPanelGroupings.js";

import { textFunctionCall } from "./controlPanelText.js";

import { graphDimensions } from "./graphDimensions.js";

const width = graphDimensions.width,
  height = graphDimensions.height,
  focalXdistance = graphDimensions.focalXdistance,
  focalYdistance = graphDimensions.focalYdistance;

let groupingSelected = "groupDefault";

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
      return radiusCalc(d.electricityGenerated);
    })
  );

const colors = d3.scaleOrdinal(d3.schemeCategory10);

//Create SVG element
const svg = d3
  .select("#forceViz")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

//Create nodes as circles
const nodes = svg
  .selectAll("circle")
  .attr("id", "forceSVG")
  .data(stateData)
  // .data(testData)
  .enter()
  .append("circle")
  .attr("r", (d) => {
    return radiusCalc(d.electricityGenerated);
  })
  .style("fill", function (d, i) {
    return colors(i);
  });

//Add a simple tooltip
nodes.append("title").text(function (d) {
  return d.State;
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

function radiusCalc(val) {
  return val / 90;
  // return val;
}

const groupingButtons = document.getElementsByClassName("groupingBtn");

Array.from(groupingButtons).forEach((el) => {
  el.addEventListener("click", changeGrouping);
});

function changeGrouping(el) {
  groupingSelected = el.currentTarget.id;

  textFunctionCall[groupingSelected]();

  // console.log("grouping changed", groupingSelected);
  simulation.alpha(0.7).restart();
  simulation.force("x").initialize(stateData);
  simulation.force("y").initialize(stateData);
}
