import { sankeyPreProcessing } from "../data/sankeyDataPreProcessing.js";

export const sankeyDimensions = {
  width: 800,
  height: 600,
};

const nodeColorLookup = {
  Coal: "red",
  Nuclear: "#1B8EF2",
  NaturalGas: "#1CCFFC",
  HydroElectric: "#24E6D9",
  NonHydroRenewables: "#1CFCAE",
  Petroleum: "red",
  ElectricityImports: "#12FCED",
  RejectedEnergy: "#4D0FFC",
  ElectricityExports: "#7629F2",
  Residential: "#93f",
  Industrial: "#a3f",
  Commercial: "#c533ff",
};

export function sankeyGraphOptions(currentAbbrevSelected) {
  const sankeyOptions = {
    width: 800,
    height: 300,
    tooltip: { isHtml: true },
    sankey: {
      node: {
        label: {
          fontName: "calibri",
          fontSize: 14,
        },
        colors: colorNodes(currentAbbrevSelected),
        width: 20,
        interactivity: false,
      },
      link: {
        colorMode: "gradient",
        colors: colorNodes(currentAbbrevSelected),
      },
      allowHtml: "true",
      tooltip: {
        isHtml: "true",
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
    "#535346",
    ...nodeColorList.slice(1),
  ];

  // console.log(nodeColorList_final);

  return nodeColorList_final;
}
