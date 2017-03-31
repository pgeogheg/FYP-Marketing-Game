const kpiInfo = {
  "0": {
    name: "Sales Revenue",
    min: "0",
    max: "2000000"
  },
  "1": {
    name: "Gross Margin",
    min: "10",
    max: "100"
  },
  "2": {
    name: "Operating Profit",
    min: "0",
    max: "600000"
  },
  "3": {
    name: "Market Share Men",
    min: "0",
    max: "20"
  },
  "4": {
    name: "Market Share Women",
    min: "0",
    max: "20",
  },
  "5": {
    name: "Brand Awareness Men",
    min: "0",
    max: "100"
  },
  "6": {
    name: "Brand Awareness Women",
    min: "0",
    max: "100"
  },
  "7": {
    name: "Brand Image Men",
    min: "0",
    max: "100"
  },
  "8": {
    name: "Brand Image Women",
    min: "0",
    max: "100"
  },
  "9": {
    name: "Brand Loyalty Men",
    min: "0",
    max: "50"
  },
  "10": {
    name: "Brand Loyalty Women",
    min: "0",
    max: "50"
  }
}

var kpis = [];
var kpiScores = [];
var mainScore = 0;

getPlayerDashInfo = function() {
  $.ajax({
    url: 'http://localhost:3000/players/0',
    method: 'GET',
    dataType: 'json',
    error: function(err) {
      console.error(err);
    },
    success: function(player) {
      kpis = player["decisions[kpis][]"];
      mainScore = player["score"];
      getKpiScores(player);
      displayDashInfo();
    }
  })
};

getKpiScores = function(info) {
  kpiScores = [];
  kpis.forEach(function(elem) {
    switch(elem) {
      case "0":
        kpiScores.push(info["scorecard[sales_revenue]"]);
        break;
      case "1":
        kpiScores.push(info["scorecard[gross_margin]"]);
        break;
      case "2":
        kpiScores.push(info["scorecard[operating_profit]"]);
        break;
      case "3":
        kpiScores.push(info["scorecard[market_share_men]"]);
        break;
      case "4":
        kpiScores.push(info["scorecard[market_share_women]"]);
        break;
      case "5":
        kpiScores.push(info["scorecard[brand_awareness_men]"]);
        break;
      case "6":
        kpiScores.push(info["scorecard[brand_awareness_women]"]);
        break;
      case "7":
        kpiScores.push(info["scorecard[brand_image_men]"]);
        break;
      case "8":
        kpiScores.push(info["scorecard[brand_image_women]"]);
        break;
      case "9":
        kpiScores.push(info["scorecard[brand_loyalty_men]"]);
        break;
      case "10":
        kpiScores.push(info["scorecard[brand_loyalty_women]"]);
        break;
      default:
        break;
    }
  });
}

displayDashInfo = function() {
  $('#dash-score').text('Score: ' + mainScore);

  for (var i = 0; i < 3; i++) {
    var kpi = kpis[i];
    var info = kpiInfo[kpi];
    var percent = Math.floor((kpiScores[i]/info.max) * 100);
    $('#dash-kpi-head' + i).text(info.name);
    $('#dash-kpi-bar' + i).attr('aria-valuemin', info.min);
    $('#dash-kpi-bar' + i).attr('aria-valuemax', info.max);
    $('#dash-kpi-bar' + i).attr('aria-valuenow', kpiScores[i]);
    $('#dash-kpi-bar' + i).css('width', percent+"%");
    $('#dash-kpi-bar' + i).text(kpiScores[i]);
  }
}

window.onload = function() {
  getPlayerDashInfo();
}
