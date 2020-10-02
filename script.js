class UI {
  constructor() {
    this.budgetInput = document.querySelector(".budget-input");
    this.expenseTitleInput = document.querySelector(".expense-title-input");
    this.expenseAmountInput = document.querySelector(".expense-amount-input");
    this.budgetPrice = document.querySelector(".budget-show-price");
    this.expenseTotalPrice = document.querySelector(".expense-total-price");
    this.balance = document.querySelector(".balance-show-price");
    this.expenseItemTitle = document.querySelector(".expense-title-show");
    this.expenseItemAmount = document.querySelector(".expense-item-price");
    this.expenseList = document.querySelector(".expense-list");
    // this.budgetForm = document.querySelector(".budget-form");
    // this.expenseForm = document.querySelector(".expense-form");
    this.itemList = [];
    this.itemID = 0;
  }
  //submit budget
  submitBudgetForm() {
    if (this.budgetInput.value === "" || this.budgetInput.value <= 0) {
      let div = document.createElement("div");
      let p = document.createElement("p");
      p.innerHTML =
        "<div><p class='text-danger'>Please input valiad amount !</p></div>";
      div.appendChild(p);
      let budgetTitle = document.querySelector(".budget-title");
      budgetTitle.appendChild(div);

      setTimeout(function () {
        budgetTitle.removeChild(div);
      }, 1500);
    } else {
      this.budgetPrice.textContent = this.budgetInput.value;
      this.budgetInput = "";
      this.showBalance();
    }
  }

  // total expense, use reducer
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function (acc, item) {
        acc += item.amount;
        return acc;
      }, 0);
    }
    this.expenseTotalPrice.textContent = total;
    return total;
  }
  // display balance price
  showBalance() {
    const expensePrice = this.totalExpense();
    let balance = parseInt(this.budgetPrice.textContent) - expensePrice;
    this.balance.textContent = balance;
  }

  // submit expense form
  submitExpenseForm() {
    if (
      this.expenseTitleInput === "" ||
      this.expenseAmountInput.value === "" ||
      this.expenseAmountInput.value < 0
    ) {
      let div = document.createElement("div");
      let p = document.createElement("p");
      p.innerHTML =
        "<div'><p class='text-danger'>Please input valiad amount and title !</p></div>";
      div.appendChild(p);
      let expenseAmountTitle = document.querySelector(".expense-title");
      expenseAmountTitle.appendChild(div);
      setTimeout(function () {
        expenseAmountTitle.removeChild(div);
      }, 2500);
    } else {
      let amount = parseInt(this.expenseAmountInput.value);

      this.expenseAmountInput.value = "";
      let item = {
        id: this.itemID,
        amount,
        title: this.expenseTitleInput.value,
      };
      this.itemID++;
      this.itemList = [item, ...this.itemList];

      // add item to expense list
      this.addExpenseList(item);
      console.log(this.itemList);
      //show total expense
      this.showBalance();
    }
    this.expenseTitleInput.value = "";
  }

  addExpenseList(item) {
    let tbody = document.createElement("tbody");
    tbody.innerHTML = `
     <tr >
         <td class="expense-info" >--${item.title}</td>
         <td class="expense-info">$${item.amount}</td>        
          <td><i class="fa fa-edit mr-3 edit-expense-icon" data-id="${item.id}"></i></td>
         <td><i class="fa fa-trash delete-expense-icon" data-id="${item.id}"></i></td>
        </tr>           
      `;
    let expenseList = document.querySelector(".expense-list");
    expenseList.appendChild(tbody);
  }

  // expense Edit
  expenseEdit(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);

    // remove from list
    let expense = this.itemList.filter((item) => {
      return item.id === id;
    });
    console.log(expense);
    //show value
    this.expenseTitleInput.value = expense[0].title;
    this.expenseAmountInput.value = expense[0].amount;

    this.itemList = this.itemList.filter((item) => {
      return item.id !== id;
    });
    this.showBalance();
  }

  // expense delete
  expenseDelete(element) {
    debugger;
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);

    this.itemList = this.itemList.filter((item) => {
      return item.id !== id;
    });
    this.showBalance();
  }
}

// all listening functions
function eventListeners() {
  const budgetForm = document.querySelector(".budget-form");
  const expenseForm = document.querySelector(".expense-form");
  const expenseList = document.querySelector(".expense-list");

  //new UI
  const ui = new UI();

  //budget submit
  budgetForm.addEventListener("submit", function (e) {
    e.preventDefault();
    ui.submitBudgetForm();
  });

  //expense submit
  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    ui.submitExpenseForm();
  });

  //expense submit
  expenseList.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("edit-expense-icon")) {
      ui.expenseEdit(e.target);
    } else if (e.target.classList.contains("delete-expense-icon")) {
      ui.expenseDelete(e.target);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});
