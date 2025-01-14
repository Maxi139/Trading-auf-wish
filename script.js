const valueDisplay = document.querySelector("#worth");
const buttonBuy = document.querySelector("#buy");
const buttonSell = document.querySelector("#sell");
const investedAtPriceDisplay = document.querySelector("#price");
const investedMoneyDisplay = document.querySelector("#moneyInvest");
const ProfitDisplay = document.querySelector("#profit");
const moneyDisplay = document.querySelector("#money");
const cheaterSign = document.getElementById("cheaterBanner");

const messageItem = document.querySelector("#message");

var Theme;

const settingsDisplay = document.querySelector("#settings");

const AllTrades = [];
const percentageOffGoodTrades = [];

const themes = ["#fff;;#000;;'Roboto Mono', monospace", "#F2F4CB;;#110B11;;'Montserrat', sans-serif", "#EDEBD7;;#6E675F;;'Merriweather', serif", "#000;;#fff;;'Roboto Mono', monospace", "#110B11;;#F2F4CB;;'Montserrat', sans-serif", "#6E675F;;#EDEBD7;;'Merriweather', serif"];

var currentValue = 1;
var Rising = true;
var money = 100;
var investedMoney = 0;
var investedAtPrice = 0;
var Profit = 0;
var canBuy = true;
var hasPlayed = false;

//themes
var fontFamily = "'Roboto Mono', monospace;";
var firstColor =  "#fff";
var secondColor = "#000";

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
  if (valueHistory.length > 170) {
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
  localStorage.setItem("Trades", AllTrades);
  localStorage.setItem("money", money);
  localStorage.setItem("currentValue", currentValue);
  localStorage.setItem("hasPlayed", hasPlayed);
  localStorage.setItem("investedMoney", investedMoney);
  localStorage.setItem("investedAtPrice", investedAtPrice);
  localStorage.setItem("Profit", Profit);
  localStorage.setItem("canBuy", canBuy);
  localStorage.setItem("Theme", Theme);
  localStorage.setItem("valueHistory", JSON.stringify(valueHistory));
}

function True70False30() {
  return Math.random() < 0.5;
}

function changeValue(howOften = 1) {
  for (let i = 0; i < howOften; i++) {
    if (Rising) {
      // Increase the value but limit it to a maximum of 10
      currentValue += Math.random() * 0.11;
      Rising = True70False30();
    } else {
      // Decrease the value but ensure it doesn't go below 0.1
      currentValue -= Math.random() * 0.11;
      if (currentValue < 0.1) {
        currentValue = 0.1; // Minimum value is 0.1
        Rising = true;
      }else{
        Rising = !True70False30();
      }
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
      ProfitDisplay.innerHTML = " " + Profit.toFixed(2) + "$ / " + ((Profit / investedMoney) * 100).toFixed(2) + "%";
    } else {
      ProfitDisplay.innerHTML = Profit.toFixed(2) + "$ / " + ((Profit / investedMoney) * 100).toFixed(2) + "%";
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
  showMessage("Bought at price: <span>" + investedAtPrice.toFixed(2) + "$</span> for: <span>" + investedMoney.toFixed(2) + "$</span>");
}

function reset() {
  localStorage.clear();
  location.reload();
}

function openSettings(){
  //Add more later
  console.log("open settings");
  if(settingsDisplay.style.visibility === "visible"){
    settingsDisplay.style.visibility = "hidden";
  }
  else{
    settingsDisplay.style.visibility = "visible";
  }
}

function sell() {
  if (!canBuy) {
    Profit = (currentValue / investedAtPrice) * investedMoney;
    money = Profit;
    UpdateDisplay();
    canBuy = true;
    showMessage("Sold at price: <span>" + currentValue.toFixed(2) + "$</span> for: <span>" + money.toFixed(2) + "$</span>");
    reloadTradeRate(Profit);
  }else{
    return;
  }
}

function reloadTradeRate(Profit){
  AllTrades.append(Profit);
};

function changeTheme(theme){
  if(theme == 0){
    document.getElementById("firstTheme").style.border = "3px solid var(--firstColor)";
    document.getElementById("secondTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("thirdTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fourthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fifthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("sixthTheme").style.border = "1px solid var(--firstColor)";
  }else if(theme == 1){
    document.getElementById("firstTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("secondTheme").style.border = "3px solid var(--firstColor)";
    document.getElementById("thirdTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fourthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fifthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("sixthTheme").style.border = "1px solid var(--firstColor)";
  }else if(theme == 2){
    document.getElementById("firstTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("secondTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("thirdTheme").style.border = "3px solid var(--firstColor)";
    document.getElementById("fourthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fifthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("sixthTheme").style.border = "1px solid var(--firstColor)";
  }else if(theme == 3){
    document.getElementById("firstTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("secondTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("thirdTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fourthTheme").style.border = "3px solid var(--firstColor)";
    document.getElementById("fifthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("sixthTheme").style.border = "1px solid var(--firstColor)";
  }else if(theme == 4){
    document.getElementById("firstTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("secondTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("thirdTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fourthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fifthTheme").style.border = "3px solid var(--firstColor)";
    document.getElementById("sixthTheme").style.border = "1px solid var(--firstColor)";
  }else if(theme == 5){
    document.getElementById("firstTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("secondTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("thirdTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fourthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("fifthTheme").style.border = "1px solid var(--firstColor)";
    document.getElementById("sixthTheme").style.border = "3px solid var(--firstColor)";
  }
  Theme = theme;
  console.log(themes[theme]);
  firstColor = themes[theme].split(";;")[0];
  secondColor = themes[theme].split(";;")[1];
  fontFamily = themes[theme].split(";;")[2];
  document.documentElement.style.setProperty('--fontFamily', fontFamily);
  document.documentElement.style.setProperty('--firstColor', firstColor);
  document.documentElement.style.setProperty('--secondColor', secondColor);
  chart.data.datasets[0].borderColor = firstColor;
  chart.options.scales.x.ticks = {color: firstColor};
  chart.options.scales.y.ticks = {color: firstColor};
  chart.update();
  save();
}



// Initialize the chart when the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  var ctx = document.getElementById("valueChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from(Array(250).keys()), // Example: use index as labels
      datasets: [
        {
          data: valueHistory,
          fill: false,
          borderColor: "#fff",
          tension: 0.3,
          pointRadius: 0, // Remove the dots from the line
          pointHoverRadius: 0, // Remove hover effect on dots
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        x: {
          grid: {
            display: false
          },
        },
        y: {
          grid: {
            display: false
          },
        }
      },
      animation: {
        duration: 0, // Disable animation
      },
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        tooltip: {
          enabled: false, // Disable tooltips
        },
        
      },
    },
  });

  // Once the chart is ready, manually update it the first time
  updateChart();
});

// Automatically change the value every 350ms
setInterval(changeValue, 100);

if (localStorage.getItem("hasPlayed")) {
  Theme = parseFloat(localStorage.getItem("Theme")) || 0;
  money = parseFloat(localStorage.getItem("money")) || 100;
  currentValue = parseFloat(localStorage.getItem("currentValue")) || 1;
  investedMoney = parseFloat(localStorage.getItem("investedMoney")) || 0;
  investedAtPrice = parseFloat(localStorage.getItem("investedAtPrice")) || 0;
  Profit = parseFloat(localStorage.getItem("Profit")) || 0;
  canBuy = localStorage.getItem("canBuy") === "true"; // Convert to boolean
  valueHistory = JSON.parse(localStorage.getItem("valueHistory")) || [];
  UpdateDisplay();
  updateChart();
  changeValue(50);
} else {
  console.log("Error");
}

function showMessage(message) {
  messageItem.style.display = "block";
  messageItem.innerHTML = message;
  messageItem.style.animation = "moveFadeIn 2s forwards";
  setTimeout(function () {
    messageItem.style.display = "none";
    messageItem.style.animation = "none";
  }, 2000);
}


(function detectConsoleOpen() {
  let consoleOpened = false;

  function checkForConsole() {
      const startTime = performance.now();

      // `debugger;` will pause the execution if DevTools is open
      debugger;
      
      if (performance.now() - startTime > 100) {
          if (!consoleOpened) {
              consoleOpened = true;
              cheaterSign.style.visibility = "visible";
          }
      } else {
          consoleOpened = false;
      }
  }

  // Run the check every 1000ms (1 second)
  setInterval(checkForConsole, 1000);
})();
