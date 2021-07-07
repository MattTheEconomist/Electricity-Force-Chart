import { stateData } from "../data/stateData.js";
import { sankeyPreProcessing } from "../data/sankeyDataPreProcessing.js";
import { sankeyGraphOptions } from "../graphDimensions/graphDimensionsSankey.js";
import { graphRankings } from "../viz/rankingsGraphs.js";
import { rankingsTextFunc } from "./rankingsGraphText.js";
import { selectedStateFromForce, simulation } from "../viz/force.js";

const sankeyContainer = document.getElementById("cornerSankey");
const powerContainer = document.getElementById("totalPowerContainer");

const powerText = document.getElementById("totalPowerText");
const cleanlinessText = document.getElementById("cleanlinessText");

const powerSvg = d3.select("#totalPowerContainer").append("svg");
powerSvg.attr("height", 300).attr("width", 400);

const cleanSvg = d3.select("#cleanlinessContainer").append("svg");
cleanSvg.attr("height", 300).attr("width", 400);

google.charts.load("current", { packages: ["sankey"] });

google.charts.setOnLoadCallback(drawChartSankey);

const allStateNames = stateData.map((row) => row.name);

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

Array.from(circleSelector).forEach(function (element) {
  element.addEventListener("dblclick", () => {
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

function zoomForceChart(element) {
  const selectedStateName = element.id;

  const selectedStateElement = d3.select(`#${selectedStateName}`);

  selectedStateElement
    .attr("class", "forceCircle active")
    .transition()
    .duration(1500)
    .attr("r", 900);

  const selectedStateX = selectedStateElement._groups[0][0].cx.baseVal.value;

  console.log(selectedStateX);

  simulation.force(
    "x",
    d3.forceX().x((d) => {
      if (d.State !== selectedStateName) {
        const stateX = d3.select(`#${d.State}`)._groups[0][0].cx.baseVal.value;

        if (stateX > selectedStateX) {
          // return 1500;
          return 1000;
        } else {
          return -100;
        }
      } else {
        return selectedStateX;
      }
    })
  );

  simulation.alpha(0.3).restart();

  d3.selectAll(".forceChartGroupText")
    .transition()
    .duration(500)
    .style("opacity", 0);

  setTimeout(() => {
    d3.select("#entireForceContainer")
      .attr("class", "hideMe")
      // .attr("height", 0);
      .style("height", 0);
    d3.select("#entireSankeyContainer").classed("hideMe", false);
  }, 1500);

  currentAbbrevSelected = selectedStateName;
  // currentAbbrevSelected = "TX";
  console.log(currentAbbrevSelected);
}
