ColorUtils = (function(){
 /**
  * @see http://engineer.blog.lancers.jp/2013/11/php-collor-mapping-algorithm/
  */
  var colorDistanceRGB = function(rgb1, rgb2) {
    return Math.pow(rgb1[0] - rgb2[0], 2) + Math.pow(rgb1[1] - rgb2[1], 2) + Math.pow(rgb1[2] - rgb2[2], 2);
  };

 /**
  * @see http://engineer.blog.lancers.jp/2013/11/php-collor-mapping-algorithm/
  */
  var colorDistanceHSV = function(hsv1, hsv2) {
    var hDiff = hueDiff(hsv1[0], hsv2[0]);
    return Math.pow(hDiff, 2) + Math.pow(hsv1[1] - hsv2[1], 2) + Math.pow(hsv1[2] - hsv2[2], 2);
  };

 /**
  * @see http://engineer.blog.lancers.jp/2013/11/php-collor-mapping-algorithm/
  */
  var hueDiff = function(h1, h2) {
    if (h1 > h2) {
      return Math.min(h1 - h2, h2 - h1 + 360);
    }
    return Math.min(h2 - h1, h1 - h2 + 360);
  };

 /**
  * @see http://engineer.blog.lancers.jp/2013/11/php-collor-mapping-algorithm/
  */
  var rgb2Hsv = function(r, g, b) {
    var h, s, v,
        r0 = r / 255,
        g0 = g / 255,
        b0 = b / 255,
        max = Math.max(r0, g0, b0),
        min = Math.min(r0, g0, b0);

    switch(max) {
      case min:
        h = 0;
        break;
      case r0:
        h = (60 * (g0 - b0) / (max - min) + 360) % 360;
        break;
      case g0:
        h = 60 * (b0 - r0) / (max - min) + 120;
        break;
      case b0:
        h = 60 * (r0 - g0) / (max - min) + 240;
        break;
    }

    s = max === 0 ? 0: 1 - min /  max;
    v = max;
    return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
  };

  var rgb2ColorCode = function(rgb) {
    return "#" + dec2HexPad0(rgb[0]) + dec2HexPad0(rgb[1]) + dec2HexPad0(rgb[2]);
  };

  var dec2HexPad0 = function(value) {
    return ("0" + (value).toString(16)).slice(-2);
  };

  return {
    colorDistanceRGB: colorDistanceRGB,
    colorDistanceHSV: colorDistanceHSV,
    rgb2Hsv: rgb2Hsv,
    rgb2ColorCode: rgb2ColorCode
  };
}());