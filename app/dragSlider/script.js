const sliderContainer = document.querySelector(".container");
const innerSlider = document.querySelector(".slider");

const images = [
  "img/guitar1.jpg",
  "img/guitar2.jpg",
  "img/guitar3.jpg",
  "img/guitar4.jpg",
  "img/guitar5.jpg",
  "img/guitar6.jpg",
  "img/guitar7.jpg",
  "img/guitar8.jpg",
];

const events = {
  mouse: { down: "mousedown", up: "mouseup", move: "mousemove" },
  touch: { down: "touchstart", up: "touchend", move: "touchmove" },
};

let deviceType = "";

function isTouchDivice() {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
}

function sliderGenerator() {
  images.forEach((img) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.innerHTML = `<img src='${img}' class='image'>`;
    innerSlider.appendChild(slide);
  });

  innerSlider.style.gridTempateColumns = `repeat(${images.length}), 1fr`;
}

function handleDown(e) {
  active = true;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const containerRect = sliderContainer.getBoundingClientRect();
  const sliderRect = innerSlider.getBoundingClientRect();
  startX = clientX - (sliderRect.left - containerRect.left);
  sliderContainer.style.cursor = "grabbing";
}

function handleMove(e) {
  if (!active) return;

  e.preventDefault();

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const currentX = clientX - startX;
  const imageWidth = 800;
  const grabWidth = 16;
  const paddingWidth = 10 * 2;

  const totalWidth =
    (imageWidth + grabWidth) * images.length - grabWidth + paddingWidth;
  const maxOffset = totalWidth - sliderContainer.offsetWidth;

  const constrainedX = Math.min(0, Math.max(-maxOffset, currentX));
  innerSlider.style.transform = `translateX(${constrainedX}px)`;
}

function checkBoundary() {
  const innerWidth = innerSlider.offsetWidth;
  const containerWidth = sliderContainer.offsetWidth;
  const maxOffset = containerWidth - innerWidth;
  const currentOffset = parseInt(
    innerSlider.style.transform.replace("px)", "")
  );

  if (currentOffset > 0) {
    innerSlider.style.transform = "translateX(0px)";
  } else if (currentOffset < -maxOffset) {
    innerSlider.style.transform = `translateX(${-maxOffset}px)`;
  }
}

function handleUp() {
  sliderContainer.style.cursor = "grab";
  active = false;
}

function initializeSlider() {
  isTouchDivice();
  sliderGenerator();
  sliderContainer.addEventListener(events[deviceType].down, handleDown);
  document.addEventListener(events[deviceType].move, handleMove);
  document.addEventListener(events[deviceType].up, handleUp);
}

window.onload = initializeSlider();
