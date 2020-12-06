const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function delToDos(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        // return toDo.id !== li.id; 를 하면 작동하지 않음
        // toDo.id는 숫자이고 li.id는 문자열이기 때문! 이런 실수는 자주 있으니 주의할 것
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
    // filter는 array의 모든 아이템을 통해 함수를 실행하고 true인 아이템들만을 가지고 새로운 array를 만든다.
};

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delToDos);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    // toDos안에 집어넣은 후에 호출해야 한다
    // 왜냐면 push해서 집어넣지 않으면 비어있기 떄문에.. 
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            // forEach()
            paintToDo(toDo.text);
        });
    }
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();