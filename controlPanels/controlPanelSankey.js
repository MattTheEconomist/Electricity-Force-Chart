import { stateData } from "../data/stateData.js";
import { sankeyPreProcessing } from "../data/sankeyDataPreProcessing.js";
import { sankeyGraphOptions } from "../graphDimensions/graphDimensionsSankey.js";
import { graphRankings } from "../viz/rankingsGraphs.js";
import { rankingsTextFunc } from "./rankingsGraphText.js";
import {
  runForceSimulation,
  changeGroupingDefault,
  simulation,
} from "../viz/force.js";

const sankeyContainer = document.getElementById("cornerSankey");
const powerContainer = document.getElementById("totalPowerContainer");

const powerText = document.getElementById("totalPowerText");
const cleanlinessText = document.getElementById("cleanlinessText");

const powerSvg = d3.select("#totalPowerContainer").append("svg");
powerSvg.attr("height", 200).attr("width", 400);

const cleanSvg = d3.select("#cleanlinessContainer").append("svg");
cleanSvg.attr("height", 200).attr("width", 400);

google.charts.load("current", { packages: ["sankey"] });

google.charts.setOnLoadCallback(drawChartSankey);

let allStateNames = stateData.map((row) => row.name);

allStateNames.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1));

allStateNames.unshift("--state--");

let dropdownContainer = document.getElementById("dropdownContainer");

let dropdownInnerHtml = "";

dropdownInnerHtml = allStateNames.map(
  (currentName) => `<option value="${currentName}" >${currentName}</option>`
);

dropdownContainer.innerHTML = `<select id="stateNameDropdown">
${dropdownInnerHtml}
</select>`;

const stateSelector = document.getElementById("stateNameDropdown");

let currentStateSelected = "Alabama";

let currentAbbrevSelected = "AL";

let circleSelector = document.getElementsByClassName("forceCircle");

const returnForceButton = document.querySelector("#returnForceBtn");

returnForceButton.addEventListener("click", () => {
  d3.select("#entireSankeyContainer")
    .transition()
    .duration(1500)
    .style("opacity", 0);

  setTimeout(() => {
    location.reload();
  }, 1500);
});

Array.from(circleSelector).forEach(function (element) {
  element.addEventListener("dblclick", () => {
    // element.addEventListener("click", () => {
    zoomForceChart(element);
    updateAllSankeyComponents();
  });
});

stateSelector.addEventListener("change", () => {
  currentStateSelected = stateSelector.value;

  currentAbbrevSelected = stateData.filter(
    (row) => row.name === currentStateSelected
  )[0].State;

  updateAllSankeyComponents();
});

function updateAllSankeyComponents() {
  const chart = new google.visualization.Sankey(sankeyContainer);

  cleanlinessText.innerHTML = rankingsTextFunc(
    currentAbbrevSelected,
    "electric_cleanliness"
  );
  powerText.innerHTML = rankingsTextFunc(
    currentAbbrevSelected,
    "totalConsumed"
  );

  drawChartSankey(currentAbbrevSelected);

  graphRankings("totalConsumed", currentAbbrevSelected, powerSvg);
  graphRankings("electric_cleanliness", currentAbbrevSelected, cleanSvg);

  updateSankeyTitle(currentAbbrevSelected);
}

function drawChartSankey(State) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "From");
  data.addColumn("string", "To");
  data.addColumn("number", "Trillion BTU");
  data.addColumn({ type: "string", role: "tooltip" });

  let dataRows = sankeyPreProcessing(currentAbbrevSelected);

  dataRows.map((d) => {
    const electricityUnits = d[2];

    let relavantNode;

    if (d[0] === "Total Electricity") {
      relavantNode = d[1];
    }
    if (d[1] === "Total Electricity") {
      relavantNode = d[0];
    }

    d.push(
      // " This is an HTML tooltip<br>It needs to be formatted nicely<br>in a rectangular box that is not <i>long and thin</i>"
      `<div id="sankTooltip"> ${relavantNode} <br> ${electricityUnits} Trillion BTU </br> </div>`
    );
    return d;
  });

  data.addRows(dataRows);

  // data.addRows(sankeyPreProcessing(currentAbbrevSelected));

  var chart = new google.visualization.Sankey(
    document.getElementById("cornerSankey", "HTML_tooltip")
  );

  chart.draw(data, sankeyGraphOptions(currentAbbrevSelected));
}

function updateSankeyTitle(currentAbbrevSelected) {
  // const titleContainer = document.getElementById("sankeyTitleContainer");
  const titleContainer = document.querySelector("#sankeyTitleContainer");

  let stateName = stateData.filter(
    (row) => row.State === currentAbbrevSelected
  )[0].name;

  titleContainer.innerHTML = `<h3 id="sankeyTitleText">  <span id="sankeyTitleState">${stateName}</span> Electricity Makeup </h3>`;
}

function zoomForceChart(element) {
  const selectedStateName = element.id;

  const selectedStateElement = d3.select(`#${selectedStateName}`);

  selectedStateElement
    .attr("class", "forceCircle active")
    .transition()
    .duration(1500)
    .attr("r", 115);

  const otherStateElements = d3.selectAll(".forceCircle").filter(function () {
    return this.id !== selectedStateName;
  });

  otherStateElements.transition().duration(1000).style("opacity", 0);

  d3.selectAll(".forceChartGroupText")
    .transition()
    .duration(500)
    .style("opacity", 0);

  d3.select("#entireForceContainer")
    .transition()
    .duration(2000)
    .style("opacity", 0);

  setTimeout(() => {
    d3.select("#entireForceContainer")
      .attr("class", "hideMe")
      .style("opacity", 0);
    d3.select("#entireSankeyContainer")
      .classed("hideMe", false)
      .style("opacity", 1);
  }, 2000);

  currentAbbrevSelected = selectedStateName;
}
