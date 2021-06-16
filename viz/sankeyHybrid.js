import { stateData } from "../data/stateData.js";

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = 450 - margin.left - margin.right,
  height = 480 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#cornerSankey")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Color scale used
let color = d3.scaleOrdinal(d3.schemeCategory20);

// Set the sankey diagram properties
let sankey = d3.sankey().nodeWidth(36).nodePadding(290).size([width, height]);

const otherData = {
  nodes: [
    { node: 0, name: "node0" },
    { node: 1, name: "node1" },
    { node: 2, name: "node2" },
    { node: 3, name: "node3" },
    { node: 4, name: "node4" },
    // { node: 5, name: "node5" },
  ],
  links: [
    { source: 0, target: 3, value: 1 },
    { source: 1, target: 3, value: 1 },
    // { source: 2, target: 3, value: 1 },
    // { source: 3, target: 2, value: 1 },
    { source: 3, target: 2, value: 1 },
    { source: 3, target: 4, value: 1 },
    // { source: 3, target: 5, value: 1 },
  ],
};

function sankeyPreProcessing(State) {
  const singleState = stateData.filter((row) => row.State === State);

  let formattedData = {
    nodes: [
      { node: "gen_petroleum_pct", name: "gen_petroleum_pct" },
      { node: "gen_naturalGas_pct", name: "gen_naturalGas_pct" },
      { node: "gen_coal_pct", name: "gen_coal_pct" },
      { node: "gen_nuclear_pct", name: "gen_nuclear_pct" },
      { node: "gen_hydroelectric_pct", name: "gen_hydroelectric_pct" },
      {
        node: "gen_nonhydroRenewables_pct",
        name: "gen_nonhydroRenewables_pct",
      },
      { node: "totalElectricity", name: "totalElectricity" },
      { node: "cons_rejected_pct", name: "cons_rejected_pct" },
      { node: "cons_residential_pct", name: "cons_residential_pct" },
      { node: "cons_commercial_pct", name: "cons_commercial_pct" },
      { node: "cons_industrial_pct", name: "cons_industrial_pct" },
    ],
    links: [
      { source: "gen_petroleum_pct", target: "totalElectricity", value: 1 },
      { source: "gen_naturalGas_pct", target: "totalElectricity", value: 1 },
      { source: "gen_coal_pct", target: "totalElectricity", value: 1 },
      { source: "gen_nuclear_pct", target: "totalElectricity", value: 1 },
      { source: "gen_hydroelectric_pct", target: "totalElectricity", value: 1 },
      {
        source: "gen_nonhydroRenewables_pct",
        target: "totalElectricity",
        value: 1,
      },
      { source: "totalElectricity", target: "cons_rejected_pct", value: 1 },
      { source: "totalElectricity", target: "cons_residential_pct", value: 1 },
      { source: "totalElectricity", target: "cons_commercial_pct", value: 1 },
      { source: "totalElectricity", target: "cons_industrial_pct", value: 1 },
    ],
  };

  // return formattedData;
  return otherData;
}

// const graph = sankeyPreProcessing("TX");
// const graph = otherData;

// console.log(graph);

// sankey.nodes(graph.nodes).links(graph.links).layout(1);

// // add in the links
// var link = svg
//   .append("g")
//   .selectAll(".link")
//   .data(graph.links)
//   .enter()
//   .append("path")
//   .attr("class", "link")
//   .attr("d", sankey.link())
//   .style("stroke-width", function (d) {
//     return Math.max(1, d.dy);
//   })
//   .sort(function (a, b) {
//     return b.dy - a.dy;
//   });

// // add in the nodes
// var node = svg
//   .append("g")
//   .selectAll(".node")
//   .data(graph.nodes)
//   .enter()
//   .append("g")
//   .attr("class", "node")
//   .attr("transform", function (d) {
//     return "translate(" + d.x + "," + d.y + ")";
//   });

// // add the rectangles for the nodes
// node
//   .append("rect")
//   .attr("height", function (d) {
//     return d.dy;
//   })
//   .attr("width", sankey.nodeWidth())
//   .style("fill", function (d) {
//     return (d.color = color(d.name.replace(/ .*/, "")));
//   })
//   .style("stroke", function (d) {
//     return d3.rgb(d.color).darker(2);
//   })
//   // Add hover text
//   .append("title")
//   .text(function (d) {
//     return d.name + "\n" + "There is " + d.value + " stuff in this node";
//   });

// // add in the title for the nodes
// node
//   .append("text")
//   .attr("x", -6)
//   .attr("y", function (d) {
//     return d.dy / 2;
//   })
//   .attr("dy", ".35em")
//   .attr("text-anchor", "end")
//   .attr("transform", null)
//   .text(function (d) {
//     return d.name;
//   })
//   .filter(function (d) {
//     return d.x < width / 2;
//   })
//   .attr("x", 6 + sankey.nodeWidth())
//   .attr("text-anchor", "start");

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// load the data
d3.json(
  // "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_sankey.json",
  "../data/fakeSankeyData.json",
  // "../data/realSankeyData.json",
  // "../data/stateData.json",
  // // otherData,
  function (error, graph) {
    // Constructs a new Sankey generator with the default settings.

    const otherData = {
      nodes: [
        { node: 0, name: "node0" },
        { node: 1, name: "node1" },
        { node: 2, name: "node2" },
        { node: 3, name: "node3" },
        // { node: 4, name: "node4" },
        // { node: 5, name: "node5" },
      ],
      links: [
        { source: 0, target: 3, value: 1 },
        { source: 1, target: 3, value: 1 },
        { source: 2, target: 3, value: 1 },
        // { source: 3, target: 2, value: 1 },
        // { source: 3, target: 2, value: 1 },
        // { source: 3, target: 4, value: 1 },
        // { source: 3, target: 5, value: 1 },
      ],
    };

    graph = otherData;
    // graph = d3.hierarchy(otherData);

    sankey.nodes(graph.nodes).links(graph.links).layout(1);

    console.log(graph.links);
    // sankey.nodes(thing.nodes).links(thing.links).layout(1);
    // sankey.nodes(otherData.nodes).links(otherData.links).layout(1);

    function otherLink(d) {
      let curvature = 0.5;
      // d.dy = Math.abs(d.dy);

      let thing = d.dy;
      thing = Math.abs(thing);

      let x0 = d.source.x + d.source.dx,
        x1 = d.target.x,
        xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = d.source.y + d.sy + thing / 2,
        y1 = d.target.y + d.ty + thing / 2;

      console.log(y1);

      if (y1 == 267.1) {
        return `M ${x0}, ${y0} C ${x2}, ${y0} ${x3}, ${y1} ${x1}, ${y1}`;
      }

      if (y1 < 270) {
        // y1 = y1 - 0.5 * d.dy;
        // y1 = y1 + 1 * d.dy;
        // y1 = y1 - 1 * d.dy;
        y1 = y1 - 4 * d.dy;
        // y1 = y1 - 1 * d.dy;
        // y1 = y1 - 1 * d.dy;
      }
      if (y1 > 270) {
        y1 = y1 + 2 * d.dy;
      }

      return `M ${x0}, ${y0} C ${x2}, ${y0} ${x3}, ${y1} ${x1}, ${y1}`;
    }

    // add in the links
    var link = svg
      .append("g")
      .selectAll(".link")
      .data(graph.links)
      .enter()
      .append("path")
      .attr("class", "link")
      // .attr("d", sankey.link())
      .attr("d", (d) => otherLink(d))
      // .attr("d", d3.sankeyLinkHorizontal())
      .style("stroke-width", function (d) {
        return Math.abs(d.dy);
      });

    // add in the nodes
    var node = svg
      .append("g")
      .selectAll(".node")
      .data(graph.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        // return `translate(  ${d.x}  ,  ${d.y - 50}  )`;
        return `translate(  ${d.x}  ,  ${d.y}  )`;
      });

    // add the rectangles for the nodes
    node
      .append("rect")
      .attr("height", function (d) {
        let testHeight = d.dy;

        if (testHeight < 0) {
          testHeight = testHeight * -1;
        }

        return testHeight;
      })
      .attr("width", sankey.nodeWidth())
      .style("fill", function (d) {
        return (d.color = color(d.name.replace(/ .*/, "")));
      })
      .style("stroke", function (d) {
        return d3.rgb(d.color).darker(2);
      });

    // add in the title for the nodes
    node
      .append("text")
      .attr("x", -6)
      .attr("y", function (d) {
        return d.dy / 2;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) {
        return d.name;
      })
      .filter(function (d) {
        return d.x < width / 2;
      })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");
  }
);
