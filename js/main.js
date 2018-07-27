var chaosHeight = 100;
var chaosIcon = '';
var exaltPrice = 60;
var exaltIcon = '';
var currentMax = 1;
var league = 'tmphardcore';
var tempRates;

function updateRates(){
  var result;
  let chart = document.getElementById("chart");

  console.log('I\'m updating the rates!');
  dataSent = {
    mode: "cors", // no-cors, cors, *same-origin
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-Requested-With": "XMLHttpRequest"
        },
  }

  fetch(`https://cors-anywhere.herokuapp.com/https://poe.ninja/api/Data/GetCurrencyOverview?league=${league}`, dataSent)
    .then(response => response.json())
    .then(data => result = data)
    .then(() => {
      console.log('We have data:',result)
      tempRates = parse(result);
      renderChaos();
      renderGraphs(tempRates);
    })
    .catch(err => {
      console.log("League:",league);
      console.log("It didn't work...", err);
    });
    return result;
}

function findNearestWholeTrade(itemChaosEquiv) {
  // In order to trade in whole numbers closest to the actual rate, find the nearest whole numbers
  // Example: Fusing at 1.75:1 chaos can instead be traded as 7 fusing for 4 chaos
  var result = 0;
  result += itemChaosEquiv;
  var count = 1;
  while(result.toFixed(1) % 1 !==0){
    result += itemChaosEquiv;
    count++;
  }
  result = Math.round(result);
  return [result, count];
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

  // Hard coded names for currency items less than 1 chaos
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
];
for (let item of result){ // Pulls data into the array of objects above
  // The index values are inconsistent from the API, so we utilize findIndex and match name strings
  item.chaosEquivalent = data.lines[data.lines.findIndex(function(currency) {return currency.currencyTypeName === item.name })].chaosEquivalent;
  item.icon = data.currencyDetails[data.currencyDetails.findIndex(function(currency){ return currency.name === item.name })].icon;
  if(item.chaosEquivalent > currentMax) currentMax = item.chaosEquivalent;
}
  chaosHeight = 100 / currentMax;
  return result;
}
function removeBarItem(index){
  console.log(`removing ${tempRates[index].name}`);
  tempRates.splice(index,1);
  currentMax = 1;
  for(let item of tempRates) { if(item.chaosEquivalent > currentMax) currentMax = item.chaosEquivalent; }
  renderChaos();
  renderGraphs(tempRates);
}

function renderGraphs(rates){
  console.log('rendering rates:',rates);
  chaosHeight = 100 / currentMax;
  let chart = document.getElementById("chart");
  let itemIndex = 0;
  for (var item of rates){
    let unspacedName = item.name.replace(/\'/g,'').replace(/\s/g,'');
    let chaosEquiv = item.chaosEquivalent;
    let barItem = document.createElement("div");
    let itemInfo = document.createElement("div");
    let deleteButton = document.createElement("button");
    let worth = (1 / chaosEquiv).toFixed(2);
    worth = (worth % 1 === 0) ? parseFloat(worth).toFixed(0) : worth; //Remove decimals when not necessary e.g. 10.00
    let height = (chaosHeight * chaosEquiv).toFixed(2);
    let nearestWholeTrade = findNearestWholeTrade(parseFloat(worth));
    deleteButton.innerHTML = "Remove"+itemIndex;
    deleteButton.id = itemIndex;
    console.log('adding event listener:',deleteButton.id);
    deleteButton.onclick = function(event){
      console.log('buttonclicked, deleting',event.target.id);
      removeBarItem(event.target.id);
    };
    itemInfo.innerHTML = `
    <div class="infoline">${nearestWholeTrade[1]} <img src="${chaosIcon}" width="32" height="32"> = ${nearestWholeTrade[0]} <img src="${item.icon}" width="32" height="32"></div> <br>
    <div class="infoline">10 <img src="${chaosIcon}" width="32" height="32"> = ${Math.round(10 / chaosEquiv)} <img src="${item.icon}" width="32" height="32"></div> <br>
    <div class="infoline">1&nbsp;&nbsp; <img src="${exaltIcon}" width="32" height="32"> = ${Math.round(exaltPrice * worth)} <img src="${item.icon}" width="32" height="32"></div>
    `;

    itemInfo.id = unspacedName + "-info";
    itemInfo.classList.add('hidden');
    itemInfo.appendChild(deleteButton);
    (height > 10) ? barItem.classList.add("BarGraph-bar") : barItem.classList.add("BarGraph-bar-small");

    barItem.onmouseover = function(){ document.getElementById(unspacedName+'-info').classList.remove('hidden');};
    barItem.onmouseleave = function(){ document.getElementById(unspacedName+'-info').classList.add('hidden');};

    barItem.textContent = item.name + '\r\n' + worth +':1c';
    barItem.appendChild(document.createElement("br"));

    let barImage = document.createElement("img");
    barImage.src = item.icon;
    barItem.appendChild(barImage);
    barItem.appendChild(itemInfo);
    barItem.style.height = height + "%";

    //console.log(item.name + "is worth " + worth + "| chaos equiv: " + chaosEquiv + "height: " + barItem.style.height);
    chart.appendChild(barItem);
    itemIndex++;
  }
}

function switchLeague(){
  currentMax = 1; chaosHeight = 100;
  let title = document.getElementById("league-title");
  let selectBox = document.getElementById("league");
  league = selectBox.options[selectBox.selectedIndex].value;
  let leagueTitle = selectBox.options[selectBox.selectedIndex].textContent;
  console.log("League",league);
  title.innerHTML = `Path of Exile Currency Rates in ${leagueTitle}`;
  renderChaos();
  updateRates();
}
/* TODO: Sort greatest to least
function sort(){
  let bars = document.querySelectorAll("BarGraph-bar");
  let currentMax = 0;
  for(let bar of bars){

  }
}*/

function renderChaos(){
  console.log('render is being called');
  let chart = document.getElementById("chart");
  while(chart.firstChild){
    chart.removeChild(chart.firstChild);
  }
  let bar = document.createElement("div");

  let chaosimage = document.createElement('img');
  chaosimage.id = "chaosIcon";
  chaosimage.src = chaosIcon;
  bar.classList.add("BarGraph-bar");

// To add delete button to chaos orb, remove most of this code and make Chaos Orb a part of the object array like everything else

  bar.id = "chaosBar";
  bar.style.height = chaosHeight+"%";
  bar.innerHTML = "1x<br>Chaos Orb<br>";

  let itemInfo = document.createElement("div");
  itemInfo.classList.add('info');
  itemInfo.id = "Chaos-info";
  itemInfo.classList.add('hidden');
  itemInfo.innerHTML = `
  <div class="infoline">1&nbsp;&nbsp; <img src="${exaltIcon}" width="32" height="32"> = ${exaltPrice} <img src="${chaosIcon}" width="32" height="32"></div>
  `;

  bar.onmouseover = function(){ document.getElementById('Chaos-info').classList.remove('hidden');};
  bar.onmouseleave = function(){ document.getElementById('Chaos-info').classList.add('hidden');};

  bar.appendChild(chaosimage);
  bar.appendChild(itemInfo);
  chart.appendChild(bar);
}
