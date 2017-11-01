var model = {};
var view = {};
var handlers = {};

model.state = {
  imgSrcs: ['images/banner_large.jpg', 'images/img.png', 'images/duck.jpg'],
  imgCount: 0,
  transitionSpeed: 500,
  imgTransSpeed: 5000
};

model.next = function () {
  var imgSrcs = model.state.imgSrcs;
  if (model.state.imgCount < (imgSrcs.length - 1)) {
    model.state.imgCount += 1;
  } else {
    model.state.imgCount = 0;
  }
  view.drawImg(model.state.imgCount);
};

model.previous = function () {
  var imgSrcs = model.state.imgSrcs;
  if (model.state.imgCount > 0) {
    model.state.imgCount -= 1;
  } else {
    model.state.imgCount = imgSrcs.length - 1;
  }
  view.drawImg(model.state.imgCount);
};

view.drawDots = function () {
  var i;
  var imgSrcs = model.state.imgSrcs;
  var $nav = $('#nav');
  var $dots = $(document.createDocumentFragment());
  var dot;
  for (i = 0; i < imgSrcs.length; i += 1) {
    dot = $('<li><div class="dots"></div></li>');
    dot.attr('id', i);
    dot.css({ "margin-right": "3rem" });
    $dots.append(dot);
  }
  $nav.append($dots);
  $('#' + (imgSrcs.length - 1)).css({ "margin-right": 0 });
};

view.drawImg = function (i) {
  var imgSrcs = model.state.imgSrcs;
  var transSpeed = model.state.transitionSpeed;
  $('#carousel-wrapper').css({ "background-image": "url(" + imgSrcs[i] + ")" }).hide().fadeIn(transSpeed);
};

handlers.imgSlide = function () {
  var imgTransSpeed = model.state.imgTransSpeed;
  setInterval(model.next, imgTransSpeed);
};

$(document).ready(function () {
  view.drawDots();
  view.drawImg(model.state.imgCount);
  handlers.imgSlide();
});
