const chaosHeight = 100;
var chaosIcon = '';
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
  chaosIcon = data.currencyDetails[0].icon;
  chaosimage = document.getElementById('chaosIcon');
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
    { name: 'Gemcutter\'s Prism',
      chaosEquivalent: data.lines[19].chaosEquivalent,
      icon: data.currencyDetails[14].icon
    },
    { name: 'Vaal Orb',
      chaosEquivalent: data.lines[20].chaosEquivalent,
      icon: data.currencyDetails[7].icon
    },
    { name: 'Orb of Regret',
      chaosEquivalent: data.lines[21].chaosEquivalent,
      icon: data.currencyDetails[1].icon
    },
    { name: 'Orb of Fusing',
      chaosEquivalent: data.lines[22].chaosEquivalent,
      icon: data.currencyDetails[4].icon
    },
    { name: 'Orb of Scouring',
      chaosEquivalent: data.lines[23].chaosEquivalent,
      icon: data.currencyDetails[13].icon
    },
    { name: 'Blessed Orb',
      chaosEquivalent: data.lines[24].chaosEquivalent,
      icon: data.currencyDetails[17].icon
    },
    { name: 'Orb of Alchemy',
      chaosEquivalent: data.lines[25].chaosEquivalent,
      icon: data.currencyDetails[3].icon
    },
    { name: 'Cartographer\'s Chisel',
      chaosEquivalent: data.lines[26].chaosEquivalent,
      icon: data.currencyDetails[9].icon
    },
    { name: 'Glassblower\'s Bauble',
      chaosEquivalent: data.lines[27].chaosEquivalent,
      icon: data.currencyDetails[19].icon
    },
    { name: 'Splinter of Xoph',
      chaosEquivalent: data.lines[28].chaosEquivalent,
      icon: data.currencyDetails[55].icon
    },
    { name: 'Silver Coin',
      chaosEquivalent: data.lines[29].chaosEquivalent,
      icon: data.currencyDetails[11].icon
    },
    { name: 'Orb of Binding',
      chaosEquivalent: data.lines[30].chaosEquivalent,
      icon: data.currencyDetails[73].icon
    },
    { name: 'Jewellers Orb',
      chaosEquivalent: data.lines[31].chaosEquivalent,
      icon: data.currencyDetails[10].icon
    },
    { name: 'Splinter of UulNetol',
      chaosEquivalent: data.lines[32].chaosEquivalent,
      icon: data.currencyDetails[58].icon
    },
    { name: 'Orb of Alteration',
      chaosEquivalent: data.lines[33].chaosEquivalent,
      icon: data.currencyDetails[5].icon
    },
    { name: 'Chromatic Orb',
      chaosEquivalent: data.lines[34].chaosEquivalent,
      icon: data.currencyDetails[16].icon
    },
    { name: 'Orb of Chance',
      chaosEquivalent: data.lines[35].chaosEquivalent,
      icon: data.currencyDetails[15].icon
    },
    { name: 'Splinter of Esh',
      chaosEquivalent: data.lines[36].chaosEquivalent,
      icon: data.currencyDetails[57].icon
    },
    { name: 'Splinter of Tul',
      chaosEquivalent: data.lines[37].chaosEquivalent,
      icon: data.currencyDetails[56].icon
    },
    { name: 'Orb of ugmentation',
      chaosEquivalent: data.lines[38].chaosEquivalent,
      icon: data.currencyDetails[19].icon
    },
    { name: 'Orb of Transmutation',
      chaosEquivalent: data.lines[39].chaosEquivalent,
      icon: data.currencyDetails[20].icon
    },
    { name: 'Blacksmith\'s Whetstone',
      chaosEquivalent: data.lines[40].chaosEquivalent,
      icon: data.currencyDetails[24].icon
    },
    { name: 'Portal Scroll',
      chaosEquivalent: data.lines[41].chaosEquivalent,
      icon: data.currencyDetails[23].icon
    },
    { name: 'Armourer\'s Scrap',
      chaosEquivalent: data.lines[42].chaosEquivalent,
      icon: data.currencyDetails[25].icon
    },
    { name: 'Perandus Coin',
      chaosEquivalent: data.lines[43].chaosEquivalent,
      icon: data.currencyDetails[12].icon
    },
    { name: 'Scroll of Wisdom',
      chaosEquivalent: data.lines[44].chaosEquivalent,
      icon: data.currencyDetails[22].icon
    }
];
  return result;
}
function renderGraphs(rates){
  let chart = document.getElementById("chart");
  for (var item of rates){
    console.log(item);
    chaosEquiv = item.chaosEquivalent;
    let barItem = document.createElement("div");
    barItem.classList.add("BarGraph-bar");
    barItem.textContent = (1 / chaosEquiv).toFixed(1) +'x '+ item.name;
    barItem.appendChild(document.createElement("br"));
    let barImage = document.createElement("img");
    barImage.src = item.icon;
    barItem.appendChild(barImage);
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
  bar.style.height = chaosHeight + "%";
  bar.textContent = "= 1 Chaos Orb";
  bar.appendChild(chaosimage);
  chart.appendChild(bar);
}
