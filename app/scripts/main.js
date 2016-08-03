$(document).ready(function() {
  $('#inputSearch').focus();
  // $('#searchResultsDiv').css({
  //   display: "none",
  //   visibility: "hidden"
  // });
  showSearchResults(false);
});

var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content'

// $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=starwars&callback=?', function(data) {
//   $('p').html(JSON.stringify(data));
//   console.log(data);
// });

$(document).keypress(function(e) {
  if (e.which == 13) {
    // enter pressed
    console.log('Enter pressed');
  }
});

// .on is the definitive solution to handle keypress and paste in an input field
$('#inputSearch').on('input', function(data) {
  var txt = $('#inputSearch').val();
  if (txt === "") {
    showSearchResults(false);
  } else {
    queryWiki(txt);
  }
});

function queryWiki(searchString) {
  $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=' + searchString + '&callback=?', function(data) {
    //    parseSearchResults(data);
    $('#searchResultsTableHolder').empty();
    makeTable($('#searchResultsTableHolder'), data);
  });
}

function makeTable(container, data) {
  var table = $('<table/>').addClass('table table-striped table-bordered table-condensed');
  //  table.addClass('table table-striped table-bordered');
  table.append('<thead><tr><th>Page Title</th><th>ID</th></tr></thead><tbody>');

  $.each(data.query.pages, function(k, v) {
    var row = $('<tr/>');
    row.append('<td>' + v.title + '</td><td>' + v.pageid + '</td>');
    table.append(row);
  });
  table.append('</tbody>');
  showSearchResults(true);
  return container.append(table);
}

function showSearchResults(show) {
  if (show) {
    $('#searchResultsDiv').show();
  } else {
    $('#searchResultsDiv').hide();
  }
}

function onError(json) {
  console.log(json);
  debugger;
}
