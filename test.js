import { stateData } from "./data/stateData.js";

console.log(stateData);

//Width and height
const w = 900;
const h = 500;

//Initialize a simple force layout, using the nodes and edges in dataset
const force = d3
  .forceSimulation(stateData)
  .force("charge", d3.forceManyBody().strength(1))
  .force(
    "x",
    d3.forceX().x((d) => {
      if (d.region === "South") {
        return 40;
      } else {
        return 300;
      }
    })
  )

  .force(
    "y",
    d3.forceY().y((d) => {
      return 100;
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
const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

//Create nodes as circles
const nodes = svg
  .selectAll("circle")
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
force.on("tick", function () {
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
