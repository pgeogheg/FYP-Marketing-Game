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

	scoreCard.target_sales_men 				= info["scorecard[target_sales_men]"];
	scoreCard.target_sales_women			= info["scorecard[target_sales_women]"];
}

displayScorecard = function() {
	console.log(scoreCard);

	$('div[role="sales-revenue-bar"]').prop('aria-valuenow', scoreCard.sales_revenue);
	$('div[role="sales-revenue-bar"]').text(scoreCard.sales_revenue);
	$('div[role="sales-revenue-bar"]').css("width", Math.floor((scoreCard.sales_revenue/2000000)*100) + "%");

	$('div[role="gross-margin-bar"]').prop('aria-valuenow', scoreCard.gross_margin);
	$('div[role="gross-margin-bar"]').text(scoreCard.gross_margin);
	$('div[role="gross-margin-bar"]').css("width", scoreCard.gross_margin + "%");

	$('div[role="operating-profit-bar"]').prop('aria-valuenow', scoreCard.operating_profit);
	$('div[role="operating-profit-bar"]').text(scoreCard.operating_profit);
	$('div[role="operating-profit-bar"]').css("width", Math.floor((scoreCard.operating_profit/600000)*100) + "%");

	$('div[role="market-share-men-bar"]').prop('aria-valuenow', scoreCard.market_share_men);
	$('div[role="market-share-men-bar"]').text(scoreCard.market_share_men);
	$('div[role="market-share-men-bar"]').css("width", Math.floor((scoreCard.market_share_men/20)*100) + "%");

	$('div[role="market-share-women-bar"]').prop('aria-valuenow', scoreCard.market_share_women);
	$('div[role="market-share-women-bar"]').text(scoreCard.market_share_women);
	$('div[role="market-share-women-bar"]').css("width", Math.floor((scoreCard.market_share_women/20)*100) + "%");

	$('div[role="brand-awareness-men-bar"]').prop('aria-valuenow', scoreCard.brand_awareness_men);
	$('div[role="brand-awareness-men-bar"]').text(scoreCard.brand_awareness_men);
	$('div[role="brand-awareness-men-bar"]').css("width", scoreCard.brand_awareness_men + "%");

	$('div[role="brand-awareness-women-bar"]').prop('aria-valuenow', scoreCard.brand_awareness_women);
	$('div[role="brand-awareness-women-bar"]').text(scoreCard.brand_awareness_women);
	$('div[role="brand-awareness-women-bar"]').css("width", scoreCard.brand_awareness_women + "%");

	$('div[role="brand-image-men-bar"]').prop('aria-valuenow', scoreCard.brand_image_men);
	$('div[role="brand-image-men-bar"]').text(scoreCard.brand_image_men);
	$('div[role="brand-image-men-bar"]').css("width", scoreCard.brand_image_men + "%");

	$('div[role="brand-image-women-bar"]').prop('aria-valuenow', scoreCard.brand_image_women);
	$('div[role="brand-image-women-bar"]').text(scoreCard.brand_image_women);
	$('div[role="brand-image-women-bar"]').css("width", scoreCard.brand_image_women + "%");

	$('div[role="brand-loyalty-men-bar"]').prop('aria-valuenow', scoreCard.brand_loyalty_men);
	$('div[role="brand-loyalty-men-bar"]').text(scoreCard.brand_loyalty_men);
	$('div[role="brand-loyalty-men-bar"]').css("width", Math.floor((scoreCard.brand_loyalty_men/50)*100) + "%");

	$('div[role="brand-loyalty-women-bar"]').prop('aria-valuenow', scoreCard.brand_loyalty_women);
	$('div[role="brand-loyalty-women-bar"]').text(scoreCard.brand_loyalty_women);
	$('div[role="brand-loyalty-women-bar"]').css("width", Math.floor((scoreCard.brand_loyalty_women/50)*100) + "%");

	$('div[role="target-sales-men-bar"]').prop('aria-valuenow', scoreCard.target_sales_men);
	$('div[role="target-sales-men-bar"]').text(scoreCard.target_sales_men);
	$('div[role="target-sales-men-bar"]').css("width", scoreCard.target_sales_men + "%");

	$('div[role="target-sales-women-bar"]').prop('aria-valuenow', scoreCard.target_sales_women);
	$('div[role="target-sales-women-bar"]').text(scoreCard.target_sales_women);
	$('div[role="target-sales-women-bar"]').css("width", scoreCard.target_sales_women + "%");
}

window.onload = function () {
	loadScores();
}
