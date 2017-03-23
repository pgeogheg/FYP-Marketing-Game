function changeArticle(index) {
  var arts = document.getElementById("article-container").childNodes;
  for (var i = 0; i < arts.length; i++) {
    if (i === index) {
      document.getElementById('article-' + i).style.display = "";
      document.getElementById('article-' + i).style.height = "500px";
    } else {
      document.getElementById('article-' + i).style.display = "none";
      document.getElementById('article-' + i).style.height = "0px";
    }
  }
}

window.onload = function() {
  showArticles([0, 1, 2]);
  getPlayerRankings();
}

submitArticles = function() {
  var list = document.getElementById("article-list").children;
  var listContents = [];
  var outputHTML = "<h3>Current Ranking</h3><ul class=\"list-group sortable text-center\">";
  for (var i = 0; i < list.length; i++) {
    listContents.push(list[i].innerHTML);
    outputHTML += "<li class=\"list-group-item\">" + list[i].innerHTML + "</li>";
  }
  outputHTML += "</ul>";
  document.getElementById("current-rank").innerHTML = outputHTML;

  $.ajax({
    dataType: "json",
    url: "http://localhost:3000/players/0/",
    success: function(data){postArticles(data, listContents);},
    error: function(err) {
      console.log(err.statusText);
    }
  })
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
  for (var i = 0; i < articleIds.length; i++) {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/articles/" + articleIds[i] + "/",
      error: function(err){console.error(err);},
      success: function(data) {
        //console.log(data);
        var article = data;
        var articleTitle = article.title;
        //console.log(articleTitle);
        //console.log(article.contents);

        var childNode = document.createElement("DIV");
        childNode.setAttribute("class","well");
        childNode.setAttribute("id", "article-" + i);

        if (first) {
          childNode.style.display = "";
          childNode.style.height = "500px";
          first = false;
        } else {
          childNode.style.display = "none";
          childNode.style.height = "0px";
        }

        var artTitle = document.createElement("H1");
        var artTitleT = document.createTextNode(articleTitle);
        artTitle.appendChild(artTitleT);
        childNode.appendChild(artTitle);

        var artContents = document.createElement("P");
        var artContentsT = document.createTextNode(article.contents);
        artContents.appendChild(artContentsT);
        childNode.appendChild(artContents);

        document.getElementById("article-container").appendChild(childNode);

        var sideBarNode = document.createElement("LI");
        var sideBarNodeButton = document.createElement("BUTTON");
        sideBarNodeButton.setAttribute("class", "btn btn-link");
        sideBarNodeButton.setAttribute("onclick", "changeArticle(" + i + ")");
        var sideBarNodeButtonT = document.createTextNode(articleTitle);
        sideBarNodeButton.appendChild(sideBarNodeButtonT);
        sideBarNode.appendChild(sideBarNodeButton);

        document.getElementById("article-navbar").appendChild(sideBarNode);

        var draggableNode = document.createElement("LI");
        draggableNode.setAttribute("class", "list-group-item");
        draggableNode.setAttribute("draggable", true);
        var draggableNodeT = document.createTextNode(articleTitle);
        draggableNode.appendChild(draggableNodeT);

        document.getElementById("article-list").appendChild(draggableNode);
      }
    })
  }
  $('.sortable').sortable();
}

showRankings = function(rankings) {
  if (rankings != []) {
    document.getElementById("current-rank").innerHTML = "<h2>Current Ranking</h2>";
    for (var i = 0; i < rankings.length; i++) {
      var rankNode = document.createElement("LI");
      rankNode.setAttribute("class", "list-group-item");
      var rankNodeT = document.createTextNode(rankings[i]);
      rankNode.appendChild(rankNodeT);
      document.getElementById("current-rank").appendChild(rankNode);
    }
  }
}
