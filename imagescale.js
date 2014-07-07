/** ImageScale */
(function() {
  var imageScale = {};

  /**
   * @param ImageData imgData
   */
  imageScale.analyze = function(imgData) {
    var i, r, g, b, imgScaleType,
        pixels = imgData.data,
        length = pixels.length,
        data = new Uint8Array(length / 4);
        
    /** Hue&Toneの各々の出現頻度 */
    this.countTable = Array.apply(null, new Array(ColorSystem.IMAGE_SCALE_SIZE)).map(Number.prototype.valueOf, 0);

    for (i = 0; i < length; i += 4) {
      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      imgScaleType = this.hsv2HT(ColorUtils.rgb2Hsv(r, g, b));
      // imgScaleType = this.rgb2HT([r, g, b]);
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

  imageScale.rgb2HT = function(rgb) {
    return getImageScaleType(rgb, ColorSystem.RGB_TABLE, ColorUtils.colorDistanceRGB);
  };

  imageScale.hsv2HT = function(hsv) {
    return getImageScaleType(hsv, ColorSystem.HSV_TABLE, ColorUtils.colorDistanceHSV);
  };

  /** 
   * 色からイメージスケールのHue&Tone番号を取得
   *
   + @param Array x RGB or HSV
   * @param Array colorTable RGB_TABLE or HSV_TABLE
   * @param Function colorDistance calculate colorDistance
   *
   * TODO: 130個全部をチェックしてる・・・
   */
   function getImageScaleType(colors, colorTable, colorDistance) {
    var i, d,
        imageScaleType = 0,
        distance = Number.MAX_VALUE;

    for (i = 0; i < ColorSystem.IMAGE_SCALE_SIZE; i++) {
      d = colorDistance(colors, colorTable[i]);
      if (distance > d) {
        imageScaleType = i;
        distance = d;
      }
    }
    return imageScaleType;
  }

  function count(imageScaleType) {
    imageScale.countTable[imageScaleType] += 1;
  }

  this.imageScale = imageScale;
}());