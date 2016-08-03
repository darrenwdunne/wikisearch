$(document).ready(function() {
  $('#inputSearch').focus();
  showSearchResults(false);
});

$(document).keypress(function(e) {
  if (e.which == 13) {
    // enter pressed
    console.log('Enter pressed');
    processEnter();
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
    $('#searchResultsTableHolder').empty();

    if (data.query === undefined) {
      showSearchError(true);
    } else {
      showSearchError(false);
      makeTable($('#searchResultsTableHolder'), data);
    }
  });
}

function showSearchError(err) {
  if (err) {
    $('.form-group').addClass('has-error');
    $('#helpBlock').text('Not found in Wikipedia');
    $('#searchResultsDiv').hide();
//    $('#inputSearch').addClass('')
  } else {
    $('.form-group').removeClass('has-error');
  }
}


function makeTable(container, data) {
  var table = $('<table id="searchResultsTable"/>').addClass('table table-hover table-striped table-bordered table-condensed');
  table.append('<thead class="thead-inverse"><tr><th>Page Title</th><th>ID</th></tr></thead><tbody>');

  $.each(data.query.pages, function(k, v) {
    var row = generateTableRow(v.title, v.pageid);
    table.append(row);
  });
  table.append('</tbody>');
  showSearchResults(true);
  return container.append(table);
}

function generateTableRow(title, pageid) {
  var pageURL = 'https://en.wikipedia.org/?curid=' + pageid;
  var a = '<a href="' + pageURL + '" target="blank">' + title + '</a>';
  var row = $('<tr/>');
  row.append('<td>' + a + '</td><td>' + pageid + '</td>');
  return row;
}

function showSearchResults(show) {
  if (show) {
    $('#searchResultsDiv').show();
    $('#helpBlock').text('Tip: hit Enter to automatically open the first item');
    $('#helpBlock').show();

    // Interesting: jQuery cannot find the rows yet - need to delay until the table has been added to the DOM
    setTimeout(attachListenersToTableRows, 200);
  } else {
    $('#searchResultsDiv').hide();
    $('#helpBlock').hide();
  }
}

function attachListenersToTableRows() {
  $('#searchResultsTable tr').click(function() {
    var row = $(this).find("a");
    if (row !== undefined) {
      var href = row.attr("href");
      if (href !== undefined) {
        openURL(href);
      }
    }
  });
}

function processEnter() {
  // if the table is visible, auto-launch the first URL in the table
  var firstLink = $('#searchResultsTableHolder table a:first');
  if (firstLink !== undefined) {
    openURL(firstLink[0]);
  }
}

function openURL(url) {
  var win = window.open(url, '_blank');
  if (win) {
    win.focus();
  } else {
    //Browser has blocked it
    alert('Please allow popups');
  }

}
