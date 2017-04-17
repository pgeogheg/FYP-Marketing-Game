player = {};

$("document").ready(function() {
  calcScores();
});

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
      calcSalesRevenue();
      calcMaterials();
      calcOperatingExpenses();
      calcMarketShareMen(players);
      calcMarketShareWomen(players);
      calcBrandAwareness();
      calcBrandImage();
      calcBrandLoyalty();
      calcStockManagement();
      console.log(player);
      displayResults();
      displayLeaderboard();
      postScores();
    }
  });
};

postScores = function() {
  $.ajax({
    url: 'http://localhost:3000/results',
    method: 'PUT',
    dataType: 'json',
    data: player,
    error: function(err) {
      console.error(err);
    },
    success: function(msg) {
      console.log(msg);
    }
  });
}

calcSalesRevenue = function() {
  var demand_m = parseInt(player["demand_m"]);
  var demand_f = parseInt(player["demand_f"]);

  var supply_m = parseInt(player["decisions[place][stock_m]"]);
  var supply_f = parseInt(player["decisions[place][stock_f]"]);

  var price_m = parseInt(player["decisions[price][sell_m]"]);
  var price_f = parseInt(player["decisions[price][sell_f]"]);

  if (demand_m > supply_m) {
    player["results[financial][sales_revenue_m]"] = supply_m * price_m;
  } else {
    player["results[financial][sales_revenue_m]"] = demand_m * price_m;
  }

  if (demand_f > supply_f) {
    player["results[financial][sales_revenue_f]"] = supply_f * price_f;
  } else {
    player["results[financial][sales_revenue_f]"] = demand_f * price_f;
  }
}

calcMaterials = function() {
  var materials_m = parseInt(player["decisions[product][quality_m]"]);
  var materials_f = parseInt(player["decisions[product][quality_f]"]);

  var supply_m = parseInt(player["decisions[place][stock_m]"]);
  var supply_f = parseInt(player["decisions[place][stock_f]"]);

  player["results[financial][materials_m]"] = materials_m * supply_m;
  player["results[financial][materials_f]"] = materials_f * supply_f;

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

  player["results[financial][manufacturing_m]"] = Math.floor((materials_m * supply_m) * (improvements_m / 100));
  player["results[financial][manufacturing_f]"] = Math.floor((materials_f * supply_f) * (improvements_f / 100));
}

calcOperatingExpenses = function() {
  player["results[financial][training]"] = parseInt(player["decisions[people][training_bud]"]);

  player["results[financial][service]"] = parseInt(player["decisions[process][service_m]"]) + parseInt(player["decisions[process][service_f]"]);

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
  player["results[financial][rent]"] = rent;

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
  player["results[financial][online]"] = onl;
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
  player["results[scorecard][market_share_men]"] = marketShare;
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
  player["results[scorecard][market_share_women]"] = marketShare;
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

  player["results[scorecard][brand_awareness_men]"] = parseInt(player["scorecard[brand_awareness_men]"]) + score;

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

  player["results[scorecard][brand_awareness_women]"] = parseInt(player["scorecard[brand_awareness_women]"]) + score;
}

calcBrandImage = function() {
  var service_m = player["decisions[process][service_m]"];
  var service_f = player["decisions[process][service_f]"];

  var decor_m = player["decisions[physical_environment][decor_m]"];
  var decor_f = player["decisions[physical_environment][decor_f]"];

  var phy_dist = player["decisions[place][phy_dist][]"];
  var onl_dist = player["decisions[place][onl_dist][]"];

  var score_m = 0.0;
  var score_f = 0.0;

  switch (service_m) {
    case "5000":
      score_m += 3;
      break;
    case "4000":
      score_m += 2;
      break;
    case "2500":
      score_m += 2;
      break;
    case "2000":
      score_m += 2;
      break;
    case "1000":
      score_m += 1;
      break;
    default:
      break;
  }

  switch (service_f) {
    case "5000":
      score_f += 3;
      break;
    case "4000":
      score_f += 2;
      break;
    case "2500":
      score_f += 2;
      break;
    case "2000":
      score_f += 2;
      break;
    case "1000":
      score_f += 1;
      break;
    default:
      break;
  }

  switch (decor_m) {
    case "40000":
      score_m += 3;
      break;
    case "25000":
      score_m += 2;
      break;
    case "10000":
      score_m += 1;
      break;
    default:
      break;
  }

  switch (decor_f) {
    case "40000":
      score_f += 3;
      break;
    case "25000":
      score_f += 2;
      break;
    case "10000":
      score_f += 1;
      break;
    default:
      break;
  }

  if (phy_dist) {
    if ($.isArray(phy_dist)) {
      phy_dist.forEach(function (elem){
        switch (elem) {
          case "25000":
            score_m += 3;
            score_f += 3;
            break;
          case "20000":
            score_m += 3;
            score_f += 3;
            break;
          case "19000":
            score_m += 2;
            score_f += 2;
            break;
          case "15000":
            score_m += 2;
            score_f += 2;
            break;
          case "10000":
            score_m += 1;
            score_f += 1;
            break;
          case "6000":
            score_m += 1;
            score_f += 1;
            break;
          default:
            break;
        }
      });
    } else {
      switch (phy_dist) {
        case "25000":
          score_m += 3;
          score_f += 3;
          break;
        case "20000":
          score_m += 3;
          score_f += 3;
          break;
        case "19000":
          score_m += 2;
          score_f += 2;
          break;
        case "15000":
          score_m += 2;
          score_f += 2;
          break;
        case "10000":
          score_m += 1;
          score_f += 1;
          break;
        case "6000":
          score_m += 1;
          score_f += 1;
          break;
        default:
          break;
      }
    }
  }

  if (onl_dist) {
    if ($.isArray(onl_dist)) {
      onl_dist.forEach(function (elem){
        switch (elem) {
          case "8000":
            score_m += 3;
            score_f += 3;
            break;
          case "4000":
            score_m += 2;
            score_f += 2;
            break;
          case "2000":
            score_m += 1;
            score_f += 1;
            break;
          default:
            break;
        }
      });
    } else {
      switch (onl_dist) {
        case "8000":
          score_m += 3;
          score_f += 3;
          break;
        case "4000":
          score_m += 2;
          score_f += 2;
          break;
        case "2000":
          score_m += 1;
          score_f += 1;
          break;
        default:
          break;
      }
    }
  }
  player["results[scorecard][target_sales_men]"] += score_m;
  player["results[scorecard][target_sales_women]"] += score_f;

  player["results[scorecard][brand_image_men]"] = parseInt(player["scorecard[brand_image_men]"]) + score_m;
  player["results[scorecard][brand_image_women]"] = parseInt(player["scorecard[brand_image_women]"]) + score_f;
}

calcBrandLoyalty = function() {
  var improvements_m = player["decisions[product][improvements_m][]"];
  var improvements_f = player["decisions[product][improvements_f][]"];

  var message_m = player["decisions[promotion][improvements_m][]"];
  var message_f = player["decisions[promotion][improvements_f][]"];

  var image_m = player["results[scorecard][brand_image_men]"];
  var image_f = player["results[scorecard][brand_image_women]"];

  var score_m = 0.0;
  var score_f = 0.0;

  if (improvements_m) {
    if ($.isArray(improvements_m)){
      improvements_m.forEach(function(elem){
        switch (elem) {
          case "18":
            score_m += 3;
            break;
          case "10":
            score_m += 2;
            break;
          case "8":
            score_m += 1;
            break;
          default:
            break;
        }
      });
    } else {
      switch (improvements_m) {
        case "18":
          score_m += 3;
          break;
        case "10":
          score_m += 2;
          break;
        case "8":
          score_m += 1;
          break;
        default:
          break;
      }
    }
  }

  if (improvements_f) {
    if ($.isArray(improvements_f)){
      improvements_f.forEach(function(elem){
        switch (elem) {
          case "18":
            score_f += 3;
            break;
          case "10":
            score_f += 2;
            break;
          case "8":
            score_f += 1;
            break;
          default:
            break;
        }
      });
    } else {
      switch (improvements_f) {
        case "18":
          score_f += 3;
          break;
        case "10":
          score_f += 2;
          break;
        case "8":
          score_f += 1;
          break;
        default:
          break;
      }
    }
  }

  if (message_m) {
    if ($.isArray(message_m)){
      message_m.forEach(function(elem){
        switch(elem) {
          case "0":
            score_m += 1.0;
            break;
          case "1":
            score_m += 2.0;
            break;
          case "2":
            score_m += 0.5;
            break;
          case "3":
            score_m += 1.5;
            break;
          case "4":
            score_m += 3.0;
            break;
          case "5":
            score_m += 0.5;
            break;
          default:
            break;
        }
      });
    } else {
      switch(message_m) {
        case "0":
          score_m += 1.0;
          break;
        case "1":
          score_m += 2.0;
          break;
        case "2":
          score_m += 0.5;
          break;
        case "3":
          score_m += 1.5;
          break;
        case "4":
          score_m += 3.0;
          break;
        case "5":
          score_m += 0.5;
          break;
        default:
          break;
      }
    }
  }

  if (message_f) {
    if ($.isArray(message_f)){
      message_f.forEach(function(elem){
        switch(elem) {
          case "0":
            score_f += 1.0;
            break;
          case "1":
            score_f += 2.0;
            break;
          case "2":
            score_f += 0.5;
            break;
          case "3":
            score_f += 1.5;
            break;
          case "4":
            score_f += 3.0;
            break;
          case "5":
            score_f += 0.5;
            break;
          default:
            break;
        }
      });
    } else {
      switch(message_f) {
        case "0":
          score_f += 1.0;
          break;
        case "1":
          score_f += 2.0;
          break;
        case "2":
          score_f += 0.5;
          break;
        case "3":
          score_f += 1.5;
          break;
        case "4":
          score_f += 3.0;
          break;
        case "5":
          score_f += 0.5;
          break;
        default:
          break;
      }
    }
  }

  player["results[scorecard][brand_loyalty_men]"] = parseInt(player["scorecard[brand_loyalty_men]"]) + score_m;
  player["results[scorecard][brand_loyalty_women]"] = parseInt(player["scorecard[brand_loyalty_women]"]) + score_f;
}

calcStockManagement = function() {
  var supply_m = parseInt(player["decisions[place][stock_m]"]);
  var supply_f = parseInt(player["decisions[place][stock_f]"]);
  var supply = supply_m + supply_f;

  var demand_m = parseInt(player["demand_m"]);
  var demand_f = parseInt(player["demand_f"]);
  var demand = demand_m + demand_f;

  player["results[financial][warehousing]"] = 0;

  if (demand > supply) {
    player["results[scorecard][stock_management]"] = Math.floor((supply/demand) * 100);
  } else {
    player["results[scorecard][stock_management]"] = Math.floor((demand/supply) * 100);
    player["results[financial][warehousing]"] = 10 * supply - demand;
  }
}

displayResults = function() {
  player["results[score]"] = 0;

  var sRev = parseInt(player["results[financial][sales_revenue_m]"]) + parseInt(player["results[financial][sales_revenue_f]"]);
  $('div[role="new-sales-rev-bar"]').prop('aria-valuenow', sRev);
  $('div[role="new-sales-rev-bar"]').text(sRev);
  $('div[role="new-sales-rev-bar"]').css('width', ((sRev/2000000)*100) + "%");
  $('#sales_revenue_m').text(player["results[financial][sales_revenue_m]"]);
  $('#sales_revenue_f').text(player["results[financial][sales_revenue_f]"]);
  $('#sales_revenue_total').text(sRev);

  player["results[score]"] += Math.floor((sRev/2000000)*100);

  $('#materials_m').text(player["results[financial][materials_m]"]);
  $('#materials_f').text(player["results[financial][materials_f]"]);
  var materialsTotal = parseInt(player["results[financial][materials_m]"]) + parseInt(player["results[financial][materials_f]"]);
  $('#materials_total').text(materialsTotal);

  $('#manufacturing_m').text(player["results[financial][manufacturing_m]"]);
  $('#manufacturing_f').text(player["results[financial][manufacturing_f]"]);
  var manufacturingTotal = parseInt(player["results[financial][manufacturing_m]"]) + parseInt(player["results[financial][manufacturing_f]"]);
  $('#manufacturing_total').text(manufacturingTotal);

  var totalCoSMen = parseInt(player["results[financial][materials_m]"]) + parseInt(player["results[financial][manufacturing_m]"]) + 5000;
  var totalCoSWomen = parseInt(player["results[financial][materials_f]"]) + parseInt(player["results[financial][manufacturing_f]"]) + 5000;
  var totalCoSTotal = totalCoSMen + totalCoSWomen;
  $('#total_cos_men').text(totalCoSMen);
  $('#total_cos_women').text(totalCoSWomen);
  $('#total_cos_total').text(totalCoSTotal);

  var grossProfitMen = parseInt(player["results[financial][sales_revenue_m]"]) - totalCoSMen;
  var grossProfitWomen = parseInt(player["results[financial][sales_revenue_f]"]) - totalCoSWomen;
  var grossProfitTotal = grossProfitMen + grossProfitWomen;
  $('#gross_profit_men').text(grossProfitMen);
  $('#gross_profit_women').text(grossProfitWomen);
  $('#gross_profit_total').text(grossProfitTotal);

  var grossMargin = (grossProfitTotal/sRev) * 100;
  $('div[role="new-gross-margin-bar"]').prop('aria-valuenow', grossMargin);
  $('div[role="new-gross-margin-bar"]').text(grossMargin);
  $('div[role="new-gross-margin-bar"]').css('width', grossMargin + "%");

  player["results[score]"] += Math.floor(grossMargin);

  $('#training').text(player["results[financial][training]"]);
  $('#service').text(player["results[financial][service]"]);
  $('#rent').text(player["results[financial][rent]"]);
  $('#online').text(player["results[financial][online]"]);
  $('#warehousing').text(player["results[financial][warehousing]"]);

  var totalExpenses = parseInt(player["results[financial][training]"]) +
                      parseInt(player["results[financial][service]"]) +
                      parseInt(player["results[financial][rent]"]) +
                      parseInt(player["results[financial][online]"]) +
                      parseInt(player["results[financial][warehousing]"]) +
                      35000 + 7000 + 47000;
  $('#total_expenses').text(totalExpenses);

  var operatingProfit = grossProfitTotal - totalExpenses
  $('#operating_profit').text(operatingProfit);

  $('div[role="new-operating-profit-bar"]').prop('aria-valuenow', operatingProfit);
  $('div[role="new-operating-profit-bar"]').text(operatingProfit);
  $('div[role="new-operating-profit-bar"]').css('width', ((operatingProfit/600000)*100) + "%");

  player["results[score]"] += Math.floor((operatingProfit/600000)*100);

  $('div[role="new-market-share-men-bar"]').prop('aria-valuenow', player["results[scorecard][market_share_men]"]);
  $('div[role="new-market-share-men-bar"]').text(player["results[scorecard][market_share_men]"]);
  $('div[role="new-market-share-men-bar"]').css('width', ((player["results[scorecard][market_share_men]"]/20)*100) + "%");

  player["results[score]"] += Math.floor((player["results[scorecard][market_share_men]"]/20)*100);

  $('div[role="new-market-share-women-bar"]').prop('aria-valuenow', player["results[scorecard][market_share_women]"]);
  $('div[role="new-market-share-women-bar"]').text(player["results[scorecard][market_share_women]"]);
  $('div[role="new-market-share-women-bar"]').css('width', ((player["results[scorecard][market_share_women]"]/20)*100) + "%");

  player["results[score]"] += Math.floor((player["results[scorecard][market_share_women]"]/20)*100);

  $('div[role="new-brand-awareness-men-bar"]').prop('aria-valuenow', player["results[scorecard][brand_awareness_men]"]);
  $('div[role="new-brand-awareness-men-bar"]').text(player["results[scorecard][brand_awareness_men]"]);
  $('div[role="new-brand-awareness-men-bar"]').css('width', player["results[scorecard][brand_awareness_men]"] + "%");

  player["results[score]"] += Math.floor(player["results[scorecard][brand_awareness_men]"]);

  $('div[role="new-brand-awareness-women-bar"]').prop('aria-valuenow', player["results[scorecard][brand_awareness_women]"]);
  $('div[role="new-brand-awareness-women-bar"]').text(player["results[scorecard][brand_awareness_women]"]);
  $('div[role="new-brand-awareness-women-bar"]').css('width', player["results[scorecard][brand_awareness_women]"] + "%");

  player["results[score]"] += Math.floor(player["results[scorecard][brand_awareness_women]"]);

  $('div[role="new-brand-image-men-bar"]').prop('aria-valuenow', player["results[scorecard][brand_image_men]"]);
  $('div[role="new-brand-image-men-bar"]').text(player["results[scorecard][brand_image_men]"]);
  $('div[role="new-brand-image-men-bar"]').css('width', player["results[scorecard][brand_image_men]"] + "%");

  player["results[score]"] += Math.floor(player["results[scorecard][brand_image_men]"]);

  $('div[role="new-brand-image-women-bar"]').prop('aria-valuenow', player["results[scorecard][brand_image_women]"]);
  $('div[role="new-brand-image-women-bar"]').text(player["results[scorecard][brand_image_women]"]);
  $('div[role="new-brand-image-women-bar"]').css('width', player["results[scorecard][brand_image_women]"] + "%");

  player["results[score]"] += Math.floor(player["results[scorecard][brand_image_women]"]);

  $('div[role="new-brand-loyalty-men-bar"]').prop('aria-valuenow', player["results[scorecard][brand_loyalty_men]"]);
  $('div[role="new-brand-loyalty-men-bar"]').text(player["results[scorecard][brand_loyalty_men]"]);
  $('div[role="new-brand-loyalty-men-bar"]').css('width', ((player["results[scorecard][brand_loyalty_men]"]/50)*100) + "%");

  player["results[score]"] += Math.floor((player["results[scorecard][brand_loyalty_men]"]/50)*100);

  $('div[role="new-brand-loyalty-women-bar"]').prop('aria-valuenow', player["results[scorecard][brand_loyalty_women]"]);
  $('div[role="new-brand-loyalty-women-bar"]').text(player["results[scorecard][brand_loyalty_women]"]);
  $('div[role="new-brand-loyalty-women-bar"]').css('width', ((player["results[scorecard][brand_loyalty_women]"]/50)*100) + "%");

  player["results[score]"] += Math.floor((player["results[scorecard][brand_loyalty_women]"]/50)*100);

  console.log(player["results[score]"]);

  if (parseInt(player["results[scorecard][brand_image_men]"]) - parseInt(player["scorecard[brand_image_men]"]) >= 5) {
    $('#marketing-objective-status').text("COMPLETE");
    player["results[score]"] += 100;
  } else {
    $('#marketing-objective-status').text("INCOMPLETE");
  }

  $('#new-score').text(parseInt(player["score"]) + player["results[score]"]);
}

displayLeaderboard = function() {
  var leaderboard = [
    {name: 'Player 4', score: 2000},
    {name: 'Player 3', score: 1500},
    {name: 'Player 2', score: 1400},
    {name: 'Player 8', score: 1500},
    {name: 'Player 6', score: 1200},
    {name: 'Player 7', score: 1200},
    {name: 'Player 5', score: 1000},
  ];

  var pScore = parseInt(player["score"]) + player["results[score]"];

  var insertIndex = 0;

  for (var i = 0; i < leaderboard.length; i++) {
    if (pScore < leaderboard[i].score) {
      insertIndex++;
    } else {
      break;
    }
  }

  leaderboard.splice(insertIndex, 0, {name: "You", score: pScore});

  console.log(leaderboard);

  for (var i = 0; i < leaderboard.length; i++) {
    $('#pos'+i+'n').text(leaderboard[i].name);
    $('#pos'+i+'s').text(leaderboard[i].score);
  }
}
