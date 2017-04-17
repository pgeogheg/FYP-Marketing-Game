var decisions = {
  'kpis': [0, 3, 5],
  'market': {
    'measure': 740006,
    'access': 59205,
    'subtance': 465312,
    'different': 40,
    'action': 35
  },
  'positioning': {
    'price_m': 0,
    'price_f': 0,
    'quality_m': 0,
    'quality_f': 0
  },
  'product': {
    'quality_m': 45,
    'quality_f': 45,
    'improvements_m': [],
    'improvements_f': []
  },
  'price': {
    'sell_m': 160,
    'sell_f': 160
  },
  'promotion': {
    'message_m': [],
    'message_f': []
  },
  'place': {
    'phy_dist': [],
    'onl_dist': [],
    'stock_m': 10000,
    'stock_f': 10000
  },
  'people': {
    'training_bud': 6000
  },
  'process': {
    'service_m': 1000,
    'service_f': 1000
  },
  'physical_environment': {
    'decor_m': 10000,
    'decor_f': 10000
  }
};

loadDecisions = function() {
  $.ajax({
    url: 'http://localhost:3000/players/0',
    method: 'GET',
    dataType: 'json',
    success: function(player) {
      parseDecisions(player);
      setDecisions();
    },
    error: function(err) {
      console.error(err);
    }
  });
}

parseDecisions = function(info) {
  if (info["decisions[kpis][]"]) {
    decisions.kpis = info["decisions[kpis][]"];
  }

  if (info["decisions[positioning][price_m]"]) {
    decisions.positioning.price_m = info["decisions[positioning][price_m]"];
  }

  if (info["decisions[positioning][price_f]"]) {
    decisions.positioning.price_f = info["decisions[positioning][price_f]"];
  }

  if (info["decisions[positioning][quality_m]"]) {
    decisions.positioning.quality_m = info["decisions[positioning][quality_m]"];
  }

  if (info["decisions[positioning][quality_f]"]) {
    decisions.positioning.quality_f = info["decisions[positioning][quality_f]"];
  }

  if (info["decisions[product][quality_m]"]) {
    decisions.product.quality_m = info["decisions[product][quality_m]"];
  }

  if (info["decisions[product][quality_f]"]) {
    decisions.product.quality_f = info["decisions[product][quality_f]"];
  }

  if (info["decisions[product][improvements_m][]"]) {
    decisions.product.improvements_m = info["decisions[product][improvements_m][]"];
  }

  if (info["decisions[product][improvements_f][]"]) {
    decisions.product.improvements_f = info["decisions[product][improvements_f][]"];
  }

  if (info["decisions[price][sell_m]"]) {
    decisions.price.sell_m = info["decisions[price][sell_m]"];
  }

  if (info["decisions[price][sell_f]"]) {
    decisions.price.sell_f = info["decisions[price][sell_f]"];
  }

  if (info["decisions[promotion][message_m][]"]) {
    decisions.promotion.message_m = info["decisions[promotion][message_m][]"];
  }

  if (info["decisions[promotion][message_f][]"]) {
    decisions.promotion.message_f = info["decisions[promotion][message_f][]"];
  }

  if (info["decisions[place][phy_dist][]"]) {
    decisions.place.phy_dist = info["decisions[place][phy_dist][]"];
  }

  if (info["decisions[place][onl_dist][]"]) {
    decisions.place.onl_dist = info["decisions[place][onl_dist][]"];
  }

  if (info["decisions[place][stock_m]"]) {
    decisions.place.stock_m = info["decisions[place][stock_m]"];
  }

  if (info["decisions[place][stock_f]"]) {
    decisions.place.stock_f = info["decisions[place][stock_f]"];
  }

  if (info["decisions[people][training_bud]"]) {
    decisions.people.training_bud = info["decisions[people][training_bud]"];
  }

  if (info["decisions[process][service_m]"]) {
    decisions.process.service_m = info["decisions[process][service_m]"];
  }

  if (info["decisions[process][service_f]"]) {
    decisions.process.service_f = info["decisions[process][service_f]"];
  }

  if (info["decisions[physical_environment][decor_m]"]) {
    decisions.physical_environment.decor_m = info["decisions[physical_environment][decor_m]"];
  }

  if (info["decisions[physical_environment][decor_f]"]) {
    decisions.physical_environment.decor_f = info["decisions[physical_environment][decor_f]"];
  }

}

unparseDecisions = function(info) {
  info["decisions[kpis][]"] = decisions.kpis;
  info["decisions[positioning][price_m]"] = decisions.positioning.price_m;
  info["decisions[positioning][price_f]"] = decisions.positioning.price_f;
  info["decisions[positioning][quality_m]"] = decisions.positioning.quality_m;
  info["decisions[positioning][quality_f]"] = decisions.positioning.quality_f;
  info["decisions[product][quality_m]"] = decisions.product.quality_m;
  info["decisions[product][quality_f]"] = decisions.product.quality_f;
  info["decisions[product][improvements_m][]"] = decisions.product.improvements_m;
  info["decisions[product][improvements_f][]"] = decisions.product.improvements_f;
  info["decisions[price][sell_m]"] = decisions.price.sell_m;
  info["decisions[price][sell_f]"] = decisions.price.sell_f;
  info["decisions[promotion][message_m][]"] = decisions.promotion.message_m;
  info["decisions[promotion][message_f][]"] = decisions.promotion.message_f;
  info["decisions[place][phy_dist][]"] = decisions.place.phy_dist;
  info["decisions[place][onl_dist][]"] = decisions.place.onl_dist;
  info["decisions[place][stock_m]"] = decisions.place.stock_m;
  info["decisions[place][stock_f]"] = decisions.place.stock_f;
  info["decisions[people][training_bud]"] = decisions.people.training_bud;
  info["decisions[process][service_m]"] = decisions.process.service_m;
  info["decisions[process][service_f]"] = decisions.process.service_f;
  info["decisions[physical_environment][decor_m]"] = decisions.physical_environment.decor_m;
  info["decisions[physical_environment][decor_f]"] = decisions.physical_environment.decor_f;
}

setDecisions = function() {
  // SET KPI DECISIONS
  $('#kpis').find($('tbody tr th input')).each(function(){
    $(this).prop('checked', false);
  });

  var kpis_checked = decisions.kpis;
  kpis_checked.forEach(function(elem) {
    $('#kpis tbody tr th input[value="'+elem+'"]').prop('checked', true);
  });

  // SET POSITIONING DECISIONS
  $('#positioning_m tbody tr th input[name="position-price-men-radio"][value="'+decisions.positioning.price_m+'"]').prop('checked', true);
  $('#positioning_f tbody tr th input[name="position-price-women-radio"][value="'+decisions.positioning.price_f+'"]').prop('checked', true);
  $('#positioning_m tbody tr th input[name="position-quality-men-radio"][value="'+decisions.positioning.quality_m+'"]').prop('checked', true);
  $('#positioning_f tbody tr th input[name="position-quality-women-radio"][value="'+decisions.positioning.quality_f+'"]').prop('checked', true);

  // SET PRODUCT DECISIONS
  $('#quality-men').slider('setValue', decisions.product.quality_m);
  $('#quality-men-val').text(decisions.product.quality_m);
  $('#quality-women').slider('setValue', decisions.product.quality_f);
  $('#quality-women-val').text(decisions.product.quality_f);

  var improvements_m_checked = decisions.product.improvements_m;
  if ($.isArray(improvements_m_checked)) {
    improvements_m_checked.forEach(function(elem) {
      $('#improvements_m tbody tr th input[value="'+elem+'"]').bootstrapToggle('on');
    });
  } else {
    $('#improvements_m tbody tr th input[value="'+improvements_m_checked+'"]').bootstrapToggle('on');
  }

  var improvements_f_checked = decisions.product.improvements_f;
  if ($.isArray(improvements_f_checked)) {
    improvements_f_checked.forEach(function(elem) {
      $('#improvements_f tbody tr th input[value="'+elem+'"]').bootstrapToggle('on');
    });
  } else {
    $('#improvements_f tbody tr th input[value="'+improvements_f_checked+'"]').bootstrapToggle('on');
  }

  // SET PRICE DECISIONS
  $('#price-men').slider('setValue', decisions.price.sell_m);
  $('#price-men-val').text(decisions.price.sell_m);
  $('#price-women').slider('setValue', decisions.price.sell_f);
  $('#price-women-val').text(decisions.price.sell_f);

  // SET PROMOTION DECISIONS
  var message_m_checked = decisions.promotion.message_m;
  if ($.isArray(message_m_checked)) {
    message_m_checked.forEach(function(elem) {
      $('#message_m tbody tr th input[value="'+elem+'"]').prop('checked', true);
    });
  } else {
    $('#message_m tbody tr th input[value="'+message_m_checked+'"]').prop('checked', true);
  }

  var message_f_checked = decisions.promotion.message_f;
  if ($.isArray(message_f_checked)) {
    message_f_checked.forEach(function(elem) {
      $('#message_f tbody tr th input[value="'+elem+'"]').prop('checked', true);
    });
  } else {
    $('#message_f tbody tr th input[value="'+message_f_checked+'"]').prop('checked', true);
  }

  // SET PLACE DECISIONS
  var phy_dist_checked = decisions.place.phy_dist;
  if ($.isArray(phy_dist_checked)) {
    phy_dist_checked.forEach(function(elem) {
      $('#phy_dist tbody tr th input[value="'+elem+'"]').bootstrapToggle('on');
    });
  } else {
    $('#phy_dist tbody tr th input[value="'+phy_dist_checked+'"]').bootstrapToggle('on');
  }

  var onl_dist_checked = decisions.place.onl_dist;
  if ($.isArray(onl_dist_checked)) {
    onl_dist_checked.forEach(function(elem) {
      $('#onl_dist tbody tr th input[value="'+elem+'"]').bootstrapToggle('on');
    });
  } else {
    $('#onl_dist tbody tr th input[value="'+onl_dist_checked+'"]').bootstrapToggle('on');
  }

  $('#stock-level-men').slider('setValue', decisions.place.stock_m);
  $('#stock-level-men-val').text(decisions.place.stock_m);
  $('#stock-level-women').slider('setValue', decisions.place.stock_f);
  $('#stock-level-women-val').text(decisions.place.stock_f);

  // SET PEOPLE DECISIONS
  $('#training-budget').slider('setValue', decisions.people.training_bud);
  $('#training-budget-val').text(decisions.people.training_bud);

  // SET PROCESS DECISIONS
  $('#service_m tbody tr th input[value="'+decisions.process.service_m+'"]').prop('checked', true);
  $('#service_f tbody tr th input[value="'+decisions.process.service_f+'"]').prop('checked', true);

  // SET PHYSICAL ENVIRONMENT DECISIONS
  $('#decor_m tbody tr th input[value="'+decisions.physical_environment.decor_m+'"]').prop('checked', true);
  $('#decor_f tbody tr th input[value="'+decisions.physical_environment.decor_f+'"]').prop('checked', true);
}

getDecisions = function() {
  // GET KPI DECISIONS
  decisions.kpis = [];
  var kpis_checked = $('#kpis').find($('tbody tr th input:checked'));
  kpis_checked.each(function() {
    decisions.kpis.push($(this).val());
  });

  // GET POSITIONING DECISIONS
  decisions.positioning.price_m = $('#positioning_m tbody tr th input[name="position-price-men-radio"]:checked').val();
  decisions.positioning.price_f = $('#positioning_f tbody tr th input[name="position-price-women-radio"]:checked').val();
  decisions.positioning.quality_m = $('#positioning_m tbody tr th input[name="position-quality-men-radio"]:checked').val();
  decisions.positioning.quality_f = $('#positioning_f tbody tr th input[name="position-quality-women-radio"]:checked').val();

  // GET PRODUCT DECISIONS
  decisions.product.quality_m = $('#quality-men-val').text();
  decisions.product.quality_f = $('#quality-women-val').text();

  decisions.product.improvements_m = [];
  var improvements_m_checked = $('#improvements_m').find($('tbody tr th input:checked'));
  improvements_m_checked.each(function(){
    decisions.product.improvements_m.push($(this).val());
  });

  decisions.product.improvements_f = [];
  var improvements_f_checked = $('#improvements_f').find($('tbody tr th input:checked'));
  improvements_f_checked.each(function(){
    decisions.product.improvements_f.push($(this).val());
  });

  // GET PRICE DECISIONS
  decisions.price.sell_m = $('#price-men-val').text();
  decisions.price.sell_f = $('#price-women-val').text();

  // GET PROMOTION DECISIONS
  decisions.promotion.message_m = [];
  var message_m_checked = $('#message_m').find($('tbody tr th input:checked'));
  message_m_checked.each(function(){
    decisions.promotion.message_m.push($(this).val());
  });

  decisions.promotion.message_f = [];
  var message_f_checked = $('#message_f').find($('tbody tr th input:checked'));
  message_f_checked.each(function(){
    decisions.promotion.message_f.push($(this).val());
  });

  // GET PLACE DECISIONS
  decisions.place.phy_dist = [];
  var phy_dist_checked = $('#phy_dist').find($('tbody tr th input:checked'));
  phy_dist_checked.each(function(){
    decisions.place.phy_dist.push($(this).val());
  });

  decisions.place.onl_dist = [];
  var onl_dist_checked = $('#onl_dist').find($('tbody tr th input:checked'));
  onl_dist_checked.each(function(){
    decisions.place.onl_dist.push($(this).val());
  });

  decisions.place.stock_m = $('#stock-level-men-val').text();
  decisions.place.stock_f = $('#stock-level-women-val').text();

  // GET PEOPLE DECISIONS
  decisions.people.training_bud = $('#training-budget-val').text();

  // GET PROCESS DECISIONS
  decisions.process.service_m = $('#service_m tbody tr th input:checked').val();
  decisions.process.service_f = $('#service_f tbody tr th input:checked').val();

  // GET PHYSICAL ENVIRONMENT DECISIONS
  decisions.physical_environment.decor_m = $('#decor_m tbody tr th input:checked').val();
  decisions.physical_environment.decor_f = $('#decor_f tbody tr th input:checked').val();

}

window.onload = function() {

  $('#quality-men').slider({
  	formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });

  $('#quality-men').on("slide", function(evnt) {
    $('#quality-men-val').text(evnt.value);
  });

  $('#quality-women').slider({
  	formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });

  $('#quality-women').on("slide", function(evnt) {
    $('#quality-women-val').text(evnt.value);
  });

  $('#price-men').slider({
  	formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });

  $('#price-men').on("slide", function(evnt) {
    $('#price-men-val').text(evnt.value);
  });

  $('#price-women').slider({
  	formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });

  $('#price-women').on("slide", function(evnt) {
    $('#price-women-val').text(evnt.value);
  });

  $('#stock-level-men').slider({
  	formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });

  $('#stock-level-men').on("slide", function(evnt) {
    $('#stock-level-men-val').text(evnt.value);
  });

  $('#stock-level-women').slider({
  	formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });

  $('#stock-level-women').on("slide", function(evnt) {
    $('#stock-level-women-val').text(evnt.value);
  });

  $('#training-budget').slider({
  	formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });

  $('#training-budget').on("slide", function(evnt) {
    $('#training-budget-val').text(evnt.value);
  });

  getChecked = function(className) {
    var elems = document.getElementsByClassName(className);
    var res = 0;
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].checked) res++;
    }
    return res;
  }

  $('.max-2-0').click(function(t){
    var count0 = getChecked("max-2-0");
    if (t.target.nodeName == "INPUT") {
      if (count0 > 2) {
        if (!t.target.checked) {
          count0 -= 1;
        }
        t.target.checked = false;
      } else {
        if (t.target.checked) {
          count0 += 1;
        } else {
          count0 -= 1;
        }
      }
    }
  });

  $('.max-2-1').click(function(t){
    var count1 = getChecked("max-2-1");
    if (t.target.nodeName == "INPUT") {
      if (count1 > 2) {
        if (!t.target.checked) {
          count1 -= 1;
        }
        t.target.checked = false;
      } else {
        if (t.target.checked) {
          count1 += 1;
        } else {
          count1 -= 1;
        }
      }
    }
  });

  $('.max-3').click(function(t){
    var count2 = getChecked("max-3");
    if (t.target.nodeName == "INPUT") {
      if (count2 > 3) {
        if (!t.target.checked) {
          count2 -= 1;
        }
        t.target.checked = false;
      } else {
        if (t.target.checked) {
          count2 += 1;
        } else {
          count2 -= 1;
        }
      }
    }
  });

  $('.save-decisions-button').on("click", function() {
    getDecisions();
    $.ajax({
      url: 'http://localhost:3000/players/0',
      method: 'GET',
      dataType: 'json',
      success: function(player) {
        unparseDecisions(player);
        $.ajax({
          url: 'http://localhost:3000/players/0',
          method: 'PUT',
          data: player,
          dataType: 'json',
          success: function(msg) {
            alert("Changes saved!");
            console.log("Changes saved!");
          },
          error: function(err) {
            console.error(err);
          }
        })
      },
      error: function(err) {
        console.error(err);
      }
    })
  });

  loadDecisions();
}
