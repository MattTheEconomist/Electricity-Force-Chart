import { stateData } from "../data/stateData.js";

export function rankingsTextFunc(currentAbbrevSelected, units) {
  const rank = calculateRank(currentAbbrevSelected, units);
  const rankString = formatNumberString(rank);

  const stateRow = stateData.filter(
    (row) => row.State === currentAbbrevSelected
  );
  const stateName = stateRow[0].name;

  let unitsText;

  if (units === "electric_cleanliness") {
    unitsText = "Electric Cleanliness";
  }

  if (units === "totalConsumed") {
    unitsText = "Total Electricity Consumption";
  }

  return `<span class="rankSentence" >${stateName} is ranked <span class="rankString">${rankString}</span> in ${unitsText}</span>`;
}

function calculateRank(currentAbbrevSelected, units) {
  const sortedData = stateData.sort((a, b) => a[units] - b[units]);

  let indexPoz;

  for (let i = 0; i < sortedData.length; i++) {
    if (sortedData[i].State === currentAbbrevSelected) {
      indexPoz = i + 1;
    }
  }

  return indexPoz;
}

function formatNumberString(rank) {
  const numberString = rank.toString();
  const lastDigit = numberString.slice(-1);
  let suffix = "th";

  if (lastDigit === "1") {
    suffix = "st";
  }
  if (lastDigit === "2") {
    suffix = "nd";
  }

  if (lastDigit === "3") {
    suffix = "rd";
  }
  if (numberString === "11" || "12") {
    suffix = "th";
  }

  return `${numberString}${suffix}`;
}
