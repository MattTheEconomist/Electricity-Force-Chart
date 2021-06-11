export const graphDimensions = {
  width: 700,
  height: 450,
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
const threeGroupingsXPozMiddle = width / 2;
const threeGroupingsYPoz = height / 2;

const textMarginBottom = 80;
const textMargnRight = 50;

const threeGroupingsYPozText = threeGroupingsYPoz - textMarginBottom;
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
};
