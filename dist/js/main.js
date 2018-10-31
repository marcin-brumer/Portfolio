// Select DOM items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));

    // Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    // Set Menu State
    showMenu = false;
  }
}

// Typewriting Effect
function TypeWriter(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleteing = false;
}

TypeWriter.prototype.type = function() {
  // Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of current word
  const fullTxt = this.words[current];

  // Chech if deleting
  if (this.isDeleteing) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = '<span class="txt">' + this.txt + "</span>";

  // Type speed
  let typeSpeed = 200;

  if (this.isDeleteing) {
    typeSpeed /= 2;
  }

  // Check if word is complete
  if (!this.isDeleteing && this.txt === fullTxt) {
    // Make a pause
    typeSpeed = this.wait;
    // Set deleting to true
    this.isDeleteing = true;
  } else if (this.isDeleteing && this.txt === "") {
    this.isDeleteing = false;
    // Move to nex word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 500;
  }

  const that = this;
  setTimeout(function() {
    that.type();
  }, typeSpeed);
};

//Init on DOM load
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  //Initialize TypeWriter
  new TypeWriter(txtElement, words, wait);
}
