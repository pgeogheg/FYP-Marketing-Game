window.onload = function () {
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
