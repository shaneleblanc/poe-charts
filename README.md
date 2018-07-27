# PoE Currency grid
A bar graph of the most current currency values in Chaos Orbs and Exalted Orbs (the most commonly traded forms of currency, chaos may as well be the dollar of PoE).  Upon mousing over the bar items, the nearest whole trade possible will be shown (e.g. Fusing at 1.75:1c = 7 fusing for 4 chaos), followed by the trade price for 10 Chaos Orbs, followed by the Exalted Orb price (calculated from the Exalted Orb cost in Chaos Orbs).

## How it works:
- Using poe.ninja API to retrieve currency icons and chaos equivalents from all leagues.
- Math provides rates and also Exalt equivalencies.
- Currently using JSON data from 07/25/18 due to CORS issues. [Now using cors proxy for live update!]
- The graph is produced using mostly Javascript DOM manipulation and CSS grid.

## TODO:
- Select different leagues (Incursion, Incursion Hardcore, Standard) [Done]
- Switch chart to Horizontal? (or, fit text correctly in small vertical bars at the end?)
- Exalt Equivalency graph? (or, how to show data > 1 chaos orb?) [Added Exalts]
