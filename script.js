"use strict";
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("plus");
const expenseEl = document.getElementById("minus");
const cashEl = document.getElementById("cash");
const textEl = document.getElementById("transaction");
const formEl = document.getElementById("form");
const amountEl = document.getElementById("amount");
const buttonEl = document.getElementById("submit");
// global variable
const data = JSON.parse(localStorage.getItem("transaction")); 
let transactions = data.length > 0 ? data : [];
let income = 0;
let expense = 0;
let balance = 0;

// function
function init() {
  cashEl.innerHTML = null;
// initial loading list
  transactions.forEach((transaction) => {
    addTransactionDom(transaction);
  });

  // update value
  updateValues();
}

// // update value
  function updateValues(){
  // const incomeData = transactions.filter((val) => val.amount > 0);
  // const expenseData = transactions.filter((val) => val.amount < 0);

  // const incomeArr = incomeData.map((val) => val.amount);
  // const expenseArr = expenseData.map((val) => val.amount);
  // console.log(incomeArr);
  // console.log(expenseArr);

  // const income = incomeArr.reduce((prev, val) => prev + val, 0);
  // const expense = expenseArr.reduce((prev, val) => prev + val, 0);
  // console.log(income);
  // console.log(expense);
  // const balance = income + expense;

  // balanceEl.innerText = `₹${balance}`;
  // incomeEl.innerText = `₹${income}`;
  // expenseEl.innerText = `₹${expense}`;
const income = transactions
  .filter((val) => val.amount > 0)
  .map((val) => val.amount)
  .reduce((prev, val) => prev + val, 0);
  console.log(income)

const expense = transactions
  .filter((val) => val.amount < 0)
  .map((val) => val.amount)
  .reduce((prev, val) => prev + val, 0);

const balance = transactions
  .map((val) => val.amount)
  .reduce((prev, val) => prev + val, 0);
  console.log(balance)

balanceEl.innerText = `₹${balance}`;
incomeEl.innerText = `₹${income}`;
expenseEl.innerText = `₹${expense}`;

}

function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  // initial settings
  init();

// update a local storage 
localStorage.setItem("transaction", JSON.stringify(transactions));

}


function addTransactionDom({ id, name, amount }) {
  // sign in

  const sign = amount > 0 ? "₹" : "₹";

  // creating li

  const listEl = document.createElement("li");

  // class name to listEl

  listEl.className = amount > 0 ? "plus" : "minus";

  // innnerhtml
  listEl.innerHTML = `
  <span>${name}</span>
  <span> ${sign}${amount}</span>
  <button class="delete-btn" onclick= deleteTransaction(${id}) > <i class="fa-solid fa-trash"></i></button>

  `;
  //   cashEl.appendChild

  cashEl.appendChild(listEl);
}

// event listener
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textEl.value.trim() === "" || amountEl.value.trim() === "") {
    alert("please add transaction details");
  } else {
    // creating object
    const transaction = {
      id: Date.now(),
      name: textEl.value,
      amount: Number(amountEl.value),
    };
  

    transactions.push(transaction);


    localStorage.setItem("transaction", JSON.stringify(transactions));

    // add transaction to doc
    addTransactionDom(transaction);
    // clear transaction
    textEl.value = null;
    amountEl.value = null;

    // update value
  updateValues();

  }
});
init();

// initial setting