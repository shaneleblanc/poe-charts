const chaosHeight = 100;
var chaosIcon = '';
var exaltPrice = 60;
var exaltIcon = '';


function updateRates(){
  var result;
  console.log('I\'m updating the rates!!');
  dataSent = {
    mode: "cors", // no-cors, cors, *same-origin
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
  }

  fetch('https://cors-anywhere.herokuapp.com/https://poe.ninja/api/Data/GetCurrencyOverview?league=tmphardcore', dataSent)
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
    /*
    var client = new HttpClient();
    client.get('https://poe.ninja/api/Data/GetCurrencyOverview?league=tmphardcore', function(response) {
    console.log("we have data:", response);
rates    rates = parse(response);
    renderGraphs(rates);
});
*/

    console.log('returning result:',result)
    return result;
}
function parse(data){
  // Hard code for Chaos and Exalted Orbs
  chaosIcon = data.currencyDetails[0].icon;
  exaltIcon = data.currencyDetails[1].icon;
  exaltPrice = data.lines[2].chaosEquivalent;
  chaosimage = document.getElementById('chaosIcon');
  let itemInfo = document.getElementById('Chaos-info');
  itemInfo.innerHTML = `
  <div class="infoline">1 <img src="${exaltIcon}" width="32" height="32"> = ${exaltPrice} <img src="${chaosIcon}" width="32" height="32"></div>
  `;
  chaosimage.src = chaosIcon;
/*    { name: 'Blessing of Esh',
      chaosEquivalent: data.lines[8].chaosEquivalent,
      icon: data.currencyDetails[data.currencyDetails.indexOf
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
    'RegalOrb': data.lines[19].chaosEquivalent,*/

  let result = [
    { name: 'Gemcutter\'s Prism' },
    { name: 'Vaal Orb' },
    { name: 'Orb of Regret' },
    { name: 'Orb of Fusing' },
    { name: 'Orb of Scouring' },
    { name: 'Blessed Orb' },
    { name: 'Orb of Alchemy' },
    { name: 'Cartographer\'s Chisel' },
    { name: 'Glassblower\'s Bauble' },
    { name: 'Splinter of Xoph' },
    { name: 'Silver Coin' },
    { name: 'Orb of Binding' },
    { name: 'Jeweller\'s Orb' },
    { name: 'Splinter of Uul-Netol' },
    { name: 'Orb of Alteration' },
    { name: 'Chromatic Orb' },
    { name: 'Orb of Chance' },
    { name: 'Splinter of Esh' },
    { name: 'Splinter of Tul' },
    { name: 'Orb of Augmentation' },
    { name: 'Orb of Transmutation' },
    { name: 'Blacksmith\'s Whetstone' },
    { name: 'Portal Scroll' },
    { name: 'Armourer\'s Scrap' },
    { name: 'Perandus Coin' },
    { name: 'Scroll of Wisdom' }
];
for (let item of result){ // Pulls data into the array of objects above
  console.log(item.name);
  item.chaosEquivalent = data.lines[data.lines.findIndex(function(currency) {return currency.currencyTypeName === item.name })].chaosEquivalent,
  item.icon = data.currencyDetails[data.currencyDetails.findIndex(function(currency){ return currency.name === item.name })].icon
}
  return result;
}
function renderGraphs(rates){
  let chart = document.getElementById("chart");
  for (var item of rates){
    let unspacedName = item.name.replace(/\'/g,'').replace(/\s/g,'');
    let chaosEquiv = item.chaosEquivalent;
    let barItem = document.createElement("div");
    let itemInfo = document.createElement("div");
    let worth = (1 / chaosEquiv).toFixed(1);
    itemInfo.classList.add('info');
    itemInfo.innerHTML = `
    <div class="infoline">10 <img src="${chaosIcon}" width="32" height="32"> = ${Math.round(10 / chaosEquiv)} <img src="${item.icon}" width="32" height="32"></div> <br>
    <div class="infoline">1&nbsp;&nbsp; <img src="${exaltIcon}" width="32" height="32"> = ${Math.round(exaltPrice * worth)} <img src="${item.icon}" width="32" height="32"></div>
    `;
    itemInfo.id = unspacedName + "-info";
    itemInfo.classList.add('hidden');
    barItem.classList.add("BarGraph-bar");
    barItem.onmouseover = function(){ console.log('moused over',unspacedName); document.getElementById(unspacedName+'-info').classList.remove('hidden');};
    barItem.onmouseleave = function(){console.log('moused out of',unspacedName); document.getElementById(unspacedName+'-info').classList.add('hidden');};
    barItem.textContent = worth +'x \r\n'+ item.name;
    barItem.appendChild(document.createElement("br"));
    let barImage = document.createElement("img");
    barImage.src = item.icon;
    barItem.appendChild(barImage);
    barItem.appendChild(itemInfo);
    barItem.style.height = 100 * chaosEquiv + "%";
    chart.appendChild(barItem);
  }
}

function render(){
  console.log('render is being called');
  let chart = document.getElementById("chart");
  let height = 70;
  let bar = document.createElement("div");

//  console.log("Here are the rates!",rates);
  let chaosimage = document.createElement('img');
  chaosimage.id = "chaosIcon";
  bar.classList.add("BarGraph-bar");

  bar.onmouseover = ""
  bar.style.height = chaosHeight + "%";
  bar.innerHTML = "1x<br>Chaos Orb<br>";

  let itemInfo = document.createElement("div");
  itemInfo.classList.add('info');
  itemInfo.id = "Chaos-info";
  itemInfo.classList.add('hidden');
  bar.onmouseover = function(){ console.log('moused over chaos'); document.getElementById('Chaos-info').classList.remove('hidden');};
  bar.onmouseleave = function(){console.log('moused out of chaos'); document.getElementById('Chaos-info').classList.add('hidden');};

  bar.appendChild(chaosimage);
  bar.appendChild(itemInfo);
  chart.appendChild(bar);
}
