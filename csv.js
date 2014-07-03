/** CSV */
(function() {
  var csv = {};

  csv.hue = hueToneChart.hue.slice(1, -2);
  csv.tone = hueToneChart.tone;
  csv.neutral = hueToneChart.neutral;

  csv.createFile = function(data) {
    this.file = createHedder() + "\r\n" + data.join(",");
    return this;
  };

  function createHedder() {
    var i, j,
        text = "",
        hueLen = csv.hue.length,
        toneLen = csv.tone.length;

    for (i = 0; i < hueLen; i++) {
      for (j = 0; j < toneLen; j++) {
        text += csv.hue[i] + "/" + csv.tone[j] + ",";
      }
    }
    return text + csv.neutral.join(",");
  }

  csv.createLink =  function(selector) {
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]),
        blob = new Blob([bom, this.file], { type: 'text/csv' }),
        url = (window.URL || window.webkitURL).createObjectURL(blob),
        fileName = "download.csv",
        link = $('<a href="#">CSV</a>');

        link.attr({'download': fileName, 'href': url});
        $(selector).empty().append(link);
  };

  this.csv = csv;
}());