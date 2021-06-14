import { sankeyDimensions } from "../graphDimensions/graphDimensionsSankey.js";

import { stateData } from "../data/stateData.js";

const height = sankeyDimensions.height;
const width = sankeyDimensions.width;

const svg = d3
  .select("#cornerSankey")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g");

const texasData = stateData.filter((row) => {
  return row.State === "TX";
});

// console.log(texasData);

// create dynamic version later
const sankeyData = {
  nodes: [
    { name: "gen_naturalGas_pct" },
    { name: "gen_coal_pct" },
    { name: "gen_nuclear_pct" },
    { name: " gen_hydroelectric_pct " },
    { name: "gen_nonhydroRenewables_pct" },
    { name: "totalElectricity " },
    { name: "cons_rejected_pct" },
    { name: "cons_residential_pct" },
    { name: "cons_commercial_pct" },
    { name: "cons_industrial_pct " },
  ],
  links: [
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

const { nodes, links } = sankeyData;

let sankey = d3.sankey().nodes(nodes).links(links);

svg
  .append("g")
  .attr("stroke", "#000")
  .selectAll("rect")
  .data(nodes)
  .join("rect")
  //   .attr("x", (d) => d.x0)
  //   .attr("y", (d) => d.y0)
  //   .attr("height", (d) => d.y1 - d.y0)
  //   .attr("width", (d) => d.x1 - d.x0)
  .attr("x", (d) => d.x0)
  .attr("y", (d) => d.y0)
  .attr("height", (d) => 100)
  .attr("width", (d) => 20)
  .attr("fill", "black");
