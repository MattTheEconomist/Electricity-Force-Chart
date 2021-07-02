export const graphDimensions = {
  width: 800,
  height: 400,
  focalXdistance: 200,
  focalYdistance: 100,
};

const width = graphDimensions.width,
  height = graphDimensions.height,
  focalXdistance = graphDimensions.focalXdistance,
  focalYdistance = graphDimensions.focalYdistance;

const fourGroupingsXPozRight = width / 2 + focalXdistance;
const fourGroupingsXPozLeft = width / 2 - focalXdistance;
const fourGroupingsYPozTop = height / 2 - focalYdistance;
const fourGroupingsYPozBottom = height / 2 + focalYdistance;

const threeGroupingsXMargin = 315;

const threeGroupingsXPozMiddle = width / 2;
const threeGroupingsXPozLeft = threeGroupingsXPozMiddle - threeGroupingsXMargin;
const threeGroupingsXPozRight =
  threeGroupingsXPozMiddle + threeGroupingsXMargin;
const threeGroupingsYPoz = height / 2;

const threeGroupingsTextMarginBottom = 125;
// const textMargnRight = 50;
const textMargnRight = 0;

const fourGroupingsTextMarginBottom = 75;

const threeGroupingsYPozText =
  threeGroupingsYPoz - threeGroupingsTextMarginBottom;
const threeGroupingsXPozMiddleText = threeGroupingsXPozMiddle - textMargnRight;
const threeGroupingsXPozLeftText = threeGroupingsXPozLeft - textMargnRight;
const threeGroupingsXPozRightText = threeGroupingsXPozRight - textMargnRight;

const fourGroupingsYPozBottomText =
  fourGroupingsYPozBottom - fourGroupingsTextMarginBottom;
const fourGroupingsYPozTopText =
  fourGroupingsYPozTop - fourGroupingsTextMarginBottom;
const fourGroupingsXPozLeftText = fourGroupingsXPozLeft - 50;
const fourGroupingsXPozRightText = fourGroupingsXPozRight - 50;

const secondTextLineYAdd = 15;

function radiusCalc(val) {
  return val / 90;
}

export {
  radiusCalc,
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
  fourGroupingsXPozLeftText,
  fourGroupingsXPozRightText,
  threeGroupingsXPozMiddleText,
  threeGroupingsXPozLeft,
  threeGroupingsXPozRight,
  threeGroupingsXPozLeftText,
  threeGroupingsXPozRightText,
  secondTextLineYAdd,
};
