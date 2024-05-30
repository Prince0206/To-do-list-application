const todovalue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
    todo = [];
}

function CreateToDoItems() {
    if (todovalue.value === "") {
        todoAlert.innerText = "Please enter your todo text!";
        todovalue.focus();
    } else {
        let IsPresent = false;
        todo.forEach((element) => {
            if (element.item == todovalue.value) {
                IsPresent = true;
            }
        });
        if (IsPresent) {
            setAlertMessage("This item already present in the list!");
            return;
        }
    
        let li = document.createElement("li");
        const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedTodoItems(this)">${todovalue.value}</div><div>
                        <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/img/R.png" />
                        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/img/Del.png" /></div></div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);
    
        if (!todo) {
            todo = [];
        }
        let itemList = { item: todovalue.value, status: false};
        todo.push(itemList);
        setLocalStorage();
    }
    todovalue.value = "";
    setAlertMessage("Todo item Created Successfully!");
}

function ReadToDoItems() {
    todo.forEach((element) => {
        let li = document.createElement("li");
        let style = "";
        if (element.status) {
            style = "style='text-decoration: line-through'";
        }
        const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
            element.item
        }
        ${
            style === ""
            ? ""
            : '<img class="todo-controls" src="/img/mark.png" />'
        }</div><div>
        ${
            style === ""
              ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/img/Pencil-PNG.png" />'
              : ""
        }
        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/img/Del.png" /></div></div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}
ReadToDoItems();

function UpdateToDoItems(e) {
    if (
        e.parentElement.parentElement.querySelector("div").style.textDecoration ===
        ""
    ) {
        todovalue.value =
         e.parentElement.parentElement.querySelector("div").innerText;
         updateText = e.parentElement.parentElement.querySelector("div");
         addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
         addUpdate.setAttribute("src", "/img/Refresh.jpg");
         todovalue.focus();
    }
}

function UpdateOnSelectionItems() {
    let IsPresent = false;
    todo.forEach((element) => {
        if (element.item == todovalue.value) {
            IsPresent = true;
        }
    });

    if (IsPresent) {
        setAlertMessage("This items already present in the list!");
        return;
    }

    todo.forEach((element) => {
        if (element.item == updateText.innerText.trim()) {
            element.item = todovalue.value;
        }
    });
    setLocalStorage();

    updateText.innerText = todovalue.value;
    addUpdate.setAttribute("onclick", "CreateToDoItems()");
    addUpdate.setAttribute("src", "/img/plus_PNG28.png");
    todovalue.value = "";
    setAlertMessage("Todo item Updated Successfully!");
}

function DeleteToDoItems(e) {
    let deleteValue = 
      e.parentElement.parentElement.querySelector("div").innerText;

    if (confirm(`Are you sure. Do you want to delete this ${deleteValue}!`)){
      e.parentElement.parentElement.setAttribute("class", "deleted-item")
      todovalue.focus();

      todo.forEach((element) => {
        if (element.item == deleteValue.trim()) {

        }
      });

      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);

      setLocalStorage();
    }
}

function CompletedToDoItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
        const img =document.createElement("img");
        img.src = "/img/mark.png";
        img.className = "todo-controls";
        e.parentElement.querySelector("div").style.textDecoration = "line-through";
        e.parentElement.querySelector("div").appendChild(img);
        e.parentElement.querySelector("img.edit").remove();

        todo.forEach((element) => {
            if (
                e.parentElement.querySelector("div").innerText.trim() == element.item    
            ) {
                element.status = true;
            }
        });
        setLocalStorage();
        setAlertMessage("Todo item Completed Successfully!");
    }
}

function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message) {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message;
    setTimeout(() => {
      todoAlert.classList.add("toggleMe");
    }, 1000);
  }
