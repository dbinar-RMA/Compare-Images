import "./styles.css";

// A responsive image comparison function with sliding element

function compareImages() {
  var clicked = 0;
  //var pos = 0;
  var img = new Image();
  var figure = document.getElementById("div-container"); // main container
  var div_regular = createFixedElement(); // the unmoved div, max_height = 470px
  var cWidth = div_regular.offsetWidth;
  var div_slider = createSliderElement();
  var div_resizable = createResizableElement();

  window.addEventListener("mouseup", slideFinish);
  window.addEventListener("touchstop", slideFinish);
  window.addEventListener("resize", resizeElements);

  // creates a sliding control to handle image comparison
  function createSliderElement() {
    var slider = document.createElement("div");
    slider.id = "div-slider";
    slider.setAttribute("class", "slider-container");
    slider.style.left = div_regular.offsetWidth / 2.1 + "px";
    slider.style.top = div_regular.offsetHeight / 2.2 + "px";
    slider.style.zIndex = "3";

    var image = new Image();
    //image.src = "/src/slider.jpg";
    image.src = "src/Arrows.png";
    image.setAttribute("class", "comp-slider");
    slider.appendChild(image);
    slider.addEventListener("mousedown", slideReady);
    slider.addEventListener("touchstart", slideReady);

    figure.appendChild(slider);

    return slider;
  }

  // creates a fixed element with 1st image
  function createFixedElement() {
    var fixed = document.createElement("div");
    fixed.setAttribute("id", "div-regular");
    fixed.setAttribute("class", "img-container");
    var image = new Image();
    image.src =
      "https://media04.meinbezirk.at/article/2019/11/19/5/22034145_XL.jpg?1574152752307";
    image.setAttribute("class", "comp-img");
    image.style.clipPath = "inset(0px 1px 0px 0px)";

    fixed.appendChild(image);
    figure.appendChild(fixed);

    return fixed;
  }

  // creates a resizable container containung the 2nd image
  function createResizableElement() {
    var resizable = document.createElement("div");
    resizable.style.position = "relative";
    resizable.style.width = div_regular.offsetWidth + "px";

    //img.src = "/src/TKopie.jpg";
    img.src =
      "https://media04.meinbezirk.at/article/2019/11/19/8/22034148_XL.jpg?1574152785901";
    img.style.height = div_regular.offsetHeight - 4 + "px";
    img.style.width = "100%";
    img.style.clipPath =
      "inset(0px 0px 0px " + (div_regular.offsetWidth + 20) / 2 + "px)";
    resizable.appendChild(img);
    figure.appendChild(resizable);

    return resizable;
  }
  function slideReady(e) {
    e.preventDefault();
    clicked = 1;
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
  }
  function slideFinish() {
    clicked = 0;
  }
  function slideMove(e) {
    var pos;
    if (clicked === 0) return;

    pos = getCursorPos(e);
    if (pos < 0) pos = 0;
    if (pos > cWidth) pos = cWidth;

    slide(pos);
  }
  function getCursorPos(e) {
    var x = 0;
    e = e || window.event;
    x = e.pageX - div_slider.offsetWidth;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    return x;
  }
  function slide(x) {
    div_slider.style.left = x - div_slider.offsetWidth / 2 + "px";
    img.style.clipPath = "inset(0px 0px 0px " + x + "px)";
  }
  function resizeElements() {
    // set slider pos
    cWidth = div_regular.offsetWidth;
    div_slider.style.left =
      div_regular.offsetWidth / 2 - div_slider.offsetWidth / 2 + "px";
    //div_slider.style.top = cWidth / 4 + "px";
    div_slider.style.top = div_regular.offsetHeight / 2.2 + "px";
    // set resizable div pos
    div_resizable.style.width = div_regular.offsetWidth + "px";
    div_resizable.style.height = div_regular.offsetHeight - 4 + "px";
    // adjust image pos to resizable div pos
    img.style.height = div_resizable.style.height;
    img.style.clipPath =
      "inset(0px 0px 0px " + div_regular.offsetWidth / 2 + "px)";
  }
}

// call function
compareImages();

//fetchArticleImages("");

function fetchArticleImages(artID, callback) {
  //var url = "https://www.meinbezirk.at/" + artID;
  // curl -X GET "https://www.meinbezirk.at/api/v2/articles/3763848/images" -H  "accept: application/json"

  var url =
    "https://www.meinbezirk.at/mistelbach/c-lokales/damals-und-heute-lourdes-kapelle-in-wolkersdorf_a3763848";

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      console.log("fall back!! ", callback);
      callback(request.responseText);
    }
  };

  request.open("GET", "https://www.google.com", true);
  request.send();
  console.log("request status: ", request.status);
  //var imgUrl = "https://www.meinbezirk.at/api/v2/articles/3763848/images";
  //request.setRequestHeader("Authorization", "Basic " + btoa("dominik.binar@regionalmedien.at:meibez123"));
}
