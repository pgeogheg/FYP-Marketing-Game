var articles = {

};

function changeArticle(index) {
  $('#article-container').find($('div')).each(function() {
    $(this).hide();
  });
  $('#article-content-'+index).show();
}

window.onload = function() {
  showArticles([0, 1, 2]);
  getPlayerRankings();
}

submitArticles = function() {
  var listContents = [];
  $('#article-list').find($('li p')).each(function() {
    listContents.push($(this).text());
  });

  $.ajax({
    dataType: "json",
    url: "http://localhost:3000/players/0/",
    success: function(data){
      postArticles(data, listContents);
      showRankings(listContents);
    },
    error: function(err) {
      console.log(err.statusText);
    }
  });
}

postArticles = function(data, newOrder) {
  console.log(data);
  data["articleRanks[]"] = newOrder;
  console.log(newOrder);
  console.log(data);
  $.ajax({
    type: "PUT",
    url: "http://localhost:3000/players/0/",
    data: data,
    success: function(data){console.log(data);},
    error: function(err){console.log(err);},
    dataType: "json"
  })
}

getPlayerRankings = function() {
  $.ajax({
    dataType: "json",
    url: "http://localhost:3000/players/0/",
    success: function(data) {
      var rankings = data["articleRanks[]"];
      showRankings(rankings);
    },
    error: function(err) {console.log(err.statusText);}
  })
}

showArticles = function(articleIds) {
  var first = true;
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/articles/",
    error: function(err){console.error(err);},
    success: function(data) {
      articles = data;
      displayArticles(articleIds);
    }
  });
  $('.sortable').sortable();
}

displayArticles = function(ids) {
  for (var i = 0; i < ids.length; i++) {
    $('#article-navbar').append('<li><button type="button" class="btn btn-link" onclick="changeArticle('+i+')">'+articles[i].title+'</button></li>');
    $('#article-container').append('<div class="well" id="article-content-'+i+'"><h1>'+articles[i].title+'</h1></div>');
    var paras = articles[i].contents.split('\n');
    paras.forEach(function(elem) {
      $('#article-content-'+i).append("<p>"+elem+"</p>");
    });
    $('#article-content-'+i).hide();
    $('#article-list').append('<li class="list-group-item" draggable="true">'+articles[i].title+'<p class="hidden">'+articles[i].id+'</p></li>');
  }
}

showRankings = function(rankings) {
  $('#current-rank').empty();
  if (rankings != []) {
    $('#current-rank').append('<h2>Current Ranking</h2>');
    for (var i = 0; i < rankings.length; i++) {
      $('#current-rank').append('<li class="list-group-item">'+articles[rankings[i]].title+'</li>')
    }
  }
}
