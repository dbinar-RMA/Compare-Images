import "./styles.css";
// A responsive image comparison function with sliding element

function compareImages() {
  var clicked = 0;
  var pos = 0;
  var img = new Image();
  var div_container = document.getElementById("div-container"); // the main div
  var div_regular = createFixedElement(); //document.getElementById("div-regular"); // the unmoved div
  var cWidth = div_regular.offsetWidth;
  var div_resizable = createResizableElement();
  var div_slider = createSliderElement();

  window.addEventListener("mouseup", slideFinish);
  window.addEventListener("touchstop", slideFinish);
  window.addEventListener("resize", resizeElements);

  // creates a sliding control to handle image comparison
  function createSliderElement() {
    var slider = document.createElement("div");
    slider.id = "div-slider";
    slider.setAttribute("class", "slider-container");

    slider.style.left =
      (div_regular.offsetWidth - slider.offsetWidth / 2) / 2 + "px";
    slider.style.top = cWidth / 4 + "px";
    slider.style.zIndex = "3";

    var image = new Image();
    image.src = "/src/slider.jpg";
    image.setAttribute("class", "comp-slider");
    slider.appendChild(image);
    slider.addEventListener("mousedown", slideReady);
    slider.addEventListener("touchstart", slideReady);

    div_container.appendChild(slider);

    return slider;
  }
  // creates a fixed element with 1st image
  function createFixedElement() {
    var fixed = document.createElement("div");
    fixed.setAttribute("id", "div-regular");
    fixed.setAttribute("class", "img-container");
    var image = new Image();
    image.src = "/src/Terminator.jpg";
    image.setAttribute("class", "comp-img");
    image.style.clipPath = "inset(0px 1px 0px 0px)";

    fixed.appendChild(image);
    div_container.appendChild(fixed);

    return fixed;
  }
  // creates a resizable container containung the 2nd image
  function createResizableElement() {
    var resizable = document.createElement("div");
    resizable.style.position = "relative";
    resizable.style.width = div_regular.offsetWidth + "px";
    resizable.style.height = div_regular.offsetHeight - 4 + "px";
    resizable.style.zIndex = "2";

    img.src = "/src/TKopie.jpg";
    //img.style.height = resizable.style.height;
    // doesnt work on frist load
    // image loads after elements
    // todo: find out img height dynamically and set value
    // info: retarded html/css page load layout shit
    // set fixed height value for all sites and check device specific....
    img.style.height = "247px";
    img.style.clipPath =
      "inset(0px 0px 0px " + (div_regular.offsetWidth + 40) / 2 + "px)";
    resizable.appendChild(img);
    div_container.appendChild(resizable);

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
    if (clicked === 0) return;

    pos = getCursorPos(e);
    if (pos < 0) pos = 0;
    if (pos > cWidth) pos = cWidth;

    slide(pos);
  }
  function getCursorPos(e) {
    var x = 0;
    e = e || window.event;
    x = e.pageX;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    return x;
  }
  function slide(x) {
    div_slider.style.left = x - 20 + "px"; // TODO: calc offset value properly
    img.style.clipPath = "inset(0px 0px 0px " + x + "px)";
  }
  function resizeElements() {
    // set slider pos
    cWidth = div_regular.offsetWidth;
    div_slider.style.left =
      (div_regular.offsetWidth - div_slider.offsetWidth / 2) / 2 + "px";
    div_slider.style.top = cWidth / 4 + "px";
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
