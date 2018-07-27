
function findNearestWholeTrade(itemChaosEquivalent) {
  // In order to trade in whole numbers closest to the actual rate, find the nearest whole numbers
  // Example: Fusing at 1.75:1 chaos can instead be traded as 7 fusing for 4 chaos
  var result = itemChaosEquivalent;
  var count = 1;
  while(result.toFixed(1) % 1 !==0){
    result += itemChaosEquivalent;
    console.log(result);
    count++;
  }
  result = Math.round(result);
  return [count, result];
}
console.log(findNearestWholeTrade(1.19))
