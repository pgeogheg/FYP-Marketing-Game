scoreCard = {};

loadScores = function() {
	$.ajax({
		url: 'http://localhost:3000/players/0',
		method: 'GET',
		dataType: 'json',
		error: function(err) {
			console.error(err);
		},
		success: function(player) {
			parseScorecard(player);
			displayScorecard();
		}
	});
}

parseScorecard = function(info) {
	scoreCard.sales_revenue 					= info["scorecard[sales_revenue]"];
	scoreCard.gross_margin 						= info["scorecard[gross_margin]"];
	scoreCard.operating_profit 				= info["scorecard[operating_profit]"];
	scoreCard.market_share_men 				= info["scorecard[market_share_men]"];
	scoreCard.market_share_women 			= info["scorecard[market_share_women]"];
	scoreCard.brand_awareness_men 		= info["scorecard[brand_awareness_men]"];
	scoreCard.brand_awareness_women 	= info["scorecard[brand_awareness_women]"];
	scoreCard.brand_image_men 				= info["scorecard[brand_image_men]"];
	scoreCard.brand_image_women				= info["scorecard[brand_image_women]"];
	scoreCard.brand_loyalty_men 			= info["scorecard[brand_loyalty_men]"];
	scoreCard.brand_loyalty_women 		= info["scorecard[brand_loyalty_women]"];
}

displayScorecard = function() {
	console.log(scoreCard);
}

window.onload = function () {
	loadScores();

	var chart_m = new CanvasJS.Chart("chartContainerM",
	{
		title:{
			text: "Male"
		},
		legend: {
			maxWidth: 350,
			itemWidth: 120
		},
		data: [
		{
			type: "pie",
			showInLegend: true,
			legendText: "{indexLabel}: {y}%",
			dataPoints: [
				{ y: 24,  indexLabel: "Team 1"  },
				{ y: 21,  indexLabel: "Team 2"  },
				{ y: 5,   indexLabel: "Team 3"  },
				{ y: 7,   indexLabel: "Team 4"  },
				{ y: 18,  indexLabel: "Team 5"  },
				{ y: 15,  indexLabel: "Team 6"  },
				{ y: 5,   indexLabel: "Team 7"  },
        { y: 5,   indexLabel: "Team 8"  }
			]
		}
		]
	});
  chart_m.render();
  chart_m = {};

  var chart_f = new CanvasJS.Chart("chartContainerF",
	{
		title:{
			text: "Female"
		},
		legend: {
			maxWidth: 350,
			itemWidth: 120
		},
		data: [
		{
			type: "pie",
			showInLegend: true,
			legendText: "{indexLabel}: {y}%",
			dataPoints: [
				{ y: 19,  indexLabel: "Team 1"  },
				{ y: 18,  indexLabel: "Team 2"  },
				{ y: 10,  indexLabel: "Team 3"  },
				{ y: 6,   indexLabel: "Team 4"  },
				{ y: 25,  indexLabel: "Team 5"  },
				{ y: 14,  indexLabel: "Team 6"  },
				{ y: 4,   indexLabel: "Team 7"  },
        { y: 4,   indexLabel: "Team 8"  }
			]
		}
		]
	});
	chart_f.render();
  chart_f = {};
}
