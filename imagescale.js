/** ImageScale */
(function() {
  var imageScale = {};

  imageScale.IMAGE_SCALE_SIZE = 130;
  imageScale.HSV_TABLE = [
    [351, 100, 82],
    [4, 91, 72],
    [3, 69, 100],
    [8, 47, 100],
    [13, 22, 100],
    [8, 15, 82],
    [3, 49, 93],
    [6, 22, 72],
    [7, 43, 66],
    [348, 100, 66],
    [342, 100, 41],
    [338, 100, 25],
    [37, 100, 100],
    [36, 100, 85],
    [36, 84, 100],
    [33, 59, 100],
    [34, 38, 100],
    [28, 23, 81],
    [27, 59, 91],
    [25, 32, 69],
    [27, 59, 69],
    [30, 100, 66],
    [30, 100, 47],
    [30, 100, 25],
    [51, 100, 100],
    [49, 100, 82],
    [49, 84, 100],
    [48, 52, 100],
    [48, 25, 100],
    [43, 24, 80],
    [47, 57, 89],
    [46, 36, 67],
    [48, 57, 58],
    [51, 100, 63],
    [49, 100, 44],
    [51, 100, 24],
    [72, 100, 86],
    [72, 98, 73],
    [73, 86, 88],
    [73, 56, 97],
    [74, 29, 100],
    [69, 24, 80],
    [75, 57, 82],
    [72, 37, 64],
    [72, 54, 57],
    [74, 100, 53],
    [71, 100, 38],
    [71, 100, 21],
    [149, 100, 58],
    [141, 63, 61],
    [144, 65, 80],
    [131, 36, 97],
    [113, 16, 100],
    [113, 17, 78],
    [132, 34, 80],
    [123, 22, 67],
    [127, 30, 57],
    [152, 100, 46],
    [150, 100, 32],
    [151, 100, 21],
    [168, 100, 55],
    [166, 63, 55],
    [162, 52, 79],
    [159, 34, 91],
    [153, 16, 100],
    [164, 15, 77],
    [167, 36, 78],
    [168, 19, 61],
    [171, 37, 51],
    [174, 100, 41],
    [178, 100, 28],
    [180, 100, 24],
    [192, 100, 53],
    [191, 59, 52],
    [189, 56, 81],
    [188, 36, 91],
    [183, 15, 100],
    [189, 11, 75],
    [189, 39, 72],
    [188, 21, 61],
    [193, 40, 56],
    [192, 100, 48],
    [193, 100, 36],
    [195, 100, 27],
    [227, 100, 60],
    [211, 62, 55],
    [213, 38, 87],
    [217, 25, 100],
    [218, 12, 100],
    [220, 11, 78],
    [217, 28, 73],
    [218, 17, 62],
    [217, 32, 58],
    [214, 100, 46],
    [218, 100, 40],
    [217, 100, 30],
    [293, 66, 56],
    [293, 47, 55],
    [291, 34, 80],
    [285, 21, 100],
    [284, 12, 100],
    [292, 8, 78],
    [283, 22, 79],
    [286, 13, 62],
    [276, 26, 60],
    [292, 100, 46],
    [293, 100, 38],
    [293, 100, 28],
    [325, 100, 75],
    [328, 63, 73],
    [334, 40, 94],
    [329, 23, 100],
    [336, 12, 100],
    [331, 10, 81],
    [339, 32, 86],
    [333, 22, 65],
    [338, 39, 65],
    [324, 100, 53],
    [322, 100, 42],
    [323, 100, 33],
    [0, 0, 100],
    [60, 5, 93],
    [60, 6, 78],
    [60, 8, 63],
    [60, 8, 56],
    [60, 9, 50],
    [60, 8, 42],
    [60, 8, 30],
    [60, 9, 18],
    [0, 0, 0]
  ];

  /**
   * @param ImageData imgData
   */
  imageScale.analyze = function(imgData) {
    var i, r, g, b, hsv, imgScaleType,
        pixels = imgData.data,
        length = pixels.length,
        data = new Uint8Array(length / 4);
        
    /** Hue&Toneの各々の出現頻度 */
    this.countTable = Array.apply(null, new Array(imageScale.IMAGE_SCALE_SIZE)).map(Number.prototype.valueOf, 0);

    for (i = 0; i < length; i += 4) {
      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      hsv = this.rgb2Hsv(r, g, b);
      imgScaleType = this.getImageScaleType(hsv);
      count(imgScaleType);
      data[i / 4] = imgScaleType;
    }
    
    return {
      data: data,
      countTable: this.countTable,
      length: length / 4,
      height: imgData.height,
      width: imgData.width
    };
  };

  /**
   * @see http://engineer.blog.lancers.jp/2013/11/php-collor-mapping-algorithm/
   */
  imageScale.rgb2Hsv = function(r, g, b) {
    var h, s, v,
        r0 = r / 255,
        g0 = g / 255,
        b0 = b / 255,
        max = Math.max(r0, g0, b0),
        min = Math.min(r0, g0, b0);

    if (max === min) {
      h = 0;
    } else if (max === r0) {
      h = (60 * (g0 - b0) / (max - min) + 360) % 360;
    } else if (max === g0) {
      h = 60 * (b0 - r0) / (max - min) + 120;
    } else if (max === b0) {
      h = 60 * (r0 - g0) / (max - min) + 240;
    }

    s = max === 0 ? 0: 1 - min /  max;
    v = max;
    return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
  };

  /** 
   * HSVの色からイメージスケールのHue&Tone番号を取得
   *
   + @param Array hsv
   *
   * TODO: 130個全部をチェックしてる・・・
   */
  imageScale.getImageScaleType = function(hsv) {
    var i, d,
        imageScaleType = 0,
        distance = Number.MAX_VALUE;

    for (i = 0; i < this.IMAGE_SCALE_SIZE; i++) {
      d = colorDistance(hsv, this.HSV_TABLE[i]);
      if (distance > d) {
        imageScaleType = i;
        distance = d;
      }
    }
    return imageScaleType;
  };

  /**
   * @see http://engineer.blog.lancers.jp/2013/11/php-collor-mapping-algorithm/
   */
  function colorDistance(hsv, imgScaleHsv) {
    var hDiff = hueDiff(hsv[0], imgScaleHsv[0]);
    return Math.pow(hDiff, 2) + Math.pow(hsv[1] - imgScaleHsv[1], 2) + Math.pow(hsv[2] - imgScaleHsv[2], 2);
  }

  /**
   * @see http://engineer.blog.lancers.jp/2013/11/php-collor-mapping-algorithm/
   */
  function hueDiff(h1, h2) {
    if (h1 > h2) {
      return Math.min(h1 - h2, h2 - h1 + 360);
    }
    return Math.min(h2 - h1, h1 - h2 + 360);
  }

  function count(imageScaleType) {
    imageScale.countTable[imageScaleType] += 1;
  }

  this.imageScale = imageScale;
}());