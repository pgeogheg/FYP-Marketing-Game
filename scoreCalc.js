calcBrandAwareness = function(promotion, target) {
  
}

calcBrandImage = function(promotion, target, service, environment, distribution) {

}

calcBrandLoyalty = function(improvements, promotion, target, image) {

}

calcStockManagement = function(demand, supply) {
  if (demand > supply) {
    return Math.floor((supply/demand) * 100);
  } else {
    return Math.floor((demand/supply) * 100);
  }
}
