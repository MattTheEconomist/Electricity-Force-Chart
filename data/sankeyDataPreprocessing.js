import { stateData } from "./stateData.js";

export function sankeyPreProcessing(State) {
  const singleState = stateData.filter((row) => row.State === State)[0];

  let gen_keys = Object.keys(singleState)
    .filter((key) => key.includes("gen"))
    .filter((key) => !key.includes("pct"))
    .filter((key) => !key.includes("total"));
  // .filter((key) => !key.includes("petroleum"));

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
      return [nodeIdentifier[key], "Total Electricity", singleState[key]];
    });

  if (importSign === "Positive") {
    dataRows_gen.push([
      "Electricity Imports",
      "Total Electricity",
      importQuantity,
    ]);
  }

  let dataRows_cons = cons_keys.map((key) => {
    return ["Total Electricity", nodeIdentifier[key], singleState[key]];
  });

  if (importSign === "Negative") {
    dataRows_gen.push([
      "Total Electricity",
      "Electricity Exports",
      importQuantity,
    ]);
  }

  let dataRows = dataRows_gen.concat(dataRows_cons);

  dataRows = dataRows.map((el) => {
    let electricQuantity = parseFloat(el[2].toFixed(2));

    el[2] = electricQuantity;

    return el;
  });

  return dataRows;
}

const nodeIdentifier = {
  cons_rejected: "Rejected Energy",
  cons_residential: "Residential",
  cons_commercial: "Commercial",
  cons_industrial: "Industrial",
  gen_petroleum: "Petroleum",
  gen_naturalGas: "Natural Gas",
  gen_coal: "Coal",
  gen_nuclear: "Nuclear",
  gen_hydroelectric: "HydroElectric",
  gen_nonhydroRenewables: "Non-Hydro Renewables",
};
