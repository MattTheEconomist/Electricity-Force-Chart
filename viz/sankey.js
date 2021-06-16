import { sankeyDimensions } from "../graphDimensions/graphDimensionsSankey.js";

import { stateData } from "../data/stateData.js";

const height = sankeyDimensions.height;
const width = sankeyDimensions.width;

// const svg = d3
//   .select("#cornerSankey")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .append("g");

const texasData = stateData.filter((row) => {
  return row.State === "TX";
});

// console.log(texasData);

// const sankeyData = {
//   nodes: [
//     { name: "All Patients" },
//     { name: "Station 1" },
//     { name: "Station 2" },
//     { name: "Station 3" },
//     { name: "Discharge" },
//     { name: "Obs Admission" },
//     { name: "Full Admission" },
//   ],
//   links: [
//     { source: "All Patients", target: "Station 1", value: "3.043" },
//     { source: "All Patients", target: "Station 2", value: "1.983" },
//     { source: "All Patients", target: "Station 3", value: "1.703" },
//     { source: "Station 1", target: "Discharge", value: "1.725" },
//     { source: "Station 2", target: "Discharge", value: "1.095" },
//     { source: "Station 3", target: "Discharge", value: "1.652" },
//     { source: "Station 1", target: "Obs Admission", value: "0.610" },
//     { source: "Station 2", target: "Obs Admission", value: "0.424" },
//     { source: "Station 3", target: "Obs Admission", value: "0.024" },
//     { source: "Station 1", target: "Full Admission", value: "0.708" },
//     { source: "Station 2", target: "Full Admission", value: "0.464" },
//     { source: "Station 3", target: "Full Admission", value: "0.027" },
//   ],
// };

// // create dynamic version later
// const sankeyData = {
//   nodeData: [
//     { name: "gen_naturalGas_pct" },
//     { name: "gen_coal_pct" },
//     { name: "gen_nuclear_pct" },
//     { name: " gen_hydroelectric_pct " },
//     { name: "gen_nonhydroRenewables_pct" },
//     { name: "totalElectricity " },
//     { name: "cons_rejected_pct" },
//     { name: "cons_residential_pct" },
//     { name: "cons_commercial_pct" },
//     { name: "cons_industrial_pct " },
//   ],
//   linkData: [
//     { source: "gen_naturalGas_pct", target: "totalElectricity", value: 1 },
//     { source: "gen_coal_pct", target: "totalElectricity", value: 1 },
//     { source: "gen_nuclear_pct", target: "totalElectricity", value: 1 },
//     { source: "gen_hydroelectric_pct", target: "totalElectricity", value: 1 },
//     {
//       source: "gen_nonhydroRenewables_pct",
//       target: "totalElectricity",
//       value: 1,
//     },
//     { source: "totalElectricity", target: "cons_rejected_pct", value: 1 },
//     { source: "totalElectricity", target: "cons_residential_pct", value: 1 },
//     { source: "totalElectricity", target: "cons_commercial_pct", value: 1 },
//     { source: "totalElectricity", target: "cons_industrial_pct", value: 1 },
//   ],
// };

// const { nodeData, linkData } = sankeyData;

// hardcoded x and y version
var nodes = [
  { id: 0, x: 10, y: 10 },
  { id: 1, x: 600, y: 10 },
];
var links = [{ source: 0, target: 1 }];

var sankey = d3.sankey().nodeWidth(40).nodePadding(40).size([width, height]);

sankey.nodes(nodes).links(links);

// console.log(sankeyData.nodes);

// // add in the nodes
// var node = svg
//   .append("g")
//   .selectAll(".node")
//   .data(nodes)
//   // .data(sankey(sankeyData.nodes))
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
//     // return d.dy;
//     return 40;
//   })
//   // .attr("width", sankey.nodeWidth())
//   .attr("width", 40)
//   .attr("fill", "black");
