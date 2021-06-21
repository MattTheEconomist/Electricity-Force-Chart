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

// load the data
d3.json(
  // "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_sankey.json",
  "../data/fakeSankeyData.json",
  function (error, graph) {
    const otherData = {
      nodes: [
        { node: 3, name: "gen_coal" },
        { node: 4, name: "gen_naturalGas" },
        { node: 2, name: "gen_nuclear" },
        { node: 0, name: "gen_nonHydro" },
        { node: 1, name: "gen_hydro" },
        { node: 5, name: "totalElectric" },
      ],
      links: [
        { source: 0, target: 5, value: 0.4 },
        { source: 1, target: 5, value: 0.1 },
        { source: 2, target: 5, value: 0.3 },
        { source: 4, target: 5, value: 0.2 },
      ],
    };

    graph = otherData;

    sankey.nodes(graph.nodes).links(graph.links).layout(1);

    console.log(graph.links);

    let everyDY = graph.links.map((el) => Math.abs(el.dy));

    console.log(everyDY);

    function otherLink(d) {
      let curvature = 0.5;

      let thing = d.dy;
      thing = Math.abs(thing);

      let x0 = d.source.x + d.source.dx,
        x1 = d.target.x,
        xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = d.source.y + d.sy,
        // y1 = Math.round(d.target.y + d.ty + thing / 2, 0);
        y1 = d.target.y + d.ty + thing / 2;

      y1 = 100 + (thing * 0.5 * thing) / 190;
      y0 = y0 / 2;

      let finalString = `M ${x0}, ${y0} C ${x2}, ${y0} ${x3}, ${y1} ${x1}, ${y1}`;

      return finalString;
    }

    // add in the links
    var link = svg
      .append("g")
      .selectAll(".link")
      .data(graph.links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => otherLink(d))
      // .attr("d", sankey.link())
      .style("stroke-width", function (d) {
        return Math.abs(d.dy) / 5;
        // return 10;
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

        return testHeight / 2;
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
        return d.x < width / 3;
      })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");
  }
);
