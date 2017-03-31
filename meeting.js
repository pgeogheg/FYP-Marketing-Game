loadPageDetails = function() {
  $.ajax({
    url: 'http://localhost:3000/players/0',
    method: 'GET',
    dataType: 'json',
    error: function(err) {
      console.error(err);
    },
    success: function(player) {
      displayCEOPage(player.ceo);
    }
  });
}

updateCEOMeet = function(hasMet) {
  $.ajax({
    url: 'http://localhost:3000/players/0',
    method: 'GET',
    dataType: 'json',
    error: function(err) {
      console.error(err);
    },
    success: function(player) {
      player["ceo"] = hasMet;
      $.ajax({
        url: 'http://localhost:3000/players/0',
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
  });
}

displayCEOPage = function(hasMet) {
  $('#ceo-yes').click(function() {
    $('#ceo-question').hide();
    $('#ceo-advice').show();
    updateCEOMeet(true);
  });

  if (hasMet === "true") {
    $('#ceo-question').hide(200);
    $('#ceo-advice').show(200);
  } else {
    $('#ceo-question').show(200);
    $('#ceo-advice').hide(200);
  }
}

window.onload = function() {
  $('#ceo-debug').click(function() {
    updateCEOMeet(false);
    console.log("RESET");
  });

  $('#ceo-question').hide();
  $('#ceo-advice').hide();
  loadPageDetails();
}
