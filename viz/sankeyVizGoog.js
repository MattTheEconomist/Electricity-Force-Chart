// import { stateData } from "../data/stateData.js";
// import { sankeyPreProcessing } from "../data/sankeyDataPreProcessing.js";
// import { sankeyGraphOptions } from "../graphDimensions/graphDimensionsSankey.js";

// // import { drawChartSankey } from "../viz/sankeyVizGoog.js";

// google.charts.load("current", { packages: ["sankey"] });

// google.charts.setOnLoadCallback(drawChartSankey);

// const allStateNames = stateData.map((row) => row.name);

// let dropdownContainer = document.getElementById("dropdownContainer");

// let dropdownInnerHtml = "";

// dropdownInnerHtml = allStateNames.map(
//   (currentName) => `<option value="${currentName}" >${currentName}</option>`
// );

// dropdownContainer.innerHTML = `<select id="stateNameDropdown">
// ${dropdownInnerHtml}
// </select>`;

// const stateSelector = document.getElementById("stateNameDropdown");

// let currentStateSelected = "Alabama";
// let currentAbbrevSelected = "AL";

// stateSelector.addEventListener("change", () => {
//   currentStateSelected = stateSelector.value;

//   currentAbbrevSelected = stateData.filter(
//     (row) => row.name === currentStateSelected
//   )[0].State;

//   const chart = new google.visualization.Sankey(
//     document.getElementById("cornerSankey")
//   );

//   drawChartSankey(currentAbbrevSelected);

//   console.log(currentAbbrevSelected);
// });

// export function drawChartSankey(State) {
//   var data = new google.visualization.DataTable();
//   data.addColumn("string", "From");
//   data.addColumn("string", "To");
//   data.addColumn("number", "Weight");

//   console.log(currentAbbrevSelected);

//   data.addRows(sankeyPreProcessing(currentAbbrevSelected));

//   var chart = new google.visualization.Sankey(
//     document.getElementById("cornerSankey")
//   );
//   chart.draw(data, sankeyGraphOptions);
// }
