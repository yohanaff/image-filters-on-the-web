var canva = document.getElementById("canva");
var fileinput = document.getElementById("fileinput");
var dimensions = document.getElementById("dimensions");
var image;
var grayImage;
var redImage;
var trigonometrySharkImage;
var windowPane;
var rainbow;
var blurImage;
var image3d;

function ImageIsLoaded(image) {
  if (image == null || !image.complete()) {
    return true;
  } else {
    return false;
  }
}

function upload() {
  image = new SimpleImage(fileinput);
  image.drawTo(canva);
  dimensions.innerHTML = '';
}

function clearCanvas() {
  doClear(canva);
  fileinput = document.getElementById("fileinput");
}

function doClear(canva) {
  var context = canva.getContext("2d");
  context.clearRect(0, 0, canva.width, canva.height);
}

function resetImage() {
  doClear(canva);
  image = new SimpleImage(fileinput);
  image.drawTo(canva);
}

function imageDimensions() {
  if (ImageIsLoaded(image)) {
    alert("Image not loaded");
  } else {
    dimensions.innerHTML = "Height X Width (in pixels): " + image.height + " X " + image.width;
  }
}

function filterGray() {
  if (ImageIsLoaded(image)) {
    alert("Image not loaded");
  } else {

    grayImage = image;

    for (var pixel of grayImage.values()) {
      var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      pixel.setRed(average);
      pixel.setGreen(average);
      pixel.setBlue(average);
    }
    grayImage.drawTo(canva);
  }
}

function filterRed() {
  if (ImageIsLoaded(image)) {
    alert("Image not loaded");
  } else {

    redImage = image;

    for (var pixel of redImage.values()) {
      var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;

      if (average < 128) {
        pixel.setRed(average * 2);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen((average * 2) - 255);
        pixel.setBlue((average * 2) - 255);

      }
    }
    redImage.drawTo(canva);
  }
}

function filterTrigonometryShark() {
  if (ImageIsLoaded(image)) {
    alert("Image not loaded");
  } else {

    trigonometrySharkImage = image;

    for (var pixel of trigonometrySharkImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();

      pixel.setBlue(255);
    }

    for (x = 0; x < image.width; x++) {
      for (y = 0; y < image.height; y++) {

        var trigonometrySharkPixel = trigonometrySharkImage.getPixel(x, y);

        if (y < image.height / 5 + 100 * Math.sin(x / 100)) {
          trigonometrySharkPixel.setRed(139);
          trigonometrySharkPixel.setGreen(170);
          trigonometrySharkPixel.setBlue(201);
        } else if (y > (image.height * 4) / 5 + 100 * Math.sin(x / 100)) {
          trigonometrySharkPixel.setRed(139);
          trigonometrySharkPixel.setGreen(170);
          trigonometrySharkPixel.setBlue(201);
        }
      }
    }

    trigonometrySharkImage.drawTo(canva);
  }
}

function filterWindowPane() {
  if (ImageIsLoaded(image)) {
    alert("Image not loaded");
  } else {

    windowPane = image;

    var w = windowPane.getWidth();
    var h = windowPane.getHeight();

    for (var pixel of windowPane.values()) {
      var x = pixel.getX();
      var y = pixel.getY();

      function setColor() {
        pixel.setRed(227);
        pixel.setGreen(212);
        pixel.setBlue(117);
      }

      var borderW = w / 25;
      var borderH = h / 25;
      //border
      if (x <= borderW || x >= w - borderW || y <= borderH || y >= h - borderH) {
        setColor();
      }

      var thickness = w / 50;

      //vertical 1/3
      if (x < w / 3 && x > (w / 3 - thickness)) {
        setColor();
      }

      //vertical 2/3
      if ((x >= w / 3 && x < 2 * w / 3) && (x >= 2 * w / 3 - thickness)) {
        setColor();
      }

      //horzintal 2/3
      if (y < h / 3 && y > (h / 3 - thickness)) {
        setColor();
      }

      //horizontal 2/3
      if ((y >= h / 3 && y < 2 * h / 3) && (y >= 2 * h / 3 - thickness)) {
        setColor();
      }
    }
    windowPane.drawTo(canva);
  }
}

//MiniProject Challenge

function filterRainbow() {
  if (ImageIsLoaded(image)) {
    alert("Image not loaded");
  } else {

    rainbow = image;

    h = rainbow.getHeight();

    for (var pixel of rainbow.values()) {
      var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      var y = pixel.getY();
      var red = pixel.getRed();
      var green = pixel.getGreen();
      var blue = pixel.getBlue();

      //Red stripe
      if (y <= h / 7) {
        if (average < 128) {
          pixel.setRed(2 * average);
          pixel.setGreen(0);
          pixel.setBlue(0);
        } else {
          pixel.setRed(255);
          pixel.setGreen((2 * average) - 255);
          pixel.setBlue((2 * average) - 255);
        }
      }

      //Orange stripe
      else if (y > h / 7 && y <= 2 * h / 7) {
        if (average < 128) {
          pixel.setRed(2 * average);
          pixel.setGreen(0.8 * average);
          pixel.setBlue(0);
        } else {
          pixel.setRed(255);
          pixel.setGreen((1.2 * average) - 51);
          pixel.setBlue((2 * average) - 255);
        }
      }

      //Yellow stripe
      else if (y > 2 * h / 7 && y <= 3 * h / 7) {
        if (average < 128) {
          pixel.setRed(2 * average);
          pixel.setGreen(2 * average);
          pixel.setBlue(0);
        } else {
          pixel.setRed(255);
          pixel.setGreen(255);
          pixel.setBlue((2 * average) - 255);
        }
      }

      //Green stripe
      else if (y > 3 * h / 7 && y <= 4 * h / 7) {
        if (average < 128) {
          pixel.setRed(0);
          pixel.setGreen(2 * average);
          pixel.setBlue(0);
        } else {
          pixel.setRed((2 * average) - 255);
          pixel.setGreen(255);
          pixel.setBlue((2 * average) - 255);
        }
      }

      //Blue stripe
      else if (y > 4 * h / 7 && y <= 5 * h / 7) {
        if (average < 128) {
          pixel.setRed(0);
          pixel.setGreen(0);
          pixel.setBlue(2 * average);
        } else {
          pixel.setRed((2 * average) - 255);
          pixel.setGreen((2 * average) - 255);
          pixel.setBlue(255);
        }
      }

      //Indigo stripe
      else if (y > 5 * h / 7 && y <= 6 * h / 7) {
        if (average < 128) {
          pixel.setRed(0.8 * average);
          pixel.setGreen(0);
          pixel.setBlue(2 * average);
        } else {
          pixel.setRed((1.2 * average) - 51);
          pixel.setGreen((2 * average) - 255);
          pixel.setBlue(255);
        }
      }

      //Violet stripe
      else if (y > 6 * h / 7 && y <= h) {
        if (average < 128) {
          pixel.setRed(1.6 * average);
          pixel.setGreen(0);
          pixel.setBlue(1.6 * average);
        } else {
          pixel.setRed((0.4 * average) + 153);
          pixel.setGreen((2 * average) - 255);
          pixel.setBlue((0.4 * average) + 153);
        }
      }
    }
    rainbow.drawTo(canva);
  }
}

function filterBlur() {
  if (ImageIsLoaded(image)) {
    alert("Image not loaded");
  } else {

    blurImage = image;

    function pixelInImage(coordinate, size) {
      if (coordinate < 0) {
        return 0;
      }
      if (coordinate >= size) {
        return size - 1;
      }
      return coordinate;
    }

    function getPixelNearby(image, x, y, diameter) {

      var dx = Math.floor(Math.random() * diameter - diameter / 2);
      var dy = Math.floor(Math.random() * diameter - diameter / 2);
      var nx = pixelInImage(x + dx, image.getWidth());
      var ny = pixelInImage(y + dy, image.getHeight());

      return image.getPixel(nx, ny);
    }

    for (var pixel of blurImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();

      if (Math.random() > 0.5) {
        var pixel2 = getPixelNearby(blurImage, x, y, 10);
        blurImage.setPixel(x, y, pixel2);
      }
    }
    blurImage.drawTo(canva);
  }
}