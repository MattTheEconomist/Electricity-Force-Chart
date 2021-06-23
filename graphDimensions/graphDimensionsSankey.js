import { sankeyPreProcessing } from "../data/sankeyDataPreProcessing.js";

export const sankeyDimensions = {
  width: 800,
  height: 600,
};

const nodeColors = {
  Coal: "black",
  Nuclear: "pink",
  NaturalGas: "blue",
  HydroElectric: "teal",
  NonHydroRenewables: "green",
  Petroleum: "red",
  ElectricityImports: "white",
  RejectedEnergy: "white",
  ElectricityExports: "brown",
  Residential: "brown",
  Industrial: "brown",
  Commercial: "brown",
  // totalElectricity: "dodgerblue",
};

export const sankeyGraphOptions = {
  width: 800,
  height: 300,
  tooltip: { isHtml: true },
  sankey: {
    node: {
      label: {
        // fontName: "Times-Roman",
        fontSize: 12,
        // color: "#000",
        // bold: true,
        // italic: false,
      },
      // colors: ["#05b4ff"],
      colors: colorNodes(),
      width: 20,
      interactivity: false,
    },
    link: {
      color: {
        fill: "rgba(128, 128, 128, 1)",
        fillOpacity: 0.8,
      },
    },
  },
};

function colorNodes() {
  // google sankey works by displaying widest nodes on top. This function
  // sorts nodes and assigns color by node id
  const nodeData = sankeyPreProcessing("AZ");

  let generationNodes = nodeData.filter(
    (row) => row[1] === "Total Electricity"
  );
  let consumptionNodes = nodeData.filter(
    (row) => row[0] === "Total Electricity"
  );

  generationNodes = generationNodes.sort((a, b) => {
    return b[2] - a[2];
  });

  consumptionNodes = consumptionNodes.sort((a, b) => {
    return b[2] - a[2];
  });

  let generationNodeNames = generationNodes
    .map((node) => node[0])
    .map((name) => name.replace(/-|\s/g, ""));

  let consumptionNodeNames = consumptionNodes
    .map((node) => node[1])
    .map((name) => name.replace(/-|\s/g, ""));

  const allNodeNames = generationNodeNames.concat(consumptionNodeNames);

  let nodeColorList = allNodeNames.map((name) => nodeColors[name]);

  // console.log("allNodeName", allNodeNames);

  // console.log("nodeColorList", nodeColorList);

  let newNodeColorList = [
    ...nodeColorList.slice(0, 1),
    "yellow",
    ...nodeColorList.slice(1),
  ];

  newNodeColorList = [
    "pink",
    "yellow",
    "blue",
    "black",
    "teal",
    "green",
    "red",
    "brown",
    "brown",
    "brown",
    "brown",
    "brown",
    "brown",
  ];

  console.log(newNodeColorList);

  return newNodeColorList;
}

colorNodes();
