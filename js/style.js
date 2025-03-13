let today = new Date(), year = today.getFullYear(), month = today.getMonth(), todos = {};

function renderCalendar() {
    let firstDay = new Date(year, month, 1).getDay(), lastDate = new Date(year, month + 1, 0).getDate(), datesHtml = "";
    document.getElementById("monthYear").innerText = `${year} 年 ${month + 1} 月`;

    for (let i = 0; i < firstDay; i++) datesHtml += `<div class="date"></div>`;
    for (let day = 1; day <= lastDate; day++) {
        let dateKey = `${year}-${month + 1}-${day}`;
        let isToday = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) ? "today" : "";
        let todoHtml = (todos[dateKey] || []).map((t, i) => `<div class="todo" onclick="removeTodo('${dateKey}', ${i}, event)">${t}</div>`).join("");
        datesHtml += `<div class="date ${isToday}" onclick="addTodo(${day})">${day}${todoHtml}</div>`;
    }

    document.getElementById("dates").innerHTML = datesHtml;
}

function changeMonth(direction) {
    month += direction;
    if (month < 0) { month = 11; year--; }
    if (month > 11) { month = 0; year++; }
    renderCalendar();
}

function addTodo(day) {
    let dateKey = `${year}-${month + 1}-${day}`;
    let todoText = prompt("請輸入待辦事項:");
    if (todoText) {
        if (!todos[dateKey]) todos[dateKey] = [];
        todos[dateKey].push(todoText);
        renderCalendar();
    }
}

function removeTodo(dateKey, index, event) {
    event.stopPropagation();
    todos[dateKey].splice(index, 1);
    if (todos[dateKey].length === 0) delete todos[dateKey];
    renderCalendar();
}

renderCalendar();