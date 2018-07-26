# PoE Currency grid
- All data is pulled from https://poe.ninja/challengehc/currency - this uses the latest data from Hardcore variant of the current PoE temporary league, "Incursion".
- As Chaos Orbs are most often used as a baseline, they are used as the base here. To show data past 100%, 50% is used instead of 100% for the Chaos Orb. So for all values relative to the Chaos Orb, they have been divided by 2 to reach the percentage relative to the Chaos Orb.
- To update this data automatically, I will likely need to parse raw stash tab data from the POE API.

## Update: 
- Using poe.ninja API to retrieve currency icons and chaos equivalents. 
- Math provides rates and also Exalt equivalencies.
- Currently using JSON data from 07/25/18 due to CORS issues. 

## TODO:
- Select different leagues (Incursion, Incursion Hardcore, Standard)
- Switch chart to Horizontal? (or, fit text correctly in small vertical bars at the end?) 
- Exalt Equivalency graph? (or, how to show data > 1 chaos orb?)
