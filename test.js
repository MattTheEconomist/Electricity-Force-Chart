import { stateData } from "./data/stateData.js";

// console.log(stateData);

//Width and height
let groupingSelected = "groupDefault";
const width = 700;
const height = 500;

//Initialize a simple force layout, using the nodes and edges in dataset
let simulation = d3
  .forceSimulation(stateData)
  .force("charge", d3.forceManyBody().strength(1))
  .force(
    "x",
    d3.forceX().x((d) => {
      if (groupingSelected === "groupDefault") {
        // console.log("called default from force");
        return defaultX(d);
      }
      if (groupingSelected === "groupRegion") {
        console.log("called grouping from force");
        return regionGroupingsX(d);
      }
    })
  )
  .force(
    "y",
    d3.forceY().y((d) => {
      if (groupingSelected === "groupDefault") {
        return defaultY(d);
      }
      if (groupingSelected === "groupRegion") {
        return regionGroupingsY(d);
      }
    })
  )
  .force(
    "collision",
    d3.forceCollide().radius(function (d) {
      return radiusCalc(d.pctNation);
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
  .enter()
  .append("circle")
  .attr("r", (d) => {
    return radiusCalc(d.pctNation);
  })
  .style("fill", function (d, i) {
    return colors(i);
  });

//Add a simple tooltip
nodes.append("title").text(function (d) {
  return d.state;
});

//Every time the simulation "ticks", this will be called
simulation.on("tick", function () {
  nodes
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });
});

function radiusCalc(pct) {
  return pct * 3;
}

const groupingButtons = document.getElementsByClassName("groupingBtn");

Array.from(groupingButtons).forEach((el) => {
  el.addEventListener("click", changeGrouping);
});

function changeGrouping(el) {
  groupingSelected = el.currentTarget.id;

  console.log("grouping changed", groupingSelected);
  simulation.alpha(0.5).restart();
  simulation.force("x").initialize(stateData);
  simulation.force("y").initialize(stateData);
}

function regionGroupingsX(d) {
  console.log(d.region);

  if (d.region === "Northeast" || d.region === "South") {
    // hardcoded poz for now
    return 500;
  }
  if (d.region === "West" || d.region === "Midwest") {
    return 50;
  }

  // console.log(d.region);
}

function regionGroupingsY(d) {
  if (d.region === ("Northeast" || "Midwest")) {
    // hardcoded poz for now
    return 50;
  }
  if (d.region === ("West" || "South")) {
    return 300;
  }
}

function defaultX(d) {
  // return width / 2;
  return 350;
}

function defaultY(d) {
  return 250;
}
