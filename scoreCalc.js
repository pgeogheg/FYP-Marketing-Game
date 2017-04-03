player = {};
updatedPlayer = {};

calcScores = function() {
  $.ajax({
    url: 'http://localhost:3000/players',
    method: 'GET',
    dataType: 'json',
    error: function(err) {
      console.error(err);
    },
    success: function(players) {
      console.log(players);
      player = players[0];
    }
  });
};

calcSalesRevenue = function() {
  var demand_m = parseInt(player["demand_m"]);
  var demand_f = parseInt(player["demand_f"]);

  var supply_m = parseInt(player["decisions[place][stock_m]"]);
  var supply_f = parseInt(player["decisions[place][stock_f]"]);

  var price_m = parseInt(player["decisions[price][sell_m]"]);
  var price_f = parseInt(player["decisions[price][sell_f]"]);

  if (demand_m > supply_m) {
    updatedPlayer["financial[sales_revenue_m]"] = supply_m * price_m;
  } else {
    updatedPlayer["financial[sales_revenue_m]"] = demand_m * price_m;
  }

  if (demand_f > supply_f) {
    updatedPlayer["financial[sales_revenue_f]"] = supply_f * price_f;
  } else {
    updatedPlayer["financial[sales_revenue_f]"] = demand_f * price_f;
  }
}

calcMaterials = function() {
  var materials_m = parseInt(player["decisions[product][quality_m]"]);
  var materials_m = parseInt(player["decisions[product][quality_f]"]);

  var supply_m = parseInt(player["decisions[place][stock_m]"]);
  var supply_f = parseInt(player["decisions[place][stock_f]"]);

  updatedPlayer["financial[materials_m]"] = materials_m * supply_m;
  updatedPlayer["financial[materials_f]"] = materials_f * supply_f;

  var improvements_m = 0;
  if (player["decisions[product][improvements_m][]"]) {
    if ($.isArray(player["decisions[product][improvements_m][]"])){
      player["decisions[product][improvements_m][]"].forEach(function(elem) {
        improvements_m += parseInt(elem);
      });
    } else {
      improvements_m = parseInt(player["decisions[product][improvements_m][]"]);
    }
  }

  var improvements_f = 0;
  if (player["decisions[product][improvements_f][]"]) {
    if ($.isArray(player["decisions[product][improvements_f][]"])){
      player["decisions[product][improvements_f][]"].forEach(function(elem) {
        improvements_f += parseInt(elem);
      });
    } else {
      improvements_f = parseInt(player["decisions[product][improvements_f][]"]);
    }
  }

  updatedPlayer["financial[manufacturing_m]"] = Math.floor((materials_m * supply_m) * (improvements_m / 100));
  updatedPlayer["financial[manufacturing_f]"] = Math.floor((materials_f * supply_f) * (improvements_f / 100));
}

calcOperatingExpenses = function() {
  updatedPlayer["financial[training]"] = parseInt(player["decisions[people][training_bud]"]);

  updatedPlayer["financial[service]"] = parseInt(player["decisions[process][service_m]"]) + parseInt(player["decisions[process][service_f]"]);

  var rent = 0;
  if (player["decisions[place][phy_dist][]"]) {
    if ($.isArray(player["decisions[place][phy_dist][]"])){
      player["decisions[place][phy_dist][]"].forEach(function(elem) {
        rent += parseInt(elem);
      });
    } else {
      rent = parseInt(player["decisions[place][phy_dist][]"]);
    }
  }
  updatedPlayer["financial[rent]"] = rent;

  var onl = 0;
  if (player["decisions[place][onl_dist][]"]) {
    if ($.isArray(player["decisions[place][onl_dist][]"])){
      player["decisions[place][onl_dist][]"].forEach(function(elem) {
        onl += parseInt(elem);
      });
    } else {
      onl = parseInt(player["decisions[place][onl_dist][]"]);
    }
  }
  updatedPlayer["financial[online]"] = onl;
}

calcMarketShareMen = function(players) {
  var total = 0;
  var pFig = 0;

  players.forEach(function(elem) {
    if (elem["id"] === 0) {
      pFig = parseInt(elem["financial[sales_revenue_m]"]);
      total += pFig;
    } else {
      total += parseInt(elem["sales_revenue_m"]);
    }
  });

  var marketShare = Math.floor((pFig/total) * 100);
  updatedPlayer["scorecard[market_share_men]"] = marketShare;
}

calcMarketShareWomen = function(players) {
  var total = 0;
  var pFig = 0;

  players.forEach(function(elem) {
    if (elem["id"] === 0) {
      pFig = parseInt(elem["financial[sales_revenue_f]"]);
      total += pFig;
    } else {
      total += parseInt(elem["sales_revenue_f"]);
    }
  });

  var marketShare = Math.floor((pFig/total) * 100);
  updatedPlayer["scorecard[market_share_women]"] = marketShare;
}

calcBrandAwareness = function() {
  var score = 0.0;
  if (player["decisions[promotion][messages_m]"]) {
    if ($.isArray(player["decisions[promotion][messages_m]"])) {
      player["decisions[promotion][messages_m]"].forEach(function(elem) {
        switch (elem) {
          case "0":
            score += 1.0;
            break;
          case "1":
            score += 2.0;
            break;
          case "2":
            score += 0.5;
            break;
          case "3":
            score += 1.5;
            break;
          case "4":
            score += 3.0;
            break;
          case "5":
            score += 0.5;
            break;
          default:
            break;
        }
      });
    } else {
      switch (player["decisions[promotion][messages_m]"]) {
        case "0":
          score += 1.0;
          break;
        case "1":
          score += 2.0;
          break;
        case "2":
          score += 0.5;
          break;
        case "3":
          score += 1.5;
          break;
        case "4":
          score += 3.0;
          break;
        case "5":
          score += 0.5;
          break;
        default:
          break;
      }
    }
  }

  updatedPlayer["scorecard[brand_awareness_men]"] = parseInt(player["scorecard[brand_awareness_men]"]) + score;

  score = 0.0;
  if (player["decisions[promotion][messages_f]"]) {
    if ($.isArray(player["decisions[promotion][messages_f]"])) {
      player["decisions[promotion][messages_f]"].forEach(function(elem) {
        switch (elem) {
          case "0":
            score += 1.0;
            break;
          case "1":
            score += 2.0;
            break;
          case "2":
            score += 0.5;
            break;
          case "3":
            score += 1.5;
            break;
          case "4":
            score += 3.0;
            break;
          case "5":
            score += 0.5;
            break;
          default:
            break;
        }
      });
    } else {
      switch (player["decisions[promotion][messages_f]"]) {
        case "0":
          score += 1.0;
          break;
        case "1":
          score += 2.0;
          break;
        case "2":
          score += 0.5;
          break;
        case "3":
          score += 1.5;
          break;
        case "4":
          score += 3.0;
          break;
        case "5":
          score += 0.5;
          break;
        default:
          break;
      }
    }
  }

  updatedPlayer["scorecard[brand_awareness_women]"] = parseInt(player["scorecard[brand_awareness_women]"]) + score;
}

calcBrandImage = function(promotion, target, service, environment, distribution) {
  var service_m = player["decisions[process][service_m]"];
  var service_f = player["decisions[process][service_f]"];

  var decor_m = player["decisions[physical_environment][decor_m]"];
  var decor_f = player["decisions[physical_environment][decor_f]"];
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
