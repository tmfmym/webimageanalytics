/** CSV */
(function() {
  var csv = {};

  csv.hue = hueToneChart.hue.slice(1, -2);
  csv.tone = hueToneChart.tone;
  csv.neutral = hueToneChart.neutral;
  csv.separator = "\r\n";

  csv.createFile = function(result) {
    this.content = createHedder() + csv.separator + result.countTable.join(",");
    this.content += csv.separator + csv.separator + createMatrix(result);
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

  function createMatrix(result) {
    var i, start, end,
        text = "",
        data = result.data,
        width = result.width,
        height = result.height;

    for (i = 0; i < height; i++) {
      start = width * i;
      end =  width * (i + 1);
      text += join(data.subarray(start, end), ",") + csv.separator;
    }
    return text;
  }

  function join(array, separator) {
    var i,
        len = array.length,
        text = array[0];

    for (i = 1; i < len; i++) {
      text += separator + array[i];
    }
    return text;
  }

  csv.createLink =  function(selector, fileName) {
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]),
        blob = new Blob([bom, this.content], {type: "text/csv"}),
        url = (window.URL || window.webkitURL).createObjectURL(blob),
        link = $('<a href="#">CSV</a>');

        link.attr({download: fileName + ".csv", href: url});
        $(selector).empty().append(link);
  };

  this.csv = csv;
}());