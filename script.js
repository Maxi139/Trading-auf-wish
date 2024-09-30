const valueDisplay = document.querySelector("#worth");
const buttonBuy = document.querySelector("#buy");
const buttonSell = document.querySelector("#sell");
const investedAtPriceDisplay = document.querySelector("#price");
const investedMoneyDisplay = document.querySelector("#moneyInvest");
const ProfitDisplay = document.querySelector("#profit");
const moneyDisplay = document.querySelector("#money");

var currentValue = 1;
var Rising = true;
var money = 100;
var investedMoney = 0;
var investedAtPrice = 0;
var Profit = 0;
var canBuy = true;
var hasPlayed = false;

function save() {
  localStorage.setItem("money", money);
  localStorage.setItem("currentValue", currentValue);
  localStorage.setItem("hasPlayed", hasPlayed);
  localStorage.setItem("investedMoney", investedMoney);
  localStorage.setItem("investedAtPrice", investedAtPrice);
  localStorage.setItem("Profit", Profit);
  localStorage.setItem("canBuy", canBuy);
}

function True70False30() {
  return Math.random() < 0.5;
}

function changeValue(howOften = 1) {
  for (let i = 0; i < howOften; i++) {
    if (Rising) {
      currentValue *= Math.random() * 1.2;
      Rising = True70False30();
    } else {
      currentValue -= Math.random();
      Rising = !True70False30();
    }
    // Ensure currentValue doesn't go negative
    if (currentValue < 0) {
      currentValue = 0.1;
    }
  }
  UpdateDisplay();
}

function UpdateDisplay() {
  valueDisplay.innerHTML =
    (currentValue ? currentValue.toFixed(2) : "0.00") + "$";
  moneyDisplay.innerHTML = (money ? money.toFixed(2) : "0.00") + "$";

  if (!canBuy) {
    investedAtPriceDisplay.innerHTML =
      (investedAtPrice ? investedAtPrice.toFixed(2) : "0.00") + "$";
    investedMoneyDisplay.innerHTML =
      (investedMoney ? investedMoney.toFixed(2) : "0.00") + "$";

    Profit =
      (currentValue / investedAtPrice) * investedMoney - investedMoney || 0;
    if (Profit >= 0) {
      ProfitDisplay.innerHTML = " " + Profit.toFixed(2) + "$";
    } else {
      ProfitDisplay.innerHTML = Profit.toFixed(2) + "$";
    }
  } else {
    investedAtPriceDisplay.innerHTML = "0.00$";
    investedMoneyDisplay.innerHTML = "0.00$";
    ProfitDisplay.innerHTML = "0.00$";
  }
  save();
}

function buy() {
  if (!canBuy) {
    return;
  }
  canBuy = false;
  investedMoney = money;
  investedAtPrice = currentValue;
  money = 0;
  UpdateDisplay();
  hasPlayed = true;
}

function sell() {
  Profit = (currentValue / investedAtPrice) * investedMoney;
  money = Profit;
  UpdateDisplay();
  canBuy = true;
}

if (localStorage.getItem("hasPlayed")) {
  money = parseFloat(localStorage.getItem("money")) || 100;
  currentValue = parseFloat(localStorage.getItem("currentValue")) || 1;
  investedMoney = parseFloat(localStorage.getItem("investedMoney")) || 0;
  investedAtPrice = parseFloat(localStorage.getItem("investedAtPrice")) || 0;
  Profit = parseFloat(localStorage.getItem("Profit")) || 0;
  canBuy = localStorage.getItem("canBuy") === "true"; // Convert to boolean
  UpdateDisplay();
  changeValue(50);
} else {
  console.log("Error");
}

function reset() {
  localStorage.clear();
  location.reload();
}

// Automatically change the value every 350ms
setInterval(changeValue, 350);
