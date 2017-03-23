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
    $('#price-women-val').text(evnt.value);
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

  getChecked = function(className) {
    var elems = document.getElementsByClassName(className);
    var res = 0;
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].firstChild.checked) res++;
    }
    return res;
  }

  var count0 = getChecked("max-2-0");
  var count1 = getChecked("max-2-1");

  $('.max-2-0').click(function(t){
    if (t.target.nodeName == "INPUT") {
      if (count0 === 2) {
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
    if (t.target.nodeName == "INPUT") {
      if (count1 === 2) {
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
}
