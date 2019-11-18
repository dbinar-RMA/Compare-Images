import "./styles.css";
// A responsive image comparison function with sliding element

function compareImages() {
  var clicked = 0;
  var pos = 0;
  var div_container = document.getElementById("div-container"); // the main div
  var div_regular = document.getElementById("div-regular"); // the unmoved div
  var cWidth = div_regular.offsetWidth;
  var div_slider = document.getElementById("div-slider"); // div containing the slider
  // set slider container position
  div_slider.style.left =
    (div_regular.offsetWidth - div_slider.offsetWidth / 2) / 2 + "px";
  div_slider.style.top = cWidth / 4 + "px";
  div_slider.style.zIndex = "3";
  // set events
  div_slider.addEventListener("mousedown", slideReady);
  div_slider.addEventListener("touchstart", slideReady);
  window.addEventListener("mouseup", slideFinish);
  window.addEventListener("touchstop", slideFinish);
  window.addEventListener("resize", resizeElements);
  // Create resizable Container
  var div_resizable = document.createElement("DIV");
  div_container.appendChild(div_resizable);
  div_resizable.style.position = "relative";
  div_resizable.style.width = div_regular.offsetWidth + "px";
  div_resizable.style.height = div_regular.offsetHeight - 4 + "px";
  div_resizable.style.zIndex = "2";
  // Create Image for resizable container
  var img = new Image();
  img.src = "/src/TKopie.jpg";
  img.style.height = div_resizable.style.height;
  img.style.clipPath =
    "inset(0px 0px 0px " + div_regular.offsetWidth / 2 + "px)";
  div_resizable.appendChild(img);

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
    div_slider.style.left = x - 15 + "px";
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

compareImages();
