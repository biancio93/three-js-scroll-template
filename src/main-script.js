/* ======================================================
Dimensionamento bordi laterali
====================================================== */

let backgroundDecoration;
let textContainerDecoration;
let backgroundBorderHeight;
let propertyHeight;
let borderHeight = document.querySelectorAll(".border-height");

function setBorderHeight() {
  for (let i = 0; i < borderHeight.length; i++) {
    backgroundDecoration =
      document.querySelector(".back-decoration").offsetHeight;
    textContainerDecoration =
      document.querySelector(".text-container").offsetHeight;
    backgroundBorderHeight =
      (backgroundDecoration - textContainerDecoration) / 2;
    propertyHeight = "height: " + backgroundBorderHeight + "px;";
    borderHeight[i].setAttribute("style", propertyHeight);
  }
}
setBorderHeight();
window.addEventListener("resize", setBorderHeight);

