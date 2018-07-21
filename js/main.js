const chaosHeight = 10;
function updateRates(){
  var result;
  console.log('I\'m updating the rates!!');
  dataSent = {
    mode: "cors", // no-cors, cors, *same-origin
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
            // "Content-Type": "application/x-www-form-urlencoded",
        },
  }
  fetch('http://poe.ninja/api/Data/GetCurrencyOverview?league=tmphardcore', dataSent)
    .then(response => {
      return response.json();
    }).then(data => result = data)
    .then(() => {
      console.log('we have data:',result)
      rates = parse(result);
      renderGraphs(rates);
    })
    .catch(err => {
      console.log("It didn't work!!", err);
    });
    console.log('returning result:',result)
    return result;
}
function parse(data){
  let result = {
    'MirrorofKalandra': data.lines[0].chaosEquivalent,
    'BlessingofChayula': data.lines[1].chaosEquivalent,
    'MirrorShard': data.lines[2].chaosEquivalent,
    'ExaltedOrb': data.lines[3].chaosEquivalent,
    'AncientOrb': data.lines[4].chaosEquivalent,
    'HarbingersOrb': data.lines[5].chaosEquivalent,
    'DivineOrb': data.lines[6].chaosEquivalent,
    'OrbofAnnulment': data.lines[7].chaosEquivalent,
    'BlessingofEsh': data.lines[8].chaosEquivalent,
    'BlessingofUulNetol': data.lines[9].chaosEquivalent,
    'MasterCartographersSextant': data.lines[10].chaosEquivalent,
    'OrbofHorizons': data.lines[11].chaosEquivalent,
    'JourneymanCartographersSextant': data.lines[12].chaosEquivalent,
    'EngineersOrb': data.lines[13].chaosEquivalent,
    'ApprenticeCartographersSextant': data.lines[14].chaosEquivalent,
    'ExaltedShard': data.lines[15].chaosEquivalent,
    'BlessingofXoph': data.lines[16].chaosEquivalent,
    'BlessingofTul': data.lines[17].chaosEquivalent,
    'SplinterofChayula': data.lines[18].chaosEquivalent,
    'RegalOrb': data.lines[19].chaosEquivalent,
    'GemcuttersPrism': data.lines[20].chaosEquivalent,
    'VaalOrb': data.lines[21].chaosEquivalent,
    'OrbofRegret': data.lines[22].chaosEquivalent,
    'OrbofFusing': data.lines[23].chaosEquivalent,
    'OrbofScouring': data.lines[24].chaosEquivalent,
    'BlessedOrb': data.lines[25].chaosEquivalent,
    'OrbofAlchemy': data.lines[26].chaosEquivalent,
    'CartographersChisel': data.lines[27].chaosEquivalent,
    'GlassblowersBauble': data.lines[28].chaosEquivalent,
    'SplinterofXoph': data.lines[29].chaosEquivalent,
    'SilverCoin': data.lines[30].chaosEquivalent,
    'OrbofBinding': data.lines[31].chaosEquivalent,
    'JewellersOrb': data.lines[32].chaosEquivalent,
    'SplinterofUulNetol': data.lines[33].chaosEquivalent,
    'OrbofAlteration': data.lines[34].chaosEquivalent,
    'ChromaticOrb': data.lines[35].chaosEquivalent,
    'OrbofChance': data.lines[36].chaosEquivalent,
    'SplinterofEsh': data.lines[37].chaosEquivalent,
    'SplinterofTul': data.lines[38].chaosEquivalent,
    'OrbofAugmentation': data.lines[39].chaosEquivalent,
    'OrbofTransmutation': data.lines[40].chaosEquivalent,
    'BlacksmithsWhetstone': data.lines[41].chaosEquivalent,
    'PortalScroll': data.lines[42].chaosEquivalent,
    'ArmourersScrap': data.lines[43].chaosEquivalent,
    'PerandusCoin': data.lines[44].chaosEquivalent,
    'ScrollofWisdom': data.lines[45].chaosEquivalent
  };
  return result;
}
function renderGraphs(rates){
  let chart = document.getElementById("chart");
  for (var key in rates){
    console.log(rates[key]);
    let barItem = document.createElement("div");
    barItem.classList.add("BarGraph-bar");
    barItem.textContent = key;
    barItem.style.height = chaosHeight * rates[key] + "em";
    chart.appendChild(barItem);
  }
}
function render(){
  console.log('render is being called');

  let chart = document.getElementById("chart");
  let height = 70;
  let bar = document.createElement("div");
//  console.log("Here are the rates!",rates);

  bar.classList.add("BarGraph-bar");
  bar.style.height = chaosHeight + "em";
  bar.textContent = "Chaos Orb";
  chart.appendChild(bar);
}
