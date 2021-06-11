import {
  graphDimensions,
  fourGroupingsYPozTopText,
  fourGroupingsYPozBottomText,
  threeGroupingsYPozText,
  fourGroupingsXPozRight,
  fourGroupingsXPozLeft,
  fourGroupingsYPozTop,
  fourGroupingsYPozBottom,
  threeGroupingsXPozMiddle,
  threeGroupingsYPoz,
  width,
  height,
  focalXdistance,
  focalYdistance,
} from "./graphDimensions.js";

export const xPositionCall = {
  groupDefault: defaultX,
  groupRegion: regionGroupingsX,
  groupPopulation: populationGroupingsX,
  groupCoal: coalGroupingsX,
  groupRenewable: renewableGroupingsX,
};

export const yPositionCall = {
  groupDefault: defaultY,
  groupRegion: regionGroupingsY,
  groupPopulation: populationGroupingsY,
  groupCoal: coalGroupingsY,
  groupRenewable: renewableGroupingsY,
};

function regionGroupingsX(d) {
  const region = d.region;
  let xPoz;
  if (region === "Northeast" || region === "South") {
    xPoz = fourGroupingsXPozRight;
  }
  if (region === "West" || region === "Midwest") {
    xPoz = fourGroupingsXPozLeft;
  }
  return xPoz;
}

function regionGroupingsY(d) {
  const region = d.region;
  let yPoz;
  if (region === "Northeast" || region === "Midwest") {
    // hardcoded poz for now
    yPoz = fourGroupingsYPozTop;
  }
  if (region === "West" || region === "South") {
    yPoz = fourGroupingsYPozBottom;
  }
  return yPoz;
}

function defaultX(d) {
  return width / 2;
}

function defaultY(d) {
  return graphDimensions.height / 2;
}

function populationGroupingsX(d) {
  const populationCategory = d.population_cat;
  let xPoz;
  if ([0, 1, 4].includes(populationCategory)) {
    xPoz = fourGroupingsXPozLeft;
  }
  if ([2, 3].includes(populationCategory)) {
    xPoz = fourGroupingsXPozRight;
  }
  return xPoz;
}

function populationGroupingsY(d) {
  const populationCategory = d.population_cat;
  let yPoz;

  if (populationCategory > 2) {
    yPoz = fourGroupingsYPozTop;
  }
  // if (populationCategory < 2) {
  if ([0, 1, 2].includes(populationCategory)) {
    yPoz = fourGroupingsYPozBottom;
  }

  return yPoz;
}

function coalGroupingsX(d) {
  const coalCategory = d.coal_pct_cat;
  let xPoz;

  if (coalCategory === "none") {
    xPoz = fourGroupingsXPozLeft;
  }
  if (coalCategory === "low") {
    xPoz = threeGroupingsXPozMiddle;
  }
  if (coalCategory === "high") {
    xPoz = fourGroupingsXPozRight;
  }

  return xPoz;
}

function coalGroupingsY(d) {
  return threeGroupingsYPoz;
}

function renewableGroupingsX(d) {
  const renewableCategory = d.renewable_share_cat;
  let xPoz;

  if (renewableCategory === "low") {
    xPoz = fourGroupingsXPozLeft;
  }
  if (renewableCategory === "medium") {
    xPoz = threeGroupingsXPozMiddle;
  }
  if (renewableCategory === "high") {
    xPoz = fourGroupingsXPozRight;
  }

  return xPoz;
}

function renewableGroupingsY(d) {
  return threeGroupingsYPoz;
}
