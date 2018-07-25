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
      chaosEquivalent: data.lines[20].chaosEquivalent,
      icon: data.currencyDetails[14].icon
    },
    { name: 'Vaal Orb',
      chaosEquivalent: data.lines[21].chaosEquivalent,
      icon: data.currencyDetails[7].icon
    },
    { name: 'Orb of Regret',
      chaosEquivalent: data.lines[22].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'Orb of Fusing',
      chaosEquivalent: data.lines[23].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'OrbofScouring',
      chaosEquivalent: data.lines[24].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'BlessedOrb',
      chaosEquivalent: data.lines[25].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'OrbofAlchemy',
      chaosEquivalent: data.lines[26].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'CartographersChisel',
      chaosEquivalent: data.lines[27].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'GlassblowersBauble',
      chaosEquivalent: data.lines[28].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'SplinterofXoph',
      chaosEquivalent: data.lines[29].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'SilverCoin',
      chaosEquivalent: data.lines[30].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'OrbofBinding',
      chaosEquivalent: data.lines[31].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'JewellersOrb',
      chaosEquivalent: data.lines[32].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'SplinterofUulNetol',
      chaosEquivalent: data.lines[33].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'OrbofAlteration',
      chaosEquivalent: data.lines[34].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'ChromaticOrb',
      chaosEquivalent: data.lines[35].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'OrbofChance',
      chaosEquivalent: data.lines[36].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'SplinterofEsh',
      chaosEquivalent: data.lines[37].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'SplinterofTul',
      chaosEquivalent: data.lines[38].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'OrbofAugmentation',
      chaosEquivalent: data.lines[39].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'OrbofTransmutation',
      chaosEquivalent: data.lines[40].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'BlacksmithsWhetstone',
      chaosEquivalent: data.lines[41].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'PortalScroll',
      chaosEquivalent: data.lines[42].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'ArmourersScrap',
      chaosEquivalent: data.lines[43].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'PerandusCoin',
      chaosEquivalent: data.lines[44].chaosEquivalent,
      icon: data.currencyDetails[].icon
    },
    { name: 'ScrollofWisdom',
      chaosEquivalent: data.lines[45].chaosEquivalent,
      icon: data.currencyDetails[].icon
    }
];
  return result;
}
function renderGraphs(rates){
  let chart = document.getElementById("chart");
  for (var key in rates){
    chaosEquiv = rates[key].chaosEquivalent;
    let barItem = document.createElement("div");
    barItem.classList.add("BarGraph-bar");
    barItem.textContent = '= '+ (1 / rates[key]).toFixed(1) +'x '+ key;
    let barImage = document.createElement("img");
    barImage.src = rates[key].icon;
    barItem.style.height = 100 * rates[key] + "%";
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
