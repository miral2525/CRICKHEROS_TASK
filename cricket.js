// IPL 2022 sample data 
const pointsTable = [
  {
    team: "Chennai Super Kings",
    matches: 7,
    won: 5,
    lost: 2,
    nrr: 0.771,
    runsFor: 1130,
    oversFor: 133.1,
    runsAgainst: 1071,
    oversAgainst: 138.5,
    pts: 10
  },
  {
    team: "Royal Challengers Bangalore",
    matches: 7,
    won: 4,
    lost: 3,
    nrr: 0.597,
    runsFor: 1217,
    oversFor: 140,
    runsAgainst: 1066,
    oversAgainst: 131.4,
    pts: 8
  },
  {
    team: "Delhi Capitals",
    matches: 7,
    won: 4,
    lost: 3,
    nrr: 0.319,
    runsFor: 1085,
    oversFor: 126,
    runsAgainst: 1136,
    oversAgainst: 137,
    pts: 8
  },
  {
    team: "Rajasthan Royals",
    matches: 7,
    won: 3,
    lost: 4,
    nrr: 0.331,
    runsFor: 1066,
    oversFor: 128.2,
    runsAgainst: 1094,
    oversAgainst: 137.1,
    pts: 6
  },
  {
    team: "Mumbai Indians",
    matches: 8,
    won: 2,
    lost: 6,
    nrr: -1.75,
    runsFor: 1003,
    oversFor: 155.2,
    runsAgainst: 1134,
    oversAgainst: 138.1,
    pts: 4
  }
];

//  convert overs to decimal (e.g. 19.4 = 19.6667)
function oversToDecimal(o) {
  const parts = o.toString().split(".");
  if (parts.length === 1) return parseFloat(o);
  const balls = parseInt(parts[1]);
  return parseInt(parts[0]) + balls / 6;
}

// Function to calculate NRR
function calculateNRR(team) {
  const forRate = team.runsFor / oversToDecimal(team.oversFor);
  const againstRate = team.runsAgainst / oversToDecimal(team.oversAgainst);
  return (forRate - againstRate).toFixed(3);
}

// Event listener for form
document.getElementById("nrrForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const yourTeam = document.getElementById("yourTeam").value;
  const oppTeam = document.getElementById("oppTeam").value;
  const overs = parseFloat(document.getElementById("overs").value);
  const desiredPosition = parseInt(document.getElementById("desiredPosition").value);
  const toss = document.getElementById("toss").value;
  const runs = parseFloat(document.getElementById("runsInput").value);

  const yourData = structuredClone(pointsTable.find(t => t.team === yourTeam));
  const oppData = structuredClone(pointsTable.find(t => t.team === oppTeam));

  let output = "";

  if (toss === "bat") {
    // Batting first scenario
    const minRestrict = Math.max(0, runs - 50);
    const maxRestrict = runs - 1;

    // Update temporary stats
    yourData.matches += 1;
    yourData.runsFor += runs;
    yourData.oversFor += overs;
    yourData.runsAgainst += minRestrict;
    yourData.oversAgainst += overs;

    const newNRR = calculateNRR(yourData);
    output += `If ${yourTeam} score ${runs} runs in ${overs} overs,\n`;
    output += `${yourTeam} need to restrict ${oppTeam} between ${minRestrict} and ${maxRestrict} runs.\n`;
    output += `Revised NRR of ${yourTeam} will be approximately ${newNRR}.`;
  } else {
    // Bowling first scenario
    const target = runs;
    const minOvers = overs - 10 > 0 ? overs - 10 : 5;
    const maxOvers = overs;

    yourData.matches += 1;
    yourData.runsFor += target;
    yourData.oversFor += minOvers;
    yourData.runsAgainst += runs;
    yourData.oversAgainst += overs;

    const newNRR = calculateNRR(yourData);
    output += `${yourTeam} need to chase ${target} runs between ${minOvers} and ${maxOvers} overs.\n`;
    output += `Revised NRR for ${yourTeam} will be approximately ${newNRR}.`;
  }

  document.getElementById("result").innerText = output;
});
