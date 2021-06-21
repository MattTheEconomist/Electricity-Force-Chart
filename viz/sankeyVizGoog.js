import { stateData } from "../data/stateData.js";

google.charts.load("current", { packages: ["sankey"] });

google.charts.setOnLoadCallback(drawChart);

// google.visualization.events.addListener(drawChart, )

// document.querySelector("#dropdownContainer").innerHTML(`<h3>hello</h3>`);

const allStateNames = stateData.map((row) => row.name);

let dropdownContainer = document.getElementById("dropdownContainer");

let dropdownInnerHtml = "";
for (let i = 0; i < allStateNames.length; i++) {
  const currentName = allStateNames[i];

  dropdownInnerHtml += `<option value="${currentName}" >${currentName}</option>`;
}

dropdownContainer.innerHTML = `<select id="stateNameDropdown">
${dropdownInnerHtml}
</select>`;

const stateSelector = document.getElementById("stateNameDropdown");

let currentStateSelected = "Alabama";
let currentAbbrevSelected = "AL";

stateSelector.addEventListener("change", () => {
  currentStateSelected = stateSelector.value;

  currentAbbrevSelected = stateData.filter(
    (row) => row.name === currentStateSelected.State
  );

  drawChart(currentAbbrevSelected);
});

console.log(stateSelector);

// console.log(dropdownContainer);
// console.log(dropdownInnerHtml);

function drawChart(State) {
  // function drawChart(thisInput) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "From");
  data.addColumn("string", "To");
  data.addColumn("number", "Weight");

  // find a better way to connect dropdown to chart
  data.addRows(sankeyPreprocessing("TX"));
  console.log(sankeyPreprocessing("TX"));

  // Sets chart options.
  var options = {
    width: 600,

    sankey: {
      node: {
        label: {
          // fontName: "Times-Roman",
          fontSize: 12,
          // color: "#000",
          // bold: true,
          // italic: false,
        },
        colors: [
          "#a6cee3", // Custom color palette for sankey nodes.
          "#1f78b4", // Nodes will cycle through this palette
          "#b2df8a",
          "#33a02c",
        ],
        width: 50,
      },
      link: {
        color: { fill: "#d799ae", fillOpacity: 0.8 },
      },
    },
  };

  // Instantiates and draws our chart, passing in some options.
  var chart = new google.visualization.Sankey(
    document.getElementById("cornerSankey")
  );
  chart.draw(data, options);
}

function sankeyPreprocessing(State) {
  const singleState = stateData.filter((row) => row.State === State)[0];

  let gen_keys = Object.keys(singleState)
    .filter((key) => key.includes("gen"))
    .filter((key) => !key.includes("pct"))
    .filter((key) => !key.includes("total"))
    .filter((key) => !key.includes("petroleum"));

  let cons_keys = Object.keys(singleState)
    .filter((key) => key.includes("cons"))
    .filter((key) => !key.includes("pct"));

  let importQuantity = singleState.imports;

  let importSign;

  importQuantity > 0 ? (importSign = "Positive") : (importSign = "Negative");

  importQuantity = Math.abs(importQuantity);

  let dataRows_gen = gen_keys
    .filter((key) => singleState[key] !== 0)
    .map((key) => {
      return [key, "Total Electricity", singleState[key]];
    });

  if (importSign === "Positive") {
    dataRows_gen.push([
      "Electricity Imports",
      "Total Electricity",
      importQuantity,
    ]);
  }

  let dataRows_cons = cons_keys.map((key) => {
    return ["Total Electricity", key, singleState[key]];
  });

  if (importSign === "Negative") {
    dataRows_gen.push([
      "Total Electricity",
      "Electricity Exports",
      importQuantity,
    ]);
  }

  const dataRows = dataRows_gen.concat(dataRows_cons);

  return dataRows;
}
