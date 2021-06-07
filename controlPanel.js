import { graphDimensions } from "./graphDimensions.js";

const width = graphDimensions.width,
  height = graphDimensions.height,
  focalXdistance = graphDimensions.focalXdistance,
  focalYdistance = graphDimensions.focalYdistance;

export const xPositionCall = {
  groupDefault: defaultX,
  groupRegion: regionGroupingsX,
};

export const yPositionCall = {
  groupDefault: defaultY,
  groupRegion: regionGroupingsY,
};

function regionGroupingsX(d) {
  const region = d.region;
  let xPoz;
  if (region === "Northeast" || region === "South") {
    // hardcoded poz for now
    xPoz = width / 2 - focalXdistance;
  }
  if (region === "West" || region === "Midwest") {
    xPoz = width / 2 + focalXdistance;
  }
  return xPoz;
}

function defaultX(d) {
  return width / 2;
}

function regionGroupingsY(d) {
  const region = d.region;
  let yPoz;
  if (region === "Northeast" || region === "Midwest") {
    // hardcoded poz for now
    yPoz = height / 2 - focalYdistance;
  }
  if (region === "West" || region === "South") {
    yPoz = height / 2 + focalYdistance;
  }
  return yPoz;
}

function defaultY(d) {
  return graphDimensions.height / 2;
}
