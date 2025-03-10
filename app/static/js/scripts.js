function LinkUrl(a) {
  var win = window.open(a, '_blank');
  win.focus();
}

function media(a) {

  if (a != undefined) {

    var sum = a.reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
    var avg = sum / a.length;

  } else {

    var avg = 0;
  }

  return avg;
}
