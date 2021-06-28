import { sankeyPreProcessing } from "../data/sankeyDataPreProcessing.js";

export const sankeyDimensions = {
  width: 800,
  height: 600,
};

const nodeColorLookup = {
  Coal: "black",
  Nuclear: "pink",
  NaturalGas: "blue",
  HydroElectric: "teal",
  NonHydroRenewables: "green",
  Petroleum: "red",
  ElectricityImports: "brown",
  RejectedEnergy: "grey",
  ElectricityExports: "brown",
  Residential: "brown",
  Industrial: "brown",
  Commercial: "brown",
};

export function sankeyGraphOptions(currentAbbrevSelected) {
  const sankeyOptions = {
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
        colors: colorNodes(currentAbbrevSelected),
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

  return sankeyOptions;
}

function colorNodes(currentAbbrevSelected) {
  //this function returns node colors by node name, each electricity source has its own color
  // each electricity consumption type has its own color
  const nodeData = sankeyPreProcessing(currentAbbrevSelected);

  let generationNodes = nodeData.filter(
    (row) => row[1] === "Total Electricity"
  );
  let consumptionNodes = nodeData.filter(
    (row) => row[0] === "Total Electricity"
  );

  let generationNodeNames = generationNodes
    .map((node) => node[0])
    .map((name) => name.replace(/-|\s/g, ""));

  let consumptionNodeNames = consumptionNodes
    .map((node) => node[1])
    .map((name) => name.replace(/-|\s/g, ""));

  const allNodeNames = generationNodeNames.concat(consumptionNodeNames);

  let nodeColorList = allNodeNames.map((name) => nodeColorLookup[name]);

  //final color list must include color for "total electricity" node, always in index position 1
  let nodeColorList_final = [
    ...nodeColorList.slice(0, 1),
    "yellow",
    ...nodeColorList.slice(1),
  ];

  return nodeColorList_final;
}
