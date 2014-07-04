window.onload = function() {
  document.getElementById('file').addEventListener('change', function(e) {
    var file = e.target.files[0],
        canvas = document.getElementById('image'),
        context = canvas.getContext('2d'),
        image = new Image(),
        reader = new FileReader();

    reader.onload = function(evt) {
      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        var pixels = canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height);
        var result = imageScale.analyze(pixels);
        hueToneChart.render(result);
        csv.createFile(result).createLink("#download", file.name);
      };
      image.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }, false);
};