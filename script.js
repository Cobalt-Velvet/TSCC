document.addEventListener("DOMContentLoaded", function () {
  const clock = document.querySelector(".time");
  const meridiem = document.querySelector(".meridiem");
  const calendarDays = document.querySelector(".days");
  const todoList = document.querySelector(".todo-list");
  const todoInput = document.querySelector(".todo-input input");
  const addBtn = document.getElementById("add-btn");

  function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    clock.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    meridiem.textContent = amPm;
  }

  function updateCalendar() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDate = now.getDate();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth - 1, daysInMonth).getDay();
    const prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const nextMonthDays = lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth;

    const monthYearText = document.querySelector(".month-year");
    monthYearText.textContent = `${currentYear}년 ${currentMonth}월`;

    let calendarDaysHTML = "";

    for (let i = prevMonthDays; i > 0; i--) {
      const prevMonthDate = new Date(currentYear, currentMonth - 1, 0 - i + 1).getDate();
      calendarDaysHTML += `<span class="other-month">${prevMonthDate}</span>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
      if (i === currentDate) {
        calendarDaysHTML += `<span class="current-day">${i}</span>`;
      } else {
        calendarDaysHTML += `<span>${i}</span>`;
      }
    }

    for (let i = 1; i <= nextMonthDays; i++) {
      calendarDaysHTML += `<span class="other-month">${i}</span>`;
    }

    calendarDays.innerHTML = calendarDaysHTML;
  }

  function updateToDoList() {
    const todoItems = todoList.querySelectorAll(".todo-list-item");
    todoItems.forEach((item) => {
      const checkbox = item.querySelector(".checkbox");
      const todoText = item.querySelector(".todo-text");
      const deleteButton = item.querySelector(".delete-button");

      checkbox.addEventListener("click", function () {
        todoText.classList.toggle("checked");
      });

      deleteButton.addEventListener("click", function () {
        item.remove();
      });
    });
  }

  addBtn.addEventListener("click", function () {
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-list-item");
      todoItem.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span class="todo-text">${todoText}</span>
        <span class="delete-button">❌</span>
      `;
      todoList.appendChild(todoItem);
      todoInput.value = "";
      updateToDoList();
    }
  });

  setInterval(updateTime, 1000);
  updateCalendar();
});
