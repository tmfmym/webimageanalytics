/** HueToneChart */
(function() {
  var hueToneChart = {};
  
  hueToneChart.IMAGE_SCALE_SIZE = imageScale.IMAGE_SCALE_SIZE || 130;
  hueToneChart.RGB_TABLE = [
    [208, 0, 32],
    [184, 28, 16],
    [255, 88, 80],
    [255, 152, 136],
    [255, 212, 200],
    [208, 180, 176],
    [237, 128, 122],
    [184, 147, 143],
    [168, 104, 96],
    [168, 0, 34],
    [104, 0, 31],
    [64, 0, 24],
    [255, 156, 0],
    [216, 128, 0],
    [255, 168, 40],
    [255, 188, 104],
    [255, 213, 159],
    [206, 181, 159],
    [232, 157, 96],
    [176, 143, 119],
    [176, 119, 72],
    [168, 84, 0],
    [119, 60, 0],
    [64, 32, 0],
    [255, 217, 0],
    [209, 171, 0],
    [255, 216, 40],
    [255, 229, 122],
    [255, 242, 191],
    [205, 191, 156],
    [228, 200, 99],
    [171, 157, 109],
    [149, 132, 64],
    [160, 136, 0],
    [112, 92, 0],
    [60, 51, 0],
    [176, 220, 0],
    [151, 187, 4],
    [184, 224, 32],
    [218, 248, 109],
    [238, 255, 181],
    [198, 205, 156],
    [179, 208, 89],
    [152, 164, 104],
    [129, 145, 66],
    [105, 136, 0],
    [79, 96, 0],
    [43, 53, 0],
    [0, 149, 71],
    [57, 155, 91],
    [72, 204, 125],
    [157, 247, 173],
    [218, 255, 213],
    [168, 198, 164],
    [135, 205, 149],
    [132, 170, 134],
    [102, 145, 107],
    [0, 117, 62],
    [0, 81, 40],
    [0, 53, 27],
    [0, 140, 113],
    [52, 139, 118],
    [96, 202, 170],
    [152, 231, 203],
    [213, 255, 236],
    [166, 196, 188],
    [128, 200, 184],
    [126, 156, 150],
    [82, 131, 124],
    [0, 104, 94],
    [0, 72, 69],
    [0, 60, 60],
    [0, 108, 136],
    [54, 119, 133],
    [91, 189, 206],
    [150, 222, 233],
    [217, 253, 255],
    [170, 188, 191],
    [112, 173, 184],
    [124, 152, 156],
    [85, 130, 142],
    [0, 99, 123],
    [0, 71, 91],
    [0, 51, 68],
    [0, 33, 152],
    [54, 96, 141],
    [138, 176, 223],
    [191, 216, 255],
    [225, 236, 255],
    [179, 186, 200],
    [133, 153, 186],
    [130, 140, 157],
    [102, 120, 149],
    [0, 50, 117],
    [0, 38, 102],
    [0, 29, 77],
    [132, 48, 143],
    [131, 73, 139],
    [194, 135, 205],
    [242, 202, 255],
    [247, 225, 255],
    [197, 184, 199],
    [188, 156, 201],
    [154, 138, 159],
    [136, 112, 152],
    [102, 0, 117],
    [84, 0, 96],
    [64, 0, 72],
    [192, 0, 112],
    [186, 69, 131],
    [239, 143, 184],
    [255, 196, 226],
    [255, 225, 237],
    [207, 186, 196],
    [219, 149, 173],
    [165, 129, 145],
    [166, 102, 126],
    [136, 0, 82],
    [106, 0, 67],
    [85, 0, 53],
    [255, 255, 255],
    [238, 238, 226],
    [199, 199, 187],
    [161, 161, 148],
    [143, 143, 131],
    [128, 128, 117],
    [107, 107, 98],
    [76, 76, 70],
    [46, 46, 42],
    [0, 0, 0]
  ];

  hueToneChart.hue = ["", "R", "YR", "Y", "GY", "G", "BG", "B", "PB", "P", "RP", "", "Neutral"];
  hueToneChart.tone = ["V", "S", "B", "P", "Vp", "Lgr", "L", "Gr", "Dl", "Dp", "Dk", "Dgr"];
  hueToneChart.neutral = ["N9.5", "N9", "N8", "N7", "N6", "N5", "N4", "N3", "N2", "N1.5"];

  hueToneChart.render = function(result) {
    var i, j, index, value, td,
        data = result.data,
        length = result.length,
        table = $("<table>");

    $("#chart").empty();
    table.append($("<caption>").text("出現頻度:％"));
    table.append(createHedder());

    for (i = 0; i < 12; i ++) {
        tr = $("<tr>").append($("<td>").text(hueToneChart.tone[i]));
        for (j = 0; j < 11; j++) {
            index = i + 12 * j;
            if (index > 129) continue;
            // value = data[index];
            value = Math.round(data[index] / length * 10000) / 100;

            if (j === 10) tr.append($("<td>").text(this.neutral[i]));
            td =$("<td>").text(value).css("background", this.rgb2ColorCode(hueToneChart.RGB_TABLE[index]));
            // 黒塗りになるからテキスト白に
            if (index === 129) td.css("color", "white");
            tr.append(td);
        }
        table.append(tr);
    }
    $("#chart").append(table).append($("<span>").text("総ピクセル数:" + length));
  };

  function createHedder() {
    tr = $("<tr>");
    $.each(hueToneChart.hue, function(i, v) {
        tr.append($("<td>").text(v));
    });
    return tr;
  }

  hueToneChart.rgb2ColorCode = function(rgb) {
    return "#" + dec2HexPad0(rgb[0]) + dec2HexPad0(rgb[1]) + dec2HexPad0(rgb[2]);
  };

  function dec2HexPad0(value) {
    return ("0" + (value).toString(16)).slice(-2);
  }

  this.hueToneChart = hueToneChart;
}());