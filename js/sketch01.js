var h = 0;
var s = 0;
var l = 50;
var rgb;
var colorId = document.getElementById("colorId");
var w;
var h;

function setup() {
  colorMode(HSL, 360, 100, 100);
  h = random(0, 360);
}

function draw() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  halfWidth = windowWidth/2
  if (mouseX < halfWidth){
    s = map(mouseX, 0, halfWidth, 0, 100);
  }
  else {
    s = map(mouseX, halfWidth, windowWidth, 100, 0);
  }
  l = map(mouseY, 0, windowHeight, 100, 0);
  rgb = hslToHex(h, s, l);

  document.bgColor = rgb;
  document.getElementById("colorId").innerHTML = rgb;

};

function mouseClicked() {
  // copyToClipboard("#colorId");
  copyToClipboard("#colorId");
  alert("color copied");
}


function mouseWheel(event) {
  h += event.delta/100;
  if (h<0){h=360};
	if (h>360){h=0};
  //uncomment to block page scrolling
  return false;
};



function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
