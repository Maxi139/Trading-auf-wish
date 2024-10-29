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

// Define global variables for chart and data
var chart;
var valueHistory = [];

// Function to update the chart with new data
function updateChart() {
  if (!chart) {
    // If chart is not initialized, return early
    return;
  }

  // Push current value to history
  valueHistory.push(currentValue);

  // Ensure history length does not exceed 100 (for example)
  if (valueHistory.length > 100) {
    valueHistory.shift(); // Remove oldest value
  }

  // Update chart data
  chart.data.datasets[0].data = valueHistory;

  // Update chart without animation
  chart.update({
    duration: 0, // Disable the update animation
    lazy: false, // Update immediately
  });
}

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
  return Math.random() < 1;
}

function changeValue(howOften = 1) {
  for (let i = 0; i < howOften; i++) {
    if (Rising) {
      // Increase the value but limit it to a maximum of 10
      currentValue += Math.random() * 0.11;
      Rising = false;
    } else {
      // Decrease the value but ensure it doesn't go below 0.1
      currentValue -= Math.random() * 0.1;
      if (currentValue < 0.1) {
        currentValue = 0.1; // Minimum value is 0.1
      }
      Rising = false;
    }
  }
  UpdateDisplay();
}

function UpdateDisplay() {
  valueDisplay.innerHTML =
    (currentValue ? currentValue.toFixed(2) : "0.00") + "$";
  moneyDisplay.innerHTML = (money ? money.toFixed(2) : "0.00") + "$";
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
  updateChart();
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

function addMoney(moneyToAdd){
  money += moneyToAdd;
}

// Initialize the chart when the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  var ctx = document.getElementById("valueChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from(Array(100).keys()), // Example: use index as labels
      datasets: [
        {
          label: "Current Value",
          data: valueHistory,
          fill: false,
          borderColor: "#FFF",
          tension: 0.1,
          pointRadius: 0, // Remove the dots from the line
          pointHoverRadius: 0, // Remove hover effect on dots
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
      animation: {
        duration: 0, // Disable animation
      },
    },
  });

  // Once the chart is ready, manually update it the first time
  updateChart();
});

// Automatically change the value every 350ms
setInterval(changeValue, 100);
