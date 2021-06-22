export const sankeyDimensions = {
  width: 800,
  height: 600,
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
      colors: ["#05b4ff"],
      // colors: ["green", "yellow", "blue"],
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
