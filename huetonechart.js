/** HueToneChart */
(function() {
  var hueToneChart = {};
  
  hueToneChart.ROW_SIZE = 12;
  hueToneChart.COLUMN_SIZE = 11;

  hueToneChart.hue = ColorSystem.HUE_LIST.slice();
  hueToneChart.tone = ColorSystem.TONE_LIST.slice();
  hueToneChart.neutral = ColorSystem.NEUTRAL_LIST.slice();

  hueToneChart.render = function(result) {
    var i, j, index, value, td,
        data = result.countTable,
        length = result.length,
        table = $("<table>");

    $("#chart").empty();
    table.append($("<caption>").text("出現頻度:％"));
    table.append(createHedder());

    for (i = 0; i < this.ROW_SIZE; i ++) {
        tr = $("<tr>").append($("<td>").text(this.tone[i]));
        for (j = 0; j < this.COLUMN_SIZE; j++) {
            index = i + this.ROW_SIZE * j;
            if (index > 129) continue;
            // value = data[index];
            value = Math.round(data[index] / length * 10000) / 100;

            if (j === 10) tr.append($("<td>").text(this.neutral[i]));
            td =$("<td>").text(value).css("background", ColorUtils.rgb2ColorCode(ColorSystem.RGB_TABLE[index]));
            if (index === 129) td.css("color", "white"); // 黒塗りになるからテキスト白に
            tr.append(td);
        }
        table.append(tr);
    }
    $("#chart").append(table).append($("<span>").text("総ピクセル数:" + length));
  };

  function createHedder() {
    tr = $("<tr>");
    $.each(hueToneChart.hue, function(i, v) { tr.append($("<td>").text(v)); });
    return tr;
  }

  this.hueToneChart = hueToneChart;
}());