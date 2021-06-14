export const graphDimensions = {
  width: 800,
  height: 350,
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

const threeGroupingsXMargin = 255;

const threeGroupingsXPozMiddle = width / 2;
const threeGroupingsXPozLeft = threeGroupingsXPozMiddle - threeGroupingsXMargin;
const threeGroupingsXPozRight =
  threeGroupingsXPozMiddle + threeGroupingsXMargin;
const threeGroupingsYPoz = height / 2;

const textMarginBottom = 80;
const textMargnRight = 50;

const threeGroupingsYPozText = threeGroupingsYPoz - textMarginBottom;
const threeGroupingsXPozMiddleText = threeGroupingsXPozMiddle - textMargnRight;
const threeGroupingsXPozLeftText = threeGroupingsXPozLeft - textMargnRight;
const threeGroupingsXPozRightText = threeGroupingsXPozRight - textMargnRight;

const fourGroupingsYPozBottomText = fourGroupingsYPozBottom - textMarginBottom;
const fourGroupingsYPozTopText = fourGroupingsYPozTop - textMarginBottom;
const fourGroupingsXPozLeftText = fourGroupingsXPozLeft - textMargnRight;
const fourGroupingsXPozRightText = fourGroupingsXPozRight - textMargnRight;

export {
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
};
