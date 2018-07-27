
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
console.log(findNearestWholeTrade(1.19));
var currentMax = 1.2;
function scaleRange(value) { //Scales Number in Range r1 to Number in Range r2
    let r1 = [0, currentMax];
    let r2 = [0, 100];
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
console.log('Scaled 0.75 to',scaleRange(0.75));
