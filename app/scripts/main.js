$(document).ready(function() {
  console.log('Ready');
});

var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content'

// $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=starwars&callback=?', function(data) {
//   $('p').html(JSON.stringify(data));
//   console.log(data);
// });

$(document).keypress(function(e) {
  if (e.which == 13) {
    // enter pressed
    console.log("Enter pressed");
  }
});

// .on is the definitive solution to handle keypress and paste in an input field
$('#inputSearch').on('input', function(data) {
  console.log('Handler for .keypress() called:' + data);
  var txt = $('#inputSearch').val();
  queryWiki(txt);
  console.log(txt);
  //  debugger;
});

function queryWiki(searchString) {
  $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=' + searchString + '&callback=?', function(data) {
//    parseSearchResults(data);
    $('#searchResultsDiv').empty();
    makeTable($("#searchResultsDiv"),data);
  });
}

function parseSearchResults(data) {
  //$('p').html(JSON.stringify(data));
//  var table = $('<table></table>').addClass('foo');
  $('#searchResultsTable tbody > tr').remove();
  $.each(data.query.pages, function(k, v) {
    var txt=k + ':' + v.title + ':' + v.pageid;

    $('#searchResultsTable').append('<tr><td>'+v.title+'</td><td>'+v.pageid+'</td></tr>');

    // var rowText='<td>'+v.title+'</td>'+'<td>'+v.pageid+'</td>';
    //   var row = $('<tr></tr>').addClass('bar').text(rowText);
    //   table.append(row);


    // format for url via pageid: https://en.wikipedia.org/?curid=345430
  });
//  $('#searchResults').append(table);
}

function makeTable(container, data) {
    var table = $("<table/>").addClass('table table-striped table-bordered');
    $.each(data.query.pages, function(k, v) {
        var row = $("<tr/>");
        row.append("<td>"+v.title+"</td><td>"+v.pageid+"</td>");
        table.append(row);
    });
    return container.append(table);
}

function onError(json) {
  console.log(json);
  debugger;
}
